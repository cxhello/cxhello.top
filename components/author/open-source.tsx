import { TimelineItem, type TimelineEntry } from './career'

const PROJECTS: TimelineEntry[] = [
  {
    org: 'Nacos',
    url: 'https://nacos.io',
    logo: '/static/images/nacos-logo.png',
    start: 'May 2026',
    end: 'Present',
    title: 'Committer',
    icon: 'rocket',
    event: 'opensource-nacos',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Contribute to code quality governance, CI/CD pipeline optimization and automation, and
            the multilingual SDK / cloud-native ecosystem — see the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://nacos.io/en/blog/committer-20260509/"
            >
              committer announcement
            </a>
            .
          </li>
        </ul>
      )
    },
  },
]

export function OpenSourceTimeline() {
  return (
    <ul className="m-0 list-none p-0">
      {PROJECTS.map((proj, idx) => (
        <li key={proj.url} className="m-0 p-0">
          <TimelineItem exp={proj} last={idx === PROJECTS.length - 1} />
        </li>
      ))}
    </ul>
  )
}
