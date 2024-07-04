import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Egor Tarasov's Blog",
  description: "Personal Site",
  head: [
    ['link', { rel: 'icon', href: '/favicon-vitepress.png' }]
  ],
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: 'auto'
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/astorDev' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/astordev/' }
    ]
  }
})
