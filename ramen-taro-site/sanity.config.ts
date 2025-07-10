import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'ramen-taro-site',
  title: 'らーめん太郎公式サイト',

  projectId: '0d5afprf',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})