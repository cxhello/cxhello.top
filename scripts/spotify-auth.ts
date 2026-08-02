import { execSync, spawnSync } from 'child_process'
import fs from 'fs'
import http from 'http'
import path from 'path'

const SPOTIFY_AUTHORIZE_API = 'https://accounts.spotify.com/authorize'
const SPOTIFY_TOKEN_API = 'https://accounts.spotify.com/api/token'
const REDIRECT_URI = 'http://127.0.0.1:3000/callback'
const SCOPES = 'user-read-currently-playing user-top-read'
const ENV_PATH = path.join(process.cwd(), '.env')
const VERCEL_TARGETS = ['production', 'preview', 'development']

function parseEnv(content: string) {
  let env: Record<string, string> = {}
  for (let line of content.split('\n')) {
    let match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (match) env[match[1]] = match[2]
  }
  return env
}

function waitForCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    let server = http.createServer((req, res) => {
      let url = new URL(req.url ?? '/', REDIRECT_URI)
      if (url.pathname !== '/callback') {
        res.writeHead(404).end()
        return
      }
      let code = url.searchParams.get('code')
      let error = url.searchParams.get('error')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(code ? '✅ 授权成功，可以关闭此页面回到终端。' : `❌ 授权失败：${error}`)
      server.close()
      if (code) {
        resolve(code)
      } else {
        reject(new Error(`Spotify 授权失败：${error}`))
      }
    })
    server.on('error', reject)
    server.listen(3000, '127.0.0.1')
  })
}

async function exchangeToken(clientId: string, clientSecret: string, code: string) {
  let basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  let response = await fetch(SPOTIFY_TOKEN_API, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })
  let data = await response.json()
  if (!response.ok || !data.refresh_token) {
    throw new Error(`换取 token 失败：${JSON.stringify(data)}`)
  }
  return data.refresh_token as string
}

function updateLocalEnv(envContent: string, refreshToken: string) {
  let line = `SPOTIFY_REFRESH_TOKEN=${refreshToken}`
  let updated = envContent.match(/^SPOTIFY_REFRESH_TOKEN=.*$/m)
    ? envContent.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${envContent.trimEnd()}\n${line}\n`
  fs.writeFileSync(ENV_PATH, updated)
  console.log('✅ 本地 .env 已更新')
}

function updateVercelEnv(refreshToken: string) {
  for (let target of VERCEL_TARGETS) {
    try {
      execSync(`vercel env rm SPOTIFY_REFRESH_TOKEN ${target} --yes`, { stdio: 'ignore' })
    } catch {
      // 变量不存在时忽略
    }
    execSync(`vercel env add SPOTIFY_REFRESH_TOKEN ${target}`, {
      input: refreshToken,
      stdio: ['pipe', 'ignore', 'inherit'],
    })
    console.log(`✅ Vercel ${target} 环境已更新`)
  }
}

function redeployProduction() {
  console.log('🚀 正在重新部署 production 以使新变量生效...')
  let output = execSync('vercel ls --prod', { encoding: 'utf8' })
  let latest = output.match(/https:\/\/\S+\.vercel\.app/)?.[0]
  if (!latest) {
    console.log(
      '⚠️ 未找到最新生产部署，请手动执行 `vercel redeploy <deployment-url>` 或 push 一个 commit。'
    )
    return
  }
  execSync(`vercel redeploy ${latest}`, { stdio: 'inherit' })
}

async function main() {
  let envContent = fs.readFileSync(ENV_PATH, 'utf8')
  let { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = parseEnv(envContent)
  if (!clientId || !clientSecret) {
    throw new Error('.env 中缺少 SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET')
  }

  let authorizeUrl = new URL(SPOTIFY_AUTHORIZE_API)
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('redirect_uri', REDIRECT_URI)
  authorizeUrl.searchParams.set('scope', SCOPES)

  console.log('🎧 正在打开浏览器授权，如未自动打开请手动访问：')
  console.log(authorizeUrl.toString())
  spawnSync('open', [authorizeUrl.toString()])

  let code = await waitForCode()
  console.log('✅ 已拿到授权 code，正在换取 refresh token...')
  let refreshToken = await exchangeToken(clientId, clientSecret, code)

  updateLocalEnv(envContent, refreshToken)
  updateVercelEnv(refreshToken)
  redeployProduction()

  let expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
  console.log(
    `🎉 完成。本次 refresh token 约在 ${expiresAt.toISOString().slice(0, 10)} 过期，届时重新运行 \`pnpm spotify-auth\` 即可。`
  )
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
