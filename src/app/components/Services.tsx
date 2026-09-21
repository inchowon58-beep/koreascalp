"use client";

import { MessageCircle } from "lucide-react";
import { CTA_KAKAO } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { useKakaoHref } from "./KakaoHrefProvider";

const SERVICES = [
  {
    title: "헤어라인·정수리 SMP",
    desc: "M자·정수리·측두부 등 탈모 부위에 맞춘 밀도 보완과 라인 디자인",
    slot: 8,
    tag: "시술",
  },
  {
    title: "1:1 디자인 상담",
    desc: "얼굴형과 모발 상태를 분석해 시술 범위·횟수·예상 결과를 함께 설계",
    slot: 4,
    tag: "상담",
  },
  {
    title: "SMP 아카데미 교육",
    desc: "평택점에서 두피문신 기술·디자인·위생 과정을 체계적으로 교육",
    slot: 7,
    tag: "교육",
  },
  {
    title: "사후관리 프로그램",
    desc: "시술 후 세안·자외선·재방문 일정을 정리해 드리는 관리 가이드",
    slot: 1,
    tag: "관리",
  },
];

export default function Services() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="services" className="section bg-white/60">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">SMP · PYEONGTAEK</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              평택두피문신 시술 안내
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              비전동 스튜디오에서 진행하는 SMP 시술·교육·상담 항목입니다. 관심 분야를
              알려 주시면 맞춤 일정을 안내해 드립니다.
            </p>
          </div>
          <a
            href={kakaoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sky shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {SERVICES.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-[0.65rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageSlot index={item.slot} fill label={item.title} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(20,24,32,0.92)_100%)]" />
                <span className="absolute left-2 top-2 rounded-full bg-white/92 px-2 py-0.5 text-[0.65rem] font-bold text-[var(--coral-deep)] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                  {item.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
