import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 평택두피문신 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "평택두피문신 필릭스스칼프는 어디에 있나요?",
    a: `경기 평택시 비전5로 20-44 305호(비전동)에 위치해 있습니다. 평택·안성·오산 등 경기 남부에서 방문하시는 분들이 많습니다. ${KAKAO_CTA_HINT}`,
  },
  {
    q: "평택에서 두피문신 시술은 어떻게 진행되나요?",
    a: "먼저 두피 상태와 원하는 라인을 1:1로 상담한 뒤, 헤어라인·정수리·밀도 보완 중 필요한 범위를 정합니다. 부위와 밀도에 따라 시술 횟수가 달라질 수 있습니다.",
  },
  {
    q: "평택점에서 두피문신 교육도 받을 수 있나요?",
    a: "네. 필릭스스칼프 아카데미 평택점에서 SMP 기술·디자인·위생 교육을 진행합니다. 수강 과정과 일정은 상담을 통해 안내해 드립니다.",
  },
  {
    q: "평택두피문신 비용은 어떻게 되나요?",
    a: "시술 부위, 밀도, 필요 횟수에 따라 달라집니다. 상담에서 두피 상태를 확인한 후 범위별로 안내해 드리며, 전화나 카카오톡으로 대략적인 견적을 먼저 받으실 수 있습니다.",
  },
  {
    q: "시술 후 관리는 어떻게 해야 하나요?",
    a: "시술 직후 세안·자외선 차단·재방문 일정을 안내해 드립니다. 평택 스튜디오에서 사후관리 항목을 정리해 드리니, 안내문과 함께 꼭 확인해 주세요.",
  },
  {
    q: "평택두피문신 상담은 어떻게 예약하나요?",
    a: `시술 부위나 교육 과정만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의 폼으로 접수하시면, 비전동 스튜디오 방문 일정을 잡아 드립니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "평택두피문신 상담 내용을 정리합니다",
    text: "헤어라인·정수리·밀도 중 관심 부위와 참고 사진이 있으면 미리 준비해 두시면 상담이 수월합니다.",
  },
  {
    name: "비전동 스튜디오에서 1:1 디자인 상담",
    text: "얼굴형과 기존 모발 밀도를 보고 시술 범위·횟수·예상 일정을 함께 정합니다.",
  },
  {
    name: "맞춤 SMP 시술 또는 교육 일정 확정",
    text: "시술과 아카데미 과정 중 필요한 쪽을 선택하고, 평택점 일정을 잡습니다.",
  },
  {
    name: "시술 후 관리 가이드 수령",
    text: "세안·자외선·재방문 일정을 안내받은 대로 진행합니다.",
  },
  {
    name: "추가 문의는 카카오톡으로",
    text: "시술·교육 관련 궁금한 점은 오픈채팅으로 이어서 안내받을 수 있습니다.",
  },
] as const;

export function faqJsonLd(faqs: FaqItem[] = HOME_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToJsonLd(pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "평택두피문신 상담·시술 진행 순서",
    description:
      "평택 비전동 필릭스스칼프에서 두피문신 디자인 상담부터 시술·교육·사후관리까지 안내.",
    inLanguage: "ko-KR",
    totalTime: "PT2H",
    url: pageUrl || SITE.siteUrl,
    step: EMERGENCY_HOWTO_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function orgJsonLd(url?: string, telephone?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn, "평택두피문신", "평택 SMP", "필릭스스칼프 평택"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    ...(SITE.ogImage ? { image: SITE.ogImage } : {}),
    ...(telephone ? { telephone } : {}),
    openingHours: "Mo-Su 10:00-20:00",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: SITE.addressRegion,
      addressLocality: SITE.addressLocality,
      streetAddress: "비전5로 20-44 305호",
    },
    areaServed: SITE.areaServed,
    priceRange: "평택두피문신 시술 · 교육 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
