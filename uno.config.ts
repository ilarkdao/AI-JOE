// uno.config.ts
import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, presetWebFonts,
    transformerDirectives, transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    rules: [
      //
    ],
    shortcuts: {
      'containerX': 'w-[95%] mx-auto text-4.4 lg:w-[85%]',
      'subContainer': 'w-full mx-auto text-3.6 lg:w-[65%]',
      'textBox': 'shadow-sm shadow-slate rounded-4 px-4 py-2 mb-4'
    },
    theme: {
      colors: {
        // ...
      }
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        fonts: {
          // ...
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })