import Image from "next/image";
import { fileUrl, isRealImage } from "@/lib/images";

const PLACEHOLDER_COLORS = [
  "#141820",
  "#b8956a",
  "#64748b",
  "#1a1f2e",
  "#d4bc7a",
  "#2d3748",
  "#967648",
  "#4a5568",
  "#e8e4dc",
  "#0f1219",
] as const;

export function placeholderColor(index: number): string {
  const n = PLACEHOLDER_COLORS.length;
  const i = ((Math.floor(index) - 1) % n + n) % n;
  return PLACEHOLDER_COLORS[i] ?? PLACEHOLDER_COLORS[0];
}

/** 파일 번호로 CDN 사진을 넣고, 없으면 컬러 자리만 채움 */
export default function ImageSlot({
  index = 1,
  className = "",
  fill = false,
  label = "이미지 자리",
  priority = false,
}: {
  index?: number;
  className?: string;
  fill?: boolean;
  label?: string;
  priority?: boolean;
}) {
  const src = fileUrl(index);
  if (isRealImage(src)) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={label}
          fill
          unoptimized
          priority={priority}
          className={`object-cover ${className}`}
          sizes="(max-width:768px) 100vw, 720px"
        />
      );
    }
    return (
      <Image
        src={src}
        alt={label}
        width={1000}
        height={640}
        unoptimized
        priority={priority}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${fill ? "absolute inset-0" : "h-full w-full"} ${className}`}
      style={{ backgroundColor: placeholderColor(index) }}
      role="img"
      aria-label={label}
    />
  );
}
