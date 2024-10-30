// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: "%s - AI·Joe",
            title: "AI·Joe，辅助工作流",
            charset: "utf-8",
            htmlAttrs: {
                lang: "zh-cn"
            },
            meta: [
                { name: "description", content: "AI·Joe，人工智能助手，辅助工作流。它是基于多个语言模型和开发框架， 比如：Openai API、Google Gemini、Google PaLM2 Chat、Meta Llama、Yi 34B Chat、Midjourney、Stable Diffusion、LangChain等。致力于打造优秀的人工智能助手和自动化的工作流程。" },
                { name: "keywords", content: "AI·Joe，辅助工作流，人工智能，OpenAI，ChatGPT，Google Gemini，Midjourney，Stable Diffusion，LangChain， Nuxt " },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]
        }
    },
    modules: [
        "@huntersofbook/naive-ui-nuxt",
        '@unocss/nuxt',
    ],
    devtools: { enabled: false }
    
})
