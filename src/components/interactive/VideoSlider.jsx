import { useState, useRef, useCallback, useEffect } from "react";
import { SUPABASE_URL, sbHeaders } from "../../lib/supabase";

export default function VideoSlider() {
  const DEFAULT_VIDEOS = [
    { id: "JZtnlFuytrA", isShort: false },
    { id: "d-prAggDs9Q", isShort: true },
    { id: "qylISCGkX1Y", isShort: true },
    { id: "IqByc5c9OwI", isShort: true },
  ];

  const extractId = (input) => {
    try {
      const url = new URL(input);
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const parts = url.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1];
    } catch (e) { return input.trim(); }
  };

  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const dragStart = useRef(null);

  const titleClicks = useRef(0);
  const titleTimer = useRef(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIsShort, setNewIsShort] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminDeleting, setAdminDeleting] = useState(null);

  const loadVideos = useCallback(async () => {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/video_links?select=*&order=id.asc`, { headers: sbHeaders });
      if (r.ok) { const data = await r.json(); if (Array.isArray(data) && data.length > 0) setVideos(data.map(d => ({ id: d.video_id, isShort: d.is_short, dbId: d.id }))); }
    } catch (e) {}
  }, []);

  useEffect(() => { loadVideos(); }, [loadVideos]);

  const handleTitleClick = () => {
    titleClicks.current += 1;
    clearTimeout(titleTimer.current);
    titleTimer.current = setTimeout(() => { titleClicks.current = 0; }, 800);
    if (titleClicks.current >= 3) { titleClicks.current = 0; setAdminOpen(true); }
  };

  const adminAdd = async () => {
    if (!newUrl.trim()) return;
    setAdminSaving(true);
    const videoId = extractId(newUrl);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/video_links`, { method: "POST", headers: { ...sbHeaders, "Prefer": "return=minimal" }, body: JSON.stringify({ video_id: videoId, is_short: newIsShort }) });
      if (r.ok) { setNewUrl(""); await loadVideos(); alert("Added! ✨"); }
      else alert("Failed: " + r.status);
    } catch (e) { alert("Error: " + e.message); }
    setAdminSaving(false);
  };

  const adminDelete = async (dbId) => {
    setAdminDeleting(dbId);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/video_links?id=eq.${dbId}`, { method: "DELETE", headers: sbHeaders });
      if (r.ok) { await loadVideos(); alert("Deleted!"); }
      else alert("Failed: " + r.status);
    } catch (e) { alert("Error: " + e.message); }
    setAdminDeleting(null);
  };

  const prev = () => setIdx(i => (i - 1 + videos.length) % videos.length);
  const next = () => setIdx(i => (i + 1) % videos.length);
  const onTouchStart = e => { dragStart.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (dragStart.current === null) return;
    const dx = e.changedTouches[0].clientX - dragStart.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    dragStart.current = null;
  };

  const v = videos[idx] || videos[0];
  if (!v) return null;
  const thumb = `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`;

  return (
    <>
      <p onClick={handleTitleClick} style={{ fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d4a843", marginBottom: 10, fontFamily: "'Playfair Display',serif", cursor: "default", userSelect: "none" }}>A little something</p>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.5rem,4vw,2.2rem)", color: "white", marginBottom: 28, textShadow: "0 0 30px rgba(255,182,193,0.3)" }}>For you 🌸</h2>

      <div style={{ position: "relative" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div onClick={() => setOpen(true)} style={{ position: "relative", cursor: "pointer", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.7)", aspectRatio: v.isShort ? "9/16" : "460/409", maxWidth: v.isShort ? 260 : 380, margin: "0 auto" }}>
          <img src={thumb} alt="thumbnail" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.08)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid rgba(255,255,255,0.85)", marginLeft: 3 }} />
          </div>
        </div>
        <button onClick={prev} style={{ position: "absolute", left: "max(-16px, -4vw)", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 34, height: 34, borderRadius: "50%", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", zIndex: 10 }}>‹</button>
        <button onClick={next} style={{ position: "absolute", right: "max(-16px, -4vw)", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 34, height: 34, borderRadius: "50%", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", zIndex: 10 }}>›</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {videos.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 18 : 7, height: 7, borderRadius: 4, background: i === idx ? "#d4a843" : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.3s" }} />
        ))}
      </div>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: v.isShort ? 360 : 700, position: "relative" }}>
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "1.4rem", cursor: "pointer", padding: "4px 10px" }}>✕</button>
            <div style={{ position: "relative", paddingBottom: v.isShort ? "177.78%" : "56.25%", borderRadius: 16, overflow: "hidden" }}>
              <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`} title="video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
          </div>
        </div>
      )}

      {adminOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 28, width: "100%", maxWidth: 380, border: "1px solid rgba(212,168,67,0.3)", maxHeight: "85vh", overflowY: "auto" }}>
            <p style={{ color: "#d4a843", fontFamily: "'Playfair Display',serif", fontSize: "1rem", marginBottom: 16, textAlign: "center" }}>🔒 Video Admin</p>
            {!adminAuthed ? (
              <>
                <input type="password" placeholder="Password" value={adminPwd} onChange={e => setAdminPwd(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { if (adminPwd === "Hana") setAdminAuthed(true); else alert("Wrong password"); } }} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(212,168,67,0.4)", background: "rgba(255,255,255,0.07)", color: "white", fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", boxSizing: "border-box", marginBottom: 12 }} autoFocus />
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { if (adminPwd === "Hana") setAdminAuthed(true); else alert("Wrong password"); }} style={{ flex: 1, padding: "10px", borderRadius: 10, background: "#d4a843", border: "none", color: "#1a0a2e", fontWeight: 600, fontFamily: "'Playfair Display',serif" }}>Enter</button>
                  <button onClick={() => { setAdminOpen(false); setAdminPwd(""); }} style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "none", color: "white", fontFamily: "'Playfair Display',serif" }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: 12, fontFamily: "'Playfair Display',serif" }}>Current videos ({videos.length}):</p>
                {videos.map((vid, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <img src={`https://img.youtube.com/vi/${vid.id}/default.jpg`} alt="" loading="lazy" style={{ width: 48, height: 36, borderRadius: 6, objectFit: "cover" }} />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", flex: 1, fontFamily: "monospace" }}>{vid.id} {vid.isShort ? "(Short)" : "(Video)"}</span>
                    {vid.dbId && <button onClick={() => adminDelete(vid.dbId)} disabled={adminDeleting === vid.dbId} style={{ padding: "4px 10px", borderRadius: 8, background: "#c0392b", border: "none", color: "white", fontSize: "0.72rem" }}>{adminDeleting === vid.dbId ? "..." : "Del"}</button>}
                  </div>
                ))}
                <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="YouTube URL or video ID" style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(212,168,67,0.3)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "0.85rem", boxSizing: "border-box", marginBottom: 10, fontFamily: "monospace" }} />
                  <label style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", marginBottom: 12, cursor: "pointer", fontFamily: "'Playfair Display',serif" }}>
                    <input type="checkbox" checked={newIsShort} onChange={e => setNewIsShort(e.target.checked)} style={{ width: 16, height: 16 }} />
                    This is a YouTube Short (portrait)
                  </label>
                  <button onClick={adminAdd} disabled={adminSaving || !newUrl.trim()} style={{ width: "100%", padding: "10px", borderRadius: 10, background: "rgba(212,168,67,0.2)", border: "1.5px dashed rgba(212,168,67,0.5)", color: "#d4a843", fontSize: "0.9rem", fontFamily: "'Playfair Display',serif" }}>{adminSaving ? "Adding..." : "+ Add video"}</button>
                </div>
                <button onClick={() => { setAdminOpen(false); setAdminAuthed(false); setAdminPwd(""); }} style={{ marginTop: 10, width: "100%", padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "'Playfair Display',serif" }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
