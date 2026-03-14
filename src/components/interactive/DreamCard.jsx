import { useState } from "react";
import { SUPABASE_URL, sbHeaders } from "../../lib/supabase";
import Fade from "../ui/Fade";

export const CARD_BACKGROUNDS = [
  { id: "night",   label: "Night Sky",   style: { background: "linear-gradient(180deg,#0a0a1a 0%,#1a1a3e 50%,#2a1a2e 100%)" },   accent: "#c4b5fd" },
  { id: "sunrise", label: "Sunrise",     style: { background: "linear-gradient(180deg,#1a1a3e 0%,#ff6b35 40%,#ffa07a 70%,#ffd4a0 100%)" }, accent: "#ffa07a" },
  { id: "forest",  label: "Forest",      style: { background: "linear-gradient(180deg,#1a3a1a 0%,#2d6a2d 40%,#4a8c3a 70%,#6aaa50 100%)" }, accent: "#86efac" },
  { id: "ocean",   label: "Ocean",       style: { background: "linear-gradient(180deg,#0a1628 0%,#1a3a5c 40%,#2a6a8c 70%,#4a9ab8 100%)" }, accent: "#7dd3fc" },
  { id: "golden",  label: "Golden Hour", style: { background: "linear-gradient(180deg,#2a1a0a 0%,#8c4a0a 30%,#d4843a 60%,#f5c842 100%)" }, accent: "#fde68a" },
  { id: "sakura",  label: "Sakura",      style: { background: "linear-gradient(180deg,#fce4ec 0%,#f8bbd9 40%,#f48fb1 70%,#e91e8c 100%)" }, accent: "#fda4af" },
  { id: "desert",  label: "Desert Dusk", style: { background: "linear-gradient(180deg,#3a1a0a 0%,#8c5a1a 35%,#c4843a 60%,#e8c070 100%)" }, accent: "#fbbf24" },
  { id: "aurora",  label: "Aurora",      style: { background: "linear-gradient(180deg,#030a1a 0%,#0a2a1a 30%,#1a4a2a 55%,#2a6a4a 75%,#4a8a6a 100%)" }, accent: "#6ee7b7" },
];

export function DreamCard({ scene, emoji, title, desc, quote }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.1)", background: "white", display: "flex", flexDirection: "column", transition: "transform 0.3s,box-shadow 0.3s", borderBottom: "3px solid #d4a843", height: "100%" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      <div style={{ height: 120, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {scene}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, background: "linear-gradient(transparent,white)", zIndex: 10 }} />
      </div>
      <div style={{ padding: "14px 18px 20px", flex: 1 }}>
        <div style={{ fontSize: "1.6rem", display: "block", marginBottom: 6 }}>{emoji}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.94rem", color: "#2c1810", marginBottom: 6, fontWeight: 600 }}>{title}</div>
        {quote && (
          <div style={{ borderLeft: "3px solid #d4a843", paddingLeft: 10, marginBottom: 8, background: "rgba(212,168,67,0.06)", borderRadius: "0 6px 6px 0", padding: "7px 10px 7px 12px" }}>
            <p style={{ fontSize: "0.78rem", color: "#8a6a2a", lineHeight: 1.65, margin: 0, fontStyle: "italic", fontFamily: "'Playfair Display',serif" }}>{quote}</p>
          </div>
        )}
        <p style={{ fontSize: "0.82rem", color: "#6b4c3b", lineHeight: 1.72, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export function CustomDreamCardBuilder({ cards, onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [emoji, setEmoji] = useState("🌟");
  const [bgId, setBgId] = useState("night");
  const [pwd, setPwd] = useState("");
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [delPwd, setDelPwd] = useState("");
  const [delTarget, setDelTarget] = useState(null);
  const bg = CARD_BACKGROUNDS.find(b => b.id === bgId);

  const handleAdd = async () => {
    if (pwd !== "Hana") { alert("Wrong password"); setPwd(""); return; }
    setSaving(true);
    const newCard = { id: Date.now(), title, desc, emoji, bgId };
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/dreams`, {
        method: "POST",
        headers: { ...sbHeaders, "Prefer": "return=representation" },
        body: JSON.stringify({ id: newCard.id, title: newCard.title, description: newCard.desc, emoji: newCard.emoji, bg_id: newCard.bgId }),
      });
      if (!r.ok) throw new Error(await r.text());
      onAdd([...cards, newCard]);
      setTitle(""); setDesc(""); setEmoji("🌟"); setBgId("night"); setPwd(""); setStep(1); setOpen(false);
    } catch (e) { console.error(e); alert("Could not save, try again"); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (delPwd !== "Hana") { alert("Wrong password"); setDelPwd(""); return; }
    setDeleting(id);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/dreams?id=eq.${id}`, { method: "DELETE", headers: sbHeaders });
      if (!r.ok) throw new Error(await r.text());
      onAdd(cards.filter(c => c.id !== id));
      setDelTarget(null); setDelPwd("");
    } catch (e) { console.error(e); alert("Could not delete, try again"); }
    setDeleting(null);
  };

  return (
    <>
      {cards.map((card, i) => {
        const cbg = CARD_BACKGROUNDS.find(b => b.id === card.bgId) || CARD_BACKGROUNDS[0];
        return (
          <Fade key={card.id} delay={i * 0.05}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.1)", background: "white", display: "flex", flexDirection: "column", transition: "transform 0.3s,box-shadow 0.3s", borderBottom: `3px solid ${cbg.accent}`, height: "100%", position: "relative" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ height: 120, position: "relative", overflow: "hidden", flexShrink: 0, ...cbg.style }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, background: "linear-gradient(transparent,white)", zIndex: 10 }} />
              </div>
              <div style={{ padding: "14px 18px 20px", flex: 1 }}>
                <div style={{ fontSize: "1.6rem", display: "block", marginBottom: 6 }}>{card.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.94rem", color: "#2c1810", marginBottom: 6, fontWeight: 600 }}>{card.title}</div>
                <p style={{ fontSize: "0.82rem", color: "#6b4c3b", lineHeight: 1.72, margin: 0 }}>{card.desc}</p>
              </div>
              {delTarget === card.id ? (
                <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(212,168,67,0.15)", display: "flex", flexDirection: "column", gap: 6 }}>
                  <input type="password" value={delPwd} onChange={e => setDelPwd(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleDelete(card.id); if (e.key === "Escape") { setDelTarget(null); setDelPwd(""); } }} placeholder="password" autoFocus style={{ border: "1px solid #d4a843", borderRadius: 8, padding: "5px 10px", fontSize: "0.82rem", outline: "none", textAlign: "center" }} />
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => handleDelete(card.id)} disabled={deleting === card.id} style={{ flex: 1, background: "#c0392b", color: "white", border: "none", borderRadius: 8, padding: "5px", fontSize: "0.78rem", cursor: "pointer" }}>{deleting === card.id ? "..." : "Delete"}</button>
                    <button onClick={() => { setDelTarget(null); setDelPwd(""); }} style={{ flex: 1, background: "#888", color: "white", border: "none", borderRadius: 8, padding: "5px", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setDelTarget(card.id)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.35)", border: "none", color: "white", width: 24, height: 24, borderRadius: "50%", cursor: "pointer", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>✕</button>
              )}
            </div>
          </Fade>
        );
      })}

      <div style={{ gridColumn: "1/-1", marginTop: 6 }}>
        {!open ? (
          <button onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto", background: "rgba(255,255,255,0.08)", border: "2px dashed rgba(212,168,67,0.45)", color: "#d4a843", padding: "14px 28px", borderRadius: 16, cursor: "pointer", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.95rem", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(212,168,67,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
            <span style={{ fontSize: "1.3rem" }}>＋</span> Add your own dream
          </button>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(212,168,67,0.25)", maxWidth: 560, margin: "0 auto" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#d4a843", fontSize: "1rem", marginBottom: 20, textAlign: "center" }}>Create a dream ✨</p>
            {step === 1 && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Emoji</label>
                  <input value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={4} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: "1.4rem", width: 70, outline: "none", textAlign: "center" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Title</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} maxLength={60} placeholder="Name this dream..." style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: "0.95rem", outline: "none", fontFamily: "'Lora',serif", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Description</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} maxLength={300} rows={3} placeholder="What does this dream look like..." style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: "0.9rem", outline: "none", resize: "none", fontFamily: "'Lora',serif", lineHeight: 1.7, boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Card Background</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                    {CARD_BACKGROUNDS.map(b => (
                      <button key={b.id} onClick={() => setBgId(b.id)} style={{ ...b.style, borderRadius: 10, padding: "20px 8px 8px", border: bgId === b.id ? `2px solid ${b.accent}` : "2px solid transparent", cursor: "pointer", textAlign: "center", boxShadow: bgId === b.id ? `0 0 12px ${b.accent}60` : "none", transition: "all 0.2s" }}>
                        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.9)", fontFamily: "'Lora',serif", letterSpacing: "0.03em" }}>{b.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {title && (
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Preview</label>
                    <div style={{ maxWidth: 180, borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", border: `2px solid ${bg.accent}50` }}>
                      <div style={{ ...bg.style, height: 75, position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 28, background: "linear-gradient(transparent,white)" }} />
                      </div>
                      <div style={{ background: "white", padding: "10px 12px" }}>
                        <div style={{ fontSize: "1.2rem", marginBottom: 3 }}>{emoji}</div>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.8rem", color: "#2c1810", fontWeight: 600, marginBottom: 3 }}>{title}</div>
                        <p style={{ fontSize: "0.7rem", color: "#6b4c3b", lineHeight: 1.6, margin: 0 }}>{desc.slice(0, 70)}{desc.length > 70 ? "..." : ""}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={() => { setOpen(false); setStep(1); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontFamily: "'Lora',serif", fontSize: "0.88rem" }}>Cancel</button>
                  <button onClick={() => setStep(2)} disabled={!title.trim() || !desc.trim()} style={{ background: "#d4a843", border: "none", color: "#2c1810", padding: "10px 24px", borderRadius: 12, cursor: "pointer", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.92rem", fontWeight: 600, opacity: !title.trim() || !desc.trim() ? 0.4 : 1 }}>Next →</button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textAlign: "center", marginBottom: 16, fontStyle: "italic", fontFamily: "'Lora',serif" }}>Enter password to add this dream</p>
                <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setStep(1); }} placeholder="password" autoFocus style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212,168,67,0.4)", borderRadius: 10, padding: "12px 16px", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box", marginBottom: 16, textAlign: "center", letterSpacing: "0.2em" }} />
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={() => setStep(1)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontFamily: "'Lora',serif", fontSize: "0.88rem" }}>Back</button>
                  <button onClick={handleAdd} disabled={saving || !pwd} style={{ background: "#d4a843", border: "none", color: "#2c1810", padding: "10px 28px", borderRadius: 12, cursor: "pointer", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.92rem", fontWeight: 600, opacity: saving || !pwd ? 0.4 : 1 }}>{saving ? "Saving..." : "Add Dream ✨"}</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
