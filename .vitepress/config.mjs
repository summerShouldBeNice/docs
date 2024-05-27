import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "warmwind docs.",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: '项目文档', items: [
          { text: 'starter', link: '/starter' },
          { text: 'utils', link: '/starter' },
        ] },
      { text: '开发文档', items: [
          { text: 'java', link: '/develop' },
          { text: 'mysql', link: '/develop' },
          { text: 'vue', link: '/develop' },
        ] },
      { text: '运维文档', items: [
          { text: 'shell命令', link: '/deploy/shell' },
          { text: '服务器环境部署', link: '/develop' },
          { text: '基础知识', link: '/deploy/base' },
        ] }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: "Copyright © 2024 warmwind."
    }
  }
})
