import Image from "next/image";

const moments = [
  {
    number: "01 / Arrive",
    image: "/images/wash-blow.jpg",
    alt: "A softly lit salon setting",
    title: "Come in, exhale.",
    text: "Find the treatment that fits your day. We begin by listening to what you want.",
  },
  {
    number: "02 / Be tended",
    image: "/images/gallery-manicure.jpg",
    alt: "Hands after a manicure",
    title: "Every detail matters.",
    text: "Thoughtful technique and unhurried attention make the time feel like your own.",
  },
  {
    number: "03 / Leave transformed",
    image: "/images/gallery-balayage.jpg",
    alt: "Finished dimensional hair",
    title: "Carry it with you.",
    text: "The finish is beautiful. The feeling is the part that stays.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience section-wrap" aria-labelledby="experience-title">
      <div className="section-rule"><span>Your first visit</span><span>A moment made for you</span></div>
      <div className="section-heading"><p className="eyebrow">The Dimera experience</p><h2 id="experience-title">From the first hello<br />to the last look.</h2></div>
      <div className="experience-grid">
        {moments.map((moment, index) => (
          <article key={moment.number}>
            <span className="card-number">{moment.number}</span>
            <Image src={moment.image} alt={moment.alt} width={700} height={900} sizes="(min-width: 768px) 30vw, 100vw" className={index === 0 ? "arched-image" : undefined} />
            <h3>{moment.title}</h3><p>{moment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
