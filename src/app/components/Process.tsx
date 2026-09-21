import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "상담 예약",
    desc: "카카오톡 또는 문의 폼으로 평택 비전동 스튜디오 방문 일정을 잡습니다.",
  },
  {
    n: "2",
    title: "디자인 설계",
    desc: "두피 상태와 원하는 라인을 확인하고, 시술 범위·횟수·밀도를 함께 정합니다.",
  },
  {
    n: "3",
    title: "맞춤 SMP 시술",
    desc: "설계된 디자인에 따라 헤어라인·정수리·밀도 보완 시술을 진행합니다.",
  },
  {
    n: "4",
    title: "관리·교육 안내",
    desc: "사후관리 가이드를 전달하고, 아카데미 과정 문의 시 커리큘럼을 안내합니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">CONSULTATION FLOW</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            평택두피문신 상담 흐름
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand} 평택점은 모든 시술과 교육을 상담부터 시작합니다. 비전동 스튜디오에서
            편하게 문의해 주세요.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--coral)] bg-[var(--navy)] text-xl font-bold text-[#d4bc7a]">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--navy)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
