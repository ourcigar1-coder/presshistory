import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { RelatedLinks } from '@/components/RelatedLinks'
import { techniques } from '@/lib/content'
import { NodeTracker } from '@/components/NodeTracker'

const terms = {
  lithography: { title: 'Lithography', description: '돌 위에 쓰는다는 뜻에서 출발한 평면 인쇄의 이름', originalLanguage: '그리스어 lithos + graphein', definition: '물과 기름이 서로 다른 표면을 선택한다는 성질을 이용하는 인쇄 기법' },
  registration: { title: 'Registration', description: '여러 색판이 정확히 만나는 자리', originalLanguage: '라틴어 regestum, 기록하다', definition: '색이나 판을 정해진 위치에 맞춰 인쇄하는 정렬 과정' },
  intaglio: { title: 'Intaglio', description: '잉크가 파인 곳에 머무는 오목판 인쇄', originalLanguage: '이탈리아어 intagliare, 새기다', definition: '판의 오목한 홈에 잉크를 채워 종이에 옮기는 방식' },
  aquatint: { title: 'Aquatint', description: '물빛처럼 넓은 명암을 만드는 에칭 기법', originalLanguage: '라틴어 aqua + 이탈리아어 tinta', definition: '미세한 점의 망을 부식해 연속적인 색조를 만드는 방법' },
} as const

export function generateStaticParams() { return Object.keys(terms).map((slug) => ({ slug })) }

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = terms[slug as keyof typeof terms]
  if (!term) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <NodeTracker id={`term-${slug}`} type="term" title={term.title} slug={slug} />
      <ContentHeader eyebrow="Term / language" title={term.title} description={term.description} />
      <section className="grid gap-12 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Where the name comes from</p><p className="mt-5 font-display text-3xl font-semibold leading-tight">{term.originalLanguage}</p></div>
        <div><p className="text-2xl leading-10">{term.definition}</p><div className="mt-10 border-t border-[var(--line)] pt-5"><p className="text-sm text-[var(--muted)]">Related technique</p><RelatedLinks items={[techniques.lithography]} /></div></div>
      </section>
    </main>
  )
}
