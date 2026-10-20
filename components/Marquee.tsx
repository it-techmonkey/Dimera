export default function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y py-7 lg:py-9 ${
        dark ? "border-background/10 bg-foreground" : "border-border bg-background"
      }`}
    >
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="flex items-center"
          >
            <span
              className={`whitespace-nowrap px-8 font-heading text-3xl font-light italic lg:text-5xl ${
                dark ? "text-background/80" : "text-foreground/60"
              }`}
            >
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
