import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Egor Tarasov's Blog",
  description: "Personal Site",
  head: [
    ['link', { rel: 'icon', href: '/favicon-vitepress.png' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: 'auto'
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/astorDev' }
    ]
  }
})
