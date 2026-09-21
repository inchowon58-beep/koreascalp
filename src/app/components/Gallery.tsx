import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { GALLERY_FEATURED, GALLERY_GRID, galleryAlt } from "@/lib/images";

export default function Gallery() {
  return (
    <section id="gallery" className="section bg-[var(--navy)] text-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker text-[#d4bc7a] before:bg-[#b8956a]">PORTFOLIO</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            평택두피문신 시술·교육 갤러리
          </h2>
          <p className="mt-3 text-white/65">
            {SITE.brand} 평택점에서 진행한 SMP 시술·교육 사진입니다. 더 자세한 사례는
            카카오톡으로 문의해 주세요.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {GALLERY_FEATURED.map((fileNo) => (
            <div
              key={`feat-${fileNo}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[0.65rem] sm:col-span-1 md:col-span-2 md:aspect-[16/10]"
            >
              <ImageSlot index={fileNo} fill label={galleryAlt(fileNo)} />
            </div>
          ))}
          {GALLERY_GRID.map((fileNo) => (
            <div
              key={`grid-${fileNo}`}
              className="relative aspect-square overflow-hidden rounded-[0.65rem]"
            >
              <ImageSlot index={fileNo} fill label={galleryAlt(fileNo)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
