import { NextResponse } from "next/server";
import { menuItems, stylists, timeSlots } from "@/lib/data";
import { getSql } from "@/lib/db";
import { isPastSlot, salonToday } from "@/lib/time";

type Reservation = {
  service: string;
  stylist: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date (rejects 2030-99-99, 2030-02-31). */
function isRealDate(value: string) {
  if (!datePattern.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function validate(body: Partial<Reservation>): string | null {
  if (!menuItems.some((s) => s.id === body.service)) return "Please choose a service.";
  if (!stylists.some((s) => s.id === body.stylist)) return "Please choose an artisan.";
  if (!body.appointment_date || !isRealDate(body.appointment_date))
    return "Please choose a valid date.";
  if (body.appointment_date < salonToday())
    return "Please choose a date that is not in the past.";
  if (!body.appointment_time || !timeSlots.includes(body.appointment_time))
    return "Please choose a valid time.";
  if (isPastSlot(body.appointment_date, body.appointment_time))
    return "That time has already passed today. Please choose a later one.";
  const name = body.name?.trim();
  if (!name || name.length > 100) return "Please enter your name.";
  if (!body.email || body.email.length > 254 || !emailPattern.test(body.email))
    return "Please enter a valid email.";
  const phone = body.phone?.trim();
  if (!phone || phone.length > 40 || phone.replace(/\D/g, "").length < 7)
    return "Please enter your phone number.";
  if ((body.notes?.length ?? 0) > 1000) return "Notes are too long.";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<Reservation>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const problem = validate(body);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  try {
    const sql = getSql();
    const [row] = await sql`
      INSERT INTO reservations
        (service, stylist, appointment_date, appointment_time, name, email, phone, notes)
      VALUES
        (${body.service}, ${body.stylist}, ${body.appointment_date}, ${body.appointment_time},
         ${body.name!.trim()}, ${body.email}, ${body.phone!.trim()}, ${body.notes?.trim() || null})
      RETURNING id
    `;
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (error) {
    console.error("[reservation] could not save", error);
    return NextResponse.json(
      { error: "We couldn't save your reservation. Please try again in a moment." },
      { status: 500 },
    );
  }
}
