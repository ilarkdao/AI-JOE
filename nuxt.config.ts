// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: "%s - AI·Joe",
            title: "AI·Joe，如影似人",
            charset: "utf-8",
            htmlAttrs: {
                lang: "zh-cn"
            },
            meta: [
                { name: "description", content: "AI·Joe，随手可用的智能助手，如影似人。它是基于多个语言模型和开发框架，比如：Openai API、Stable Diffusion、LangChain等。致力于打造优秀的人工智能助手和自动化的工作流程。它开箱即用，对具体的应用场景和参数都做了调优。在不断升级的过程中，将迎来更加智能化的未来！" },
                { name: "keywords", content: "AI·Joe，如影似人，人工智能，OpenAI，ChatGPT，Stable Diffusion， Nuxt " },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]
        }
    },
    modules: [
        "@huntersofbook/naive-ui-nuxt",
        '@unocss/nuxt',
    ]
    
})
