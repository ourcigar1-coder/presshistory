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
