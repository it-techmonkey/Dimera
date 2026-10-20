import { contact, navLinks } from "@/lib/data";
import { Clock, Instagram, MapPin, Phone } from "./icons";
import Reveal from "./Reveal";

export default function Footer({ onReserve }: { onReserve: () => void }) {
  return (
    <footer id="visit" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-col items-center text-center">
          <span className="font-body text-[11px] uppercase tracking-ultra text-accent-strong">
            Visit the Sanctuary
          </span>
          <div className="slow-stroke my-6 w-16" />
          <h2 className="font-heading text-5xl font-light leading-display text-foreground sm:text-6xl lg:text-7xl">
            Find your stillness
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <MapPin size={18} className="text-accent" />
            <h3 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/60">
              The Atelier
            </h3>
            <address className="mt-2 font-heading text-xl font-light not-italic text-foreground">
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </address>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center font-body text-[11px] uppercase tracking-luxe text-accent-strong underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>
          <div>
            <Clock size={18} className="text-accent" />
            <h3 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/60">
              Hours
            </h3>
            <p className="mt-2 font-heading text-xl font-light text-foreground">
              {contact.hours[0]}
              <br />
              {contact.hours[1]}
            </p>
          </div>
          <div>
            <Phone size={18} className="text-accent" />
            <h3 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/60">
              Reserve
            </h3>
            <a
              href={contact.phoneHref}
              className="mt-2 block font-heading text-xl font-light text-foreground transition-colors hover:text-accent-strong"
            >
              {contact.phone}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-body text-[11px] uppercase tracking-luxe text-foreground/70 transition-colors hover:text-accent-strong"
            >
              <Instagram size={14} /> {contact.instagram}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-border pt-12 text-center">
          <p className="font-heading text-3xl font-light tracking-[0.15em] text-foreground">
            DIMERA
          </p>
          <button
            onClick={onReserve}
            className="bg-foreground px-9 py-4 font-body text-[11px] uppercase tracking-luxe text-background transition-colors hover:bg-accent-strong"
          >
            Reserve a Transformation
          </button>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 font-body text-[10px] uppercase tracking-luxe text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p
            suppressHydrationWarning
            className="font-body text-[10px] uppercase tracking-luxe text-foreground/55"
          >
            © {new Date().getFullYear()} Dimera. The ritual of transformation,
            refined.
          </p>
        </div>
      </div>
    </footer>
  );
}
