import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { sanityConfig } from './src/sanity/env'

export default defineConfig({
  name: 'presshistory',
  title: '복제의 문명',
  basePath: '/studio',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
