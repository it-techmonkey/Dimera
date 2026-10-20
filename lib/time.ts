/** The salon runs on Dubai time regardless of where the visitor is. */
const SALON_TZ = "Asia/Dubai";

/** Today's date at the salon, as YYYY-MM-DD. */
export const salonToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: SALON_TZ });

/** The current time at the salon, as HH:MM (24h). */
export const salonNow = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: SALON_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

/** True when a slot on `date` has already started (only possible today). */
export const isPastSlot = (date: string, time: string) =>
  date === salonToday() && time <= salonNow();

/** "2026-10-21" → "Wednesday, 21 October". */
export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
