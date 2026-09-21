import { SITE } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section id="faq" className="section bg-white/60">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)] md:text-4xl">
            {SITE.title}, 자주 묻는 질문
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            평택두피문신 시술·교육을 알아보실 때 많이 문의하시는 내용입니다.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="rounded-[0.65rem] border border-[var(--line)] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(20,24,32,0.03)]"
            >
              <summary className="cursor-pointer font-bold text-[var(--navy)]">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
