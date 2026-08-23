import Link from 'next/link'
import type { EntryContent } from '@/lib/content'

export function PathList({ steps }: { steps: EntryContent['steps'] }) {
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {steps.map((step, index) => (
        <Link key={step.href + step.title} href={step.href} className="group grid gap-5 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
          <span className="text-sm font-bold text-[var(--coral)]">0{index + 1}</span>
          <span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{step.label}</span>
            <span className="mt-1 block font-display text-3xl font-semibold">{step.title}</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{step.description}</span>
          </span>
          <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
      ))}
    </div>
  )
}
