export const SITE_METADATA = {
  title: `Cuthbert's Blog`,
  author: 'Cuthbert',
  headerTitle: `Cuthbert's Blog`,
  description:
    'Hi there, I am Cuthbert, a software engineer.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://cxhello.top',
  siteRepo: 'https://github.com/cxhello/cxhello.top',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'caixiaohuichn@gmail.com',
  github: 'https://github.com/cxhello',
  x: 'https://x.com/caixiaohuichn',
  // facebook: 'https://facebook.com',
  youtube: 'https://www.youtube.com/@cxhello',
  // linkedin: 'https://www.linkedin.com',
  // threads: 'https://www.threads.net',
  // instagram: 'https://www.instagram.com',
  locale: 'en-US',
  stickyNav: true,
  goodreadsBookshelfUrl: 'https://www.goodreads.com/review/list/179720035-leo-huynh',
  goodreadsFeedUrl: 'https://www.goodreads.com/review/list_rss/179720035',
  imdbRatingsList: '  https://www.imdb.com/user/ur194975855/ratings/?view=grid',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: 'https://cloud.umami.is/share/FgKDmdMFYOuJLeLK/cxhello.top'
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  support: {
    buyMeACoffee: 'https://www.buymeacoffee.com',
    paypal: 'https://paypal.me/cxhello?country.x=VN&locale.x=en_US',
    kofi: 'https://ko-fi.com',
  },
}
