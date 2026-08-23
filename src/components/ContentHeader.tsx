import Link from 'next/link'

export function ContentHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="border-b border-[var(--line)] pb-10">
      <Link href="/" className="text-sm font-bold text-[var(--coral)] hover:underline">복제의 문명 /</Link>
      <p className="mt-12 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-display text-6xl font-semibold leading-[0.9] sm:text-8xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p>
    </header>
  )
}
