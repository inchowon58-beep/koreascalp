import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { getSubRegionNames } from "./sub-region-map";
import { getNearbyStationNames } from "./subway-map";

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hasBatchim(word: string): boolean {
  const ch = word[word.length - 1];
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function eulReul(word: string): string {
  return hasBatchim(word) ? "을" : "를";
}

function euroRo(word: string): string {
  const ch = word[word.length - 1];
  if (!ch) return "로";
  const code = ch.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const jong = (code - 0xac00) % 28;
    if (jong === 0 || jong === 8) return "로";
  }
  return hasBatchim(word) ? "으로" : "로";
}

function clampDesc(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

const TITLES = [
  "{kw} — 평택 비전동 SMP 시술·교육 가이드",
  "{kw} | {brand} 프리미엄 두피문신 안내",
  "{region} {theme}, 상담부터 읽는 {kw}",
  "{kw} 알아보기 — 헤어라인·밀도·교육까지",
];

const METAS = [
  "{kw}를 검색하신 분을 위한 SMP 안내. {brand} 평택 비전동 스튜디오에서 1:1 디자인 상담, 시술, 아카데미 교육을 진행합니다. {addr}",
  "{kw} — 헤어라인·정수리·밀도 보완과 SMP 교육. {brand}에서 상담 일정과 과정을 확인하세요. {location}",
  "{region} {theme} 안내. {brand} 평택점, {addr}. 디자인·위생·사후관리 기준으로 상담합니다.",
];

const H1S = [
  "{kw}, 상담 전에 알아두면 좋은 것들",
  "{region}에서 {theme} — {brand} 안내",
  "{kw} — 라인 설계부터 보는 SMP",
  "프리미엄 {theme}, {kw} 가이드",
];

const HERO_SUB = [
  "평택 비전동 스튜디오 · 1:1 맞춤 SMP 상담",
  "헤어라인·정수리·밀도, 범위를 함께 설계합니다",
  "시술과 아카데미 교육, 한곳에서 안내",
];

const HERO_BARS = [
  "평택 {addr} · 카카오톡으로 방문 일정을 잡을 수 있습니다",
  "디자인 상담 후 맞춤 시술 · 교육 과정을 안내합니다",
  "두피 상태와 원하는 라인을 먼저 확인합니다",
];

function regionLabel(region: string, kw: string): string {
  if (region) return region;
  if (/평택/.test(kw)) return "평택";
  return "경기 남부";
}

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|koreascalp-v2`);
  const kw = keyword.trim() || "평택두피문신";
  const brand = SITE.brand;
  const obj = eulReul(kw);
  const as = euroRo(kw);
  const region = extractRegionFromKeyword(kw);
  const theme = extractKeywordTheme(kw);
  const regionText = regionLabel(region, kw);
  const addr = SITE.address;
  const location = SITE.location;

  const fill = (s: string) =>
    s
      .replace(/\{kw\}/g, kw)
      .replace(/\{brand\}/g, brand)
      .replace(/\{region\}/g, regionText)
      .replace(/\{theme\}/g, theme)
      .replace(/\{addr\}/g, addr)
      .replace(/\{location\}/g, location);

  const title = fill(pick(TITLES, seed));
  const h1 = fill(pick(H1S, seed + 1));
  const heroSubtitle = pick(HERO_SUB, seed + 2);
  const heroBar = fill(pick(HERO_BARS, seed + 3));

  const visitNote =
    region && !/평택/.test(kw)
      ? `${regionText}에서 ${kw}${obj} 찾으시는 분은 ${location} ${brand} 스튜디오로 방문하실 수 있습니다. 평택·안성·오산 등 경기 남부에서 오시는 경우가 많습니다.`
      : `${kw}${obj} 알아보시는 분은 ${addr} ${brand} 스튜디오에서 1:1 상담을 받으실 수 있습니다.`;

  const sections = [
    {
      h2: fill(pick(
        [
          "{kw}, 무엇부터 확인해야 할까",
          "{region} {theme} — 처음 알아보는 분을 위해",
          "{kw} 검색, 이 글에서 다루는 내용",
        ],
        seed
      )),
      paragraphs: [
        `${kw}${obj} 검색하시는 분들은 대부분 ‘어디서’, ‘얼마나 자연스럽게’, ‘몇 번에 끝나는지’를 동시에 궁금해 합니다. ${brand}는 평택 비전동에서 두피문신(SMP) 시술과 아카데미 교육을 함께 운영하는 프리미엄 스튜디오입니다.`,
        `두피문신은 모발처럼 보이는 미세 점을 두피에 배치해 헤어라인·정수리·측두·밀도를 보완하는 시술입니다. ${regionText} ${theme}${as} 관심 있으시다면, 시술 전 두피 상태와 원하는 라인을 먼저 정리해 두시면 상담이 훨씬 수월합니다.`,
        `이 페이지는 ${kw} 키워드로 찾아오신 분을 위해 ${brand}의 상담 방식, 시술 범위, 교육 과정, 방문 방법을 길게 풀어 쓴 안내입니다. 광고 문구보다 실제 상담에서 확인하는 항목을 중심으로 정리했습니다.`,
        visitNote,
        `시술 결과는 개인의 탈모 패턴·모발 색·피부 톤·원하는 밀도에 따라 달라집니다. ${kw}만 보고 바로 예약하기보다, 디자인 상담에서 라인과 범위를 함께 보는 것을 권합니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "SMP 시술, {brand}는 이렇게 접근합니다",
          "{kw} — 헤어라인·정수리·밀도 보완",
          "두피문신 부위별로 알아두면 좋은 점",
        ],
        seed + 1
      )),
      paragraphs: [
        `헤어라인 SMP는 M자·헤어라인 후퇴·이마 비율을 조정할 때 많이 상담합니다. ${brand}에서는 얼굴형과 기존 모발 방향을 보고 라인을 스케치한 뒤, 밀도와 그라데이션을 설계합니다.`,
        `정수리·측두·후두부는 탈모 진행 정도에 따라 ‘채우는 범위’가 달라집니다. ${kw}${as} 문의하실 때는 정수리만인지, 측면까지 포함인지, 기존 모발과 이어지는지를 함께 말씀해 주시면 범위를 좁히기 쉽습니다.`,
        `밀도 보완은 ‘숱이 적어 보이는’ 느낌을 줄이는 데 초점을 맞춥니다. 과하게 진하게 하면 부자연스러울 수 있어, ${brand}는 단계적으로 밀도를 올리는 방식을 상담에서 설명합니다.`,
        `시술 횟수는 부위·면적·목표 밀도·피부 상태에 따라 1~3회 이상 달라질 수 있습니다. ${regionText}에서 ${theme}${obj} 비교하실 때 ‘1회 완성’만 강조하는 곳보다, 횟수와 간격을 설명하는지를 함께 보시면 좋습니다.`,
        `${brand} 평택점은 ${addr}에 있으며, 시술실 위생·멸균·일회용 도구 사용 등 기본 기준을 상담과 안내문에서 확인하실 수 있습니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "{kw} 상담, 이렇게 진행됩니다",
          "1:1 디자인 상담부터 사후관리까지",
          "{brand} 평택점 상담 흐름",
        ],
        seed + 2
      )),
      paragraphs: [
        `첫 상담에서는 두피 촬영·탈모 패턴 확인·원하는 스타일·기존 시술 이력을 함께 봅니다. ${kw}${obj} 위해 방문하시면, 바로 시술하기보다 라인과 범위를 먼저 맞춥니다.`,
        `디자인 단계에서 헤어라인 높이, 측면 각도, 정수리 중심점, 모발 색과의 대비를 조율합니다. ${brand}는 ‘보기 좋은 사진’보다 ‘본인 얼굴에 어울리는 라인’을 기준으로 설명합니다.`,
        `일정이 잡히면 시술 시간·회복 기간·세안·수면·운동·자외선 주의사항을 안내합니다. 시술 직후와 1~2주, 재시술 시점까지 관리 프로토콜을 정리해 드립니다.`,
        `교육 과정을 원하시는 분은 SMP 기술·디자인·위생·실습 커리큘럼을 별도로 안내합니다. ${regionText} ${theme} 검색으로 교육만 문의하셔도 됩니다.`,
        `방문이 어려우시면 카카오톡 오픈채팅으로 사진과 희망 부위를 보내 주셔도 1차 상담이 가능합니다. ${KAKAO_CTA_HINT}`,
      ],
    },
    {
      h2: fill(pick(
        [
          "{kw}, 비용과 기대치를 정리하는 방법",
          "상담 때 꼭 확인하면 좋은 항목",
          "{theme} 선택, 이런 기준을 보세요",
        ],
        seed + 3
      )),
      paragraphs: [
        `두피문신 비용은 부위·면적·밀도·횟수·재시술 필요 여부에 따라 달라집니다. ${kw} 관련 검색에서 ‘○○만 원’처럼 단일 가격만 보이면, 포함 범위(헤어라인만인지, 정수리 포함인지, 횟수)를 반드시 확인하세요.`,
        `상담 시 물어보면 좋은 질문: ① 시술 부위와 예상 횟수 ② 사용 색상·피부 톤 맞춤 방식 ③ 회복 기간과 관리법 ④ 재시술·보완 정책 ⑤ 교육 과정 커리큘럼(해당 시). ${brand}는 이 항목을 숨기지 않고 안내합니다.`,
        `사진·후기·포트폴리오는 참고 자료일 뿐, 본인 두피와 동일한 결과를 보장하지 않습니다. ${regionText} ${theme}${as} 알아보실 때는 ‘비슷한 케이스’ 사진과 ‘상담에서 설명한 범위’를 나란히 비교해 보세요.`,
        `프리미엄 SMP는 장비·경력·위생·디자인 시간·사후관리 안내가 함께 따라옵니다. ${brand} ${location} 스튜디오는 시술과 아카데미를 함께 운영하므로, 기술과 교육 기준을 같은 기준으로 안내합니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "SMP 아카데미, {brand} 평택점 교육",
          "{kw}와 함께 찾는 두피문신 교육",
          "시술과 교육, 함께 운영하는 이유",
        ],
        seed + 4
      )),
      paragraphs: [
        `${brand} 아카데미 평택점에서는 SMP 기초·디자인·위생·실습 과정을 단계별로 교육합니다. ${kw}로 시술만 알아보다가 교육으로 전환하시는 분도 많습니다.`,
        `교육 상담에서는 수강 목표(창업·부업·기술 습득), 일정, 커리큘럼 구성, 실습 비중, 수료 후 지원 항목을 설명합니다. ${regionText}에서 ${theme} 교육을 찾으신다면 방문·카카오톡 모두 가능합니다.`,
        `시술 스튜디오와 교육을 한 브랜드에서 운영하면, 현장 기준의 디자인·위생·고객 상담 방식을 교육에 반영하기 쉽습니다. ${brand}는 이 점을 강점으로 안내합니다.`,
        `교육과 시술 일정이 겹치지 않도록 상담 단계에서 분리해 안내합니다. ${kw} 관련 문의 시 ‘시술’과 ‘교육’ 중 어디에 해당하는지 알려 주시면 더 빠릅니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "{kw} — 방문·상담 예약 방법",
          "{brand} 평택 비전동, 찾아오시는 길",
          "다음 단계, 이렇게 연락 주세요",
        ],
        seed + 5
      )),
      paragraphs: [
        `스튜디오 주소: ${addr} (${location}). ${regionText} 및 경기 남부에서 방문하시는 분들을 위한 평택 비전동 상담 공간입니다.`,
        `예약은 카카오톡 오픈채팅 또는 사이트 하단 문의 폼으로 접수합니다. 성함·연락처·희망 부위(헤어라인/정수리/밀도/교육)·방문 희망일만 적어 주셔도 ${kw} 기준으로 일정을 안내해 드립니다. ${KAKAO_CTA_HINT}`,
        `시술·교육 사진은 메인 페이지 갤러리에서 더 보실 수 있습니다. 글 중간 ‘시술 사진 보기’ 버튼으로도 이동할 수 있습니다.`,
        `이 글은 ${kw} 검색 유입을 위한 지역·키워드 안내이며, 실제 시술 가능 여부·비용·일정은 상담에서 최종 확인합니다. ${brand}는 과장된 약속보다 상담에서 범위를 분명히 하는 것을 원칙으로 합니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `${brand} ${location} 스튜디오는 어디에 있나요?`,
      a: `${addr}에 있습니다. ${kw}${obj} 찾으시는 분은 평택 비전동 ${brand}로 방문·카카오톡 상담 모두 가능합니다.`,
    },
    {
      q: `${kw}, 시술은 어떤 순서로 진행되나요?`,
      a: `1:1 디자인 상담 → 범위·횟수 확정 → SMP 시술 → 사후관리 안내 순입니다. ${regionText}에서 오셔도 동일한 흐름으로 진행합니다.`,
    },
    {
      q: `헤어라인과 정수리, 동시에 받을 수 있나요?`,
      a: `두피 상태와 목표에 따라 가능합니다. ${kw} 상담에서 부위별 우선순위와 횟수를 함께 정합니다.`,
    },
    {
      q: `두피문신 교육도 평택점에서 하나요?`,
      a: `네. ${brand} 아카데미 평택점에서 SMP 기술·디자인·위생 교육을 진행합니다. ${kw}로 교육만 문의하셔도 됩니다.`,
    },
    {
      q: `비용은 어떻게 안내되나요?`,
      a: `부위·밀도·횟수에 따라 달라 단일 가격으로 단정하지 않습니다. ${kw} 상담에서 범위를 본 뒤 안내해 드립니다.`,
    },
    {
      q: `시술 후 관리는 어떻게 해야 하나요?`,
      a: `세안·자외선·수면·재방문 일정을 안내문과 함께 전달합니다. ${brand} 평택점에서 사후관리 항목을 정리해 드립니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 예약하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 문의 폼으로 접수합니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `시술 사진은 어디서 볼 수 있나요?`,
      a: `메인 페이지 갤러리에서 ${brand} SMP 시술·교육 사진을 확인하실 수 있습니다.`,
    },
  ];

  const tweak = seed % 4;
  if (tweak === 1) {
    sections[1].paragraphs.push(
      `${regionText} 일대에서 ${theme}${obj} 비교하실 때, 주차·대중교통·상담 시간대도 함께 확인하시면 방문 계획이 수월합니다.`
    );
  } else if (tweak === 2) {
    sections[0].paragraphs.push(
      `탈모 약물·가발·모발 이식과 SMP를 병행·비교하시는 분도 많습니다. ${brand}는 본인 상황에 맞는 선택을 상담에서 함께 정리합니다.`
    );
  } else if (tweak === 3) {
    sections[3].paragraphs.push(
      `두피가 민감하거나 피부 질환이 있으면 시술 전 반드시 알려 주세요. ${kw} 상담에서 시술 가능 여부를 먼저 확인합니다.`
    );
  }

  const areas = getSubRegionNames(region, 5);
  const stations = getNearbyStationNames(region, 5);
  const geoKw = [
    ...areas.map((a) => `${a} ${theme}`),
    ...stations.map((s) => `${s} ${theme}`),
  ].join(", ");

  let metaDescription = fill(pick(METAS, seed));
  if (areas.length || stations.length) {
    const nearBits = [...areas.slice(0, 3), ...stations.slice(0, 3)].slice(0, 4).join(" · ");
    metaDescription = `${metaDescription} ${nearBits} ${theme} 안내.`;
  }

  const now = new Date().toISOString();

  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: clampDesc(metaDescription),
    metaKeywords: `${kw}, 평택두피문신, 두피문신, SMP, ${theme}, ${brand}, 평택 SMP, 비전동 두피문신${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: pick(["SMP · 평택", "시술 · 교육", "Premium SMP"], seed),
    heroTitleLine1: kw,
    heroTitleLine2: brand,
    heroBar,
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} — 평택 비전동 ${brand} 상담 (시술 부위·교육 과정·방문 희망일)`,
    createdAt: now,
    updatedAt: now,
  };
}
