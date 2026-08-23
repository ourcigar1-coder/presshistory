import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { techniques } from '@/lib/content'
import { NodeTracker } from '@/components/NodeTracker'

const concepts = {
  'contact-transfer': {
    title: '압력과 접촉 전사',
    description: '두 표면이 맞닿을 때 이미지와 물질이 한쪽에서 다른 쪽으로 이동하는 원리',
    explanation: '인쇄는 단순히 잉크를 바르는 일이 아닙니다. 판과 종이가 만나는 면, 가해지는 압력, 잉크의 점도가 함께 전사의 결과를 결정합니다.',
  },
  'metal-corrosion': {
    title: '금속 부식',
    description: '산화와 화학 반응이 금속 표면을 선택적으로 바꾸는 과정',
    explanation: '에칭에서는 보호된 부분과 드러난 부분의 차이가 깊이가 됩니다. 산은 금속을 무작위로 없애는 것이 아니라 열린 선을 따라 표면을 바꿉니다.',
  },
  'surface-chemistry': {
    title: '표면화학',
    description: '서로 다른 표면이 물질을 선택하는 방식',
    explanation: '석판화의 핵심은 평평한 돌 위에서 물과 기름이 서로 다른 자리를 선택하는 일입니다. 보이지 않는 표면의 성질이 선명한 이미지가 되는 순간입니다.',
  },
} as const

export function generateStaticParams() {
  return Object.keys(concepts).map((slug) => ({ slug }))
}

export default async function SciencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const concept = concepts[slug as keyof typeof concepts]
  if (!concept) notFound()

  const relatedTechnique = Object.values(techniques).find((technique) => technique.relatedScience.some((item) => item.slug === slug))

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <NodeTracker id={`science-${slug}`} type="science" title={concept.title} slug={slug} />
      <ContentHeader eyebrow="Science concept" title={concept.title} description={concept.description} />
      <section className="grid gap-12 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Why it matters</p>
        <div>
          <p className="max-w-2xl text-2xl leading-10">{concept.explanation}</p>
          {relatedTechnique && <p className="mt-10 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)]">이 원리를 사용하는 기법: {relatedTechnique.title}</p>}
        </div>
      </section>
    </main>
  )
}
