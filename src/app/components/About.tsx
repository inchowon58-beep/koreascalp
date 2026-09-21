import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const PROMISES = [
  {
    n: "01",
    title: "평택 비전동 프리미엄 스튜디오",
    desc: "경기 평택시 비전동에 위치한 전용 공간에서 두피문신 시술과 아카데미 교육을 함께 운영합니다. 1:1 맞춤 상담을 기본으로 합니다.",
  },
  {
    n: "02",
    title: "디자인 우선 접근",
    desc: "얼굴형·모발 밀도·탈모 패턴을 세밀히 분석한 뒤, 자연스러운 라인과 밀도를 설계합니다. 충분히 상담한 후 시술을 결정하셔도 됩니다.",
  },
  {
    n: "03",
    title: "검증된 기술력",
    desc: "국내·해외 SMP 마스터 과정과 보건·위생 교육을 이수한 원장이 평택점 시술과 교육을 직접 진행합니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative md:order-2">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(20,24,32,0.14)] md:aspect-[5/6]">
            <ImageSlot index={2} fill label={`${SITE.title} ${SITE.brand} 소개`} />
          </div>
        </div>
        <div className="md:order-1">
          <p className="section-kicker">PYEONGTAEK · VISION</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            평택에서 만나는
            <br />
            프리미엄 두피문신
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand} 평택점은 비전동에서 두피문신(SMP) 시술과 전문 교육을 함께 제공합니다.
            평택·안성·오산 등 경기 남부에서 방문하시는 분들을 위한 맞춤 상담을 진행합니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="border-l-[3px] border-[var(--coral)] bg-white px-5 py-4 shadow-[0_4px_16px_rgba(20,24,32,0.04)]"
              >
                <p className="text-xs font-bold tracking-[0.14em] text-[var(--coral-deep)]">
                  {p.n}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[var(--navy)]">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
