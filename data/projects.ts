import type { Project } from '~/types/data'

export const PROJECTS: Project[] = [
  {
    type: 'work',
    title: 'Sprin Boot PDF',
    imgSrc: '/static/images/momentgif.png',
    repo: 'cxhello/springboot-pdf',
    builtWith: ['Java'],
  },
  {
    type: 'self',
    title: 'cxhello.top',
    imgSrc: '/static/favicons/favicon.png',
    repo: 'cxhello/cxhello.top',
    builtWith: ['NextJS', 'TailwindCSS', 'Typescript', 'Drizzle', 'Umami'],
  },
  {
    type: 'self',
    title: 'SnapToGif',
    description: `SnapToGif is an intuitive tool that transforms your Live Photos into shareable GIF animations.`,
    imgSrc: '/static/images/momentgif.png',
    url: 'https://apps.apple.com/us/app/momentgif/id6739975261',
    builtWith: ['KoaJS', 'JWT', 'MongoDB', 'Polaris'],
    links: [
      { title: 'App Store', url: 'https://apps.apple.com/us/app/momentgif/id6739975261' }
    ],
  },
  {
    type: 'self',
    title: 'Recordify',
    description: `Recordify is a professional audio recording app with simple and elegant interface design and powerful features. Whether you want to record meetings, classroom notes, music creation or voice memos, it will perfectly meet your needs.`,
    imgSrc: '/static/images/recordify.png',
    url: 'https://apps.apple.com/us/app/recordify/id6739163362',
    builtWith: ['KoaJS', 'JWT', 'MongoDB', 'Polaris'],
    links: [
      { title: 'App Store', url: 'https://apps.apple.com/us/app/recordify/id6739163362' }
    ],
  },
  {
    type: 'self',
    title: 'AI Navigation',
    description: `AI Navigation - Selected Artificial Intelligence Tools Navigation.`,
    imgSrc: '/static/favicons/favicon.png',
    repo: 'cxhello/nav-site',
    url: 'https://ai-navigation.top',
    builtWith: ['NextJS', 'TailwindCSS', 'Typescript']
  },
  {
    type: 'self',
    title: 'AI Chat',
    description: `AI Chat - Selected Artificial Intelligence Tools Chat.`,
    imgSrc: '/static/favicons/favicon.png',
    repo: 'cxhello/chatbot',
    url: 'https://ai.cxhello.top',
    builtWith: ['NextJS', 'TailwindCSS', 'Typescript']
  }
]
