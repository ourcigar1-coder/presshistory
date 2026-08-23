import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local file
const envPath = path.join(__dirname, '..', '.env.local')
dotenv.config({ path: envPath })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables:')
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID:', projectId ? '✓' : '✗')
  console.error('NEXT_PUBLIC_SANITY_DATASET:', dataset ? '✓' : '✗')
  console.error('SANITY_API_WRITE_TOKEN:', token ? '✓' : '✗')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function importFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)
    
    if (data.operation !== 'create') {
      console.log(`Skipping ${path.basename(filePath)}: not a create operation`)
      return
    }

    const result = await client.create(data.document)
    console.log(`✓ Created ${data.type}: ${result._id}`)
  } catch (error) {
    console.error(`✗ Error importing ${path.basename(filePath)}:`, error)
  }
}

async function main() {
  const dataDir = path.join(__dirname, '../sanity-data')
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
  
  console.log(`Found ${files.length} JSON files in ${dataDir}\n`)
  
  for (const file of files) {
    await importFile(path.join(dataDir, file))
  }
  
  console.log('\nImport completed')
}

main()
