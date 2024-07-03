import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Egor Tarasov",
  description: "Personal Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Latest',
        items: [
          { text: 'Best Postman Alternative', link: '/articles/best-postman-alternative' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/astorDev' }
    ]
  }
})
