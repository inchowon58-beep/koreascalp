"use client";

import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

export default function Footer() {
  const kakaoHref = useKakaoHref();
  return (
    <footer className="border-t border-white/8 bg-[#141820] py-12 text-[#f5f3ef]">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#d4bc7a]">{SITE.brandEn}</p>
            <h2 className="mt-1 text-2xl font-bold hover:text-white">{SITE.name}</h2>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-white/75">
          <a
            href={kakaoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <MessageCircle size={16} className="text-[#b8956a]" />
            {CTA_KAKAO}
          </a>
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#b8956a]" />
            <span>
              {SITE.address}
              <span className="mt-0.5 block text-xs text-white/45">{SITE.location}</span>
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/admin"
              className="inline-flex rounded-[0.4rem] border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              관리자 로그인
            </Link>
            <Link
              href="/admin/sponsor-login"
              className="inline-flex rounded-[0.4rem] border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              스폰서 로그인
            </Link>
          </div>
          <p className="pt-2 text-xs text-white/35">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
