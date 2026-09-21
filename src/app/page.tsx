import type { Metadata } from "next";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Director from "./components/Director";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import ArticlesScroll from "./components/ArticlesScroll";
import ContactForm from "./components/ContactForm";
import { listPublicPageSummaries } from "@/lib/seo-pages";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "평택두피문신",
  description: SITE.description,
  keywords: [...SITE.keywords],
  openGraph: {
    title: `평택두피문신 | ${SITE.brand} — 평택 비전동 SMP 시술·교육`,
    description: SITE.description,
    ...(SITE.ogImage ? { images: [{ url: SITE.ogImage, alt: SITE.name }] } : {}),
  },
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  let pages: Awaited<ReturnType<typeof listPublicPageSummaries>> = [];
  try {
    pages = await listPublicPageSummaries();
  } catch {
    pages = [];
  }

  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Process />
      <Director />
      <Reviews />
      <FAQ />
      <ArticlesScroll pages={pages} />
      <ContactForm />
    </>
  );
}
