'use client'

import { useState } from 'react'

export function RegistrationDiagram() {
  const [offset, setOffset] = useState(0)
  const aligned = offset === 0

  return (
    <div className="border-y border-[var(--line)] py-7">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--coral)]">Interactive diagram</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
        <h3 className="font-display text-3xl font-semibold">여러 색판은 어떻게 만날까?</h3>
        <output className="text-sm font-bold text-[var(--muted)]">오차 {Math.abs(offset)}px</output>
      </div>
      <label className="mt-7 block text-sm font-semibold" htmlFor="registration-offset">빨간 색판 이동</label>
      <input id="registration-offset" type="range" min="-30" max="30" value={offset} onChange={(event) => setOffset(Number(event.target.value))} className="mt-3 w-full accent-[var(--coral)]" />
      <div className="registration-stage" aria-live="polite">
        <div className="registration-mark registration-blue" />
        <div className="registration-mark registration-red" style={{ transform: `translateX(${offset}px)` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{aligned ? '두 색판이 정확히 포개졌습니다.' : '색판이 어긋나면 이미지의 가장자리에 다른 색이 드러납니다.'}</p>
    </div>
  )
}
