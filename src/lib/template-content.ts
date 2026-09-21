import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { buildRegionInfo } from "./region-intro";
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
  "{kw} | {brand} SMP 시술·교육 안내",
  "{kw} — 디자인·상담·과정 가이드",
  "{region} {theme}, {brand}에서 알아보기",
  "{kw} 비교 전에 읽는 안내",
];

const METAS = [
  "{kw} — {brand}에서 SMP 시술·교육을 안내합니다. 1:1 디자인 상담, 헤어라인·밀도 보완, 아카데미 과정.",
  "{region} {theme} 정보. {brand} — 시술 범위·교육 커리큘럼·상담 방법을 정리했습니다.",
  "{kw} 검색 이용자를 위한 {theme} 가이드. 위생·디자인·사후관리 기준으로 상담합니다.",
];

const H1S = [
  "{kw}, 상담 전에 정리해 두면 좋은 것",
  "{region} {theme} — {brand} 안내",
  "{kw} — 라인·밀도·교육까지",
  "{theme} 알아보기, {kw}",
];

const HERO_SUB = [
  "SMP 시술 · 아카데미 교육 · 1:1 디자인 상담",
  "헤어라인·정수리·밀도, 범위를 함께 설계",
  "지역·부위·과정만 알려 주셔도 상담 가능",
];

const HERO_BARS = [
  "시술과 교육을 함께 운영하는 {brand}",
  "디자인 상담 후 맞춤 SMP · 교육 과정 안내",
  "카카오톡·문의 폼으로 상담 일정 접수",
];

function regionLabel(region: string | null, kw: string): string {
  if (region) return region.replace(/(특별시|광역시|특별자치시|특별자치도)$/u, "").trim() || region;
  return kw.replace(/\s+/g, "").slice(0, 6) || "전국";
}

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|koreascalp-v3`);
  const kw = keyword.trim() || "두피문신";
  const brand = SITE.brand;
  const obj = eulReul(kw);
  const as = euroRo(kw);
  const region = extractRegionFromKeyword(kw);
  const theme = extractKeywordTheme(kw);
  const regionText = regionLabel(region, kw);
  const regionInfo = buildRegionInfo(kw, seed);

  const fill = (s: string) =>
    s
      .replace(/\{kw\}/g, kw)
      .replace(/\{brand\}/g, brand)
      .replace(/\{region\}/g, regionText)
      .replace(/\{theme\}/g, theme);

  const title = fill(pick(TITLES, seed));
  const h1 = fill(pick(H1S, seed + 1));
  const heroSubtitle = pick(HERO_SUB, seed + 2);
  const heroBar = fill(pick(HERO_BARS, seed + 3));

  const sections = [
    {
      h2: fill(pick(
        [
          "{kw}, 검색하시는 분들이 궁금해 하는 것",
          "{region} {theme} — SMP를 처음 알아보는 분께",
          "{kw} 안내, 이 글에서 다루는 내용",
        ],
        seed
      )),
      paragraphs: [
        `${kw}${obj} 찾는 분들은 ‘자연스러운가’, ‘몇 번에 되는가’, ‘교육도 가능한가’를 동시에 묻는 경우가 많습니다. ${brand}는 두피문신(SMP) 시술과 아카데미 교육을 함께 운영합니다.`,
        `두피문신은 모발 결을 흉내 내는 미세 점을 두피에 배치해 헤어라인·정수리·측두·밀도를 보완하는 시술입니다. ${regionText} ${theme}${as} 관심 있으시다면, 시술 전 두피 상태와 원하는 라인을 정리해 두시면 상담이 수월합니다.`,
        `이 페이지는 ${kw} 키워드로 찾아오신 분을 위해 상담 방식, 시술 범위, 교육 과정, 문의 방법을 정리한 안내입니다. 광고 문구보다 실제 상담에서 확인하는 항목을 중심으로 작성했습니다.`,
        `시술 결과는 탈모 패턴·모발 색·피부 톤·목표 밀도에 따라 달라집니다. ${kw}만 보고 바로 예약하기보다, 디자인 상담에서 라인과 범위를 함께 보는 것을 권합니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "SMP 시술, {brand}는 이렇게 접근합니다",
          "{kw} — 헤어라인·정수리·밀도 보완",
          "부위별로 알아두면 좋은 {theme}",
        ],
        seed + 1
      )),
      paragraphs: [
        `헤어라인 SMP는 M자·헤어라인 후퇴·이마 비율을 조정할 때 많이 상담합니다. ${brand}에서는 얼굴형과 기존 모발 방향을 보고 라인을 스케치한 뒤, 밀도와 그라데이션을 설계합니다.`,
        `정수리·측두·후두부는 탈모 진행 정도에 따라 채우는 범위가 달라집니다. ${kw}${as} 문의하실 때는 정수리만인지, 측면까지 포함인지, 기존 모발과 이어지는지를 함께 말씀해 주시면 범위를 좁히기 쉽습니다.`,
        `밀도 보완은 숱이 적어 보이는 느낌을 줄이는 데 초점을 맞춥니다. 과하게 진하게 하면 부자연스러울 수 있어, ${brand}는 단계적으로 밀도를 올리는 방식을 상담에서 설명합니다.`,
        `시술 횟수는 부위·면적·목표 밀도·피부 상태에 따라 1~3회 이상 달라질 수 있습니다. ${regionText}에서 ${theme}${obj} 비교하실 때 ‘1회 완성’만 강조하는 곳보다, 횟수와 간격을 설명하는지를 함께 보시면 좋습니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "{kw} 상담, 이렇게 진행됩니다",
          "1:1 디자인 상담부터 사후관리까지",
          "{brand} 상담 흐름",
        ],
        seed + 2
      )),
      paragraphs: [
        `첫 상담에서는 두피 촬영·탈모 패턴 확인·원하는 스타일·기존 시술 이력을 함께 봅니다. ${kw}${obj} 위해 문의하시면, 바로 시술하기보다 라인과 범위를 먼저 맞춥니다.`,
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
        `두피문신 비용은 부위·면적·밀도·횟수·재시술 필요 여부에 따라 달라집니다. ${kw} 관련 검색에서 단일 가격만 보이면, 포함 범위(헤어라인만인지, 정수리 포함인지, 횟수)를 반드시 확인하세요.`,
        `상담 시 물어보면 좋은 질문: ① 시술 부위와 예상 횟수 ② 사용 색상·피부 톤 맞춤 방식 ③ 회복 기간과 관리법 ④ 재시술·보완 정책 ⑤ 교육 과정 커리큘럼(해당 시). ${brand}는 이 항목을 숨기지 않고 안내합니다.`,
        `사진·후기·포트폴리오는 참고 자료일 뿐, 본인 두피와 동일한 결과를 보장하지 않습니다. ${regionText} ${theme}${as} 알아보실 때는 ‘비슷한 케이스’ 사진과 ‘상담에서 설명한 범위’를 나란히 비교해 보세요.`,
        `SMP는 장비·경력·위생·디자인 시간·사후관리 안내가 함께 따라옵니다. ${brand}는 시술과 아카데미를 함께 운영하므로, 기술과 교육 기준을 같은 기준으로 안내합니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "SMP 아카데미, {brand} 교육 과정",
          "{kw}와 함께 찾는 두피문신 교육",
          "시술과 교육, 함께 운영하는 이유",
        ],
        seed + 4
      )),
      paragraphs: [
        `${brand} 아카데미에서는 SMP 기초·디자인·위생·실습 과정을 단계별로 교육합니다. ${kw}로 시술만 알아보다가 교육으로 전환하시는 분도 많습니다.`,
        `교육 상담에서는 수강 목표(창업·부업·기술 습득), 일정, 커리큘럼 구성, 실습 비중, 수료 후 지원 항목을 설명합니다. ${regionText}에서 ${theme} 교육을 찾으신다면 방문·카카오톡 모두 가능합니다.`,
        `시술 스튜디오와 교육을 한 브랜드에서 운영하면, 현장 기준의 디자인·위생·고객 상담 방식을 교육에 반영하기 쉽습니다. ${brand}는 이 점을 강점으로 안내합니다.`,
        `교육과 시술 일정이 겹치지 않도록 상담 단계에서 분리해 안내합니다. ${kw} 관련 문의 시 ‘시술’과 ‘교육’ 중 어디에 해당하는지 알려 주시면 더 빠릅니다.`,
      ],
    },
    {
      h2: fill(pick(
        [
          "{kw} — 상담·예약 방법",
          "다음 단계, 이렇게 연락 주세요",
          "{brand} 문의 안내",
        ],
        seed + 5
      )),
      paragraphs: [
        `예약은 카카오톡 오픈채팅 또는 사이트 하단 문의 폼으로 접수합니다. 성함·연락처·희망 부위(헤어라인/정수리/밀도/교육)·거주 지역·방문 희망일만 적어 주셔도 ${kw} 기준으로 일정을 안내해 드립니다. ${KAKAO_CTA_HINT}`,
        `시술·교육 사진은 메인 페이지 갤러리에서 더 보실 수 있습니다. 글 중간 ‘시술 사진 보기’ 버튼으로도 이동할 수 있습니다.`,
        `이 글은 ${kw} 검색 유입을 위한 지역·키워드 안내이며, 실제 시술 가능 여부·비용·일정은 상담에서 최종 확인합니다. ${brand}는 과장된 약속보다 상담에서 범위를 분명히 하는 것을 원칙으로 합니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `${brand}는 어떤 곳인가요?`,
      a: `두피문신(SMP) 시술과 아카데미 교육을 함께 운영하는 스튜디오입니다. ${kw}로 찾으시는 분께 디자인 상담과 교육 과정을 안내합니다.`,
    },
    {
      q: `${kw}, 시술은 어떤 순서로 진행되나요?`,
      a: `1:1 디자인 상담 → 범위·횟수 확정 → SMP 시술 → 사후관리 안내 순입니다. ${regionText}에서 문의하셔도 동일한 흐름으로 진행합니다.`,
    },
    {
      q: `헤어라인과 정수리, 동시에 받을 수 있나요?`,
      a: `두피 상태와 목표에 따라 가능합니다. ${kw} 상담에서 부위별 우선순위와 횟수를 함께 정합니다.`,
    },
    {
      q: `두피문신 교육도 받을 수 있나요?`,
      a: `네. ${brand} 아카데미에서 SMP 기술·디자인·위생 교육을 진행합니다. ${kw}로 교육만 문의하셔도 됩니다.`,
    },
    {
      q: `비용은 어떻게 안내되나요?`,
      a: `부위·밀도·횟수에 따라 달라 단일 가격으로 단정하지 않습니다. ${kw} 상담에서 범위를 본 뒤 안내해 드립니다.`,
    },
    {
      q: `시술 후 관리는 어떻게 해야 하나요?`,
      a: `세안·자외선·수면·재방문 일정을 안내문과 함께 전달합니다. ${brand}에서 사후관리 항목을 정리해 드립니다.`,
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
      `${regionText} 일대에서 ${theme}${obj} 비교하실 때, 통근·주차·상담 시간대도 함께 확인하시면 방문 계획이 수월합니다.`
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
    metaKeywords: `${kw}, 두피문신, SMP, ${theme}, ${brand}, 스칼프문신, 두피문신교육${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: pick(["SMP · 시술", "시술 · 교육", "Premium SMP"], seed),
    heroTitleLine1: kw,
    heroTitleLine2: brand,
    heroBar,
    regionInfo,
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} — ${brand} 상담 (시술 부위·교육 과정·거주 지역)`,
    createdAt: now,
    updatedAt: now,
  };
}
