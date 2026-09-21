import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "평택에서 두피문신 알아보다 방문했는데, 라인을 먼저 그려 보여 주셔서 원하는 느낌에 가깝게 나왔습니다.",
    name: "김○○ 고객",
    course: "헤어라인 SMP",
  },
  {
    quote: "비전동 스튜디오 분위기가 깔끔하고, 교육 과정 설명이 체계적이어서 수강 결정이 수월했습니다.",
    name: "이○○ 수강생",
    course: "SMP 아카데미",
  },
  {
    quote: "시술 전후 관리 항목을 구체적으로 알려 주셔서, 회복 기간 동안 불안하지 않았습니다.",
    name: "박○○ 고객",
    course: "사후관리",
  },
  {
    quote: "정수리 밀도만 보완하고 싶었는데, 과하지 않게 범위를 잡아 주셔서 자연스럽습니다.",
    name: "최○○ 고객",
    course: "밀도 보완",
  },
  {
    quote: "평택·안성에서 오기 편한 위치이고, 시술과 교육 일정을 나눠 안내해 줘서 선택이 명확했습니다.",
    name: "정○○ 수강생",
    course: "교육 상담",
  },
  {
    quote: "카카오톡으로 사진과 상담 시간을 바로 잡아 주셔서 방문까지 편했습니다.",
    name: "한○○ 고객",
    course: "오픈채팅 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">TESTIMONIALS</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            평택두피문신 이용 후기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand} 평택점에서 시술·교육을 경험하신 분들의 이야기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name + r.course}
              className="rounded-[0.65rem] border border-[var(--line)] bg-white p-6 shadow-[0_4px_16px_rgba(20,24,32,0.04)]"
            >
              <p className="text-3xl leading-none text-[var(--coral)]">&ldquo;</p>
              <p className="mt-1 leading-relaxed text-[var(--ink)]">{r.quote}</p>
              <footer className="mt-4 border-t border-[var(--line)] pt-3">
                <p className="text-sm font-bold text-[var(--navy)]">{r.name}</p>
                <p className="text-xs text-[var(--coral)]">{r.course}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
