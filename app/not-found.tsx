import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <span className="font-body text-[11px] uppercase tracking-ultra text-accent-strong">
        Error 404
      </span>
      <div className="slow-stroke my-6 w-16" />
      <h1 className="font-heading text-5xl font-light leading-display text-foreground sm:text-6xl">
        This page has <span className="italic text-accent">wandered off</span>
      </h1>
      <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Let us guide
        you back to the sanctuary.
      </p>
      <Link
        href="/"
        className="mt-10 bg-foreground px-9 py-4 font-body text-[11px] uppercase tracking-luxe text-background transition-colors hover:bg-accent-strong"
      >
        Return to Dimera
      </Link>
    </main>
  );
}
