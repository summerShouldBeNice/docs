import {defineConfig} from 'vitepress'

export default defineConfig({
    title: "warmwind docs.",
    description: "warmwind docs.",
    themeConfig: {
        logo: '/logo.png',
        nav: [
            {text: 'Home', link: '/'},
            {
                text: 'bug合集', items: [
                    {text: '开发bug', link: '/views/bug/develop-bug.md'},
                ]
            },
            {
                text: '笔记', items: [
                    {text: 'mac', link: '/views/notes/mac-note.md'},
                    {text: 'java', link: '/views/notes/java-note.md'},
                    {text: 'elasticsearch', link: '/views/notes/es-note.md'},
                ]
            },
            {
                text: '项目文档', items: [
                    {text: 'starter', link: '/starter'},
                    {text: 'utils', link: '/starter'},
                ]
            },
            {
                text: '学习笔记', items: [
                    {text: 'spring security', link: '/study/spring-security.md'},
                ]
            },
            {
                text: '开发文档', items: [
                    {text: 'java', link: '/develop/java-note.md'},
                    {text: 'mysql', link: '/develop'},
                    {text: 'vue', link: '/develop'},
                    {text: 'bug', link: '/develop/bug.md'},
                    {text: '调优', link: '/develop/tuning.md'},
                ]
            },
            {
                text: '运维文档', items: [
                    {text: 'shell命令', link: '/deploy/shell'},
                    {text: '服务器环境部署', link: '/deploy/binary-deploy'},
                    {text: '基础知识', link: '/deploy/base'},
                ]
            }
        ],

        sidebar: [
            // {
            //     text: 'Examples',
            //     items: [
            //         {text: 'Markdown Examples', link: '/markdown-examples'},
            //         {text: 'Runtime API Examples', link: '/api-examples'}
            //     ]
            // }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/summerShouldBeNice'}
        ],

        footer: {
            copyright: "Copyright © 2024 warmwind."
        }
    },
    markdown: {
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详细信息'
        }
    }
})
