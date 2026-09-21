import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { getSubRegionNames, inferParentRegionFromSubArea, normalizeCityKey } from "./sub-region-map";

type RegionProfile = {
  metro: string;
  city: string;
  development: string;
  demand: string;
};

/** 지역별 상단 소개 (유아독존 regionInfo 스타일) */
const PROFILES: Record<string, RegionProfile> = {
  시흥: {
    metro: "경기도 서남부",
    city: "시흥시",
    development: "배곧신도시, 정왕·신천·월곶 일대의 산업·주거 복합 개발",
    demand: "젊은 직장인·가족 세대 유입으로 헤어라인·밀도 보완 등 두피 관리 니즈가 함께 늘고 있습니다",
  },
  안산: {
    metro: "경기도 서남부",
    city: "안산시",
    development: "단원·상록권 대규모 주거단지와 산업단지가 공존하는 도시",
    demand: "통근·야간 근무가 많은 직장인층에서 탈모·헤어라인 고민과 SMP 상담 수요가 꾸준합니다",
  },
  부천: {
    metro: "경기도 서부",
    city: "부천시",
    development: "중동·상동·역곡·옥길 등 원도심과 신도시가 함께 성장하는 도시",
    demand: "수도권 서부 거주자의 두피문신·SMP 비교 검색이 활발한 편입니다",
  },
  인천: {
    metro: "인천광역시",
    city: "인천",
    development: "송도·청라·부평·연수 등 국제업무·주거 중심지가 분포",
    demand: "직장·학업·생활권이 넓어 {theme} 상담을 지역별로 비교하는 이용자가 많습니다",
  },
  청라: {
    metro: "인천광역시",
    city: "청라국제도시",
    development: "국제업무·주거·상업 복합 신도시",
    demand: "외국계·전문직 거주자와 젊은 가구 중심으로 두피·헤어라인 관리 관심이 높습니다",
  },
  김포: {
    metro: "경기도 서북부",
    city: "김포시",
    development: "장기·구래·운양 등 한강 신도시권 주거 개발",
    demand: "서울 접근성과 주거 여건을 찾는 가구 유입과 함께 SMP 문의가 늘고 있습니다",
  },
  고양: {
    metro: "경기도 북서부",
    city: "고양시",
    development: "일산·화정·행신·백마 등 대규모 위성도시",
    demand: "장년·청장년층의 탈모·밀도 보완 상담이 꾸준히 이어지는 지역입니다",
  },
  파주: {
    metro: "경기도 북서부",
    city: "파주시",
    development: "운정·금촌·교하 등 신도시·주거단지 확장",
    demand: "신규 입주 가구와 창업·프리랜서층의 {theme} 검색이 함께 늘고 있습니다",
  },
  수원: {
    metro: "경기도 남부",
    city: "수원시",
    development: "영통·광교·매탄 등 혁신·주거 클러스터",
    demand: "IT·연구·서비스 직군 중심으로 두피문신·교육 과정을 함께 알아보는 분이 많습니다",
  },
  성남: {
    metro: "경기도 중부",
    city: "성남시",
    development: "분당·판교·서현·야탑 등 테크·주거 허브",
    demand: "바쁜 일정 속 빠른 상담·디자인 확인을 원하는 이용자 비중이 높습니다",
  },
  용인: {
    metro: "경기도 동남부",
    city: "용인시",
    development: "수지·기흥·동백·상현 등 대규모 아파트 단지",
    demand: "가족·직장인 거주층의 헤어라인·정수리 SMP 관심이 꾸준합니다",
  },
  화성: {
    metro: "경기도 남부",
    city: "화성시",
    development: "동탄·병점·향남 등 급성장 신도시권",
    demand: "신규 이주·통근 인구 증가와 함께 {theme} 비교·상담 수요가 빠르게 늘고 있습니다",
  },
  평택: {
    metro: "경기도 남부",
    city: "평택시",
    development: "비전·고덕·송탄 등 주거·산업 복합 지역",
    demand: "안성·오산 등 인근에서도 {theme} 상담을 찾는 이용자가 많습니다",
  },
  안양: {
    metro: "경기도 중부",
    city: "안양시",
    development: "평촌·범계·관양 등 도심·주거 혼합 지역",
    demand: "수도권 남부 거주자의 두피문신·SMP 교육 문의가 이어지는 도시입니다",
  },
  광명: {
    metro: "경기도 서남부",
    city: "광명시",
    development: "철산·하안·소하 등 서울 접근성 높은 주거 도시",
    demand: "출퇴근 거리와 상담 편의를 함께 보는 {theme} 검색이 많습니다",
  },
  의정부: {
    metro: "경기도 북부",
    city: "의정부시",
    development: "가능·민락·금오 등 북부 거점 주거지",
    demand: "수도권 북부 거주자의 탈모·헤어라인 보완 상담 수요가 꾸준합니다",
  },
  남양주: {
    metro: "경기도 동북부",
    city: "남양주시",
    development: "다산·별내·화도 등 급성장 주거 신도시",
    demand: "신혼·육아·직장인 가구 유입과 함께 SMP 관심이 늘고 있습니다",
  },
  하남: {
    metro: "경기도 동부",
    city: "하남시",
    development: "미사·감일 등 강변 신도시",
    demand: "젊은 가구 중심으로 {theme} 정보를 비교하는 검색이 활발합니다",
  },
  부산: {
    metro: "부산광역시",
    city: "부산",
    development: "해운대·수영·동래 등 해안·도심 생활권",
    demand: "영남권 거주자의 두피문신·SMP 시술·교육 문의가 꾸준한 지역입니다",
  },
  대구: {
    metro: "대구광역시",
    city: "대구",
    development: "수성·달서 등 주거·상업 중심지",
    demand: "영남 내륙 거주자의 헤어라인·밀도 보완 상담 수요가 이어집니다",
  },
  대전: {
    metro: "대전광역시",
    city: "대전",
    development: "둔산·유성·서구 등 연구·행정·주거 허브",
    demand: "공공·연구·교육 종사자층의 {theme} 검색이 꾸준합니다",
  },
  광주: {
    metro: "광주광역시",
    city: "광주",
    development: "상무·봉선 등 서남권 거점 도시",
    demand: "호남권 거주자의 SMP 시술·교육 비교 수요가 있는 지역입니다",
  },
  울산: {
    metro: "울산광역시",
    city: "울산",
    development: "남구·중구 등 산업·주거 복합 도시",
    demand: "근로·가구 생활권에서 두피·헤어라인 관리 니즈가 함께 나타납니다",
  },
  세종: {
    metro: "세종특별자치시",
    city: "세종",
    development: "행정·주거 중심 신도시",
    demand: "이주·공무·전문직 거주자의 {theme} 상담 검색이 늘고 있습니다",
  },
  제주: {
    metro: "제주특별자치도",
    city: "제주",
    development: "노형·연동·애월 등 관광·주거 복합 생활권",
    demand: "자외선·생활 환경을 고려한 두피 관리·SMP 문의가 이어집니다",
  },
  천안: {
    metro: "충청남도",
    city: "천안시",
    development: "두정·불당·쌍용 등 충남 거점 주거도시",
    demand: "충청권 거주자의 두피문신·교육 과정 문의가 꾸준합니다",
  },
  청주: {
    metro: "충청북도",
    city: "청주시",
    development: "흥덕·오창·상당 등 혁신·주거 클러스터",
    demand: "충북·세종 접근권 이용자의 {theme} 비교 검색이 많습니다",
  },
  전주: {
    metro: "전라북도",
    city: "전주시",
    development: "완산·덕진·효자 등 전북 중심 도시",
    demand: "호남·전북 거주자의 SMP 상담 수요가 있는 지역입니다",
  },
  창원: {
    metro: "경상남도",
    city: "창원시",
    development: "성산·의창·마산 등 경남 행정·주거 허브",
    demand: "경남권 {theme} 정보를 찾는 검색이 꾸준합니다",
  },
  강남: {
    metro: "서울특별시",
    city: "강남구",
    development: "역삼·논현·대치 등 업무·주거 중심지",
    demand: "바쁜 일정 속 디자인·일정을 함께 확인하려는 SMP 상담 수요가 높습니다",
  },
  송파: {
    metro: "서울특별시",
    city: "송파구",
    development: "잠실·문정·가락 등 대규모 주거·상업 지역",
    demand: "가족·직장인 거주층의 두피문신·교육 검색이 활발합니다",
  },
  마포: {
    metro: "서울특별시",
    city: "마포구",
    development: "상암·합정·연남 등 젊은 문화·주거 허브",
    demand: "20~40대 중심으로 {theme} 비교·상담 문의가 많은 지역입니다",
  },
};

const INTRO_TEMPLATES = [
  "{metro}에 위치한 {city}는 {development}로 {demand}. 이에 따라 {theme}에 대한 관심이 높아지고 있으며, {kw}를 검색해 비교·상담하는 분들이 많습니다.",
  "{city}는 {development} 특성을 가진 지역입니다. {demand}. {kw} 키워드로 알아보실 때는 지역 생활권과 시술 범위·디자인을 함께 보는 것이 좋습니다.",
  "{metro} {city} 일대는 {development}가 두드러집니다. {demand}. {theme} 정보를 찾는 분들은 {kw} 검색 후 상담 항목을 정리해 두면 비교가 수월합니다.",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function resolveProfileKey(region: string | null): string | null {
  if (!region) return null;
  const key = normalizeCityKey(region);
  if (PROFILES[key]) return key;
  const parent = inferParentRegionFromSubArea(region);
  if (parent && PROFILES[normalizeCityKey(parent)]) return normalizeCityKey(parent);
  return key.length >= 2 ? key : null;
}

function cityDisplayName(key: string, raw: string): string {
  if (PROFILES[key]) return PROFILES[key].city;
  if (/구$|시$|군$/.test(raw)) return raw;
  if (raw.endsWith("동") || raw.endsWith("역")) return raw;
  return `${raw} 일대`;
}

function fillDemand(text: string, theme: string): string {
  return text.replace(/\{theme\}/g, theme);
}

/** SEO 페이지 상단 지역 소개 문단 생성 */
export function buildRegionInfo(keyword: string, seed = 0): string {
  const kw = keyword.trim() || "두피문신";
  const theme = extractKeywordTheme(kw);
  const region = extractRegionFromKeyword(kw);
  const profileKey = resolveProfileKey(region);
  const subAreas = getSubRegionNames(region, 3);

  if (profileKey && PROFILES[profileKey]) {
    const p = PROFILES[profileKey];
    const tpl = pick(INTRO_TEMPLATES, hash(`${kw}|${seed}`));
    return tpl
      .replace(/\{metro\}/g, p.metro)
      .replace(/\{city\}/g, p.city)
      .replace(/\{development\}/g, p.development)
      .replace(/\{demand\}/g, fillDemand(p.demand, theme))
      .replace(/\{theme\}/g, theme)
      .replace(/\{kw\}/g, kw);
  }

  if (region) {
    const city = cityDisplayName(normalizeCityKey(region), region);
    const near = subAreas.length ? `${subAreas.join("·")} 등 ` : "";
    const variants = [
      `${city}는 ${near}주거·상업 생활권이 형성된 지역으로, ${theme}에 대한 관심과 ${kw} 검색이 꾸준히 이어지고 있습니다. 거주 지역과 통근 거리, 원하는 시술 부위를 함께 정리해 상담하시면 비교가 수월합니다.`,
      `${city} 일대에서 ${kw}${hasBatchim(kw) ? "을" : "를"} 찾는 분들은 헤어라인·정수리·밀도 보완 중 어디를 우선할지부터 정리하는 경우가 많습니다. ${theme}는 개인 상태에 따라 범위와 횟수가 달라지므로, 지역 특성과 함께 1:1 상담으로 확인하는 것이 좋습니다.`,
    ];
    return pick(variants, hash(`${kw}|info|${seed}`));
  }

  return `${kw}는 전국 어디서나 검색되는 ${theme} 키워드입니다. 거주 지역, 두피 상태, 원하는 라인·밀도를 정리한 뒤 상담 받으시면 시술 범위와 교육 과정을 맞춰 안내받을 수 있습니다.`;
}

function hasBatchim(word: string): boolean {
  const ch = word[word.length - 1];
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}
