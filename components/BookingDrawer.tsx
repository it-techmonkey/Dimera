"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { menuItems, priceMenu, stylists, timeSlots } from "@/lib/data";
import { formatDate, isPastSlot, salonToday } from "@/lib/time";
import { Check, ChevronLeft, ChevronRight, X } from "./icons";
import Price from "./Price";

type Form = {
  service: string;
  stylist: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyForm: Form = {
  service: "",
  stylist: "any",
  appointment_date: "",
  appointment_time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const steps = ["Service", "Preferred Time", "Artisan", "Your Details"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidPhone = (phone: string) =>
  phone.replace(/\D/g, "").length >= 7;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | false;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-body text-[10px] uppercase tracking-luxe text-foreground/60">
        {label}
      </span>
      <span className="mt-1 block">{children}</span>
      {hint && (
        <span className="mt-1.5 block font-body text-xs text-destructive">
          {hint}
        </span>
      )}
    </label>
  );
}

type BookingDrawerProps = {
  open: boolean;
  onClose: () => void;
  presetService: string | null;
  /** Increments on every open so the drawer can reset itself. */
  openCount: number;
};

export default function BookingDrawer({
  open,
  onClose,
  presetService,
  openCount,
}: BookingDrawerProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seenOpen, setSeenOpen] = useState(openCount);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset to the right step each time the drawer is (re)opened.
  if (seenOpen !== openCount) {
    setSeenOpen(openCount);
    setStep(presetService ? 1 : 0);
    setDone(false);
    if (presetService) setForm((f) => ({ ...f, service: presetService }));
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Move focus into the dialog on open, and hand it back on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const selectedService = menuItems.find((s) => s.id === form.service);
  const set = (key: keyof Form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));
  const touch = (key: keyof Form) => setTouched((t) => ({ ...t, [key]: true }));

  const setDate = (date: string) =>
    setForm((f) => ({
      ...f,
      appointment_date: date,
      // Drop a time that has already passed on the newly chosen day.
      appointment_time:
        f.appointment_time && isPastSlot(date, f.appointment_time)
          ? ""
          : f.appointment_time,
    }));

  const emailInvalid = !!form.email && !emailPattern.test(form.email);
  const phoneInvalid = !!form.phone && !isValidPhone(form.phone);

  const canContinue =
    step === 0
      ? !!form.service
      : step === 1
        ? !!form.appointment_date &&
          form.appointment_date >= salonToday() &&
          !!form.appointment_time
        : step === 2
          ? !!form.stylist
          : step === 3 &&
            !!form.name.trim() &&
            !!form.email &&
            !emailInvalid &&
            !!form.phone &&
            !phoneInvalid;

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "pending" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Please try again in a moment.");
      }
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeAndReset = () => {
    setForm(emptyForm);
    setTouched({});
    setStep(0);
    setDone(false);
    onClose();
  };

  // Escape closes; Tab stays inside the open dialog.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (done) closeAndReset();
      else onClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input, textarea, [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const firstName = form.name.trim().split(" ")[0];

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onKeyDown={onKeyDown}
        className={`booking-drawer fixed right-0 top-0 z-[80] flex h-full w-full flex-col bg-background shadow-2xl transition-transform duration-500 ease-out sm:w-[440px] lg:w-[480px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="booking-drawer-photo" aria-hidden="true"><Image src="/images/nail-art.jpg" alt="" fill sizes="350px" /><span>DIMERA / YOUR MOMENT</span></div>
        <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <div>
            <span className="font-body text-[10px] uppercase tracking-ultra text-accent-strong">
              Appointment request
            </span>
            <h2
              id="booking-title"
              className="mt-1 font-heading text-2xl font-light text-foreground"
            >
              {done ? "Request saved" : "Request your ritual"}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={done ? closeAndReset : onClose}
            aria-label="Close appointment request"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div
            role="status"
            className="flex flex-1 flex-col items-center justify-center px-8 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40">
              <Check size={26} className="text-accent" />
            </div>
            <h3 className="mt-8 font-heading text-3xl font-light text-foreground">
              Your request is saved
            </h3>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-muted-foreground">
              {selectedService?.name} on {formatDate(form.appointment_date)} at{" "}
              {form.appointment_time} is your preferred appointment{firstName ? `, ${firstName}` : ""}.
              A salon team member must review the request before it is confirmed.
            </p>
            <button
              onClick={closeAndReset}
              className="mt-10 border border-foreground/30 px-8 py-3 font-body text-[11px] uppercase tracking-luxe text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <ol className="flex items-center gap-2 px-6 pt-5 sm:px-8">
              {steps.map((label, i) => (
                <li
                  key={label}
                  aria-current={i === step ? "step" : undefined}
                  className="flex-1"
                >
                  <div
                    className={`h-1 rounded-full transition-colors duration-500 ${
                      i <= step ? "bg-accent" : "bg-border"
                    }`}
                  />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ol>
            <div className="px-6 pb-3 pt-3 sm:px-8">
              <span className="font-body text-[10px] uppercase tracking-luxe text-foreground/60">
                Step {step + 1} of {steps.length} — {steps[step]}
              </span>
            </div>

            {step > 0 && selectedService && (
              <div className="mx-6 mb-4 flex items-center justify-between gap-3 bg-secondary/60 px-4 py-3 sm:mx-8">
                <div className="min-w-0">
                  <p className="truncate font-heading text-lg font-light text-foreground">
                    {selectedService.name}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-luxe text-muted-foreground">
                    <Price
                      price={selectedService.price}
                      comparePrice={selectedService.comparePrice}
                    />
                  </p>
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="shrink-0 py-2 font-body text-[10px] uppercase tracking-luxe text-accent-strong underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 pb-8 sm:px-8">
              {step === 0 && (
                <div className="space-y-7">
                  <p className="font-body text-xs font-light leading-relaxed text-muted-foreground">
                    <span className="font-normal text-accent-strong">
                      Launch offer prices.
                    </span>{" "}
                    Struck-through prices apply after launch.
                  </p>
                  {priceMenu.map((group) => (
                    <fieldset key={group.id}>
                      <legend className="mb-2 font-body text-[10px] uppercase tracking-luxe text-foreground/60">
                        {group.title}
                      </legend>
                      <div className="grid grid-cols-1 gap-2">
                        {group.items.map((s) => {
                          const selected = form.service === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => set("service", s.id)}
                              aria-pressed={selected}
                              className={`flex min-h-14 items-center justify-between gap-3 border px-4 py-3 text-left transition-all duration-300 ${
                                selected
                                  ? "border-accent bg-accent/5"
                                  : "border-border hover:border-foreground/30"
                              }`}
                            >
                              <span className="font-heading text-lg font-light leading-snug text-foreground">
                                {s.name}
                              </span>
                              <span className="flex shrink-0 items-center gap-3">
                                <span className="font-body text-[10px] uppercase tracking-luxe text-muted-foreground">
                                  <Price
                                    price={s.price}
                                    comparePrice={s.comparePrice}
                                  />
                                </span>
                                <Check
                                  size={16}
                                  className={`text-accent transition-opacity ${
                                    selected ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <Field label="Preferred Date">
                    <input
                      type="date"
                      value={form.appointment_date}
                      min={salonToday()}
                      onChange={(e) => setDate(e.target.value)}
                      className="field-input"
                    />
                  </Field>
                  <fieldset>
                    <legend className="font-body text-[10px] uppercase tracking-luxe text-foreground/60">
                      Preferred Time
                    </legend>
                    {!form.appointment_date && (
                      <p className="mt-2 font-body text-xs font-light text-muted-foreground">
                        Choose a date first to see preferred times. These times are not live availability.
                      </p>
                    )}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const past =
                          !!form.appointment_date &&
                          isPastSlot(form.appointment_date, time);
                        const selected = form.appointment_time === time;
                        return (
                          <button
                            key={time}
                            onClick={() => set("appointment_time", time)}
                            disabled={!form.appointment_date || past}
                            aria-pressed={selected}
                            className={`border py-3 font-body text-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${
                              selected
                                ? "border-accent bg-accent/5 text-foreground"
                                : "border-border text-foreground/75 hover:border-foreground/30"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-2">
                  {stylists.map((s) => {
                    const selected = form.stylist === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => set("stylist", s.id)}
                        aria-pressed={selected}
                        className={`flex items-center justify-between border px-5 py-4 text-left transition-all duration-300 ${
                          selected
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div>
                          <p className="font-heading text-xl font-light text-foreground">
                            {s.name}
                          </p>
                          <p className="font-body text-[11px] uppercase tracking-luxe text-muted-foreground">
                            {s.role}
                          </p>
                        </div>
                        {selected && (
                          <Check size={16} className="text-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 3 && (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (canContinue && !submitting) submit();
                  }}
                >
                  <Field label="Full Name">
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      maxLength={100}
                      required
                      className="field-input"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field
                    label="Email"
                    hint={
                      touched.email &&
                      emailInvalid &&
                      "Please enter a valid email address."
                    }
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      onBlur={() => touch("email")}
                      autoComplete="email"
                      inputMode="email"
                      required
                      aria-invalid={touched.email && emailInvalid}
                      className="field-input"
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field
                    label="Phone"
                    hint={
                      touched.phone &&
                      phoneInvalid &&
                      "Please enter a phone number we can reach you on."
                    }
                  >
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      onBlur={() => touch("phone")}
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={40}
                      required
                      aria-invalid={touched.phone && phoneInvalid}
                      className="field-input"
                      placeholder="+971 5X XXX XXXX"
                    />
                  </Field>
                  <Field label="Notes (optional)">
                    <textarea
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      rows={3}
                      maxLength={1000}
                      className="field-input resize-none"
                      placeholder="Allergies, inspiration, anything we should know"
                    />
                  </Field>
                  {/* Lets Enter submit from any field. */}
                  <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
                </form>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-5 sm:px-8 sm:py-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex min-h-11 items-center gap-1 font-body text-[11px] uppercase tracking-luxe text-foreground/70 transition-colors hover:text-foreground disabled:invisible"
              >
                <ChevronLeft size={14} /> Back
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className="flex min-h-11 items-center gap-1 bg-foreground px-7 py-3 font-body text-[11px] uppercase tracking-luxe text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canContinue || submitting}
                  className="min-h-11 bg-accent-strong px-7 py-3 font-body text-[11px] uppercase tracking-luxe text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Saving request…" : "Send request"}
                </button>
              )}
            </div>
          </>
        )}
      </aside>

      {error && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] rounded-md border border-destructive bg-destructive p-6 pr-8 text-destructive-foreground shadow-lg md:max-w-[420px]"
        >
          <p className="font-body text-sm font-semibold">Could not save request</p>
          <p className="mt-1 font-body text-sm opacity-90">{error}</p>
        </div>
      )}
    </>
  );
}
