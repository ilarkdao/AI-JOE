import { setup } from '@css-render/vue3-ssr';
 
export default defineNuxtPlugin((nuxtApp) => {
    if (process.server && nuxtApp.ssrContext) {
        const { collect } = setup(nuxtApp.vueApp || {});
        
        // @ts-ignore
        const originalRender = nuxtApp.ssrContext.renderMeta?.bind(nuxtApp.ssrContext) || (() => ({}));
        
        nuxtApp.ssrContext.renderMeta = () => {
            // @ts-ignore
            const result = originalRender();
            // @ts-ignore
            const headTags = result?.headTags || "";
            
            return {
                headTags: headTags + collect()
            };
        };
    }
});