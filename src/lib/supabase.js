export const SUPABASE_URL = "https://wwkmcswcnroimwaiqqoe.supabase.co";
export const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3a21jc3djbnJvaW13YWlxcW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzIyNTUsImV4cCI6MjA4ODIwODI1NX0.Ky87Fia1y2I10AFEj_cxS6lrFd42Ct2k460qWQdmxn8";
export const sbHeaders = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON,
  "Authorization": `Bearer ${SUPABASE_ANON}`,
};

export function formatTime(ts) {
  if (!ts) return "";
  const s = typeof ts === "string" ? ts.replace(" ", "T").replace(/(\+00:00|Z)?$/, "Z") : ts;
  const d = new Date(s);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
}
