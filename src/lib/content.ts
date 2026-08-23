export type ContentCard = {
  _id: string
  _type: string
  title: string
  slug: string
  shortDescription: string
  domain: string
}

export type EntryContent = ContentCard & {
  introQuestion: string
  steps: Array<{
    title: string
    description: string
    href: string
    label: string
  }>
}

export type TechniqueContent = ContentCard & {
  family: string
  process: Array<{
    step: number
    title: string
    description: string
  }>
  relatedScience: ContentCard[]
}

export type ArtworkContent = ContentCard & {
  artist: string
  year: string
  technique: ContentCard
  materials: string[]
  whyItMatters: string
}

export type StoryContent = ContentCard & {
  question: string
  shortAnswer: string
  body: string
  related: ContentCard[]
}

export type BridgeContent = ContentCard & {
  introQuestion: string
  steps: Array<{
    title: string
    relationNature: 'historical' | 'conceptual'
    description: string
  }>
}

const science: ContentCard = {
  _id: 'science-surface-chemistry',
  _type: 'scienceConcept',
  title: '표면화학',
  slug: 'surface-chemistry',
  shortDescription: '서로 다른 표면이 물질을 선택하는 방식',
  domain: '과학',
}

export const entries: Record<string, EntryContent> = {
  'time-journey': {
    _id: 'entry-time-journey',
    _type: 'entry',
    title: '시간을 따라가기',
    slug: 'time-journey',
    shortDescription: '목판에서 에칭, 석판, 빛과 패터닝까지',
    domain: '역사',
    introQuestion: '같은 생각은 어떻게 더 멀리, 더 정확하게 복제되었을까?',
    steps: [
      { title: '목판화', description: '나무의 평평한 면에 남긴 첫 번째 반복의 기술', href: '/techniques/woodblock', label: '기법' },
      { title: '에칭과 아쿼틴트', description: '산이 금속 위에 선과 명암을 새기는 방식', href: '/techniques/etching', label: '기법' },
      { title: '석판화', description: '물과 기름의 반발을 이용해 평면에서 인쇄하다', href: '/techniques/lithography', label: '기법' },
      { title: '패터닝', description: '빛으로 선택하고 제거하는 현대의 표면 기술', href: '/bridge/patterning', label: '브리지' },
    ],
  },
  'object-journey': {
    _id: 'entry-object-journey',
    _type: 'entry',
    title: '물건에서 시작하기',
    slug: 'object-journey',
    shortDescription: '스마트폰을 분해하면 과거의 판화가 보인다',
    domain: '기술',
    introQuestion: '손안의 물건에는 어떤 오래된 복제의 기술이 숨어 있을까?',
    steps: [
      { title: '스마트폰', description: '매일 만지는 물건에서 탐험을 시작한다', href: '/bridge/patterning', label: '출발' },
      { title: '회로와 패턴', description: '복잡한 회로를 작은 표면에 옮기는 문제', href: '/bridge/patterning', label: '개념' },
      { title: '선택적 제거', description: '남길 곳과 없앨 곳을 구분하는 공정', href: '/science/surface-chemistry', label: '과학' },
    ],
  },
}

export const techniques: Record<string, TechniqueContent> = {
  woodblock: {
    _id: 'technique-woodblock', _type: 'technique', title: '목판화', slug: 'woodblock',
    shortDescription: '나무에 남긴 면이 종이에 반복되는 부조 인쇄', domain: '기법', family: 'Relief',
    process: [
      { step: 1, title: '새길 면을 남긴다', description: '이미지의 검은 면을 나무 표면에 남기고 나머지를 파낸다.' },
      { step: 2, title: '잉크를 올린다', description: '높은 면에만 잉크가 닿도록 고르게 문지른다.' },
      { step: 3, title: '압력으로 옮긴다', description: '종이와 판을 맞대고 압력을 가해 이미지를 복제한다.' },
    ],
    relatedScience: [{ ...science, title: '압력과 접촉 전사', slug: 'contact-transfer', shortDescription: '맞닿은 표면 사이에서 이미지가 이동하는 원리' }],
  },
  etching: {
    _id: 'technique-etching', _type: 'technique', title: '에칭과 아쿼틴트', slug: 'etching',
    shortDescription: '산이 금속판 위에 선과 명암을 새기는 기법', domain: '기법', family: 'Intaglio',
    process: [
      { step: 1, title: '판을 막는다', description: '금속판에 산이 닿지 않도록 내산성 바탕을 입힌다.' },
      { step: 2, title: '선을 그린다', description: '바탕을 긁어 금속 표면을 드러내면 산이 지나갈 길이 열린다.' },
      { step: 3, title: '산이 선을 판다', description: '산이 드러난 금속을 부식시키고 깊이를 만든다.' },
    ],
    relatedScience: [{ ...science, title: '금속 부식', slug: 'metal-corrosion', shortDescription: '산화와 반응이 표면을 선택적으로 바꾸는 원리' }],
  },
  lithography: {
    _id: 'technique-lithography', _type: 'technique', title: '석판화', slug: 'lithography',
    shortDescription: '물과 기름의 반발로 평평한 돌에서 이미지를 인쇄하다', domain: '기법', family: 'Planographic',
    process: [
      { step: 1, title: '기름으로 그린다', description: '석회석 표면에 기름 성분의 이미지와 글을 그린다.' },
      { step: 2, title: '물을 머금는다', description: '처리된 돌의 빈 곳은 물을 머금고 이미지 부분은 잉크를 받아들인다.' },
      { step: 3, title: '한 장씩 누른다', description: '물과 잉크가 선택된 표면에서만 만나는 순간을 종이에 전사한다.' },
    ],
    relatedScience: [{ ...science, title: '친수성과 친유성', slug: 'surface-chemistry', shortDescription: '물과 기름을 선택적으로 끌어당기는 표면의 성질' }],
  },
}

export const artworks: Record<string, ArtworkContent> = {
  hokusai: {
    _id: 'artwork-hokusai', _type: 'artwork', title: '가나가와 해변의 높은 파도 아래', slug: 'hokusai',
    shortDescription: '한 장의 이미지가 바다를 건너 대중의 시선을 바꾼 순간', domain: '작품', artist: '가쓰시카 호쿠사이', year: '1830–1832',
    technique: techniques.woodblock, materials: ['목판', '종이', '프러시안 블루'],
    whyItMatters: '이 작품은 정교한 다색 목판 인쇄가 이미지를 대량으로, 멀리, 반복해서 이동시킬 수 있었음을 보여줍니다.',
  },
  goya: {
    _id: 'artwork-goya', _type: 'artwork', title: '이성이 잠들면 괴물이 깨어난다', slug: 'goya',
    shortDescription: '에칭과 아쿼틴트로 시대의 불안을 검은 잠 속에 새기다', domain: '작품', artist: '프란시스코 고야', year: '1799',
    technique: techniques.etching, materials: ['동판', '산', '잉크'],
    whyItMatters: '판화는 하나의 귀한 원본이 아니라, 불안한 생각을 여러 사람에게 동시에 전하는 매체가 되었습니다.',
  },
  'toulouse-lautrec': {
    _id: 'artwork-toulouse-lautrec', _type: 'artwork', title: 'Moulin Rouge: La Goulue', slug: 'toulouse-lautrec',
    shortDescription: '석판화 포스터가 밤의 도시를 점령한 방식', domain: '작품', artist: '앙리 드 툴루즈 로트렉', year: '1891',
    technique: techniques.lithography, materials: ['석회석', '종이', '안료'],
    whyItMatters: '석판화는 예술 작품을 갤러리 밖으로 끌어내 거리와 상점, 사람들의 일상에 놓았습니다.',
  },
}

export const stories: Record<string, StoryContent> = {
  'why-woodblock': {
    _id: 'story-why-woodblock', _type: 'story', title: '불교는 왜 목판 인쇄를 필요로 했을까?', slug: 'why-woodblock',
    shortDescription: '반복되는 문장이 신앙을 넓히는 방법', domain: '역사',
    question: '한 번의 필사로 충분하지 않았던 이유는 무엇이었을까?',
    shortAnswer: '경전은 더 많은 사람과 장소에 도착해야 했고, 목판은 같은 문장을 안정적으로 반복하는 방법을 제공했습니다.',
    body: '목판 인쇄의 힘은 새롭고 화려한 이미지를 만드는 데만 있지 않았습니다. 이미 정해진 문장을 훼손 없이 반복하고, 한 장소의 지식을 다른 장소로 옮기는 데 있었습니다. 복제는 신앙을 넓히는 사회적 기술이 되었습니다.',
    related: [techniques.woodblock, artworks.hokusai],
  },
  'why-acid-draws': {
    _id: 'story-why-acid-draws', _type: 'story', title: '왜 에칭에서는 산이 그림을 그리는가?', slug: 'why-acid-draws',
    shortDescription: '손의 선을 화학 반응의 깊이로 바꾸는 공정', domain: '과학',
    question: '금속판 위의 선은 어떻게 깊은 홈이 되었을까?',
    shortAnswer: '작가가 드러낸 금속만 산과 반응하도록 만들면, 화학 반응이 손의 선을 판의 깊이로 바꿉니다.',
    body: '에칭은 작가의 손과 산의 반응을 나눠 갖습니다. 손은 어디를 열지 결정하고, 산은 열린 선을 따라 금속을 파냅니다. 이 협업 덕분에 선은 잉크를 머금는 깊이가 됩니다.',
    related: [techniques.etching, { ...science, title: '금속 부식', slug: 'metal-corrosion' }],
  },
  'why-gum-arabic': {
    _id: 'story-why-gum-arabic', _type: 'story', title: '아라비아고무는 왜 물을 좋아할까?', slug: 'why-gum-arabic',
    shortDescription: '석판화의 보이지 않는 표면을 다루는 재료 이야기', domain: '재료',
    question: '물과 기름이 한 돌 위에서 자리를 나눌 수 있었던 이유는?',
    shortAnswer: '아라비아고무는 돌의 빈 표면이 물을 머금도록 도와 이미지와 비이미지 영역을 나눕니다.',
    body: '재료는 단순한 도구가 아니라 공정의 논리를 만듭니다. 아라비아고무가 표면에 남긴 친수성은 잉크가 머물 자리와 물이 머물 자리를 분리해 한 장의 이미지를 가능하게 합니다.',
    related: [techniques.lithography, { ...science, title: '표면화학', slug: 'surface-chemistry' }],
  },
}

export const bridges: Record<string, BridgeContent> = {
  patterning: {
    _id: 'bridge-patterning', _type: 'bridge', title: '새기는 것에서 패터닝으로', slug: 'patterning',
    shortDescription: '판화의 선택과 제거가 현대 기술의 표면으로 이동한 경로', domain: '기술',
    introQuestion: '판화의 오래된 문제는 어떻게 반도체의 표면에 도착했을까?',
    steps: [
      { title: '판화', relationNature: 'conceptual', description: '남길 곳과 없앨 곳을 나누어 이미지를 만든다.' },
      { title: '사진제판', relationNature: 'historical', description: '빛과 감광 재료로 이미지를 금속판에 옮긴다.' },
      { title: 'PCB', relationNature: 'conceptual', description: '회로가 지나갈 길만 남기고 나머지 구리를 제거한다.' },
      { title: '포토리소그래피', relationNature: 'conceptual', description: '빛으로 선택한 표면만 화학적으로 반응시킨다.' },
      { title: '반도체', relationNature: 'conceptual', description: '아주 작은 표면 위에 반복 가능한 패턴을 쌓는다.' },
    ],
  },
}
