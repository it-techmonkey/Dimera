import Image from "next/image";

export default function About({ onReserve }: { onReserve: () => void }) {
  return (
    <section id="about" className="ritual-section section-wrap" aria-labelledby="ritual-title">
      <div className="section-rule"><span>The Ritual</span><span>The Dimera philosophy</span></div>
      <div className="ritual-layout">
        <div className="ritual-image">
          <Image src="/images/gallery-beige.jpg" alt="A moment of transformation at Dimera" fill sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
        <div className="ritual-copy">
          <p className="eyebrow">The Ritual</p>
          <h2 id="ritual-title">Self-care as architectural refinement of the soul.</h2>
          <p>Dimera was born from a singular belief: that beauty is not a service performed upon you, but a ritual you enter. Our atelier is a sanctuary — a space where the modern woman is witnessed, restored, and refined by hands that treat their craft as high art.</p>
          <p>From the first stroke of a lash to the final sweep of a cut, every gesture is intentional. Every detail, considered. This is not a salon. This is transformation, distilled.</p>
          <button type="button" className="button-ink" onClick={onReserve}>Begin your ritual <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </section>
  );
}
