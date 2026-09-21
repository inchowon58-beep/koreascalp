import { GoogleGenAI } from "@google/genai";
import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { buildRegionInfo } from "./region-intro";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function clampDesc(text: string, max = 158): string {
  const t = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function asParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((p) => String(p || "").trim()).filter(Boolean);
}

function buildPrompt(keyword: string): string {
  return `당신은 전국 지역별 두피문신(SMP) SEO 기사 작성 전문가입니다.
이 문서는 "${SITE.name}" 사이트에 실리며, 기존 두피문신 사이트와 문체·구성·표현이 겹치지 않아야 합니다(네이버 유사문서 회피).
특정 도시(평택 등)만 반복 강조하지 말고, 키워드에서 추출한 **해당 지역**에 맞게 작성하세요.
다른 업체 실명 비방 금지. '${SITE.brand}' 남용 금지.

메인 키워드: ${keyword}
핵심 키워드: ${keyword}, 두피문신, SMP, ${SITE.brand}, 스칼프문신, 두피문신교육
스튜디오: ${SITE.name}
서비스 범위: ${SITE.areaServed}
상담: 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl}) — 본문 마지막 섹션에만 짧게

독자: "${keyword}"를 검색해 해당 지역·전국에서 시술·교육·비용·상담 방법을 알아보는 분.
톤: 차분하고 정보 밀도 높은 에디토리얼. 과장·가격 단정·허위 금지.
금지 표현(유사문서 유발): "디자인을 먼저 보세요" 반복, "한 줄 견적", "시술과 교육을 함께 안내합니다" 같은 상투구.

regionInfo 작성 예시(시흥):
"경기도 서남부에 위치한 시흥시는 배곧신도시, 정왕·신천 일대의 산업·주거 복합 개발로 젊은 직장인과 가족 세대 유입이 꾸준한 도시입니다. 이에 따라 두피문신에 대한 관심과 상담 수요도 함께 늘고 있으며, {키워드}를 검색해 비교하는 분들이 많습니다."
→ 키워드 지역에 맞게 **유사한 형식**으로 2~3문장 작성. 실존 지명·개발·생활권 특성 반영.

반드시 다룰 내용(각 섹션 4~5문단, 문단당 180~280자):
1) 키워드 검색 의도·SMP 개요
2) 헤어라인·정수리·측두·밀도 보완 — 부위별 설명
3) 1:1 디자인 상담 → 시술 → 사후관리 흐름
4) 비용·기대치·상담 체크리스트 (단가 단정 금지)
5) SMP 아카데미 교육 과정
6) 상담·예약·다음 단계

FAQ 7~8개: 위치·시술 순서·부위·교육·비용·관리·예약·사진 — 실제 검색 질문 형태.

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '${keyword}' 포함",
  "metaDescription": "140~158자. '${keyword}', 두피문신 포함. 전화번호 금지",
  "metaKeywords": "${keyword}, 두피문신, SMP, ${SITE.brand} 등 12~16개",
  "h1": "'${keyword}' 포함. 상투구 금지",
  "heroSubtitle": "한글 한 문장. SMP·상담",
  "heroBadge": "SMP · 시술",
  "heroTitleLine2": "${SITE.brand}",
  "heroBar": "상담 한 줄",
  "regionInfo": "2~3문장. 키워드 지역 특성 + ${keyword} 검색 맥락. 위 시흥 예시 형식",
  "sections": [
    {"h2": "...", "paragraphs": ["200자+", "200자+", "180자+", "180자+", "160자+"]},
    {"h2": "...", "paragraphs": ["200자+", "200자+", "180자+", "180자+"]},
    {"h2": "...", "paragraphs": ["200자+", "200자+", "180자+", "180자+", "160자+"]},
    {"h2": "...", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "...", "paragraphs": ["180자+", "180자+", "160자+", "160자+"]},
    {"h2": "...", "paragraphs": ["160자+", "160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "100자+"},
    {"q": "...", "a": "80자+"}
  ],
  "ctaText": "${keyword} — ${SITE.brand} 상담 (시술·교육·거주 지역)"
}

AEO: FAQ는 실제 검색 질문처럼. '${keyword}'와 '두피문신'을 자연스럽게 분산. 기존 SMP 안내글과 다른 문장 구조·어휘 사용.`;
}

export async function generateWithGemini(
  keyword: string,
  apiKey?: string
): Promise<
  Omit<SeoPage, "slug" | "images" | "createdAt" | "updatedAt"> & { keyword: string }
> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY가 없습니다.");

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(keyword),
    config: {
      responseMimeType: "application/json",
    },
  });
  const text = response.text ?? "";
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = (fence ? fence[1] : text).trim();
  const data = JSON.parse(jsonStr);
  const sections = Array.isArray(data.sections)
    ? data.sections.map((sec: { h2?: string; paragraphs?: unknown }) => ({
        h2: String(sec?.h2 || "").trim(),
        paragraphs: asParagraphs(sec?.paragraphs),
      })).filter((sec: { h2: string; paragraphs: string[] }) => sec.h2 && sec.paragraphs.length)
    : [];
  const faqs = Array.isArray(data.faqs)
    ? data.faqs
        .map((f: { q?: string; a?: string }) => ({
          q: String(f?.q || "").trim(),
          a: String(f?.a || "").trim(),
        }))
        .filter((f: { q: string; a: string }) => f.q && f.a)
    : [];

  const regionInfo =
    String(data.regionInfo || "").trim() || buildRegionInfo(keyword);

  return {
    keyword,
    title: String(data.title || `${keyword} | ${SITE.brand} SMP 안내`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 두피문신, SMP, ${SITE.brand}`
    ),
    h1: String(data.h1 || `${keyword}, 상담 전에 알아두면 좋은 것`),
    heroSubtitle: String(
      data.heroSubtitle || "SMP 시술 · 아카데미 교육 · 1:1 디자인 상담"
    ),
    heroBadge: String(data.heroBadge || "SMP · 시술"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || SITE.brand),
    heroBar: String(data.heroBar || "디자인 상담 후 맞춤 SMP · 교육 과정 안내"),
    regionInfo,
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} — ${SITE.brand} 상담`),
  };
}

export function assembleSeoPage(
  partial: Awaited<ReturnType<typeof generateWithGemini>>,
  slug?: string
): SeoPage {
  const now = new Date().toISOString();
  return {
    slug: slug || slugifyKeyword(partial.keyword),
    keyword: partial.keyword,
    title: partial.title,
    metaDescription: clampDesc(partial.metaDescription),
    metaKeywords: partial.metaKeywords,
    h1: partial.h1,
    heroSubtitle: partial.heroSubtitle,
    heroBadge: partial.heroBadge || "SMP · 시술",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || SITE.brand,
    heroBar: partial.heroBar || "디자인 상담 후 맞춤 SMP · 교육 과정 안내",
    regionInfo: partial.regionInfo || buildRegionInfo(partial.keyword),
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
