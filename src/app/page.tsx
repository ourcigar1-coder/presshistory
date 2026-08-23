import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
          복제의 문명
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold text-[var(--muted)]">
          <Link href="/entries/time-journey" className="transition-colors hover:text-[var(--ink)]">
            여정
          </Link>
          <Link href="/search" className="transition-colors hover:text-[var(--ink)]">
            검색
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-28 lg:pt-16">
          <div className="animate-rise">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[var(--coral)]">A knowledge atlas of making</p>
            <h1 className="max-w-4xl font-display text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.03em]">
              생각은<br />
              어떻게<br />
              <span className="text-[var(--coral)]">멀어졌을까?</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-8 text-[var(--muted)]">
              판화에서 반도체까지. 하나의 작품과 기술에서 출발해 재료, 과학, 역사와 산업이 이어지는 경로를 따라가 보세요.
            </p>
          </div>

          <div className="animate-rise-delay relative">
            <div className="print-field" aria-hidden="true">
              <span className="print-ring print-ring-one" />
              <span className="print-ring print-ring-two" />
              <span className="print-line print-line-one" />
              <span className="print-line print-line-two" />
              <span className="print-dot print-dot-one" />
              <span className="print-dot print-dot-two" />
            </div>
            <p className="relative mt-4 max-w-xs text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-[var(--muted)]">
              Every impression<br />leaves a route behind
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Start anywhere</p>
                <h2 className="font-display text-5xl font-semibold leading-none">두 개의 입구</h2>
              </div>
              <span className="hidden text-sm text-[var(--muted)] sm:block">01 — 02</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/entries/time-journey" className="path-card group">
                <span className="path-number">01</span>
                <div>
                  <h3 className="font-display text-4xl font-semibold">시간을 따라가기</h3>
                  <p className="mt-3 text-[var(--muted)]">목판에서 에칭, 석판, 빛과 패터닝까지</p>
                </div>
                <span className="path-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link href="/entries/object-journey" className="path-card group">
                <span className="path-number">02</span>
                <div>
                  <h3 className="font-display text-4xl font-semibold">물건에서 시작하기</h3>
                  <p className="mt-3 text-[var(--muted)]">스마트폰을 분해하면 과거의 판화가 보인다</p>
                </div>
                <span className="path-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
