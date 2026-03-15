import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SUPABASE_URL, SUPABASE_ANON, sbHeaders } from "../../lib/supabase";

// ─── Ghibli scene backgrounds ────────────────────────────────────────────────
function GhibliScene0() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#2a1a3e 0%,#4a2a6e 30%,#6a3a8e 55%,#8a5aae 75%,#aa7ace 100%)"}}>
    <div style={{position:"absolute",width:30,height:30,borderRadius:"50%",background:"#fffde0",boxShadow:"0 0 20px 8px rgba(255,253,200,0.5)",top:"12%",right:"20%"}} />
    {[[10,8],[25,5],[45,12],[65,7],[80,10],[35,18],[55,15],[75,20]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:i%3===0?2.5:1.5,height:i%3===0?2.5:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,animation:`blink ${2+i*0.3}s ease-in-out infinite ${i*0.2}s`}} />
    ))}
    <div style={{position:"absolute",bottom:0,width:"100%",height:"30%",background:"linear-gradient(180deg,#1a0a2e,#0d0520)"}} />
  </div>;
}
function GhibliScene1() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#3a7bd5 0%,#6aaee8 20%,#a8d4f0 45%,#f5c97a 68%,#e8956a 82%,#c96b50 100%)"}}>
    <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:52,height:52,borderRadius:"50%",background:"radial-gradient(circle,#fffbe0 20%,#ffd95a 55%,#ffb030 80%,rgba(255,140,30,0) 100%)",boxShadow:"0 0 40px 18px rgba(255,200,60,0.45)",animation:"sunPulse 5s ease-in-out infinite"}} />
    <div style={{position:"absolute",bottom:0,width:"130%",height:36,left:"-15%",background:"linear-gradient(180deg,#5a9640,#3d7530)",borderRadius:"55% 55% 0 0"}} />
  </div>;
}
function GhibliScene2() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#b8d4f0 0%,#d8eaf8 40%,#fde8c8 68%,#f9c5a0 85%,#e8a080 100%)"}}>
    <div style={{position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",width:38,height:38,borderRadius:"50%",background:"radial-gradient(circle,#fffbe0 30%,#ffd95a 60%,rgba(255,200,80,0) 100%)",boxShadow:"0 0 30px 12px rgba(255,200,60,0.4)"}} />
    {[{t:"8%",l:"5%",s:1.1},{t:"12%",l:"55%",s:0.85},{t:"5%",l:"32%",s:0.7}].map((c,i)=>(
      <div key={i} style={{position:"absolute",top:c.t,left:c.l,transform:`scale(${c.s})`,opacity:0.9}}>
        <div style={{width:56,height:18,background:"rgba(255,255,255,0.92)",borderRadius:24}} />
        <div style={{position:"absolute",top:-12,left:6,width:28,height:26,background:"rgba(255,255,255,0.92)",borderRadius:"50%"}} />
        <div style={{position:"absolute",top:-8,left:24,width:20,height:20,background:"rgba(255,255,255,0.88)",borderRadius:"50%"}} />
      </div>
    ))}
    <div style={{position:"absolute",bottom:0,width:"110%",height:32,left:"-5%",background:"linear-gradient(180deg,#5a9640,#3d7530)",borderRadius:"60% 60% 0 0"}} />
  </div>;
}
function GhibliScene3() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#001020 0%,#002040 28%,#003060 52%,#004480 72%,#0060a0 88%,#408060 100%)"}}>
    <div style={{position:"absolute",width:24,height:24,borderRadius:"50%",background:"#fffde0",boxShadow:"0 0 16px 7px rgba(255,253,200,0.5)",top:"10%",right:"22%"}} />
    {[[12,10],[28,6],[48,14],[68,8],[85,12]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:i%2===0?2:1.5,height:i%2===0?2:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,animation:`blink ${2.5+i*0.4}s ease-in-out infinite ${i*0.3}s`}} />
    ))}
    <div style={{position:"absolute",bottom:"22%",left:"-10%",width:"120%",height:20,background:"rgba(60,120,200,0.5)",borderRadius:"55% 55% 0 0",animation:"wave1 3s ease-in-out infinite"}} />
    <div style={{position:"absolute",bottom:"16%",left:"-15%",width:"130%",height:15,background:"rgba(40,100,180,0.4)",borderRadius:"60% 60% 0 0",animation:"wave1 3.8s ease-in-out infinite 0.6s"}} />
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"20%",background:"linear-gradient(180deg,#8a7050,#b89060)"}} />
    <div style={{position:"absolute",bottom:0,left:0,width:"28%",height:"28%",background:"linear-gradient(45deg,#1a1a10,#0f0f08)",borderRadius:"0 50% 0 0"}} />
    <div style={{position:"absolute",bottom:"36%",right:"18%",width:8,height:"22%",background:"#1a1408",borderRadius:"2px 2px 0 0"}} />
    <div style={{position:"absolute",bottom:"56%",right:"17%",width:12,height:10,background:"rgba(255,230,100,0.9)",borderRadius:3,boxShadow:"0 0 20px 10px rgba(255,200,50,0.4)",animation:"blink 2s ease-in-out infinite"}} />
  </div>;
}
function GhibliScene4() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#ff8c42 0%,#ff6b35 25%,#ff4500 50%,#cc2200 75%,#881100 100%)"}}>
    {[[20,15],[40,10],[60,18],[80,12]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:i%2===0?3:2,height:i%2===0?3:2,borderRadius:"50%",background:"#ffdd57",left:`${l}%`,top:`${t}%`,animation:`blink ${2+i*0.4}s ease-in-out infinite ${i*0.3}s`}} />
    ))}
    <div style={{position:"absolute",bottom:0,width:"100%",height:"35%",background:"linear-gradient(180deg,#1a0800,#0d0400)"}} />
    {[[15,40],[30,52],[50,38],[68,48],[82,42]].map(([l,h],i)=>(
      <div key={i} style={{position:"absolute",bottom:0,left:`${l}%`,width:6,height:h,background:"#1a0800",borderRadius:"2px 2px 0 0"}} />
    ))}
  </div>;
}

const GHIBLI_SCENES = [GhibliScene0, GhibliScene1, GhibliScene2, GhibliScene3, GhibliScene4];

// ─── Polaroid flora decorations ──────────────────────────────────────────────
function PolaroidFlora({ scene }) {
  const floraSets = [
    <><span style={{position:"absolute",bottom:2,left:4,fontSize:9,opacity:0.85,transform:"rotate(-20deg)"}}>🌿</span><span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.75,transform:"rotate(10deg)"}}>🍄</span><span style={{position:"absolute",bottom:2,right:4,fontSize:9,opacity:0.85,transform:"rotate(15deg)"}}>🌿</span><span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7,transform:"rotate(-10deg)"}}>✨</span><span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.55,transform:"rotate(30deg)"}}>🍃</span><span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.55,transform:"rotate(-30deg)"}}>🍃</span></>,
    <><span style={{position:"absolute",bottom:2,left:3,fontSize:10,opacity:0.9}}>🌸</span><span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7,transform:"rotate(15deg)"}}>🌸</span><span style={{position:"absolute",bottom:2,right:3,fontSize:10,opacity:0.9}}>🌸</span><span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7,transform:"rotate(-15deg)"}}>🌸</span><span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.6}}>🌺</span><span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.6}}>🌺</span></>,
    <><span style={{position:"absolute",bottom:2,left:4,fontSize:9,opacity:0.8}}>❄️</span><span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.65}}>✨</span><span style={{position:"absolute",bottom:2,right:4,fontSize:9,opacity:0.8}}>❄️</span><span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.65}}>✨</span><span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.55}}>⭐</span><span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.55}}>⭐</span></>,
    <><span style={{position:"absolute",bottom:2,left:3,fontSize:9,opacity:0.85,transform:"rotate(-15deg)"}}>🍂</span><span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7}}>💧</span><span style={{position:"absolute",bottom:2,right:3,fontSize:9,opacity:0.85,transform:"rotate(15deg)"}}>🍂</span><span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7}}>💧</span><span style={{position:"absolute",top:2,left:3,fontSize:7,opacity:0.55,transform:"rotate(20deg)"}}>🍃</span><span style={{position:"absolute",top:2,right:3,fontSize:7,opacity:0.55,transform:"rotate(-20deg)"}}>🍃</span></>,
    <><span style={{position:"absolute",bottom:2,left:3,fontSize:9,opacity:0.85}}>🐚</span><span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7}}>🌊</span><span style={{position:"absolute",bottom:2,right:3,fontSize:9,opacity:0.85}}>🐚</span><span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7}}>🌊</span><span style={{position:"absolute",top:2,left:3,fontSize:7,opacity:0.6}}>⭐</span><span style={{position:"absolute",top:2,right:3,fontSize:7,opacity:0.6}}>🌙</span></>,
  ];
  return floraSets[scene % floraSets.length];
}

// ─── Swipe hint overlay ───────────────────────────────────────────────────────
function SwipeHintWrapper({ children }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{position:"relative"}}>
      {children}
      {visible && (
        <div style={{position:"absolute",inset:0,borderRadius:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:60,pointerEvents:"none",background:"rgba(0,0,0,0.38)",animation:"swipeHintFade 2.6s ease forwards"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,animation:"hintPulseL 1.1s ease-in-out infinite"}}>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.9)"}}>‹</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.6)"}}>‹</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.3)"}}>‹</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <span style={{fontSize:"2.8rem",animation:"hintSwipe 1.1s ease-in-out infinite",display:"block"}}>👆</span>
              <span style={{color:"rgba(255,255,255,0.85)",fontSize:"0.82rem",fontFamily:"'Lora',serif",fontStyle:"italic",letterSpacing:"0.08em",textAlign:"center",lineHeight:1.5}}>swipe to browse<br/>memories</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,animation:"hintPulseR 1.1s ease-in-out infinite"}}>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.3)"}}>›</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.6)"}}>›</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.9)"}}>›</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Photo carousel ───────────────────────────────────────────────────────────
function PhotoCarousel({ photos, captions, onDelete, deleteId, pwd, setPwd, deleting, handleDelete, cancelDelete }) {
  const [idx, setIdx] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState(new Set());
  const idxRef = useRef(0);
  const viewportRef = useRef(null);
  const prevSlotRef = useRef(null);
  const currSlotRef = useRef(null);
  const nextSlotRef = useRef(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentDxRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHorizontalRef = useRef(null);

  // Apply position to the 3 slots: prev=-100%, curr=0%, next=100%
  // Plus drag offset on all three
  const applySlots = useCallback((dx = 0, animate = false) => {
    const tr = animate ? "transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)" : "none";
    [prevSlotRef, currSlotRef, nextSlotRef].forEach((ref, i) => {
      if (!ref.current) return;
      const base = (i - 1) * 100; // -100, 0, 100
      ref.current.style.transition = tr;
      ref.current.style.transform = `translateX(calc(${base}% + ${dx}px))`;
    });
  }, []);

  useEffect(() => {
    idxRef.current = idx;
    applySlots(0, true);
  }, [idx, applySlots]);

  const goTo = useCallback((i) => {
    setIdx((i + photos.length) % photos.length);
  }, [photos.length]);

  const onTD = useCallback((e) => {
    if (e.touches.length > 1) return;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    currentDxRef.current = 0;
    isDraggingRef.current = true;
    isHorizontalRef.current = null;
    applySlots(0, false);
  }, [applySlots]);

  const onTM = useCallback((e) => {
    if (!isDraggingRef.current || e.touches.length > 1) return;
    const dx = e.touches[0].clientX - startXRef.current;
    const dy = e.touches[0].clientY - startYRef.current;
    if (isHorizontalRef.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isHorizontalRef.current = Math.abs(dx) > Math.abs(dy);
    }
    if (isHorizontalRef.current === false) return;
    e.preventDefault();
    currentDxRef.current = dx;
    const atStart = idxRef.current === 0 && dx > 0;
    const atEnd = idxRef.current === photos.length - 1 && dx < 0;
    applySlots((atStart || atEnd) ? dx * 0.15 : dx, false);
  }, [photos.length, applySlots]);

  const onTE = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const dx = currentDxRef.current;
    const w = viewportRef.current?.offsetWidth || 360;
    if (isHorizontalRef.current && Math.abs(dx) > w * 0.2) {
      goTo(dx < 0 ? idxRef.current + 1 : idxRef.current - 1);
    } else {
      applySlots(0, true);
    }
    currentDxRef.current = 0;
    isHorizontalRef.current = null;
  }, [goTo, applySlots]);

  if (!photos.length) return null;

  const n = photos.length;
  const prevPhoto = photos[(idx - 1 + n) % n];
  const currPhoto = photos[idx];
  const nextPhoto = photos[(idx + 1) % n];

  const CardSkeleton = () => (
    <div style={{position:"absolute",inset:0,zIndex:5,background:"linear-gradient(135deg,#1a1a2e,#16213e)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"75%"}}>
        <div style={{background:"rgba(255,255,255,0.07)",borderRadius:3,padding:"6px 6px 0 6px",boxShadow:"0 8px 30px rgba(0,0,0,0.5)"}}>
          <div style={{width:"100%",paddingBottom:"100%",position:"relative",overflow:"hidden",borderRadius:2,background:"rgba(255,255,255,0.04)"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.07) 50%,transparent 100%)",backgroundSize:"200% 100%",animation:"skeletonSlide 1.4s ease-in-out infinite"}}/>
          </div>
          <div style={{height:22,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:"55%",height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden",position:"relative"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",backgroundSize:"200% 100%",animation:"skeletonSlide 1.4s ease-in-out infinite 0.2s"}}/>
            </div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:12}}>
          {[0,0.2,0.4].map((dl,i)=>(
            <div key={i} style={{width:6,height:6,borderRadius:"50%",background:"rgba(212,168,67,0.4)",animation:`blink 1.2s ease-in-out infinite ${dl}s`}}/>
          ))}
        </div>
      </div>
    </div>
  );

  const cardBody = (photo, sceneIdx, photoIdx) => {
    const BgComp = GHIBLI_SCENES[sceneIdx % GHIBLI_SCENES.length];
    const loaded = loadedImgs.has(photo.url);
    return (
      <div style={{position:"relative",height:"100%"}}>
        <div style={{position:"absolute",inset:0,zIndex:0,opacity:loaded?1:0,transition:"opacity 0.5s ease"}}><BgComp /></div>
        {!loaded && <CardSkeleton />}
        <div style={{position:"relative",zIndex:10,padding:"44px 52px 26px",display:"flex",flexDirection:"column",alignItems:"center",opacity:loaded?1:0,transition:"opacity 0.5s ease"}}>
          <div style={{width:"100%",background:"#fafaf5",borderRadius:3,padding:"6px 6px 0 6px",boxShadow:"0 8px 30px rgba(0,0,0,0.7)",transform:"rotate(-0.8deg)"}}>
            <img src={photo.url} alt="" decoding="async"
              style={{width:"100%",height:"auto",display:"block",borderRadius:2,pointerEvents:"none"}}
              onLoad={()=>setLoadedImgs(prev=>new Set([...prev,photo.url]))} />
            <div style={{position:"relative",height:22,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <PolaroidFlora scene={photoIdx % GHIBLI_SCENES.length}/>
              {captions[photo.name]&&(<p style={{margin:"0 20px",textAlign:"center",fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"0.65rem",color:"#5a3a2a",lineHeight:1.2,zIndex:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>"{captions[photo.name]}"</p>)}
            </div>
          </div>
        </div>
        <div style={{position:"relative",zIndex:10,textAlign:"center",color:"rgba(255,255,255,0.8)",fontSize:"0.72rem",fontStyle:"italic",letterSpacing:"0.1em",padding:"4px 0 26px",opacity:loaded?1:0,transition:"opacity 0.5s ease"}}>
          {photoIdx + 1} / {n}
        </div>
      </div>
    );
  };

  return (
    <div style={{position:"relative",maxWidth:400,margin:"0 auto",paddingBottom:4}}>

      {/* Viewport — only 3 cards ever in the DOM */}
      <div ref={viewportRef} style={{position:"relative",borderRadius:20,overflow:"hidden",touchAction:"pan-y pinch-zoom"}}
        onTouchStart={onTD} onTouchMove={onTM} onTouchEnd={onTE}>

        {/* Height spacer from current card */}
        <div style={{visibility:"hidden",pointerEvents:"none"}}>
          {cardBody(currPhoto, idx, idx)}
        </div>

        {/* Prev slot */}
        <div ref={prevSlotRef} style={{position:"absolute",inset:0,transform:"translateX(-100%)",willChange:"transform"}}>
          {n > 1 && cardBody(prevPhoto, (idx - 1 + n) % n, (idx - 1 + n) % n)}
        </div>

        {/* Current slot */}
        <div ref={currSlotRef} style={{position:"absolute",inset:0,transform:"translateX(0%)",willChange:"transform"}}>
          {cardBody(currPhoto, idx, idx)}
          {deleteId === currPhoto.name ? (
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.9)",padding:"10px 14px",display:"flex",flexDirection:"column",gap:8,zIndex:20}}>
              <span style={{color:"white",fontSize:"0.75rem",fontStyle:"italic",textAlign:"center"}}>Enter password to delete:</span>
              <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")handleDelete();if(e.key==="Escape")cancelDelete();}} placeholder="password" autoFocus style={{flex:1,maxWidth:130,border:"none",borderRadius:14,padding:"5px 10px",fontSize:"0.82rem",outline:"none"}}/>
                <button onClick={handleDelete} disabled={deleting} style={{background:"#c0392b",color:"white",border:"none",borderRadius:14,padding:"5px 12px",fontSize:"0.8rem",cursor:"pointer"}}>{deleting?"...":"Delete"}</button>
                <button onClick={cancelDelete} style={{background:"#555",color:"white",border:"none",borderRadius:14,padding:"5px 10px",fontSize:"0.8rem",cursor:"pointer"}}>✕</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>onDelete(currPhoto.name)} style={{position:"absolute",top:10,right:12,background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)",color:"white",width:26,height:26,borderRadius:"50%",cursor:"pointer",fontSize:"0.7rem",display:"flex",alignItems:"center",justifyContent:"center",zIndex:20}}>✕</button>
          )}
        </div>

        {/* Next slot */}
        <div ref={nextSlotRef} style={{position:"absolute",inset:0,transform:"translateX(100%)",willChange:"transform"}}>
          {n > 1 && cardBody(nextPhoto, (idx + 1) % n, (idx + 1) % n)}
        </div>
      </div>

      {/* Prev / Next buttons */}
      {n > 1 && <>
        <button onClick={e=>{e.stopPropagation();goTo(idx-1);}} style={{position:"absolute",left:-18,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.25)",color:"white",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",zIndex:50}}>‹</button>
        <button onClick={e=>{e.stopPropagation();goTo(idx+1);}} style={{position:"absolute",right:-18,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.25)",color:"white",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",zIndex:50}}>›</button>
      </>}

      {/* Dots */}
      {n > 1 && (
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20}}>
          {photos.map((_,i) => (
            <div key={i} onClick={()=>goTo(i)} style={{width:i===idx?18:7,height:7,borderRadius:4,background:i===idx?"#d4a843":"rgba(255,255,255,0.3)",cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main MemoriesSection ─────────────────────────────────────────────────────
export default function MemoriesSection() {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState({});
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [pwd, setPwd] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingCaption, setPendingCaption] = useState("");
  const [trailStars, setTrailStars] = useState([]);
  const sectionRef = useRef(null);
  const fileRef = useRef(null);
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const BUCKET = "memories";
  const photosCache = useRef(null);
  const PHOTO_CACHE_KEY = "hana_photos_cache";
  const PHOTO_CACHE_TTL = 5 * 60 * 1000;

  const loadPhotosFromNetwork = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const r = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
          method: "POST",
          headers: { ...sbHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ prefix: "", limit: 200, offset: 0, sortBy: { column: "created_at", order: "asc" } }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (Array.isArray(data)) {
          const withUrls = data
            .filter(f => f.name && f.name !== ".emptyFolderPlaceholder" && !f.name.endsWith(".json"))
            .map(f => ({ ...f, url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(f.name)}` }));
          photosCache.current = withUrls;
          setPhotos(withUrls);
          try { localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify({ photos: withUrls, ts: Date.now() })); } catch (e) {}
          fetch(`${SUPABASE_URL}/rest/v1/photo_captions?select=filename,caption`, { headers: sbHeaders })
            .then(r => r.ok ? r.json() : [])
            .then(data => { if (Array.isArray(data)) { const map = {}; data.forEach(d => { map[d.filename] = d.caption; }); setCaptions(map); } })
            .catch(() => {});
          return;
        }
      } catch (e) {
        if (attempt === retries - 1) { if (photosCache.current) setPhotos(photosCache.current); }
        else await new Promise(res => setTimeout(res, 1000 * (attempt + 1)));
      }
    }
  };

  const loadPhotos = async (force = false) => {
    if (!force && photosCache.current) { setPhotos(photosCache.current); setLoadingPhotos(false); loadPhotosFromNetwork(); return; }
    if (!force) {
      try {
        const cached = localStorage.getItem(PHOTO_CACHE_KEY);
        if (cached) {
          const { photos: cachedPhotos, ts } = JSON.parse(cached);
          if (Date.now() - ts < PHOTO_CACHE_TTL && Array.isArray(cachedPhotos) && cachedPhotos.length > 0) {
            photosCache.current = cachedPhotos; setPhotos(cachedPhotos); setLoadingPhotos(false); loadPhotosFromNetwork(); return;
          }
        }
      } catch (e) {}
    }
    setLoadingPhotos(true);
    await loadPhotosFromNetwork();
    setLoadingPhotos(false);
  };

  useEffect(() => { loadPhotos(); }, []);
  useEffect(() => { if (open) loadPhotos(); }, [open]);

  const withRetry = async (fn, maxTries = 3, delayMs = 800) => {
    let lastErr;
    for (let i = 0; i < maxTries; i++) {
      try { return await fn(); } catch (e) { lastErr = e; if (i < maxTries - 1) await new Promise(r => setTimeout(r, delayMs * (i + 1))); }
    }
    throw lastErr;
  };

  const handleUpload = async (e) => { const file = e.target.files[0]; if (!file) return; setPendingFile(file); setPendingCaption(""); e.target.value = ""; };

  const doUpload = async () => {
    if (!pendingFile) return;
    setUploading(true);
    try {
      const compressed = await new Promise((resolve, reject) => {
        const img = new Image(); const url = URL.createObjectURL(pendingFile);
        img.onload = () => {
          try {
            const MAX = 1200; let w = img.width, h = img.height;
            if (w > MAX || h > MAX) { const ratio = Math.min(MAX / w, MAX / h); w = Math.round(w * ratio); h = Math.round(h * ratio); }
            const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
            canvas.toBlob(blob => { URL.revokeObjectURL(url); if (blob) resolve(blob); else reject(new Error("toBlob failed")); }, "image/jpeg", 0.8);
          } catch (err) { URL.revokeObjectURL(url); reject(err); }
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(pendingFile); };
        img.src = url;
      });
      const fileName = `photo_${Date.now()}.jpg`;
      await withRetry(async () => {
        const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`, { method: "POST", headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${SUPABASE_ANON}`, "Content-Type": "image/jpeg", "x-upsert": "true" }, body: compressed });
        if (!r.ok) { const err = await r.text(); throw new Error(`Upload failed (${r.status}): ${err}`); }
      });
      if (pendingCaption.trim()) {
        await withRetry(async () => {
          const r = await fetch(`${SUPABASE_URL}/rest/v1/photo_captions`, { method: "POST", headers: { ...sbHeaders, "Prefer": "return=minimal" }, body: JSON.stringify({ filename: fileName, caption: pendingCaption.trim() }) });
          if (!r.ok) { const err = await r.text(); throw new Error(`Caption save failed: ${err}`); }
        });
      }
      showToast("Memory saved ✨"); setPendingFile(null); setPendingCaption("");
      try { localStorage.removeItem(PHOTO_CACHE_KEY); } catch (e) {}
      await new Promise(r => setTimeout(r, 800));
      loadPhotos(true);
    } catch (e) { console.error(e); showToast("Upload failed after retries: " + e.message); }
    setUploading(false);
  };

  const handleDelete = async () => {
    if (pwd !== "Hana") { showToast("Wrong password ✕"); setPwd(""); return; }
    setDeleting(true);
    try {
      await withRetry(async () => {
        const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${deleteId}`, { method: "DELETE", headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${SUPABASE_ANON}` } });
        if (!r.ok) { const err = await r.text(); throw new Error(`Delete failed (${r.status}): ${err}`); }
      });
      showToast("Photo removed 🍃"); setDeleteId(null); setPwd("");
      try { localStorage.removeItem(PHOTO_CACHE_KEY); } catch (e) {}
      photosCache.current = null; loadPhotos(true);
    } catch (e) { console.error(e); showToast("Could not delete - try again"); }
    setDeleting(false);
  };

  const bgStars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({ id: i, size: Math.random() * 2 + 1, top: Math.random() * 100, left: Math.random() * 100, d: (1.5 + Math.random() * 2).toFixed(1), dl: (Math.random() * 3).toFixed(1) })), []);
  const lastTrailTime = useRef(0);
  const spawnStars = (e, count = 14) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2)) - rect.left;
    const cy = (e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2)) - rect.top;
    const burst = Array.from({ length: count }, (_, i) => ({ id: Date.now() + Math.random() + i, x: cx, y: cy, angle: (i / count) * 360 + Math.random() * 30, dist: 40 + Math.random() * 70, size: 8 + Math.random() * 11, color: ['#ffdd57','#ff9eb5','#b6d9ff','#ffe0ee','#fff4a0','#ffb6d9','#c8f0a0'][i % 7], dur: 0.6 + Math.random() * 0.5, sr: (-90 + Math.random() * 180) + "deg" }));
    setTrailStars(s => [...s.slice(-80), ...burst]);
    setTimeout(() => setTrailStars(s => s.filter(st => !burst.find(n => n.id === st.id))), 1400);
  };
  const handleMove = (e) => { const now = Date.now(); if (now - lastTrailTime.current < 100) return; lastTrailTime.current = now; spawnStars(e, 5); };

  return (
    <div ref={sectionRef} onClick={e => spawnStars(e, 14)} onMouseMove={handleMove} onTouchMove={e => { e.preventDefault(); handleMove(e); }} onTouchStart={e => spawnStars(e, 14)}
      style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)", padding: "80px 20px", position: "relative", overflow: "hidden", cursor: "crosshair", userSelect: "none", touchAction: "pan-y pinch-zoom" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {bgStars.map(s => <div key={s.id} style={{ position: "absolute", width: s.size, height: s.size, background: "white", borderRadius: "50%", top: `${s.top}%`, left: `${s.left}%`, animation: `blink ${s.d}s ease-in-out infinite ${s.dl}s`, willChange: "opacity" }} />)}
      </div>
      {trailStars.map(s => {
        const rad = s.angle * Math.PI / 180;
        const sx = Math.cos(rad) * s.dist + "px";
        const sy = Math.sin(rad) * s.dist + "px";
        return (
          <div key={s.id} style={{ position: "absolute", left: s.x, top: s.y, pointerEvents: "none", zIndex: 20, willChange: "transform,opacity" }}>
            <div style={{ position: "absolute", width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2, background: s.color, clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", boxShadow: `0 0 4px ${s.color}`, "--sx": sx, "--sy": sy, "--sr": s.sr, animation: `starShoot ${s.dur}s ease-out forwards` }} />
            <div style={{ position: "absolute", width: s.size * 0.4, height: s.size * 0.4, marginLeft: -s.size * 0.2, marginTop: -s.size * 0.2, borderRadius: "50%", background: s.color, opacity: 0.55, "--sx": `calc(${sx} * 0.6)`, "--sy": `calc(${sy} * 0.6)`, animation: `trailDot ${s.dur * 0.75}s ease-out forwards` }} />
          </div>
        );
      })}

      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 16 }}>Memories</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>Tap anywhere to make it sparkle ✨</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
          <button onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", border: "2px solid rgba(212,168,67,0.6)", color: "#d4a843", padding: "14px 32px", borderRadius: 60, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.05rem", cursor: "pointer" }}>
            <span style={{ fontSize: "1.3rem" }}>{open ? "🌙" : "🌸"}</span>
            {open ? "Close memories" : "View memories"}
          </button>
          <button onClick={e => { e.stopPropagation(); fileRef.current.click(); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,67,0.15)", border: "2px solid rgba(212,168,67,0.5)", color: "#d4a843", padding: "14px 28px", borderRadius: 60, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1rem", cursor: "pointer" }}>
            {uploading ? "Uploading..." : "+ Add photo 📷"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} onClick={e => e.stopPropagation()} />
        </div>

        {pendingFile && (
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 340, margin: "16px auto 0", background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(212,168,67,0.3)" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontStyle: "italic", marginBottom: 10, textAlign: "center" }}>📷 {pendingFile.name.slice(0, 28)}...</p>
            <input value={pendingCaption} onChange={e => setPendingCaption(e.target.value)} maxLength={80} placeholder="Add a caption... (optional)" style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(212,168,67,0.35)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: "0.92rem", outline: "none", fontFamily: "'Lora',serif", boxSizing: "border-box", marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={() => { setPendingFile(null); setPendingCaption(""); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontFamily: "'Lora',serif", fontSize: "0.85rem" }}>Cancel</button>
              <button onClick={doUpload} disabled={uploading} style={{ background: "#d4a843", border: "none", color: "#2c1810", padding: "8px 22px", borderRadius: 20, cursor: "pointer", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.9rem", fontWeight: 600, opacity: uploading ? 0.5 : 1 }}>{uploading ? "Saving..." : "Save memory ✨"}</button>
            </div>
          </div>
        )}

        {open && (
          <div style={{ marginTop: 36 }} onClick={e => e.stopPropagation()}>
            {loadingPhotos ? (
              <div style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8, animation: "blink 1.2s ease-in-out infinite" }}>✨</div>
                <p>Loading memories...</p>
              </div>
            ) : photos.length === 0 ? (
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: 12 }}>No photos yet. Add the first one 🌸</p>
                <button onClick={() => loadPhotos(true)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "7px 18px", borderRadius: 20, cursor: "pointer", fontSize: "0.82rem", fontStyle: "italic", fontFamily: "'Lora',serif" }}>↻ Refresh</button>
              </div>
            ) : (
              <PhotoCarousel photos={photos} captions={captions} onDelete={(name) => { setDeleteId(name); setPwd(""); }}
                deleteId={deleteId} pwd={pwd} setPwd={setPwd} deleting={deleting}
                handleDelete={handleDelete} cancelDelete={() => { setDeleteId(null); setPwd(""); }} />
            )}
            <button onClick={() => setOpen(false)} style={{ marginTop: 28, background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", padding: "8px 22px", borderRadius: 30, fontFamily: "'Lora',serif", fontSize: "0.8rem", fontStyle: "italic", cursor: "pointer" }}>close ↑</button>
          </div>
        )}
      </div>
      {toast && <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#2c1810", color: "#fef9f0", padding: "12px 28px", borderRadius: 40, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.9rem", zIndex: 9999 }}>{toast}</div>}
    </div>
  );
}
