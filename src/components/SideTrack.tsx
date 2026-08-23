'use client'

import { useEffect, useState } from 'react'

export function SideTrack({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="mt-8 inline-flex border-b border-[var(--ink)] pb-1 text-sm font-bold hover:text-[var(--coral)]">
        {title} 더 알아보기 →
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(32,37,34,0.35)]" role="presentation" onClick={() => setOpen(false)}>
          <aside className="h-full w-full max-w-md overflow-y-auto bg-[var(--paper)] p-7 shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-5 border-b border-[var(--line)] pb-5">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--coral)]">Side-track</p><h2 className="mt-2 font-display text-3xl font-semibold">{title}</h2></div>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]" aria-label="보충 설명 닫기">닫기</button>
            </div>
            <div className="pt-7 text-base leading-8 text-[var(--muted)]">{children}</div>
          </aside>
        </div>
      )}
    </>
  )
}
