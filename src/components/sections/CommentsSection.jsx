import { useState, useEffect } from "react";
import { SUPABASE_URL, sbHeaders, formatTime } from "../../lib/supabase";

function CommentCard({ m, onDeleted, showToast }) {
  const [asking, setAsking] = useState(false);
  const [pwd, setPwd] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (pwd !== "Hana") { showToast("Wrong password ✕"); setPwd(""); return; }
    setDeleting(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${m.id}`, { method: "DELETE", headers: { ...sbHeaders, "Prefer": "return=representation" } });
      if (r.status === 200 || r.status === 204) { showToast("Deleted 🍃"); setAsking(false); setPwd(""); onDeleted(); }
      else { showToast("Could not delete - check Supabase policies"); }
    } catch (e) { showToast("Could not delete - try again"); }
    setDeleting(false);
  };

  return (
    <div style={{ background: "white", borderRadius: 14, padding: "20px 24px", marginBottom: 16, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", borderLeft: `3px solid ${m.author === "Her" ? "#5a8c4a" : "#d4a843"}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.85rem", color: m.author === "Her" ? "#5a8c4a" : "#d4a843" }}>{m.author === "Her" ? "Bushra ❤️" : "Aamir 💛"}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "0.72rem", color: "#c4a98a", fontStyle: "italic" }}>{formatTime(m.created_at)}</span>
          {!asking && (<button onClick={() => setAsking(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#c4a98a", padding: "2px 6px", borderRadius: 6, opacity: 0.6 }} title="Delete">✕</button>)}
        </div>
      </div>
      <div style={{ fontSize: "0.95rem", color: "#6b4c3b", lineHeight: 1.85, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{m.text}</div>
      {asking && (
        <div style={{ marginTop: 14, padding: "12px 14px", background: "#fef9f0", borderRadius: 10, border: "1px solid rgba(212,168,67,0.25)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b4c3b", fontStyle: "italic" }}>Enter password to delete:</span>
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleDelete(); if (e.key === "Escape") { setAsking(false); setPwd(""); } }} placeholder="password" autoFocus style={{ border: "1px solid rgba(212,168,67,0.4)", borderRadius: 20, padding: "4px 12px", fontSize: "0.85rem", outline: "none", fontFamily: "'Lora',serif", width: 130 }} />
          <button onClick={handleDelete} disabled={deleting} style={{ background: "#c0392b", color: "white", border: "none", borderRadius: 20, padding: "4px 14px", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>{deleting ? "..." : "Delete"}</button>
          <button onClick={() => { setAsking(false); setPwd(""); }} style={{ background: "none", border: "1px solid #ccc", borderRadius: 20, padding: "4px 12px", fontSize: "0.8rem", cursor: "pointer", color: "#888" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default function CommentsSection() {
  const [name, setName] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=ts.desc`, { headers: sbHeaders });
      const data = await r.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch { setMessages([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!text.trim() || !name || saving) return;
    setSaving(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/comments`, { method: "POST", headers: { ...sbHeaders, "Prefer": "return=representation" }, body: JSON.stringify({ text: text.trim(), author: name }) });
      if (r.ok) { setText(""); showToast(name === "Her" ? "Her words are saved 💚" : "Your words are saved 💛"); load(); }
      else { showToast("Could not save - try again 🍃"); }
    } catch { showToast("Could not save - try again 🍃"); }
    setSaving(false);
  };

  return (
    <div style={{ background: "linear-gradient(180deg,#f0f7e8 0%,#fef9f0 100%)", padding: "80px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
          {[["Her", "Bushra's notes ❤️"], ["Him", "Aamir's notes 💛"]].map(([val, label]) => (
            <button key={val} onClick={() => setName(n => n === val ? null : val)} style={{ padding: "10px 26px", borderRadius: 40, border: `2px solid ${name === val ? "#2c1810" : "#d4a843"}`, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.95rem", cursor: "pointer", background: name === val ? "#2c1810" : "white", color: name === val ? "#fef9f0" : "#2c1810" }}>{label}</button>
          ))}
        </div>

        {name === "Her" && (
          <div style={{ marginBottom: 40, position: "relative" }}>
            <div style={{ position: "absolute", top: 18, left: 0, right: 0, display: "flex", justifyContent: "space-around", paddingLeft: 48, paddingRight: 24, zIndex: 10, pointerEvents: "none" }}>
              {[0,1,2,3,4,5,6,7].map(i => (<div key={i} style={{ width: 18, height: 18, borderRadius: "50%", border: "3px solid #c9a96e", background: "#fef9f0", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />))}
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 44, background: "linear-gradient(90deg,#e8b4b8 0%,#f0c8cc 60%,#f8dde0 100%)", borderRadius: "16px 0 0 16px", boxShadow: "inset -2px 0 8px rgba(0,0,0,0.08)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 52, left: 64, bottom: 20, width: 2, background: "rgba(220,80,80,0.35)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ background: "#fffef5", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.12),4px 4px 0 #c9a96e", overflow: "hidden", position: "relative", paddingTop: 44 }}>
              <div style={{ padding: "8px 24px 24px 70px", position: "relative", zIndex: 3 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.78rem", color: "#c4a98a", marginBottom: 8, letterSpacing: "0.08em" }}>your notes, Bushra ❤️</p>
                <textarea value={text} onChange={e => setText(e.target.value.slice(0, 1000))} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} placeholder={"Write anything on your mind 💚"} rows={8} style={{ width: "100%", border: "none", outline: "none", fontFamily: "'Lora',serif", fontSize: "16px", color: "#2c1810", background: "transparent", resize: "none", lineHeight: 1.8 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 12, borderTop: "1px dashed rgba(212,168,67,0.3)" }}>
                  <span style={{ fontSize: "0.78rem", color: "#c4a98a", fontStyle: "italic" }}>{text.length} / 1000</span>
                  <button onClick={submit} disabled={saving || !text.trim()} style={{ background: "#5a8c4a", color: "#fef9f0", border: "none", padding: "10px 24px", borderRadius: 40, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.92rem", cursor: "pointer", opacity: saving || !text.trim() ? 0.45 : 1 }}>{saving ? "Saving..." : "Leave your words 🍃"}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {name === "Him" && (
          <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 4px 40px rgba(0,0,0,0.07)", border: "1.5px solid rgba(212,168,67,0.2)", marginBottom: 40 }}>
            <textarea value={text} onChange={e => setText(e.target.value.slice(0, 1000))} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} placeholder={"💛"} rows={5} style={{ width: "100%", border: "none", outline: "none", fontFamily: "'Lora',serif", fontSize: "16px", color: "#2c1810", background: "transparent", resize: "none", lineHeight: 1.8 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(212,168,67,0.2)" }}>
              <span style={{ fontSize: "0.78rem", color: "#c4a98a", fontStyle: "italic" }}>{text.length} / 1000</span>
              <button onClick={submit} disabled={saving || !text.trim()} style={{ background: "#2c1810", color: "#fef9f0", border: "none", padding: "10px 24px", borderRadius: 40, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.92rem", cursor: "pointer", opacity: saving || !text.trim() ? 0.45 : 1 }}>{saving ? "Saving..." : "Leave your words ✦"}</button>
            </div>
          </div>
        )}

        {loading
          ? <p style={{ textAlign: "center", color: "#c4a98a", fontStyle: "italic" }}>Loading...</p>
          : messages.length === 0
            ? <p style={{ textAlign: "center", color: "#c4a98a", fontStyle: "italic" }}></p>
            : messages.map((m, i) => (<CommentCard key={m.id || i} m={m} onDeleted={load} showToast={showToast} />))}
      </div>
      {toast && <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#2c1810", color: "#fef9f0", padding: "12px 28px", borderRadius: 40, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.9rem", zIndex: 9999 }}>{toast}</div>}
    </div>
  );
}
