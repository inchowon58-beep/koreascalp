const GROUPS = [
  {
    title: "현장 경력",
    items: ["Gil Hair Beauty 근무", "AMOS Professional 근무", "Richard ProHair 근무"],
  },
  {
    title: "미용·교육 자격",
    items: [
      "네일아티스트 2급",
      "발관리사 2급",
      "AMOS COLOR INTENTIVE COURSE 수료",
      "미용대학 미용학과 졸업(헤어전공)",
      "미용종합면허(헤어, 피부, 네일, 메이크업)",
      "교원자격(교육인적자원부 장관)",
      "이용사 국가자격(보건복지부)",
    ],
  },
  {
    title: "SMP 교육·인증",
    items: [
      "KART SMP MASTER COURSE 수료",
      "GCA SMP MASTER COURSE 수료",
      "GCA DESIGN MASTER COURSE 수료",
      "K뷰티전문가연합회 SMP COURSE 수료",
      "호주 HRC SMP 기술교육 이수 실버인증",
      "KTF 보건 및 위생교육 이수",
    ],
  },
  {
    title: "강사·학회",
    items: [
      "호주 HRC SMP 기술인증 강사교육 골드인증",
      "K뷰티전문가연합회 SMP 인증 강사",
      "(사)대한문신사중앙회 정회원",
      "대한보건협회 정회원",
      "K뷰티전문가연합회 김포 지부장",
      "KW-SMP 학회 김포 운영위원장",
      "국제바디아트콘테스트 SMP 수석 심사감독관",
    ],
  },
  {
    title: "운영 이력",
    items: [
      "前 DD ACADEMY 부천본점 SMP 원장",
      "前 제이어반터치 청담본점 SMP 원장",
      "前 필릭스 스칼프 아카데미 인천점 대표원장",
      "現 필릭스 스칼프 본점 대표원장",
      "現 필릭스 스칼프 아카데미 본점 대표원장",
      "現 필릭스 스칼프 아카데미 평택점 대표원장",
      "現 모가난다 주식회사 대표",
    ],
  },
];

export default function Director() {
  return (
    <section id="director" className="section bg-white/60">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">DIRECTOR</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            평택점 대표원장 프로필
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            평택 비전동 스튜디오를 운영하는 대표원장의 경력입니다. 평택두피문신 시술과
            아카데미 교육을 직접 진행합니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {GROUPS.map((g) => (
            <div
              key={g.title}
              className="border border-[var(--line)] bg-white px-5 py-5 shadow-[0_4px_16px_rgba(20,24,32,0.04)]"
            >
              <h3 className="text-sm font-bold tracking-[0.12em] text-[var(--coral-deep)]">
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--ink)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coral)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
