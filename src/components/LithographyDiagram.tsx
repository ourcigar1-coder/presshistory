'use client'

import { useState } from 'react'

export function LithographyDiagram() {
  const [water, setWater] = useState(true)
  const [ink, setInk] = useState(true)

  return (
    <div className="border-y border-[var(--line)] py-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--coral)]">Interactive diagram</p>
          <h3 className="mt-2 font-display text-3xl font-semibold">물과 잉크는 자리를 나눈다</h3>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setWater((value) => !value)} aria-pressed={water} className={`border px-3 py-2 text-sm font-bold transition-colors ${water ? 'border-[#477580] bg-[#477580] text-[var(--paper)]' : 'border-[var(--line)] text-[var(--muted)]'}`}>물 {water ? '켜짐' : '꺼짐'}</button>
          <button type="button" onClick={() => setInk((value) => !value)} aria-pressed={ink} className={`border px-3 py-2 text-sm font-bold transition-colors ${ink ? 'border-[var(--coral)] bg-[var(--coral)] text-[var(--paper)]' : 'border-[var(--line)] text-[var(--muted)]'}`}>잉크 {ink ? '켜짐' : '꺼짐'}</button>
        </div>
      </div>
      <div className="lithography-stage" aria-live="polite">
        <div className={`lithography-stone ${water ? 'has-water' : ''}`}>
          <span className="lithography-mark" />
          {ink && <span className="lithography-ink" />}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{water && ink ? '물은 빈 표면에, 잉크는 기름성 이미지에 머뭅니다.' : water ? '물이 표면을 적시지만, 이미지가 드러나지 않습니다.' : ink ? '잉크가 퍼지지만 물이 자리를 나누지 못합니다.' : '두 물질의 선택이 사라져 아무것도 전사되지 않습니다.'}</p>
    </div>
  )
}
