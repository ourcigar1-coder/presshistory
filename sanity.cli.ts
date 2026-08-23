import { defineCliConfig } from 'sanity/cli'
import { sanityConfig } from './src/sanity/env'

export default defineCliConfig({
  api: sanityConfig,
})
