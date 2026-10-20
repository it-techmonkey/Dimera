import Image from "next/image";
import Reveal from "./Reveal";

const stats = [
  { n: "07", l: "Signature rituals" },
  { n: "04", l: "Master artisans" },
  { n: "100%", l: "By appointment" },
];

export default function About({ onReserve }: { onReserve: () => void }) {
  return (
    <section id="about" className="bg-background py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/gallery-beige.jpg"
              alt="A moment of transformation at Dimera"
              fill
              quality={90}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden bg-background px-8 py-6 shadow-sm lg:block">
            <p className="font-heading text-5xl font-light text-accent">12+</p>
            <p className="mt-1 font-body text-[10px] uppercase tracking-luxe text-muted-foreground">
              Years of artistry
            </p>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <span className="font-body text-[11px] uppercase tracking-ultra text-accent-strong">
            The Ritual
          </span>
          <div className="slow-stroke my-6 w-16" />
          <h2 className="font-heading text-4xl font-light leading-display text-foreground sm:text-5xl lg:text-6xl">
            Self-care as architectural refinement of the soul.
          </h2>
          <p className="mt-8 font-body text-base font-light leading-relaxed text-muted-foreground">
            Dimera was born from a singular belief: that beauty is not a service
            performed upon you, but a ritual you enter. Our atelier is a
            sanctuary — a space where the modern woman is witnessed, restored,
            and refined by hands that treat their craft as high art.
          </p>
          <p className="mt-5 font-body text-base font-light leading-relaxed text-muted-foreground">
            From the first stroke of a lash to the final sweep of a cut, every
            gesture is intentional. Every detail, considered. This is not a
            salon. This is transformation, distilled.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.l}>
                <p className="font-heading text-3xl font-light text-foreground">
                  {stat.n}
                </p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-luxe text-muted-foreground">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onReserve}
            className="group relative mt-12 overflow-hidden border border-foreground/30 px-9 py-4 font-body text-[11px] uppercase tracking-luxe text-foreground transition-colors duration-500 hover:text-background"
          >
            <span className="relative z-10">Begin Your Ritual</span>
            <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
