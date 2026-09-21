"use client";

import { MessageCircle, Scissors } from "lucide-react";
import { SITE, CTA_KAKAO, KEYWORD_INQUIRY } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { useKakaoHref } from "./KakaoHrefProvider";

export default function Hero() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <ImageSlot index={3} fill priority label={`${SITE.title} ${SITE.brand}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,24,32,0.55)_0%,rgba(20,24,32,0.2)_40%,rgba(20,24,32,0.94)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#d4bc7a]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {SITE.title}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              {SITE.brand} · 평택 비전동
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline}. 헤어라인·정수리·밀도 보완까지 1:1 디자인 상담 후 맞춤 SMP를 진행합니다.
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#e8e4dc] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn-primary">
              <Scissors size={18} />
              시술·교육 안내
            </a>
            <a
              href={kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle size={18} />
              {CTA_KAKAO}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
