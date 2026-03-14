// ScratchCardSection — exact copy from original app.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SUPABASE_URL, SUPABASE_ANON, sbHeaders } from "../../lib/supabase";

export default function ScratchCardSection() {
  const BUCKET = "scratch";
  const SCRATCH_CACHE_KEY = "hana_scratch_cache";
  const SCRATCH_CACHE_TTL = 10 * 60 * 1000;

  const shuffle = arr => {
    const a = [...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  };

  const readCache = () => {
    try {
      const raw = localStorage.getItem(SCRATCH_CACHE_KEY);
      if(!raw) return null;
      const {urls, ts} = JSON.parse(raw);
      if(Date.now() - ts < SCRATCH_CACHE_TTL && urls?.length > 0) return urls;
    } catch(e){}
    return null;
  };
  const writeCache = (urls) => {
    try { localStorage.setItem(SCRATCH_CACHE_KEY, JSON.stringify({urls, ts:Date.now()})); } catch(e){}
  };
  const clearScratchCache = () => {
    try { localStorage.removeItem(SCRATCH_CACHE_KEY); } catch(e){}
  };

  const cached = readCache();
  const [photos, setPhotos] = useState(cached || []);
  const [photosLoading, setPhotosLoading] = useState(!cached);

  // Query scratch_photos table — dead simple, 100% reliable
  const loadScratchPhotos = useCallback(async (bustCache=false) => {
    if(!bustCache){
      const hit = readCache();
      if(hit){ setPhotos(hit); setPhotosLoading(false); preloadImages(hit); return; }
    }
    setPhotosLoading(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/scratch_photos?select=url&order=id.asc`, {
        headers: sbHeaders,
      });
      if(r.ok){
        const data = await r.json();
        if(Array.isArray(data) && data.length > 0){
          const urls = data.map(d => d.url);
          writeCache(urls);
          setPhotos(urls);
          preloadImages(urls);
        }
      }
    } catch(e){}
    setPhotosLoading(false);
  }, []);

  const preloadImages = (urls) => {
    urls.forEach(u => { const img = new Image(); img.src = u; });
  };

  useEffect(() => {
    clearScratchCache();
    loadScratchPhotos(true);
  }, []);

  const [round, setRound] = useState(null);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [scratching, setScratching] = useState(false);
  const [percent, setPercent] = useState(0);
  const [photoReady, setPhotoReady] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const hasStarted = useRef(false);
  const lastPos = useRef(null);
  const checkInterval = useRef(0);
  const revealLock = useRef(false);

  useEffect(() => {
    if(photos.length > 0){
      setRound(shuffle(photos.map((_,i)=>i)));
      setPos(0); setRevealed(false); setAllDone(false);
    }
  }, [photos]);

  const currentPhoto = round ? photos[round[pos % round.length]] : null;

  const photoReadyTimer = useRef(null);
  const cardKey = `${pos}-${round ? round[pos % (round.length||1)] : 0}`;

  useEffect(() => {
    clearTimeout(photoReadyTimer.current);
    setPhotoReady(false);
    // Always unlock after 1.5s max — no matter what
    photoReadyTimer.current = setTimeout(() => setPhotoReady(true), 1500);
    // Also unlock immediately if image already cached
    if(currentPhoto) {
      const img = new Image();
      img.onload = () => { clearTimeout(photoReadyTimer.current); setPhotoReady(true); };
      img.onerror = () => { clearTimeout(photoReadyTimer.current); setPhotoReady(true); };
      img.src = currentPhoto;
    }
    return () => clearTimeout(photoReadyTimer.current);
  }, [cardKey]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0,0,W,H);

    // ── Sky ──
    const sky = ctx.createLinearGradient(0,0,0,H*0.72);
    sky.addColorStop(0,"#b8d4f0");
    sky.addColorStop(0.4,"#d8eaf8");
    sky.addColorStop(0.75,"#fde8c8");
    sky.addColorStop(1,"#f9c5a0");
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.72);

    // ── Sun ──
    const sunG = ctx.createRadialGradient(W*0.78,H*0.14,0,W*0.78,H*0.14,W*0.13);
    sunG.addColorStop(0,"rgba(255,240,160,1)");
    sunG.addColorStop(0.5,"rgba(255,210,100,0.7)");
    sunG.addColorStop(1,"rgba(255,200,80,0)");
    ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H*0.5);
    ctx.fillStyle="#fff7b0"; ctx.globalAlpha=0.95;
    ctx.beginPath(); ctx.arc(W*0.78,H*0.14,W*0.07,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;

    // ── Clouds ──
    const cloud = (cx,cy,w,h,alpha) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle="#fff";
      const rx=w/2, ry=h/2;
      [[-rx*0.5,-ry*0.1,rx*0.55,ry*0.7],[0,-ry*0.5,rx*0.65,ry*0.8],[rx*0.5,-ry*0.1,rx*0.5,ry*0.65],[0,ry*0.15,rx*0.9,ry*0.55]].forEach(([dx,dy,rw,rh])=>{
        ctx.beginPath(); ctx.ellipse(cx+dx,cy+dy,rw,rh,0,0,Math.PI*2); ctx.fill();
      });
      ctx.restore();
    };
    cloud(W*0.12,H*0.1, W*0.28,H*0.1, 0.92);
    cloud(W*0.42,H*0.07, W*0.22,H*0.08, 0.80);
    cloud(W*0.72,H*0.28, W*0.18,H*0.07, 0.70);
    cloud(W*0.88,H*0.12, W*0.16,H*0.07, 0.60);

    // ── Birds (V-shape silhouettes) ──
    const bird = (x,y,s) => {
      ctx.save(); ctx.strokeStyle="rgba(50,35,20,0.75)";
      ctx.lineWidth=s*0.22; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(x,y);
      ctx.quadraticCurveTo(x-s*0.55,y-s*0.5,x-s*1.1,y+s*0.1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x,y);
      ctx.quadraticCurveTo(x+s*0.55,y-s*0.5,x+s*1.1,y+s*0.1); ctx.stroke();
      ctx.restore();
    };
    [[W*0.15,H*0.08,8],[W*0.22,H*0.05,6],[W*0.29,H*0.09,7],[W*0.19,H*0.14,5],[W*0.08,H*0.12,6],[W*0.35,H*0.06,5],[W*0.55,H*0.1,5],[W*0.61,H*0.07,4]].forEach(([x,y,s])=>bird(x,y,s));

    // ── Rolling hills ──
    const hill = (yBase,color,cp1x,cp1y,cp2x,cp2y) => {
      ctx.fillStyle=color;
      ctx.beginPath(); ctx.moveTo(0,H);
      ctx.lineTo(0,yBase);
      ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,W,yBase+H*0.04);
      ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    };
    hill(H*0.6,"#c8e6a0",W*0.2,H*0.5,W*0.7,H*0.56);
    hill(H*0.68,"#a8d880",W*0.25,H*0.6,W*0.65,H*0.64);
    hill(H*0.76,"#88c860",W*0.3,H*0.68,W*0.7,H*0.72);
    // Ground
    ctx.fillStyle="#6aae48"; ctx.fillRect(0,H*0.85,W,H*0.15);

    // ── Flowers ──
    const flower = (x,y,size,pc,cc,n=5) => {
      ctx.save();
      // Stem
      ctx.strokeStyle="#4a7a32"; ctx.lineWidth=size*0.14; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(x,y+size); ctx.lineTo(x,y); ctx.stroke();
      // Petals
      for(let i=0;i<n;i++){
        const a=(i/n)*Math.PI*2;
        ctx.fillStyle=pc; ctx.globalAlpha=0.88;
        ctx.beginPath();
        ctx.ellipse(x+Math.cos(a)*size*0.5,y+Math.sin(a)*size*0.5,size*0.3,size*0.17,a,0,Math.PI*2);
        ctx.fill();
      }
      // Centre
      ctx.globalAlpha=1; ctx.fillStyle=cc;
      ctx.beginPath(); ctx.arc(x,y,size*0.22,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.4)";
      ctx.beginPath(); ctx.arc(x-size*0.07,y-size*0.08,size*0.09,0,Math.PI*2); ctx.fill();
      ctx.restore();
    };

    // Background scattered flowers
    [[W*0.07,H*0.66,11,"#ffb3c6","#e84393"],[W*0.17,H*0.72,9,"#ffd6a5","#f0932b"],
     [W*0.27,H*0.69,10,"#fff3a3","#f9ca24"],[W*0.42,H*0.74,8,"#c3b1e1","#8e44ad"],
     [W*0.68,H*0.7,10,"#a8e6cf","#00b894"],[W*0.8,H*0.67,9,"#ffb3c6","#e84393"],
     [W*0.9,H*0.73,8,"#ffd6a5","#f0932b"],[W*0.52,H*0.78,9,"#fff3a3","#f9ca24"],
     [W*0.12,H*0.82,8,"#c3b1e1","#8e44ad"],[W*0.35,H*0.8,9,"#ffb3c6","#e84393"],
     [W*0.62,H*0.79,8,"#a8e6cf","#00b894"],[W*0.78,H*0.82,7,"#fff3a3","#f9ca24"],
    ].forEach(([x,y,s,p,c])=>flower(x,y,s,p,c,5));

    // Hero flowers centre-foreground
    flower(W*0.5,H*0.56,W*0.072,"#ffb3c6","#e84393",6);
    flower(W*0.36,H*0.62,W*0.05,"#fff3a3","#f9ca24",5);
    flower(W*0.64,H*0.61,W*0.048,"#c3b1e1","#8e44ad",5);

    // ── Sparkles ──
    [[W*0.32,H*0.2],[W*0.5,H*0.15],[W*0.66,H*0.22],[W*0.82,H*0.38]].forEach(([sx,sy])=>{
      [8,0].forEach((len,i)=>{
        if(len){
          ctx.save(); ctx.strokeStyle="rgba(255,255,200,0.8)"; ctx.lineWidth=1.2;
          [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
            ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+dx*len,sy+dy*len); ctx.stroke();
          });
          ctx.restore();
        } else {
          ctx.fillStyle="rgba(255,255,200,0.9)";
          ctx.globalAlpha=0.85;
          ctx.beginPath(); ctx.arc(sx,sy,1.8,0,Math.PI*2); ctx.fill();
          ctx.globalAlpha=1;
        }
      });
    });

    hasStarted.current = false;
    revealLock.current = false;
  }, []);

  useEffect(() => {
    isDrawing.current = false;
    lastPos.current = null;
    setRevealed(false);
    setScratching(false);
    setPercent(0);
    revealLock.current = false;
    initCanvas();
  }, [pos, round, initCanvas]);

  const doReveal = useCallback(() => {
    if(revealLock.current) return;
    revealLock.current = true;
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
    let opacity = 1;
    const fade = () => {
      opacity -= 0.08;
      if(opacity <= 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        setRevealed(true);
        return;
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = opacity;
      ctx.putImageData(snapshot,0,0);
      ctx.globalAlpha = 1;
      requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
  }, []);

  const handleNextTap = () => {
    if(!revealed) return;
    // If we're on the last card, start over
    if(pos >= photos.length - 1) {
      startOver();
      return;
    }
    setPos(p => p+1);
  };

  // Hidden admin — title tapped 5 times
  const titleTaps = useRef(0);
  const titleTapTimer = useRef(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminUploading, setAdminUploading] = useState(false);
  const [adminDeleting, setAdminDeleting] = useState(null);

  const handleTitleTap = () => {
    titleTaps.current += 1;
    clearTimeout(titleTapTimer.current);
    titleTapTimer.current = setTimeout(() => { titleTaps.current = 0; }, 1500);
    if(titleTaps.current >= 5){ titleTaps.current = 0; setAdminOpen(true); }
  };

  const adminUpload = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    setAdminUploading(true);
    try {
      // Resize to max 1200px before upload — same as memories section
      const compressed = await new Promise((resolve, reject) => {
        const img = new Image();
        const objUrl = URL.createObjectURL(file);
        img.onload = () => {
          try {
            const MAX = 1200;
            let w = img.width, h = img.height;
            if(w > MAX || h > MAX){ const ratio = Math.min(MAX/w, MAX/h); w = Math.round(w*ratio); h = Math.round(h*ratio); }
            const canvas = document.createElement("canvas");
            canvas.width = w; canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
            canvas.toBlob(blob => { URL.revokeObjectURL(objUrl); if(blob) resolve(blob); else reject(new Error("toBlob failed")); }, "image/jpeg", 0.82);
          } catch(err) { URL.revokeObjectURL(objUrl); reject(err); }
        };
        img.onerror = () => { URL.revokeObjectURL(objUrl); resolve(file); };
        img.src = objUrl;
      });
      const fileName = `scratch_${Date.now()}.jpg`;
      // 1. Upload resized file to storage
      const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`, {
        method:"POST",
        headers:{"apikey":SUPABASE_ANON,"Authorization":`Bearer ${SUPABASE_ANON}`,"Content-Type":"image/jpeg","x-upsert":"true"},
        body: compressed,
      });
      if(!r.ok){ alert("Upload failed: " + r.status); setAdminUploading(false); return; }
      // 2. Save URL to scratch_photos table
      const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
      const r2 = await fetch(`${SUPABASE_URL}/rest/v1/scratch_photos`, {
        method:"POST",
        headers:{...sbHeaders,"Content-Type":"application/json","Prefer":"return=minimal"},
        body: JSON.stringify({url}),
      });
      if(r2.ok){
        clearScratchCache();
        await loadScratchPhotos(true);
        alert("Uploaded! ✨");
      } else { alert("Saved to storage but table insert failed: " + r2.status); }
    } catch(err){ alert("Error: " + err.message); }
    setAdminUploading(false);
    e.target.value = "";
  };

  const adminDelete = async (url) => {
    const fileName = decodeURIComponent(url.split(`/public/${BUCKET}/`)[1]);
    setAdminDeleting(url);
    try {
      // 1. Delete from storage
      await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`, {
        method:"DELETE",
        headers:{"apikey":SUPABASE_ANON,"Authorization":`Bearer ${SUPABASE_ANON}`},
      });
      // 2. Delete from table
      const r2 = await fetch(`${SUPABASE_URL}/rest/v1/scratch_photos?url=eq.${encodeURIComponent(url)}`, {
        method:"DELETE",
        headers:{...sbHeaders},
      });
      if(r2.ok){ clearScratchCache(); await loadScratchPhotos(true); alert("Deleted!"); }
      else alert("Delete failed: " + r2.status);
    } catch(err){ alert("Error: " + err.message); }
    setAdminDeleting(null);
  };

  const scratch = useCallback((e) => {
    e.preventDefault();
    if(!isDrawing.current || revealLock.current) return;
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width/rect.width;
    const scaleY = canvas.height/rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const cur = {x:(clientX-rect.left)*scaleX, y:(clientY-rect.top)*scaleY};

    if(!hasStarted.current){ hasStarted.current=true; setScratching(true); }

    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 60;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if(lastPos.current){
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(cur.x, cur.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cur.x,cur.y,34,0,Math.PI*2);
    ctx.fill();
    lastPos.current = cur;

    checkInterval.current = (checkInterval.current+1)%6;
    if(checkInterval.current !== 0) return;

    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let cleared=0, total=0;
    for(let i=3;i<imageData.data.length;i+=16){
      if(imageData.data[i]===0) cleared++;
      total++;
    }
    const pct = Math.round((cleared/total)*100);
    setPercent(pct);
    if(pct > 30) doReveal();
  }, [doReveal]);

  const startOver = () => {
    setRound(shuffle(photos.map((_,i)=>i)));
    setPos(0);
    setAllDone(false);
    setRevealed(false);
    setScratching(false);
    setPercent(0);
  };

  return (
    <div className="section-gpu" style={{background:"linear-gradient(180deg,#0a0a1a 0%,#1a0a2e 50%,#0a0a1a 100%)",padding:"70px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(212,168,67,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{display:"none"}}>{photos.map(u=><img key={u} src={u} alt=""/>)}</div>

      <div style={{position:"relative",zIndex:1,maxWidth:420,margin:"0 auto"}}>
        {/* Title — tap 5 times to open admin */}
        <p onClick={handleTitleTap} style={{fontSize:"0.7rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:10,fontFamily:"'Playfair Display',serif",cursor:"default",userSelect:"none"}}>Little notes for you</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(1.4rem,4vw,2rem)",color:"white",marginBottom:8,textShadow:"0 0 30px rgba(212,168,67,0.3)"}}>Scratch to reveal 🌸</h2>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.78rem",marginBottom:32,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          {photosLoading ? "✦" : allDone ? "All revealed 💛" : photos.length > 0 ? `Card ${pos+1} of ${photos.length}` : ""}
        </p>

        {/* Card */}
        {photosLoading ? (
          <div style={{maxWidth:320,margin:"0 auto",borderRadius:20,background:"rgba(255,255,255,0.04)",height:320,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <p style={{color:"rgba(255,255,255,0.3)",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.9rem"}}>Loading...</p>
          </div>
        ) : photos.length === 0 ? (
          <div style={{maxWidth:320,margin:"0 auto",borderRadius:20,background:"rgba(255,255,255,0.04)",height:320,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px dashed rgba(255,255,255,0.1)"}}>
            <p style={{color:"rgba(255,255,255,0.25)",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.9rem"}}>No cards yet 🌸</p>
          </div>
        ) : currentPhoto && (
        <div
          key={cardKey}
          onClick={handleNextTap}
          style={{position:"relative",maxWidth:320,margin:"0 auto",borderRadius:20,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,0.6),0 0 40px rgba(212,168,67,0.15)",cursor:revealed?"pointer":"crosshair",userSelect:"none",WebkitUserSelect:"none"}}
        >
          <img
            src={currentPhoto}
            alt="surprise"
            style={{width:"100%",display:"block",borderRadius:20}}
          />
          <canvas
            ref={canvasRef}
            width={640} height={640}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:20,touchAction:"none",pointerEvents:revealed?"none":"auto",willChange:"opacity",transform:"translateZ(0)"}}
            onMouseDown={e=>{ if(!photoReady) return; isDrawing.current=true;lastPos.current=null;scratch(e);}}
            onMouseMove={e=>{ if(!photoReady) return; scratch(e);}}
            onMouseUp={()=>{isDrawing.current=false;lastPos.current=null;}}
            onMouseLeave={()=>{isDrawing.current=false;lastPos.current=null;}}
            onTouchStart={e=>{ if(!photoReady) return; isDrawing.current=true;lastPos.current=null;scratch(e);}}
            onTouchMove={e=>{ if(!photoReady) return; scratch(e);}}
            onTouchEnd={()=>{isDrawing.current=false;lastPos.current=null;}}
          />
          {/* Loading shimmer over canvas until photo is ready */}
          {!photoReady && !revealed && (
            <div style={{position:"absolute",inset:0,borderRadius:20,background:"linear-gradient(110deg,rgba(20,10,40,0.7) 30%,rgba(212,168,67,0.12) 50%,rgba(20,10,40,0.7) 70%)",backgroundSize:"200% 100%",animation:"skeletonSlide 1.4s ease infinite",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <p style={{color:"rgba(255,255,255,0.35)",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.85rem"}}>Loading...</p>
            </div>
          )}
          {/* Tap to next hint */}
          {revealed && (
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"flex-end",justifyContent:"center",borderRadius:20,background:"linear-gradient(transparent 55%,rgba(0,0,0,0.6))",animation:"fadeIn 0.5s ease"}}>
              <p style={{color:"white",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.85rem",margin:"0 0 18px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>
                {pos >= photos.length - 1 ? "Tap to start over ✨" : "Tap to reveal next 🌸"}
              </p>
            </div>
          )}
        </div>
        )}

        {/* Progress bar */}
        {scratching && !revealed && (
          <div style={{marginTop:18,maxWidth:320,margin:"18px auto 0"}}>
            <div style={{height:4,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${percent}%`,background:"linear-gradient(90deg,#d4a843,#f0c060)",borderRadius:4,transition:"width 0.1s ease"}}/>
            </div>
          </div>
        )}
      </div>

      {/* Hidden admin modal */}
      {adminOpen && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#1a1a2e",borderRadius:16,padding:28,width:"100%",maxWidth:360,border:"1px solid rgba(212,168,67,0.3)",maxHeight:"85vh",overflowY:"auto"}}>
            <p style={{color:"#d4a843",fontFamily:"'Playfair Display',serif",fontSize:"1rem",marginBottom:16,textAlign:"center"}}>🔒 Admin Panel</p>
            {!adminAuthed ? (
              <>
                <input
                  type="password" placeholder="Password"
                  value={adminPwd} onChange={e=>setAdminPwd(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"){ if(adminPwd==="Hana") setAdminAuthed(true); else alert("Wrong password"); }}}
                  style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(212,168,67,0.4)",background:"rgba(255,255,255,0.07)",color:"white",fontFamily:"'Playfair Display',serif",fontSize:"0.9rem",boxSizing:"border-box",marginBottom:12}}
                  autoFocus
                />
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{ if(adminPwd==="Hana") setAdminAuthed(true); else alert("Wrong password"); }} style={{flex:1,padding:"10px",borderRadius:10,background:"#d4a843",border:"none",color:"#1a0a2e",fontWeight:600,cursor:"pointer",fontFamily:"'Playfair Display',serif"}}>Enter</button>
                  <button onClick={()=>{setAdminOpen(false);setAdminPwd("");}} style={{flex:1,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.08)",border:"none",color:"white",cursor:"pointer",fontFamily:"'Playfair Display',serif"}}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p style={{color:"rgba(255,255,255,0.6)",fontSize:"0.78rem",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>Current scratch card images ({photos.length}):</p>
                {photos.map((url,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <img src={url} alt="" style={{width:52,height:52,borderRadius:8,objectFit:"cover"}}/>
                    <span style={{color:"rgba(255,255,255,0.5)",fontSize:"0.7rem",flex:1,wordBreak:"break-all",fontFamily:"monospace"}}>{url.split("/").pop()}</span>
                    <button onClick={()=>adminDelete(url)} disabled={adminDeleting===url} style={{padding:"6px 12px",borderRadius:8,background:"#c0392b",border:"none",color:"white",fontSize:"0.75rem",cursor:"pointer"}}>
                      {adminDeleting===url?"...":"Delete"}
                    </button>
                  </div>
                ))}
                <label style={{display:"block",marginTop:16,padding:"10px",borderRadius:10,background:"rgba(212,168,67,0.15)",border:"1.5px dashed rgba(212,168,67,0.5)",color:"#d4a843",fontSize:"0.85rem",cursor:"pointer",fontFamily:"'Playfair Display',serif",textAlign:"center"}}>
                  {adminUploading ? "Uploading..." : "+ Upload new image"}
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={adminUpload} disabled={adminUploading}/>
                </label>
                <button onClick={()=>{setAdminOpen(false);setAdminAuthed(false);setAdminPwd("");}} style={{marginTop:12,width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"'Playfair Display',serif"}}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
