import { defineConfig } from 'vitepress'
import { default as articlesLoader } from '../articles.data'

var sidebar = await articlesLoader.load().then(loaded => loaded.map((item) => {
  return {
    text: item.frontmatter.title,
    link: item.url,
  }
}));

export default defineConfig({
  title: "Egor Tarasov's Blog",
  description: "Personal Site",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/astorDev' }
    ]
  }
})
