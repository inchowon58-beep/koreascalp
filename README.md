# 평택두피문신 · 필릭스스칼프

Next.js 15 기반 **평택두피문신 필릭스스칼프** — 평택 비전동 SMP 시술과 아카데미 교육을 안내하는 사이트입니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/koreascalp` 저장소로만 push·deploy 하세요.**
`smpinfo` 및 `infowedding` / `pruwedding` / `dmcwedding` / `globalwedding` / `pupmaincoon` / `doodle` / `muzi` / `eanimal` / `funeral.git` 등 기존 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/koreascalp` | `smpinfo`, `infowedding`, `pruwedding`, `dmcwedding`, `globalwedding`, `pupmaincoon`, `doodle`, `muzi`, `funeral`, `eanimal` 등 |
| 도메인 | `smp.infocs.co.kr` (Vercel 연결 시) | `globalwedding.infocs.co.kr` 등 이전 브랜드 도메인 |

```bash
npm run check:deploy-target
npm run deploy:prod
```

## 로컬 개발

```bash
npm install
npm run dev
```

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL` = `https://smp.infocs.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터, 사용자가 직접 설정)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)
