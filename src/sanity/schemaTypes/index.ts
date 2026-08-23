import { defineField, defineType } from 'sanity'

const statusField = defineField({
  name: 'status',
  title: 'Publishing status',
  type: 'string',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'Ready', value: 'ready' },
      { title: 'Published', value: 'published' },
    ],
  },
  initialValue: 'draft',
  validation: (Rule) => Rule.required(),
})

const sourceField = defineField({
  name: 'sources',
  title: 'Sources',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'source' }] }],
})

const baseFields = [
  defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
  defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
  defineField({ name: 'shortDescription', title: 'Short description', type: 'text', rows: 3 }),
  defineField({ name: 'domain', type: 'string' }),
  statusField,
  sourceField,
]

const contentField = defineField({
  name: 'content',
  type: 'array',
  of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
})

export const entry = defineType({
  name: 'entry', title: 'Entry', type: 'document',
  fields: [...baseFields, defineField({ name: 'introQuestion', type: 'string' }), contentField, defineField({ name: 'entryConnections', type: 'array', of: [{ type: 'reference', to: [{ type: 'technique' }, { type: 'artwork' }, { type: 'story' }, { type: 'scienceConcept' }, { type: 'bridge' }] }] })],
})

export const technique = defineType({
  name: 'technique', title: 'Technique', type: 'document',
  fields: [...baseFields, defineField({ name: 'family', type: 'string' }), defineField({ name: 'process', type: 'array', of: [{ type: 'object', fields: [defineField({ name: 'step', type: 'number' }), defineField({ name: 'title', type: 'string' }), defineField({ name: 'description', type: 'text' })] }] }), defineField({ name: 'relatedScience', type: 'array', of: [{ type: 'reference', to: [{ type: 'scienceConcept' }] }] }), contentField],
})

export const artwork = defineType({
  name: 'artwork', title: 'Artwork', type: 'document',
  fields: [...baseFields, defineField({ name: 'artist', type: 'string' }), defineField({ name: 'year', type: 'string' }), defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }), defineField({ name: 'technique', type: 'reference', to: [{ type: 'technique' }] }), defineField({ name: 'materials', type: 'array', of: [{ type: 'reference', to: [{ type: 'material' }] }] }), contentField],
})

export const story = defineType({
  name: 'story', title: 'Story', type: 'document',
  fields: [...baseFields, defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }), defineField({ name: 'shortAnswer', type: 'text', rows: 3 }), contentField],
})

export const term = defineType({
  name: 'term', title: 'Term', type: 'document',
  fields: [...baseFields, defineField({ name: 'originalLanguage', type: 'string' }), defineField({ name: 'etymology', type: 'text', rows: 3 }), defineField({ name: 'definition', type: 'text', rows: 4 }), defineField({ name: 'relatedTerms', type: 'array', of: [{ type: 'reference', to: [{ type: 'term' }] }] })],
})

export const scienceConcept = defineType({
  name: 'scienceConcept', title: 'Science concept', type: 'document',
  fields: [...baseFields, defineField({ name: 'oneSentence', type: 'string' }), defineField({ name: 'principle', type: 'text', rows: 5 }), defineField({ name: 'relatedMaterials', type: 'array', of: [{ type: 'reference', to: [{ type: 'material' }] }] }), defineField({ name: 'relatedTechniques', type: 'array', of: [{ type: 'reference', to: [{ type: 'technique' }] }] }), contentField],
})

export const bridge = defineType({
  name: 'bridge', title: 'Patterning bridge', type: 'document',
  fields: [...baseFields, defineField({ name: 'introQuestion', type: 'string' }), defineField({ name: 'steps', type: 'array', of: [{ type: 'object', fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'relationNature', type: 'string', options: { list: ['historical', 'conceptual'] } }), defineField({ name: 'description', type: 'text' })] }] }), contentField],
})

export const material = defineType({
  name: 'material', title: 'Material', type: 'document',
  fields: [defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }), defineField({ name: 'alternateNames', type: 'array', of: [{ type: 'string' }] }), defineField({ name: 'simpleDescription', type: 'text', rows: 3 }), sourceField],
})

export const source = defineType({
  name: 'source', title: 'Source', type: 'document',
  fields: [defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }), defineField({ name: 'institution', type: 'string' }), defineField({ name: 'url', type: 'url' }), defineField({ name: 'accessedAt', type: 'date' }), defineField({ name: 'notes', type: 'text' })],
})

export const schemaTypes = [entry, technique, artwork, story, term, scienceConcept, bridge, material, source]
