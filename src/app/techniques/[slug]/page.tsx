import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { techniques } from '@/lib/content'

export function generateStaticParams() {
  return Object.keys(techniques).map((slug) => ({ slug }))
}

export default async function TechniquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const technique = techniques[slug]

  if (!technique) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <ContentHeader eyebrow={`Technique / ${technique.family}`} title={technique.title} description={technique.shortDescription} />
      <section className="grid gap-12 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">How it works</p>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">이 기법은 표면을 선택하고, 압력과 물질의 성질을 이용해 하나의 이미지를 여러 장으로 옮깁니다.</p>
          <Link href={`/science/${technique.relatedScience[0].slug}`} className="mt-8 inline-flex border-b border-[var(--ink)] pb-1 text-sm font-bold hover:text-[var(--coral)]">
            {technique.relatedScience[0].title} 알아보기 →
          </Link>
        </div>
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Process</p>
          <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {technique.process.map((step) => (
              <li key={step.step} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-3xl font-semibold text-[var(--coral)]">{String(step.step).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-display text-3xl font-semibold">{step.title}</h2>
                  <p className="mt-2 leading-7 text-[var(--muted)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
