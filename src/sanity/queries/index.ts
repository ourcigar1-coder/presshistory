export const CARD_PROJECTION = `{
  _id,
  _type,
  title,
  "slug": slug.current,
  shortDescription,
  domain,
  "thumbnail": heroImage.asset->url
}`

export const HOME_ENTRIES_QUERY = `*[
  _type == "entry" && status == "published"
] | order(_createdAt asc) [0...3] ${CARD_PROJECTION}`

export const ENTRY_PAGE_QUERY = `*[
  _type == "entry" && slug.current == $slug && status == "published"
][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  introQuestion,
  content,
  "entryConnections": entryConnections[]->${CARD_PROJECTION}
}`

export const TECHNIQUE_PAGE_QUERY = `*[
  _type == "technique" && slug.current == $slug && status == "published"
][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  family,
  process,
  content,
  "relatedScience": relatedScience[]->${CARD_PROJECTION}
}`

export const SEARCH_QUERY = `*[
  status == "published" && (
    title match $searchQuery ||
    shortDescription match $searchQuery
  )
] | order(_updatedAt desc) [0...20] ${CARD_PROJECTION}`

export const ENTRY_SLUGS_QUERY = `*[_type == "entry" && status == "published"] { "slug": slug.current }`
export const TECHNIQUE_SLUGS_QUERY = `*[_type == "technique" && status == "published"] { "slug": slug.current }`
