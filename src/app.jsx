import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Analytics } from '@vercel/analytics/react';

// ─── SCROLL PROGRESS BAR ────────────────────────────────────────────────────
function ScrollBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={barRef} style={{
      position:"fixed", top:0, left:0, zIndex:9999,
      width:"0%", height:3,
      background:"linear-gradient(90deg,#e8a0a0,#d4a843,#a0c4a0)",
      boxShadow:"0 0 8px rgba(212,168,67,0.6)",
      pointerEvents:"none", willChange:"width",
    }} />
  );
}

// ─── CURSOR HEART TRAIL ──────────────────────────────────────────────────────
function CursorTrail() {
  const containerRef = useRef(null);
  const idRef = useRef(0);
  const lastTime = useRef(0);
  const colors = ["#ffb6d9","#fda4af","#fde68a","#d4a843","#c4b5fd","#f9a8d4"];

  useEffect(() => {
    const spawn = (x, y) => {
      const now = Date.now();
      if (now - lastTime.current < 80) return;
      lastTime.current = now;

      const el = document.createElement("div");
      const size = 14 + Math.random() * 10;
      const dx = (Math.random() - 0.5) * 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.textContent = "♡";
      el.style.cssText = `position:fixed;left:${x - size/2}px;top:${y - size/2}px;font-size:${size}px;color:${color};pointer-events:none;user-select:none;animation:heartFloat 1.1s ease-out forwards;--dx:${dx}px;z-index:9998;`;
      containerRef.current?.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    const onMouse = (e) => { if (Math.random() > 0.35) return; spawn(e.clientX, e.clientY); };
    const onTouch = (e) => {
      Array.from(e.touches).forEach(t => { if (Math.random() > 0.55) return; spawn(t.clientX, t.clientY); });
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}} />
      <style>{`@keyframes heartFloat{0%{opacity:1;transform:translate(0,0) scale(1.2);}30%{opacity:0.9;transform:translate(calc(var(--dx)*0.4),-20px) scale(1);}100%{opacity:0;transform:translate(var(--dx),-65px) scale(0.3);}}`}</style>
    </>
  );
}

// ─── AMBIENT GOLD DUST ───────────────────────────────────────────────────────
function GoldDust() {
  const particles = useMemo(() => Array.from({length:14}, (_,i) => ({
    id:i,
    left: Math.random()*100,
    size: 2 + Math.random()*3,
    dur: 14 + Math.random()*16,
    delay: Math.random()*20,
    drift: Math.round(-40+Math.random()*80)+"px",
    color: ["rgba(212,168,67,0.5)","rgba(255,182,193,0.45)","rgba(255,220,180,0.4)","rgba(200,220,255,0.4)"][i%4],
  })), []);
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9990,overflow:"hidden"}}>
      <style>{`@keyframes dustRise{0%{transform:translateY(105vh) translateX(0) scale(0.6);opacity:0;}8%{opacity:1;}90%{opacity:0.7;}100%{transform:translateY(-8vh) translateX(var(--drift)) scale(1.1);opacity:0;}}`}</style>
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.left}%`, bottom:"-10px",
          width:p.size, height:p.size, borderRadius:"50%", background:p.color,
          "--drift":p.drift,
          animation:`dustRise ${p.dur}s ease-in-out infinite ${p.delay}s`,
          willChange:"transform, opacity",
        }} />
      ))}
    </div>
  );
}

// ─── JJK CURSED ENERGY CHAPTER GLOW ─────────────────────────────────────────
// Wraps chapter headings in a soft cursed-energy aura — Hana's JJK easter egg
function CursedGlow({children}) {
  return (
    <div style={{position:"relative",display:"inline-block"}}>
      {/* Soft indigo/violet bloom behind the chapter label */}
      <div style={{
        position:"absolute",
        top:"50%",left:"50%",
        transform:"translate(-50%,-50%)",
        width:"160%",height:"260%",
        background:"radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, rgba(99,102,241,0.07) 40%, transparent 70%)",
        filter:"blur(8px)",
        animation:"cursedPulse 4s ease-in-out infinite",
        pointerEvents:"none",
        zIndex:0,
      }}/>
      {/* Thin cursed energy line under label */}
      <div style={{
        position:"absolute",
        bottom:-4,left:"10%",right:"10%",height:1,
        background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.35),rgba(167,139,250,0.5),rgba(139,92,246,0.35),transparent)",
        animation:"cursedLine 4s ease-in-out infinite",
        pointerEvents:"none",
        zIndex:0,
      }}/>
      <div style={{position:"relative",zIndex:1}}>{children}</div>
    </div>
  );
}


const fadeObserver = typeof IntersectionObserver !== "undefined"
  ? new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          fadeObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    )
  : null;

function Fade({children, delay=0}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if(!el || !fadeObserver) return;
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    fadeObserver.observe(el);
    return () => fadeObserver.unobserve(el);
  }, [delay]);
  return (
    <div ref={ref} style={{opacity:0, transform:"translateY(22px)", willChange:"opacity, transform"}}>
      {children}
    </div>
  );
}

// ─── CHAPTER BLOOM TRANSITION ────────────────────────────────────────────────
function ChapterBloom({children}) {
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el||!fadeObserver) return;
    el.style.transition="opacity 1.1s ease, filter 1.1s ease";
    el.style.filter="blur(10px) brightness(1.8)";
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        el.style.opacity="1";
        el.style.filter="blur(0) brightness(1)";
        obs.disconnect();
      }
    },{threshold:0.15});
    obs.observe(el);
    return()=>obs.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:0,filter:"blur(10px) brightness(1.8)",willChange:"opacity,filter"}}>{children}</div>;
}


function WaveDivider({fill="#fef9f0", flip=false}) {
  return (
    <div style={{lineHeight:0, transform: flip?"scaleY(-1)":"none"}}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{width:"100%",height:50,display:"block"}}>
        <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill={fill}/>
      </svg>
    </div>
  );
}



// ═══════════════════════════════════════════════
//  ANIME SAKURA HERO
// ═══════════════════════════════════════════════
function SakuraHero() {
  const petals = React.useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    size: 7 + Math.random() * 7,
    dur: 4 + Math.random() * 4,
    delay: Math.random() * 8,
    px: String(Math.round(-80 + Math.random() * 160)) + "px",
    pr: String(Math.round(Math.random() * 540)) + "deg",
  })), []);

  const heroCss = `
    @keyframes balloonFloat {
      0%   { transform: translate(0px,0px)    rotate(-4deg); }
      25%  { transform: translate(13px,-22px) rotate(3deg);  }
      50%  { transform: translate(-7px,-34px) rotate(-2deg); }
      75%  { transform: translate(17px,-15px) rotate(5deg);  }
      100% { transform: translate(0px,0px)    rotate(-4deg); }
    }
    @keyframes stringWave {
      0%,100% { transform: rotate(-2deg); }
      50%     { transform: rotate(3deg);  }
    }
    @keyframes catJumpL {
      0%,100% { transform: translate(0px,0px)    rotate(-3deg); }
      22%     { transform: translate(-8px,-54px)  rotate(-11deg); }
      38%     { transform: translate(-3px,-22px)  rotate(2deg);  }
    }
    @keyframes catJumpR {
      0%,42%  { transform: translate(0px,0px)    rotate(3deg);  }
      62%     { transform: translate(8px,-60px)   rotate(11deg); }
      78%     { transform: translate(3px,-24px)   rotate(-2deg); }
    }
    @keyframes pawL {
      0%,100% { transform: rotate(-12deg); }
      22%     { transform: rotate(-68deg); }
      38%     { transform: rotate(-12deg); }
    }
    @keyframes pawR {
      0%,55%  { transform: rotate(12deg);  }
      65%     { transform: rotate(68deg);  }
      80%     { transform: rotate(12deg);  }
    }
    @keyframes tailL { 0%,100%{transform:rotate(-25deg)} 50%{transform:rotate(25deg)} }
    @keyframes tailR { 0%,100%{transform:rotate(25deg)}  50%{transform:rotate(-25deg)} }
    @keyframes blinkL { 0%,88%,100%{transform:scaleY(1)} 93%,97%{transform:scaleY(0.1)} }
    @keyframes blinkR { 0%,78%,100%{transform:scaleY(1)} 83%,87%{transform:scaleY(0.1)} }
    @keyframes petalDrift {
      0%   { opacity:0; transform:translateY(0) rotate(0deg) translateX(0); }
      8%   { opacity:1; }
      92%  { opacity:0.6; }
      100% { opacity:0; transform:translateY(100vh) rotate(var(--pr)) translateX(var(--px)); }
    }
    @keyframes grassSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
    @keyframes heroBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
  `;

  return (
    <div style={{position:"relative",width:"100%",height:"75vh",minHeight:500,overflow:"hidden"}}>
      <style>{heroCss}</style>

      {/* sky */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#fce4f0 0%,#f8d0e6 15%,#f0e4f4 34%,#e4eef8 54%,#c8dff0 74%,#b0d0e8 100%)"}} />
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(255,170,200,0.38) 0%,transparent 62%)",pointerEvents:"none"}} />

      {/* clouds */}
      {[{w:140,h:44,top:"9%",left:"2%",dur:22},{w:200,h:55,top:"14%",left:"40%",dur:29,dl:"5s"},{w:110,h:36,top:"6%",left:"72%",dur:20,dl:"12s"}].map((cl,i)=>(
        <div key={i} style={{position:"absolute",background:"rgba(255,255,255,0.78)",borderRadius:50,width:cl.w,height:cl.h,top:cl.top,left:cl.left,filter:"blur(2px)",animation:`drift ${cl.dur}s linear infinite ${cl.dl||"0s"}`}}>
          <div style={{position:"absolute",background:"rgba(255,255,255,0.78)",borderRadius:"50%",width:cl.w*0.52,height:cl.w*0.52,top:-cl.w*0.25,left:cl.w*0.13}}/>
          <div style={{position:"absolute",background:"rgba(255,255,255,0.78)",borderRadius:"50%",width:cl.w*0.38,height:cl.w*0.38,top:-cl.w*0.18,left:cl.w*0.5}}/>
        </div>
      ))}

      {/* hills */}
      <div style={{position:"absolute",bottom:0,left:0,right:0}}>
        <div style={{position:"absolute",bottom:0,width:"110%",height:160,background:"linear-gradient(180deg,#88c870,#6aaa50)",borderRadius:"50% 50% 0 0",left:"-5%"}}/>
        <div style={{position:"absolute",bottom:0,width:"65%",height:120,background:"linear-gradient(180deg,#a0d880,#80bc60)",borderRadius:"50% 50% 0 0",left:"18%"}}/>
        <div style={{position:"absolute",bottom:0,width:"45%",height:80,background:"linear-gradient(180deg,#b8e890,#98d070)",borderRadius:"50% 50% 0 0",right:"-2%"}}/>
        {[10,18,26,34,42,50,58,66,74,82,90].map((l,i)=>(
          <div key={i} style={{position:"absolute",bottom:68+Math.sin(i)*18,left:l+"%",width:4,height:20+i%3*8,background:"#5a9a40",borderRadius:4,transformOrigin:"bottom center",animation:`grassSway ${2+i*0.3}s ease-in-out infinite ${i*0.2}s`}}/>
        ))}
      </div>

      {/* small flowers */}
      {[15,28,42,56,70,84].map((l,i)=>(
        <div key={i} style={{position:"absolute",bottom:74+i%3*14,left:l+"%",zIndex:4}}>
          <div style={{width:10,height:10,background:["#ffb6d9","#ffd6a5","#fff4b0","#b6e5ff"][i%4],borderRadius:"50%",boxShadow:"0 0 6px rgba(255,180,200,0.5)"}}/>
        </div>
      ))}

      {/* SVG scene */}
      <svg viewBox="100 50 600 550" preserveAspectRatio="xMidYMax meet"
        style={{position:"absolute",bottom:0,left:0,width:"100%",height:"100%",overflow:"visible"}}>
        <defs>
          <radialGradient id="hG" cx="38%" cy="32%">
            <stop offset="0%"   stopColor="#ffecf4"/>
            <stop offset="45%"  stopColor="#ff6eb0"/>
            <stop offset="100%" stopColor="#e0006a"/>
          </radialGradient>
          <radialGradient id="hSheen" cx="30%" cy="25%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.72)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          <radialGradient id="shadowG" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(80,50,30,0.18)"/>
            <stop offset="100%" stopColor="rgba(80,50,30,0)"/>
          </radialGradient>
        </defs>

        {/* falling petals */}
        {petals.map(p=>(
          <ellipse key={p.id} cx={p.left*8} cy={-20} rx={p.size*0.68} ry={p.size*0.42}
            fill={p.id%3===0?"#ff90c0":"#ffc8e0"}
            style={{"--pr":p.pr,"--px":p.px,animation:`petalDrift ${p.dur}s ease-in infinite ${p.delay}s`,opacity:0}}/>
        ))}

        {/* ── BALLOON ── */}
        <g style={{animation:"balloonFloat 5s ease-in-out infinite",transformOrigin:"400px 155px"}}>
          {/* string */}
          <g style={{animation:"stringWave 3.2s ease-in-out infinite",transformOrigin:"400px 215px"}}>
            <path d="M400,214 Q391,252 397,292 Q403,332 395,368 Q389,398 394,428"
              stroke="#b03060" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.65"/>
          </g>
          {/* heart */}
          <path d="M400,212 C400,212 338,186 336,150 C334,118 357,102 380,110 C390,114 397,123 400,133 C403,123 410,114 420,110 C443,102 466,118 464,150 C462,186 400,212 400,212 Z"
            fill="url(#hG)"/>
          {/* sheen */}
          <ellipse cx="373" cy="132" rx="17" ry="12" fill="url(#hSheen)" opacity="0.82"/>
          <ellipse cx="385" cy="124" rx="8" ry="5" fill="white" opacity="0.48"/>
          {/* knot */}
          <ellipse cx="400" cy="214" rx="5.5" ry="4" fill="#b03060"/>
        </g>

        {/* shadows */}
        <ellipse cx="262" cy="512" rx="34" ry="9" fill="url(#shadowG)"/>
        <ellipse cx="538" cy="512" rx="34" ry="9" fill="url(#shadowG)"/>

        {/* ── LEFT CAT (cream) ── */}
        <g transform="translate(262,500)">
          <g style={{animation:"catJumpL 2.8s ease-in-out infinite",transformOrigin:"0 0"}}>
            {/* tail */}
            <g style={{animation:"tailL 1.1s ease-in-out infinite",transformOrigin:"0 -10px"}}>
              <path d="M-3,-10 Q-27,-33 -23,-60 Q-19,-80 -7,-76" stroke="#f0d8b0" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
            {/* body */}
            <ellipse cx="0" cy="-30" rx="21" ry="25" fill="#fef0e0"/>
            <ellipse cx="0" cy="-23" rx="13" ry="17" fill="white" opacity="0.55"/>
            {/* reach paw */}
            <g style={{animation:"pawL 2.8s ease-in-out infinite",transformOrigin:"-17px -53px"}}>
              <ellipse cx="-17" cy="-53" rx="9" ry="6.5" fill="#fef0e0"/>
              <ellipse cx="-23" cy="-58" rx="5" ry="3.5" fill="#fef0e0"/>
            </g>
            {/* idle paw */}
            <ellipse cx="13" cy="-9" rx="9" ry="6.5" fill="#fef0e0"/>
            {/* head */}
            <circle cx="0" cy="-58" r="21" fill="#fef0e0"/>
            {/* ears */}
            <polygon points="-17,-74 -8,-58 -23,-58" fill="#fef0e0"/>
            <polygon points="-15,-71 -9,-60 -21,-60" fill="#ffb8b8" opacity="0.55"/>
            <polygon points="17,-74 8,-58 23,-58" fill="#fef0e0"/>
            <polygon points="15,-71 9,-60 21,-60" fill="#ffb8b8" opacity="0.55"/>
            {/* eyes */}
            <g style={{transformOrigin:"-7px -59px",animation:"blinkL 4s ease-in-out infinite"}}>
              <ellipse cx="-7" cy="-59" rx="4.5" ry="4.5" fill="#3a2810"/>
              <circle cx="-6" cy="-61" r="1.8" fill="white"/>
            </g>
            <g style={{transformOrigin:"7px -59px",animation:"blinkL 4s ease-in-out infinite 0.3s"}}>
              <ellipse cx="7" cy="-59" rx="4.5" ry="4.5" fill="#3a2810"/>
              <circle cx="8" cy="-61" r="1.8" fill="white"/>
            </g>
            {/* nose */}
            <ellipse cx="0" cy="-53" rx="3" ry="2.2" fill="#ff9eb5"/>
            {/* smile */}
            <path d="M-4,-50 Q0,-47 4,-50" stroke="#cc7090" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            {/* whiskers */}
            <line x1="-21" y1="-54" x2="-5" y2="-54" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="-21" y1="-51" x2="-5" y2="-52" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="21"  y1="-54" x2="5"  y2="-54" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="21"  y1="-51" x2="5"  y2="-52" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            {/* blush */}
            <ellipse cx="-13" cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.4"/>
            <ellipse cx="13"  cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.4"/>
          </g>
        </g>

        {/* ── RIGHT CAT (blue-grey) ── */}
        <g transform="translate(538,500)">
          <g style={{animation:"catJumpR 2.8s ease-in-out infinite 0.6s",transformOrigin:"0 0"}}>
            {/* tail */}
            <g style={{animation:"tailR 1.3s ease-in-out infinite",transformOrigin:"0 -10px"}}>
              <path d="M3,-10 Q27,-33 23,-60 Q19,-80 7,-76" stroke="#b8c4d8" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
            {/* body */}
            <ellipse cx="0" cy="-30" rx="21" ry="25" fill="#d8dff0"/>
            <ellipse cx="0" cy="-23" rx="13" ry="17" fill="#eef0f8" opacity="0.55"/>
            {/* reach paw */}
            <g style={{animation:"pawR 2.8s ease-in-out infinite 0.6s",transformOrigin:"17px -53px"}}>
              <ellipse cx="17" cy="-53" rx="9" ry="6.5" fill="#d8dff0"/>
              <ellipse cx="23" cy="-58" rx="5" ry="3.5" fill="#d8dff0"/>
            </g>
            {/* idle paw */}
            <ellipse cx="-13" cy="-9" rx="9" ry="6.5" fill="#d8dff0"/>
            {/* head */}
            <circle cx="0" cy="-58" r="21" fill="#d8dff0"/>
            {/* stripe marks */}
            <path d="M-5,-72 L-3,-64" stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            <path d="M0,-74 L0,-65"   stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            <path d="M5,-72 L3,-64"   stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            {/* ears */}
            <polygon points="-17,-74 -8,-58 -23,-58" fill="#d8dff0"/>
            <polygon points="-15,-71 -9,-60 -21,-60" fill="#ffb8cc" opacity="0.5"/>
            <polygon points="17,-74 8,-58 23,-58" fill="#d8dff0"/>
            <polygon points="15,-71 9,-60 21,-60" fill="#ffb8cc" opacity="0.5"/>
            {/* eyes */}
            <g style={{transformOrigin:"-7px -59px",animation:"blinkR 5s ease-in-out infinite"}}>
              <ellipse cx="-7" cy="-59" rx="4.5" ry="4.5" fill="#22203a"/>
              <circle cx="-6" cy="-61" r="1.8" fill="white"/>
            </g>
            <g style={{transformOrigin:"7px -59px",animation:"blinkR 5s ease-in-out infinite 0.4s"}}>
              <ellipse cx="7" cy="-59" rx="4.5" ry="4.5" fill="#22203a"/>
              <circle cx="8" cy="-61" r="1.8" fill="white"/>
            </g>
            {/* nose */}
            <ellipse cx="0" cy="-53" rx="3" ry="2.2" fill="#ff9eb5"/>
            {/* mouth */}
            <path d="M-4,-50 Q0,-48 4,-50" stroke="#cc7090" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            {/* whiskers */}
            <line x1="-21" y1="-54" x2="-5" y2="-54" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="-21" y1="-51" x2="-5" y2="-52" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="21"  y1="-54" x2="5"  y2="-54" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="21"  y1="-51" x2="5"  y2="-52" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            {/* blush */}
            <ellipse cx="-13" cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.35"/>
            <ellipse cx="13"  cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.35"/>
          </g>
        </g>

        {/* tiny flowers at base */}
        {[{x:80,c:"#ffb6d9"},{x:165,c:"#ffe0a0"},{x:635,c:"#b6d9ff"},{x:720,c:"#ffb6d9"}].map((f,i)=>(
          <g key={i} transform={"translate("+f.x+",490)"}>
            {[0,60,120,180,240,300].map((a,j)=>(
              <ellipse key={j}
                cx={+(Math.cos(a*Math.PI/180)*8).toFixed(2)}
                cy={+(Math.sin(a*Math.PI/180)*8).toFixed(2)}
                rx="5" ry="3.5" fill={f.c} opacity="0.85"
                transform={"rotate("+a+","+Math.cos(a*Math.PI/180)*8+","+Math.sin(a*Math.PI/180)*8+")"}/>
            ))}
            <circle cx="0" cy="0" r="4" fill="#ffe066"/>
            <line x1="0" y1="4" x2="0" y2="20" stroke="#5a9a40" strokeWidth="2" strokeLinecap="round"/>
          </g>
        ))}
      </svg>

      {/* scroll hint */}
      <div style={{position:"absolute",bottom:28,left:"50%",animation:"heroBounce 2s infinite",color:"rgba(80,40,60,0.55)",fontSize:"0.78rem",letterSpacing:"0.15em",textAlign:"center",zIndex:20}}>
        scroll down<div style={{fontSize:"1.3rem"}}>{"↓"}</div>
      </div>
    </div>
  );
}

function SceneNight() {
  const pts=[[15,15],[30,8],[55,20],[70,10],[85,18],[42,5],[62,25],[20,25],[78,22]];
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#010108 0%,#05051e 28%,#0a0a38 55%,#100a50 78%,#050320 100%)"}}>
    <div style={{position:"absolute",width:26,height:26,borderRadius:"50%",background:"#fffde0",boxShadow:"0 0 18px 8px rgba(255,253,200,0.5)",top:"12%",right:"18%"}} />
    {pts.map(([l,t],i)=><div key={i} style={{position:"absolute",width:i%3===0?3:2,height:i%3===0?3:2,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,animation:`blink ${2+i*0.4}s ease-in-out infinite ${i*0.25}s`}} />)}
    <div style={{position:"absolute",width:4,height:4,borderRadius:"50%",background:"#ffe066",boxShadow:"0 0 8px 4px rgba(255,224,102,0.8)",left:"22%",bottom:"40%",animation:"fly 6s ease-in-out infinite"}} />
    <div style={{position:"absolute",width:4,height:4,borderRadius:"50%",background:"#ffe066",boxShadow:"0 0 8px 4px rgba(255,224,102,0.8)",left:"65%",bottom:"38%",animation:"fly 5s ease-in-out infinite 1.5s"}} />
  </div>;
}
function SceneForest() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#1a3a20 0%,#2a5030 25%,#3a6840 50%,#508855 72%,#90c890 100%)"}}>
    {[["6%",68,52],["18%",52,40],["74%",62,48],["86%",48,36]].map(([l,h,w],i)=><React.Fragment key={i}>
      <div style={{position:"absolute",width:w,height:h,borderRadius:"50%",background:"radial-gradient(ellipse at 40% 40%,#2a6020,#1a4010)",bottom:20,left:l}} />
      <div style={{position:"absolute",width:8,height:24,background:"#3a2010",borderRadius:3,bottom:0,left:`calc(${l} + ${w/2-4}px)`}} />
    </React.Fragment>)}
  </div>;
}
function SceneMorning() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#a85000 0%,#c87020 22%,#e09040 42%,#f5b860 62%,#ffd880 80%,#fff4b0 100%)"}}>
    <div style={{position:"absolute",width:42,height:42,borderRadius:"50%",background:"radial-gradient(circle,#fff7a0 30%,#ffd040 60%,transparent 100%)",boxShadow:"0 0 28px 12px rgba(255,210,60,0.5)",top:"8%",left:"50%",transform:"translateX(-50%)",animation:"sunPulse 4s ease-in-out infinite"}} />
    {[{l:"30%",b:"32%",d:"2.5s"},{l:"48%",b:"34%",d:"2s",dl:"0.5s"},{l:"58%",b:"31%",d:"2.2s",dl:"0.9s"}].map((s,i)=><div key={i} style={{position:"absolute",width:9,height:9,borderRadius:"50%",background:"rgba(255,255,255,0.4)",left:s.l,bottom:s.b,animation:`steam ${s.d} ease-out infinite ${s.dl||"0s"}`}} />)}
  </div>;
}
function SceneBeach() {
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",background:"linear-gradient(180deg,#000820 0%,#001040 30%,#001a60 55%,#002878 70%,#1a3a6a 85%,#2a4a5a 100%)"}}>
      {/* Moon */}
      <div style={{position:"absolute",width:26,height:26,borderRadius:"50%",background:"#fffde0",boxShadow:"0 0 18px 8px rgba(255,253,200,0.5)",top:"10%",right:"22%"}} />
      {/* Moon reflection on water */}
      <div style={{position:"absolute",width:6,height:28,background:"linear-gradient(transparent,rgba(255,253,200,0.4),transparent)",borderRadius:4,bottom:"28%",right:"24%",filter:"blur(2px)"}} />
      {/* Stars */}
      {[[10,8],[22,4],[38,11],[55,6],[72,9],[85,4],[16,18],[44,15],[68,12]].map(([l,t],i)=>(
        <div key={i} style={{position:"absolute",width:i%3===0?2:1.5,height:i%3===0?2:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,opacity:0.8,animation:`blink ${2+i*0.35}s ease-in-out infinite ${i*0.25}s`}} />
      ))}
      {/* Ocean waves - 3 layers */}
      <div style={{position:"absolute",bottom:"22%",left:"-10%",width:"120%",height:18,background:"rgba(60,120,200,0.5)",borderRadius:"55% 55% 0 0",animation:"wave1 3s ease-in-out infinite"}} />
      <div style={{position:"absolute",bottom:"18%",left:"-15%",width:"130%",height:14,background:"rgba(40,100,180,0.4)",borderRadius:"60% 60% 0 0",animation:"wave1 3.8s ease-in-out infinite 0.6s"}} />
      <div style={{position:"absolute",bottom:"14%",left:"-5%",width:"115%",height:12,background:"rgba(80,140,210,0.35)",borderRadius:"50% 50% 0 0",animation:"wave1 4.5s ease-in-out infinite 1.2s"}} />
      {/* Foam highlights */}
      <div style={{position:"absolute",bottom:"22%",left:0,right:0,height:3,background:"rgba(255,255,255,0.18)",animation:"wave1 3s ease-in-out infinite"}} />
      <div style={{position:"absolute",bottom:"18%",left:0,right:0,height:2,background:"rgba(255,255,255,0.12)",animation:"wave1 3.8s ease-in-out infinite 0.6s"}} />
      {/* Sandy shore */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"18%",background:"linear-gradient(180deg,#8a7050 0%,#b89060 50%,#c8a070 100%)"}} />
      {/* Wet sand shine */}
      <div style={{position:"absolute",bottom:"14%",left:0,right:0,height:"6%",background:"linear-gradient(180deg,rgba(60,120,200,0.3),rgba(100,150,200,0.15))"}} />
      {/* Fireflies */}
      <div style={{position:"absolute",width:3,height:3,borderRadius:"50%",background:"#ffe066",boxShadow:"0 0 6px 3px rgba(255,224,102,0.8)",left:"28%",bottom:"42%",animation:"fly 5.5s ease-in-out infinite"}} />
      <div style={{position:"absolute",width:3,height:3,borderRadius:"50%",background:"#ffe066",boxShadow:"0 0 6px 3px rgba(255,224,102,0.8)",left:"62%",bottom:"38%",animation:"fly 6s ease-in-out infinite 1.5s"}} />
    </div>
  );
}
function SceneStars() {
  const pts=[[10,8],[20,3],[35,12],[48,5],[60,9],[72,3],[85,11],[15,20],[40,18],[65,16],[88,6],[25,28],[55,24]];
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#000005 0%,#020212 24%,#050525 50%,#0a0840 74%,#050320 100%)"}}>
    <div style={{position:"absolute",width:24,height:24,borderRadius:"50%",background:"#fffde0",boxShadow:"0 0 16px 7px rgba(255,253,200,0.5)",top:"10%",right:"16%"}} />
    {pts.map(([l,t],i)=><div key={i} style={{position:"absolute",width:i%4===0?3:2,height:i%4===0?3:2,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,animation:`blink ${1.5+i*0.3}s ease-in-out infinite ${i*0.2}s`}} />)}
    <div style={{position:"absolute",width:4,height:4,borderRadius:"50%",background:"#ffe066",boxShadow:"0 0 8px 4px rgba(255,224,102,0.8)",left:"32%",bottom:"36%",animation:"fly 7s ease-in-out infinite"}} />
  </div>;
}
function SceneFireworks() {
  const sparks=[{l:28,t:28,c:"#ff6b9d"},{l:48,t:18,c:"#ffdd57"},{l:68,t:32,c:"#6bcfff"},{l:38,t:48,c:"#e0aaff"},{l:58,t:42,c:"#ff9eb5"},{l:22,t:52,c:"#b8f5a0"},{l:74,t:22,c:"#ffb347"},{l:44,t:12,c:"#ff6b9d"},{l:62,t:54,c:"#ffdd57"},{l:18,t:32,c:"#6bcfff"}];
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#020008 0%,#0a0018 28%,#180028 55%,#200035 74%,#0a0020 100%)"}}>
    {sparks.map((s,i)=><div key={i} style={{position:"absolute",left:`${s.l}%`,top:`${s.t}%`,width:3,height:3,background:s.c,borderRadius:"50%",boxShadow:`0 0 7px 3px ${s.c}`,animation:`blink ${1.2+i*0.18}s ease-in-out infinite ${i*0.14}s`}} />)}
  </div>;
}
function SceneCafe() {
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",background:"linear-gradient(180deg,#1a0f28 0%,#2d1a3e 30%,#1a0f28 60%,#0d0818 100%)"}}>
      {/* Night sky */}
      {[[8,12],[22,6],[45,15],[68,8],[82,5],[90,18],[35,4],[55,10]].map(([l,t],i)=>(
        <div key={i} style={{position:"absolute",width:i%3===0?2:1.5,height:i%3===0?2:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,opacity:0.7+Math.random()*0.3,animation:`blink ${2+i*0.4}s ease-in-out infinite ${i*0.3}s`}} />
      ))}
      {/* Warm glowing window */}
      <div style={{position:"absolute",bottom:"28%",left:"50%",transform:"translateX(-50%)",width:52,height:38,background:"linear-gradient(135deg,#ffd97a,#ffb347,#ff8c42)",borderRadius:4,boxShadow:"0 0 28px 12px rgba(255,180,60,0.55),0 0 8px 3px rgba(255,140,40,0.8)"}}>
        {/* Window panes */}
        <div style={{position:"absolute",top:"48%",left:0,right:0,height:2,background:"rgba(100,60,20,0.6)"}} />
        <div style={{position:"absolute",left:"48%",top:0,bottom:0,width:2,background:"rgba(100,60,20,0.6)"}} />
        {/* Curtains */}
        <div style={{position:"absolute",top:0,left:0,width:"28%",bottom:0,background:"rgba(180,60,60,0.35)",borderRadius:"0 0 4px 4px"}} />
        <div style={{position:"absolute",top:0,right:0,width:"28%",bottom:0,background:"rgba(180,60,60,0.35)",borderRadius:"0 0 4px 4px"}} />
      </div>
      {/* Building silhouette */}
      <div style={{position:"absolute",bottom:0,left:"15%",right:"15%",height:"38%",background:"#0d0818",borderRadius:"4px 4px 0 0"}}>
        {/* Roof detail */}
        <div style={{position:"absolute",top:-8,left:-6,right:-6,height:10,background:"#180f2e",borderRadius:"3px 3px 0 0"}} />
        {/* Door */}
        <div style={{position:"absolute",bottom:0,left:"40%",width:"20%",height:"45%",background:"#0a0614",borderRadius:"8px 8px 0 0",border:"1px solid rgba(255,180,60,0.2)"}} />
      </div>
      {/* Side buildings */}
      <div style={{position:"absolute",bottom:0,left:0,width:"20%",height:"28%",background:"#150c25",borderRadius:"3px 3px 0 0"}} />
      <div style={{position:"absolute",bottom:0,right:0,width:"18%",height:"32%",background:"#120a22",borderRadius:"3px 3px 0 0"}} />
      {/* Warm lantern glow on ground */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"22%",background:"linear-gradient(transparent,rgba(255,150,40,0.12))"}} />
      {/* Steam from cafe */}
      {[{l:"44%",d:"2.2s"},{l:"52%",d:"2.8s",dl:"0.6s"},{l:"58%",d:"2.5s",dl:"1.1s"}].map((s,i)=>(
        <div key={i} style={{position:"absolute",width:5,height:5,borderRadius:"50%",background:"rgba(255,220,150,0.35)",left:s.l,bottom:"60%",animation:`steam ${s.d} ease-out infinite ${s.dl||"0s"}`}} />
      ))}
      {/* Hanging lantern */}
      <div style={{position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)"}}>
        <div style={{width:1,height:10,background:"rgba(255,180,60,0.4)",margin:"0 auto"}} />
        <div style={{width:14,height:18,background:"linear-gradient(180deg,#ff9a2a,#ffb347)",borderRadius:"3px 3px 6px 6px",boxShadow:"0 0 10px 4px rgba(255,160,50,0.5)",margin:"0 auto"}} />
      </div>
    </div>
  );
}
function ScenePottery() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#583010 0%,#784020 25%,#986030 50%,#b88050 70%,#d0a070 87%,#f0c898 100%)"}}>
    <div style={{position:"absolute",bottom:"20%",left:"50%",transform:"translateX(-50%)",width:36,height:42,background:"rgba(255,255,255,0.14)",borderRadius:"4px 4px 14px 14px"}} />
  </div>;
}
function SceneBadminton() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1a8040 0%,#28a050 24%,#50c070 50%,#88d890 72%,#c0f0c0 87%,#e8ffe8 100%)"}}>
    <div style={{position:"absolute",width:38,height:38,borderRadius:"50%",background:"radial-gradient(circle,#fff7a0 30%,#ffd040 60%,transparent 100%)",boxShadow:"0 0 22px 9px rgba(255,210,60,0.4)",top:"7%",left:"18%",animation:"sunPulse 4s ease-in-out infinite"}} />
    <div style={{position:"absolute",bottom:0,width:"110%",height:40,background:"#3a8a28",borderRadius:"50% 50% 0 0",left:"-5%"}} />
  </div>;
}
function SceneMovie() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#040008 0%,#0c0018 26%,#180028 52%,#a03c12 76%,#d05c1e 100%)"}}>
    <div style={{position:"absolute",top:"18%",left:"15%",right:"15%",height:"42%",background:"rgba(255,255,255,0.05)",borderRadius:3,border:"1px solid rgba(255,255,255,0.08)"}} />
    {[[18,10],[38,6],[58,12],[78,8]].map(([l,t],i)=><div key={i} style={{position:"absolute",width:2,height:2,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,animation:`blink ${2+i*0.5}s ease-in-out infinite ${i*0.3}s`}} />)}
  </div>;
}


function SceneWindRises() {
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",background:"linear-gradient(180deg,#3a7bd5 0%,#6aaee8 20%,#a8d4f0 45%,#f5c97a 68%,#e8956a 82%,#c96b50 100%)"}}>
      {/* Ghibli sun - large, warm, golden hour */}
      <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:52,height:52,borderRadius:"50%",background:"radial-gradient(circle,#fffbe0 20%,#ffd95a 55%,#ffb030 80%,rgba(255,140,30,0) 100%)",boxShadow:"0 0 40px 18px rgba(255,200,60,0.45)",animation:"sunPulse 5s ease-in-out infinite"}} />
      {/* Wind streaks - Ghibli style long sweeping lines */}
      {[
        {top:"22%",left:"-5%",w:55,h:2,op:0.22,d:"0s"},
        {top:"30%",left:"10%",w:75,h:1.5,op:0.18,d:"0.5s"},
        {top:"38%",left:"-8%",w:60,h:2,op:0.20,d:"1s"},
        {top:"48%",left:"5%",w:45,h:1,op:0.14,d:"1.4s"},
      ].map((l,i)=>(
        <div key={i} style={{position:"absolute",top:l.top,left:l.left,width:`${l.w}%`,height:l.h,background:`rgba(255,255,255,${l.op})`,borderRadius:4,animation:`steam 3s ease-in-out infinite ${l.d}`}} />
      ))}
      {/* Ghibli fluffy clouds */}
      {[{top:"8%",left:"5%",s:1.1},{top:"12%",left:"58%",s:0.85},{top:"5%",left:"32%",s:0.7}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:c.top,left:c.left,transform:`scale(${c.s})`,opacity:0.9}}>
          <div style={{width:56,height:18,background:"rgba(255,255,255,0.92)",borderRadius:24}} />
          <div style={{position:"absolute",top:-12,left:6,width:28,height:26,background:"rgba(255,255,255,0.92)",borderRadius:"50%"}} />
          <div style={{position:"absolute",top:-8,left:24,width:20,height:20,background:"rgba(255,255,255,0.88)",borderRadius:"50%"}} />
        </div>
      ))}
      {/* Plane silhouette soaring */}
      <div style={{position:"absolute",top:"28%",left:"60%",transform:"rotate(-10deg)"}}>
        <div style={{width:38,height:5,background:"rgba(20,12,5,0.75)",borderRadius:"0 6px 6px 0"}} />
        <div style={{position:"absolute",top:-7,left:9,width:20,height:13,background:"rgba(20,12,5,0.65)",clipPath:"polygon(0 100%,35% 0,100% 0,100% 100%)",borderRadius:3}} />
        <div style={{position:"absolute",top:3,left:30,width:12,height:7,background:"rgba(20,12,5,0.65)",clipPath:"polygon(0 100%,50% 0,100% 100%)"}} />
        <div style={{position:"absolute",top:-2,left:-4,width:6,height:4,background:"rgba(20,12,5,0.55)",clipPath:"polygon(0 100%,50% 0,100% 100%)"}} />
      </div>
      {/* Rolling green hills */}
      <div style={{position:"absolute",bottom:0,width:"130%",height:36,left:"-15%",background:"linear-gradient(180deg,#5a9640,#3d7530)",borderRadius:"55% 55% 0 0"}} />
      <div style={{position:"absolute",bottom:0,width:"70%",height:28,left:"30%",background:"linear-gradient(180deg,#6aaa48,#4a8838)",borderRadius:"60% 60% 0 0"}} />
      {/* Warm haze overlay at horizon */}
      <div style={{position:"absolute",bottom:"20%",left:0,right:0,height:30,background:"linear-gradient(transparent,rgba(255,180,80,0.18))"}} />
    </div>
  );
}
// ═══════════════════════════════════════════════
//  CARD COMPONENTS
// ═══════════════════════════════════════════════

const CARD_BACKGROUNDS = [
  { id:"night",   label:"Night Sky",     style:{background:"linear-gradient(180deg,#0a0a1a 0%,#1a1a3e 50%,#2a1a2e 100%)"},  accent:"#c4b5fd" },
  { id:"sunrise", label:"Sunrise",       style:{background:"linear-gradient(180deg,#1a1a3e 0%,#ff6b35 40%,#ffa07a 70%,#ffd4a0 100%)"}, accent:"#ffa07a" },
  { id:"forest",  label:"Forest",        style:{background:"linear-gradient(180deg,#1a3a1a 0%,#2d6a2d 40%,#4a8c3a 70%,#6aaa50 100%)"}, accent:"#86efac" },
  { id:"ocean",   label:"Ocean",         style:{background:"linear-gradient(180deg,#0a1628 0%,#1a3a5c 40%,#2a6a8c 70%,#4a9ab8 100%)"}, accent:"#7dd3fc" },
  { id:"golden",  label:"Golden Hour",   style:{background:"linear-gradient(180deg,#2a1a0a 0%,#8c4a0a 30%,#d4843a 60%,#f5c842 100%)"}, accent:"#fde68a" },
  { id:"sakura",  label:"Sakura",        style:{background:"linear-gradient(180deg,#fce4ec 0%,#f8bbd9 40%,#f48fb1 70%,#e91e8c 100%)"}, accent:"#fda4af" },
  { id:"desert",  label:"Desert Dusk",   style:{background:"linear-gradient(180deg,#3a1a0a 0%,#8c5a1a 35%,#c4843a 60%,#e8c070 100%)"}, accent:"#fbbf24" },
  { id:"aurora",  label:"Aurora",        style:{background:"linear-gradient(180deg,#030a1a 0%,#0a2a1a 30%,#1a4a2a 55%,#2a6a4a 75%,#4a8a6a 100%)"}, accent:"#6ee7b7" },
];

function CustomDreamCardBuilder({cards, onAdd, onDelete}) {
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
  const bg = CARD_BACKGROUNDS.find(b=>b.id===bgId);

  const saveDreams = async (updated) => {
    // Replaced with per-record REST API calls - see handleAdd/handleDelete
  };

  const handleAdd = async () => {
    if(pwd!=="Hana"){alert("Wrong password");setPwd("");return;}
    setSaving(true);
    const newCard = {id: Date.now(), title, desc, emoji, bgId};
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/dreams`, {
        method:"POST",
        headers:{...sbHeaders,"Prefer":"return=representation"},
        body: JSON.stringify({id: newCard.id, title: newCard.title, description: newCard.desc, emoji: newCard.emoji, bg_id: newCard.bgId})
      });
      if(!r.ok) throw new Error(await r.text());
      onAdd([...cards, newCard]);
      setTitle("");setDesc("");setEmoji("🌟");setBgId("night");setPwd("");setStep(1);setOpen(false);
    } catch(e){console.error(e);alert("Could not save, try again");}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if(delPwd!=="Hana"){alert("Wrong password");setDelPwd("");return;}
    setDeleting(id);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/dreams?id=eq.${id}`, {
        method:"DELETE",
        headers:{...sbHeaders}
      });
      if(!r.ok) throw new Error(await r.text());
      onAdd(cards.filter(c=>c.id!==id));
      setDelTarget(null);setDelPwd("");
    } catch(e){console.error(e);alert("Could not delete, try again");}
    setDeleting(null);
  };

  return (
    <>
      {/* Render saved custom cards inside the same dream-grid */}
      {cards.map((card,i) => {
        const cbg = CARD_BACKGROUNDS.find(b=>b.id===card.bgId)||CARD_BACKGROUNDS[0];
        return (
          <Fade key={card.id} delay={i*0.05}>
            <div style={{borderRadius:16,overflow:"hidden",boxShadow:"0 6px 30px rgba(0,0,0,0.1)",background:"white",display:"flex",flexDirection:"column",transition:"transform 0.3s,box-shadow 0.3s",borderBottom:`3px solid ${cbg.accent}`,height:"100%",position:"relative"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{height:120,position:"relative",overflow:"hidden",flexShrink:0,...cbg.style}}>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:44,background:"linear-gradient(transparent,white)",zIndex:10}} />
              </div>
              <div style={{padding:"14px 18px 20px",flex:1}}>
                <div style={{fontSize:"1.6rem",display:"block",marginBottom:6}}>{card.emoji}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.94rem",color:"#2c1810",marginBottom:6,fontWeight:600}}>{card.title}</div>
                <p style={{fontSize:"0.82rem",color:"#6b4c3b",lineHeight:1.72,margin:0}}>{card.desc}</p>
              </div>
              {/* Delete button */}
              {delTarget===card.id ? (
                <div style={{padding:"10px 14px",borderTop:"1px solid rgba(212,168,67,0.15)",display:"flex",flexDirection:"column",gap:6}}>
                  <input type="password" value={delPwd} onChange={e=>setDelPwd(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")handleDelete(card.id);if(e.key==="Escape"){setDelTarget(null);setDelPwd("");}}} placeholder="password" autoFocus style={{border:"1px solid #d4a843",borderRadius:8,padding:"5px 10px",fontSize:"0.82rem",outline:"none",textAlign:"center"}} />
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>handleDelete(card.id)} disabled={deleting===card.id} style={{flex:1,background:"#c0392b",color:"white",border:"none",borderRadius:8,padding:"5px",fontSize:"0.78rem",cursor:"pointer"}}>{deleting===card.id?"...":"Delete"}</button>
                    <button onClick={()=>{setDelTarget(null);setDelPwd("");}} style={{flex:1,background:"#888",color:"white",border:"none",borderRadius:8,padding:"5px",fontSize:"0.78rem",cursor:"pointer"}}>Cancel</button>
                  </div>
                </div>
              ):(
                <button onClick={()=>setDelTarget(card.id)} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.35)",border:"none",color:"white",width:24,height:24,borderRadius:"50%",cursor:"pointer",fontSize:"0.7rem",display:"flex",alignItems:"center",justifyContent:"center",zIndex:20}}>✕</button>
              )}
            </div>
          </Fade>
        );
      })}

      {/* Add button spanning full grid width */}
      <div style={{gridColumn:"1/-1",marginTop:6}}>
        {!open ? (
          <button onClick={()=>setOpen(true)} style={{display:"flex",alignItems:"center",gap:10,margin:"0 auto",background:"rgba(255,255,255,0.08)",border:"2px dashed rgba(212,168,67,0.45)",color:"#d4a843",padding:"14px 28px",borderRadius:16,cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.95rem",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(212,168,67,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>
            <span style={{fontSize:"1.3rem"}}>＋</span> Add your own dream
          </button>
        ):(
          <div style={{background:"rgba(255,255,255,0.07)",borderRadius:20,padding:"28px 24px",border:"1px solid rgba(212,168,67,0.25)",maxWidth:560,margin:"0 auto"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",color:"#d4a843",fontSize:"1rem",marginBottom:20,textAlign:"center"}}>Create a dream ✨</p>
            {step===1&&(<>
              <div style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:6}}>Emoji</label>
                <input value={emoji} onChange={e=>setEmoji(e.target.value)} maxLength={4} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:10,padding:"10px 14px",color:"white",fontSize:"1.4rem",width:70,outline:"none",textAlign:"center"}} />
              </div>
              <div style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:6}}>Title</label>
                <input value={title} onChange={e=>setTitle(e.target.value)} maxLength={60} placeholder="Name this dream..." style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:10,padding:"10px 14px",color:"white",fontSize:"0.95rem",outline:"none",fontFamily:"'Lora',serif",boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:6}}>Description</label>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} maxLength={300} rows={3} placeholder="What does this dream look like..." style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:10,padding:"10px 14px",color:"white",fontSize:"0.9rem",outline:"none",resize:"none",fontFamily:"'Lora',serif",lineHeight:1.7,boxSizing:"border-box"}} />
              </div>
              <div style={{marginBottom:24}}>
                <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:10}}>Card Background</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                  {CARD_BACKGROUNDS.map(b=>(
                    <button key={b.id} onClick={()=>setBgId(b.id)} style={{...b.style,borderRadius:10,padding:"20px 8px 8px",border:bgId===b.id?`2px solid ${b.accent}`:"2px solid transparent",cursor:"pointer",textAlign:"center",boxShadow:bgId===b.id?`0 0 12px ${b.accent}60`:"none",transition:"all 0.2s"}}>
                      <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.9)",fontFamily:"'Lora',serif",letterSpacing:"0.03em"}}>{b.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              {title&&(
                <div style={{marginBottom:20}}>
                  <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:8}}>Preview</label>
                  <div style={{maxWidth:180,borderRadius:14,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",border:`2px solid ${bg.accent}50`}}>
                    <div style={{...bg.style,height:75,position:"relative"}}>
                      <div style={{position:"absolute",bottom:0,left:0,right:0,height:28,background:"linear-gradient(transparent,white)"}} />
                    </div>
                    <div style={{background:"white",padding:"10px 12px"}}>
                      <div style={{fontSize:"1.2rem",marginBottom:3}}>{emoji}</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.8rem",color:"#2c1810",fontWeight:600,marginBottom:3}}>{title}</div>
                      <p style={{fontSize:"0.7rem",color:"#6b4c3b",lineHeight:1.6,margin:0}}>{desc.slice(0,70)}{desc.length>70?"...":""}</p>
                    </div>
                  </div>
                </div>
              )}
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>{setOpen(false);setStep(1);}} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.5)",padding:"10px 20px",borderRadius:12,cursor:"pointer",fontFamily:"'Lora',serif",fontSize:"0.88rem"}}>Cancel</button>
                <button onClick={()=>setStep(2)} disabled={!title.trim()||!desc.trim()} style={{background:"#d4a843",border:"none",color:"#2c1810",padding:"10px 24px",borderRadius:12,cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.92rem",fontWeight:600,opacity:!title.trim()||!desc.trim()?0.4:1}}>Next →</button>
              </div>
            </>)}
            {step===2&&(<>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:"0.9rem",textAlign:"center",marginBottom:16,fontStyle:"italic",fontFamily:"'Lora',serif"}}>Enter password to add this dream</p>
              <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")handleAdd();if(e.key==="Escape")setStep(1);}} placeholder="password" autoFocus style={{display:"block",width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(212,168,67,0.4)",borderRadius:10,padding:"12px 16px",color:"white",fontSize:"1rem",outline:"none",boxSizing:"border-box",marginBottom:16,textAlign:"center",letterSpacing:"0.2em"}} />
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <button onClick={()=>setStep(1)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.5)",padding:"10px 20px",borderRadius:12,cursor:"pointer",fontFamily:"'Lora',serif",fontSize:"0.88rem"}}>Back</button>
                <button onClick={handleAdd} disabled={saving||!pwd} style={{background:"#d4a843",border:"none",color:"#2c1810",padding:"10px 28px",borderRadius:12,cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.92rem",fontWeight:600,opacity:saving||!pwd?0.4:1}}>{saving?"Saving...":"Add Dream ✨"}</button>
              </div>
            </>)}
          </div>
        )}
      </div>
    </>
  );
}


function DreamCard({scene,emoji,title,desc,quote}) {
  return (
    <div style={{borderRadius:16,overflow:"hidden",boxShadow:"0 6px 30px rgba(0,0,0,0.1)",background:"white",display:"flex",flexDirection:"column",transition:"transform 0.3s,box-shadow 0.3s",borderBottom:"3px solid #d4a843",height:"100%"}}
      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
      <div style={{height:120,position:"relative",overflow:"hidden",flexShrink:0}}>
        {scene}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:44,background:"linear-gradient(transparent,white)",zIndex:10}} />
      </div>
      <div style={{padding:"14px 18px 20px",flex:1}}>
        <div style={{fontSize:"1.6rem",display:"block",marginBottom:6}}>{emoji}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.94rem",color:"#2c1810",marginBottom:6,fontWeight:600}}>{title}</div>
        {quote && (
          <div style={{borderLeft:"3px solid #d4a843",paddingLeft:10,marginBottom:8,background:"rgba(212,168,67,0.06)",borderRadius:"0 6px 6px 0",padding:"7px 10px 7px 12px"}}>
            <p style={{fontSize:"0.78rem",color:"#8a6a2a",lineHeight:1.65,margin:0,fontStyle:"italic",fontFamily:"'Playfair Display',serif"}}>{quote}</p>
          </div>
        )}
        <p style={{fontSize:"0.82rem",color:"#6b4c3b",lineHeight:1.72,margin:0}}>{desc}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  ANIME CAT
// ═══════════════════════════════════════════════
function AnimeCat({style={}}) {
  return (
    <div style={{position:"relative",width:64,height:64,flexShrink:0,animation:"catFloat 3s ease-in-out infinite",...style}}>
      <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:42,height:38,background:"#f5c0c0",borderRadius:"50% 50% 45% 45%"}} />
      <div style={{position:"absolute",top:2,left:"50%",transform:"translateX(-50%)",width:44,height:38,background:"#f5c0c0",borderRadius:"50%"}}>
        <div style={{position:"absolute",top:-10,left:5,width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderBottom:"14px solid #f5c0c0"}} />
        <div style={{position:"absolute",top:-10,right:5,width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderBottom:"14px solid #f5c0c0"}} />
        <div style={{position:"absolute",top:12,left:7,width:7,height:8,background:"#2a1a2e",borderRadius:"50%",animation:"catBlink 4s ease-in-out infinite"}}>
          <div style={{position:"absolute",top:1,left:1,width:3,height:3,background:"white",borderRadius:"50%"}} />
        </div>
        <div style={{position:"absolute",top:12,right:7,width:7,height:8,background:"#2a1a2e",borderRadius:"50%",animation:"catBlink 4s ease-in-out infinite 0.2s"}}>
          <div style={{position:"absolute",top:1,left:1,width:3,height:3,background:"white",borderRadius:"50%"}} />
        </div>
        <div style={{position:"absolute",top:22,left:"50%",transform:"translateX(-50%)",width:5,height:3,background:"#ff9eb5",borderRadius:"50%"}} />
      </div>
      <div style={{position:"absolute",bottom:6,right:-12,width:16,height:24,borderRight:"5px solid #f5c0c0",borderRadius:"0 50% 50% 0",animation:"tailWag 1.5s ease-in-out infinite"}} />
      <div style={{position:"absolute",bottom:-3,left:7,width:10,height:8,background:"#f5c0c0",borderRadius:"50%"}} />
      <div style={{position:"absolute",bottom:-3,right:14,width:10,height:8,background:"#f5c0c0",borderRadius:"50%"}} />
    </div>
  );
}

// ═══════════════════════════════════════════════
//  STAR FIELD & FIREWORKS
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
//  MEMORIES SECTION
// ═══════════════════════════════════════════════
// 5 different Ghibli scenes that rotate per photo index
function GhibliScene0() { // Forest night + fireflies
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#0d1b2a 0%,#1a2e1a 40%,#1e3a22 70%,#0f2010 100%)"}} />
    <div style={{position:"absolute",top:"8%",right:"15%",width:50,height:50,borderRadius:"50%",background:"radial-gradient(circle at 38% 38%,#fffde8,#f5e890)",boxShadow:"0 0 40px 18px rgba(255,240,120,0.4)"}} />
    {[[8,4],[18,2],[30,7],[45,3],[60,6],[74,2],[86,8],[15,14],[38,11],[62,13],[82,5],[25,19],[52,17],[78,15]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:i%3===0?2:1.5,height:i%3===0?2:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,opacity:0.75,animation:`blink ${2+i*0.25}s ease-in-out infinite ${i*0.18}s`}} />
    ))}
    <div style={{position:"absolute",bottom:"32%",left:"-5%",width:"52%",height:"30%",background:"#162e18",borderRadius:"55% 55% 0 0"}} />
    <div style={{position:"absolute",bottom:"29%",right:"-5%",width:"48%",height:"26%",background:"#1a3420",borderRadius:"60% 60% 0 0"}} />
    <div style={{position:"absolute",bottom:"18%",left:"-8%",width:"68%",height:"24%",background:"#22481e",borderRadius:"55% 55% 0 0"}} />
    <div style={{position:"absolute",bottom:"14%",right:"-8%",width:"62%",height:"22%",background:"#265024",borderRadius:"60% 60% 0 0"}} />
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"20%",background:"#142410"}} />
    {/* Pine trees */}
    {[[3,0,10,55],[5,42,32,8],[90,0,8,50],[88,42,28,7]].map(([r,b,h,tr],i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,[i<2?"left":"right"]:`${r}%`}}>
        <div style={{width:8,height:`${h}%`,background:"#0a1a0c",borderRadius:"3px 3px 0 0",margin:"0 auto"}} />
        {[40,28,18].map((s,j)=><div key={j} style={{width:0,height:0,borderLeft:`${s/2}px solid transparent`,borderRight:`${s/2}px solid transparent`,borderBottom:`${s*0.8}px solid #0f2210`,margin:`-${s*0.2}px auto 0`}} />)}
      </div>
    ))}
    {[{l:"22%",b:"38%",d:"4s"},{l:"70%",b:"42%",d:"5.5s",dl:"1s"},{l:"48%",b:"30%",d:"6s",dl:"2s"},{l:"58%",b:"46%",d:"4.5s",dl:"0.5s"},{l:"35%",b:"35%",d:"5s",dl:"1.5s"}].map((f,i)=>(
      <div key={i} style={{position:"absolute",width:3,height:3,borderRadius:"50%",background:"#ccff88",boxShadow:"0 0 7px 3px rgba(180,255,100,0.8)",left:f.l,bottom:f.b,animation:`fly ${f.d} ease-in-out infinite ${f.dl||"0s"}`}} />
    ))}
    <div style={{position:"absolute",bottom:"14%",left:0,right:0,height:"10%",background:"linear-gradient(transparent,rgba(140,210,160,0.09),transparent)"}} />
  </div>;
}

function GhibliScene1() { // Sakura sunrise
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1a0a2e 0%,#3d1f5a 20%,#7a3060 40%,#c4607a 60%,#e8a070 80%,#f5c890 100%)"}} />
    {/* Sun rising */}
    <div style={{position:"absolute",bottom:"28%",left:"50%",transform:"translateX(-50%)",width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle,#fff5c0,#ffdb70)",boxShadow:"0 0 50px 25px rgba(255,210,80,0.5)"}} />
    {/* Silhouette hills */}
    <div style={{position:"absolute",bottom:"22%",left:"-5%",width:"55%",height:"25%",background:"#1a0f2e",borderRadius:"55% 55% 0 0"}} />
    <div style={{position:"absolute",bottom:"20%",right:"-5%",width:"50%",height:"22%",background:"#200f38",borderRadius:"60% 60% 0 0"}} />
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"25%",background:"linear-gradient(#1a0f2e,#120a20)"}} />
    {/* Sakura tree silhouette left */}
    <div style={{position:"absolute",bottom:"22%",left:"6%",width:7,height:"55%",background:"#0f0820",borderRadius:4}} />
    {[[-20,95],[0,88],[20,92],[-35,82],[35,84],[-15,74],[15,76],[-28,65],[28,67],[0,60]].map(([x,b],i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,left:`calc(9% + ${x}px)`,width:14,height:14,borderRadius:"50%",background:"rgba(255,150,180,0.5)",boxShadow:"0 0 8px 4px rgba(255,100,150,0.3)",animation:`blink ${3+i*0.4}s ease-in-out infinite ${i*0.3}s`}} />
    ))}
    {/* Sakura tree silhouette right */}
    <div style={{position:"absolute",bottom:"22%",right:"8%",width:6,height:"50%",background:"#0f0820",borderRadius:4}} />
    {[[20,90],[0,82],[-20,87],[30,78],[-30,80],[10,72],[-10,74],[25,64],[-25,66],[0,58]].map(([x,b],i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,right:`calc(7% + ${-x}px)`,width:12,height:12,borderRadius:"50%",background:"rgba(255,170,200,0.5)",boxShadow:"0 0 6px 3px rgba(255,120,160,0.3)",animation:`blink ${3.5+i*0.3}s ease-in-out infinite ${i*0.25}s`}} />
    ))}
    {/* Falling petals */}
    {[{l:"20%",d:"6s"},{l:"40%",d:"8s",dl:"1s"},{l:"60%",d:"7s",dl:"2s"},{l:"75%",d:"9s",dl:"0.5s"},{l:"85%",d:"6.5s",dl:"3s"}].map((p,i)=>(
      <div key={i} style={{position:"absolute",top:"-5%",left:p.l,width:6,height:6,borderRadius:"50% 0 50% 0",background:"rgba(255,180,210,0.8)",animation:`drift ${p.d} linear infinite ${p.dl||"0s"}`}} />
    ))}
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"6%",background:"rgba(255,180,100,0.1)"}} />
  </div>;
}

function GhibliScene2() { // Aurora night
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#010818 0%,#020d2a 30%,#041230 60%,#06183c 80%,#020a18 100%)"}} />
    {/* Aurora bands */}
    <div style={{position:"absolute",top:"8%",left:"-10%",width:"120%",height:"45%",background:"linear-gradient(180deg,transparent,rgba(0,255,180,0.12),rgba(0,200,255,0.18),rgba(120,0,255,0.1),transparent)",borderRadius:"50%",filter:"blur(18px)",animation:"wave1 8s ease-in-out infinite"}} />
    <div style={{position:"absolute",top:"15%",left:"-5%",width:"110%",height:"35%",background:"linear-gradient(180deg,transparent,rgba(0,255,120,0.1),rgba(0,180,255,0.15),transparent)",borderRadius:"50%",filter:"blur(24px)",animation:"wave1 11s ease-in-out infinite reverse"}} />
    {[[5,3],[15,2],[28,5],[44,2],[58,4],[70,1],[84,6],[92,3],[12,10],[35,8],[65,11],[82,7],[22,15],[55,14],[78,12]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:i%4===0?2.5:1.5,height:i%4===0?2.5:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,opacity:0.9,animation:`blink ${1.5+i*0.2}s ease-in-out infinite ${i*0.15}s`}} />
    ))}
    <div style={{position:"absolute",bottom:"22%",left:"-5%",width:"55%",height:"25%",background:"#020a08",borderRadius:"55% 55% 0 0"}} />
    <div style={{position:"absolute",bottom:"20%",right:"-5%",width:"50%",height:"22%",background:"#030c0a",borderRadius:"60% 60% 0 0"}} />
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"25%",background:"#010608"}} />
    {[[4,0,12,50],[6,45,32,7],[89,0,10,48],[87,42,28,6]].map(([x,b,h,tr],i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,[i<2?"left":"right"]:`${x}%`}}>
        <div style={{width:7,height:`${h}%`,background:"#010608",margin:"0 auto"}} />
        {[38,26,16].map((s,j)=><div key={j} style={{width:0,height:0,borderLeft:`${s/2}px solid transparent`,borderRight:`${s/2}px solid transparent`,borderBottom:`${s*0.8}px solid #020b0a`,margin:`-${s*0.2}px auto 0`}} />)}
      </div>
    ))}
    <div style={{position:"absolute",bottom:"20%",left:"20%",width:"60%",height:1,background:"rgba(0,255,200,0.15)",boxShadow:"0 0 20px 10px rgba(0,200,180,0.1)"}} />
  </div>;
}

function GhibliScene3() { // Rainy day by the window
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#2a3040 0%,#3a4055 30%,#454a60 60%,#2a2e40 100%)"}} />
    {/* Clouds */}
    {[[10,8,80,28],[30,12,70,22],[55,6,90,32],[70,15,65,20]].map(([l,t,w,h],i)=>(
      <div key={i} style={{position:"absolute",left:`${l}%`,top:`${t}%`,width:`${w}px`,height:`${h}px`,background:"rgba(200,210,230,0.18)",borderRadius:"50%",filter:"blur(8px)"}} />
    ))}
    {/* Rain drops */}
    {Array.from({length:30},(_,i)=>({l:Math.random()*100,d:0.6+Math.random()*0.8,dl:Math.random()*2})).map((r,i)=>(
      <div key={i} style={{position:"absolute",left:`${r.l}%`,top:"-5%",width:1,height:12,background:"rgba(180,200,240,0.35)",borderRadius:2,animation:`drift ${r.d}s linear infinite ${r.dl}s`}} />
    ))}
    {/* Ground/path */}
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"30%",background:"linear-gradient(#2a3020,#1a2015)"}} />
    <div style={{position:"absolute",bottom:"0%",left:"35%",width:"30%",height:"28%",background:"linear-gradient(#3a3428,#2a2420)",borderRadius:"2px 2px 0 0"}} />
    {/* Lantern */}
    <div style={{position:"absolute",bottom:"36%",left:"50%",transform:"translateX(-50%)",width:12,height:20,background:"rgba(255,200,80,0.8)",borderRadius:3,boxShadow:"0 0 25px 12px rgba(255,180,60,0.3)",animation:"blink 3s ease-in-out infinite"}} />
    {/* Window glow */}
    <div style={{position:"absolute",bottom:"28%",right:"18%",width:36,height:28,background:"rgba(255,210,120,0.25)",borderRadius:3,boxShadow:"0 0 20px 10px rgba(255,180,80,0.2)"}} />
    {/* Silhouette tree */}
    <div style={{position:"absolute",bottom:"28%",left:"8%",width:8,height:"35%",background:"#1a1f10",borderRadius:4}} />
    {[[-18,82],[0,76],[18,80],[-30,72],[30,74]].map(([x,b],i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,left:`calc(10% + ${x}px)`,width:18,height:10,background:"#1a2010",borderRadius:"50%"}} />
    ))}
    {/* Puddle reflection */}
    <div style={{position:"absolute",bottom:"2%",left:"30%",width:"40%",height:6,background:"rgba(100,120,180,0.2)",borderRadius:"50%",filter:"blur(3px)"}} />
  </div>;
}

function GhibliScene4() { // Ocean cliff at dusk
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#0a1428 0%,#1a2a50 20%,#2a4070 40%,#3a5080 55%,#285060 70%,#1a3040 85%,#0a1820 100%)"}} />
    {/* Stars */}
    {[[5,3],[18,5],[32,2],[48,4],[62,3],[76,6],[88,2],[12,10],[42,8],[72,11],[92,7]].map(([l,t],i)=>(
      <div key={i} style={{position:"absolute",width:1.5,height:1.5,borderRadius:"50%",background:"white",left:`${l}%`,top:`${t}%`,opacity:0.6,animation:`blink ${2+i*0.3}s ease-in-out infinite ${i*0.2}s`}} />
    ))}
    {/* Moon reflection on water */}
    <div style={{position:"absolute",top:"12%",left:"20%",width:42,height:42,borderRadius:"50%",background:"radial-gradient(circle at 40% 40%,#fff8d0,#f0d870)",boxShadow:"0 0 35px 15px rgba(240,220,80,0.45)"}} />
    {/* Ocean */}
    <div style={{position:"absolute",bottom:"30%",left:0,right:0,height:"42%",background:"linear-gradient(180deg,#1a3a60,#0f2040,#0a1828)"}} />
    {/* Wave lines */}
    {[38,42,46].map((b,i)=>(
      <div key={i} style={{position:"absolute",bottom:`${b}%`,left:"5%",right:"5%",height:1,background:`rgba(100,180,220,${0.15-i*0.03})`,borderRadius:2,animation:`wave1 ${4+i}s ease-in-out infinite ${i*0.5}s`}} />
    ))}
    {/* Moon shimmer on water */}
    <div style={{position:"absolute",bottom:"30%",left:"15%",width:12,height:"10%",background:"linear-gradient(transparent,rgba(240,220,100,0.18),transparent)",filter:"blur(4px)"}} />
    {/* Cliff */}
    <div style={{position:"absolute",bottom:0,right:0,width:"38%",height:"38%",background:"linear-gradient(135deg,#1a1a10,#0f0f08)",borderRadius:"60% 0 0 0"}} />
    <div style={{position:"absolute",bottom:0,left:0,width:"28%",height:"28%",background:"linear-gradient(45deg,#1a1a10,#0f0f08)",borderRadius:"0 50% 0 0"}} />
    {/* Lighthouse */}
    <div style={{position:"absolute",bottom:"36%",right:"18%",width:8,height:"22%",background:"#1a1408",borderRadius:"2px 2px 0 0"}} />
    <div style={{position:"absolute",bottom:"56%",right:"17%",width:12,height:10,background:"rgba(255,230,100,0.9)",borderRadius:3,boxShadow:"0 0 20px 10px rgba(255,200,50,0.4)",animation:"blink 2s ease-in-out infinite"}} />
  </div>;
}

const GHIBLI_SCENES = [GhibliScene0, GhibliScene1, GhibliScene2, GhibliScene3, GhibliScene4];

// Floral decorations for polaroid border
function PolaroidFlora({scene}) {
  const floraSets = [
    <>
      <span style={{position:"absolute",bottom:2,left:4,fontSize:9,opacity:0.85,transform:"rotate(-20deg)"}}>🌿</span>
      <span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.75,transform:"rotate(10deg)"}}>🍄</span>
      <span style={{position:"absolute",bottom:2,right:4,fontSize:9,opacity:0.85,transform:"rotate(15deg)"}}>🌿</span>
      <span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7,transform:"rotate(-10deg)"}}>✨</span>
      <span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.55,transform:"rotate(30deg)"}}>🍃</span>
      <span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.55,transform:"rotate(-30deg)"}}>🍃</span>
    </>,
    <>
      <span style={{position:"absolute",bottom:2,left:3,fontSize:10,opacity:0.9}}>🌸</span>
      <span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7,transform:"rotate(15deg)"}}>🌸</span>
      <span style={{position:"absolute",bottom:2,right:3,fontSize:10,opacity:0.9}}>🌸</span>
      <span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7,transform:"rotate(-15deg)"}}>🌸</span>
      <span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.6}}>🌺</span>
      <span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.6}}>🌺</span>
    </>,
    <>
      <span style={{position:"absolute",bottom:2,left:4,fontSize:9,opacity:0.8}}>❄️</span>
      <span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.65}}>✨</span>
      <span style={{position:"absolute",bottom:2,right:4,fontSize:9,opacity:0.8}}>❄️</span>
      <span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.65}}>✨</span>
      <span style={{position:"absolute",top:2,left:4,fontSize:7,opacity:0.55}}>⭐</span>
      <span style={{position:"absolute",top:2,right:4,fontSize:7,opacity:0.55}}>⭐</span>
    </>,
    <>
      <span style={{position:"absolute",bottom:2,left:3,fontSize:9,opacity:0.85,transform:"rotate(-15deg)"}}>🍂</span>
      <span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7}}>💧</span>
      <span style={{position:"absolute",bottom:2,right:3,fontSize:9,opacity:0.85,transform:"rotate(15deg)"}}>🍂</span>
      <span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7}}>💧</span>
      <span style={{position:"absolute",top:2,left:3,fontSize:7,opacity:0.55,transform:"rotate(20deg)"}}>🍃</span>
      <span style={{position:"absolute",top:2,right:3,fontSize:7,opacity:0.55,transform:"rotate(-20deg)"}}>🍃</span>
    </>,
    <>
      <span style={{position:"absolute",bottom:2,left:3,fontSize:9,opacity:0.85}}>🐚</span>
      <span style={{position:"absolute",bottom:2,left:15,fontSize:8,opacity:0.7}}>🌊</span>
      <span style={{position:"absolute",bottom:2,right:3,fontSize:9,opacity:0.85}}>🐚</span>
      <span style={{position:"absolute",bottom:2,right:15,fontSize:8,opacity:0.7}}>🌊</span>
      <span style={{position:"absolute",top:2,left:3,fontSize:7,opacity:0.6}}>⭐</span>
      <span style={{position:"absolute",top:2,right:3,fontSize:7,opacity:0.6}}>🌙</span>
    </>,
  ];
  return floraSets[scene % floraSets.length];
}

// ─── SWIPE HINT ──────────────────────────────────────────────────────────────
// ─── COSMIC LOVE SCALE ───────────────────────────────────────────────────────
const COSMIC_STEPS = [
  {
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=300&q=80",
    label: "Earth", size: 54, color: "#4a9eff", glow: "rgba(74,158,255,0.4)", desc: "12,742 km wide",
  },
  {
    img: "https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=300&q=80",
    label: "The Sun", size: 78, color: "#ffb347", glow: "rgba(255,179,71,0.5)", desc: "109× Earth",
  },
  {
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80",
    label: "UY Scuti", size: 104, color: "#ff6b35", glow: "rgba(255,107,53,0.5)", desc: "1,700× the Sun",
  },
  {
    img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=300&q=80",
    label: "The Milky Way", size: 130, color: "#c4b5fd", glow: "rgba(196,181,253,0.5)", desc: "100,000 light years",
  },
  {
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&q=80",
    label: "The Observable\nUniverse", size: 158, color: "#818cf8", glow: "rgba(129,140,248,0.5)", desc: "93 billion light years",
  },
  {
    img: null, isHeart: true,
    label: "My love\nfor you", size: 186, color: "#ff6b9d", glow: "rgba(255,107,157,0.7)", desc: "∞ × the Universe",
  },
];

function CosmicLoveSection() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);

  // Auto-step through on unlock
  useEffect(() => {
    if (!unlocked) { setActiveIdx(null); return; }
    setActiveIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= COSMIC_STEPS.length) { clearInterval(iv); return; }
      setActiveIdx(i);
    }, 900);
    return () => clearInterval(iv);
  }, [unlocked]);

  const current = activeIdx !== null ? COSMIC_STEPS[activeIdx] : null;
  const isComplete = activeIdx === COSMIC_STEPS.length - 1;

  return (
    <div ref={sectionRef} style={{background:"linear-gradient(180deg,#fef9f0 0%,#0a0a1a 18%,#0a0a1a 100%)",padding:"0 0 80px"}}>
      {/* Wave transition */}
      <div style={{width:"100%",overflow:"hidden",lineHeight:0,marginBottom:-2}}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{width:"100%",height:60,display:"block"}}>
          <path d="M0,0 C300,80 900,0 1200,60 L1200,0 L0,0 Z" fill="#fef9f0"/>
        </svg>
      </div>

      <div style={{textAlign:"center",padding:"40px 20px 0",position:"relative"}}>

        {/* Header — always visible */}
        <Fade>
          <div style={{maxWidth:440,margin:"0 auto 32px"}}>
            <div style={{fontSize:"2.4rem",marginBottom:16,animation:"hanaSparkle 2s ease-in-out infinite"}}>🌌</div>
            <p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>A question for you</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",color:"white",fontSize:"clamp(1.5rem,4vw,2.2rem)",marginBottom:16,textShadow:"0 0 30px rgba(255,182,193,0.3)"}}>
              How much do I love you?
            </h2>
            <button
              onClick={() => setUnlocked(u => !u)}
              style={{
                background:"linear-gradient(135deg,rgba(255,107,157,0.15),rgba(212,168,67,0.15))",
                border:"1px solid rgba(255,182,193,0.35)",
                color:"white",
                fontFamily:"'Playfair Display',serif",
                fontStyle:"italic",
                fontSize:"1rem",
                padding:"14px 36px",
                borderRadius:50,
                cursor:"pointer",
                backdropFilter:"blur(8px)",
                boxShadow:"0 0 30px rgba(255,107,157,0.2)",
                letterSpacing:"0.05em",
                transition:"all 0.3s ease",
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 50px rgba(255,107,157,0.4)";e.currentTarget.style.transform="scale(1.04)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 30px rgba(255,107,157,0.2)";e.currentTarget.style.transform="scale(1)";}}
            >
              {unlocked ? "Hide ✨" : "Click here to find out ✨"}
            </button>
          </div>
        </Fade>

        {/* Cosmic reveal */}
        {unlocked && (
          <div style={{maxWidth:480,margin:"0 auto"}}>
            <p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:24,fontFamily:"'Playfair Display',serif"}}>
              Scale of my love
            </p>

            {/* Steps row */}
            {/* Steps row — active is full size, older ones shrink progressively */}
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:"clamp(4px,1.5vw,12px)",marginBottom:40,flexWrap:"nowrap",width:"100%",padding:"12px 12px 0",boxSizing:"border-box"}}>
              {COSMIC_STEPS.map((step, i) => {
                if (activeIdx === null || i > activeIdx) return null;
                const isActive = i === activeIdx;
                const age = activeIdx - i;
                const visibleCount = activeIdx + 1;
                const shrinkFactor = Math.pow(0.72, age);
                const totalUnits = Array.from({length: visibleCount}, (_, k) => Math.pow(0.72, visibleCount - 1 - k)).reduce((a,b)=>a+b,0);
                const gapTotal = (visibleCount - 1) * 8;
                const baseSize = Math.min(160, Math.max(32, (Math.min(480, window.innerWidth * 0.92) - gapTotal) / totalUnits * shrinkFactor * (1/shrinkFactor)));
                const finalSize = Math.max(Math.round(baseSize * shrinkFactor), 24);

                return (
                  <div key={i} style={{
                    display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                    transition:"all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                    flexShrink:0,
                  }}>
                    {/* Glow ring on active */}
                    <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:isActive?6:0}}>
                      {isActive && (
                        <div style={{
                          position:"absolute",
                          width: finalSize * 1.7,
                          height: finalSize * 1.7,
                          borderRadius:"50%",
                          background:`radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
                          animation:"jjkOrb 2s ease-in-out infinite",
                          pointerEvents:"none",
                        }}/>
                      )}
                      {/* Image or heart */}
                      {step.isHeart ? (
                        <div style={{
                          width:finalSize, height:finalSize,
                          borderRadius:"50%",
                          background:"radial-gradient(circle at 40% 35%, #ff8fb3, #ff3d7f)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize: finalSize * 0.45,
                          boxShadow: isActive ? `0 0 30px ${step.glow}, 0 0 60px ${step.glow}` : "none",
                          transition:"all 0.6s ease",
                          position:"relative",zIndex:1,
                        }}>💗</div>
                      ) : (
                        <div style={{
                          width:finalSize, height:finalSize,
                          borderRadius:"50%",
                          overflow:"hidden",
                          boxShadow: isActive ? `0 0 20px ${step.glow}, 0 0 40px ${step.glow}` : `0 0 4px ${step.glow}`,
                          transition:"all 0.6s ease",
                          position:"relative",zIndex:1,
                          background:"#111",
                          flexShrink:0,
                          opacity: isActive ? 1 : 0.7,
                        }}>
                          <img loading="lazy" src={step.img} alt={step.label}
                            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:"50%"}}/>
                        </div>
                      )}
                    </div>
                    {/* Label — always show, size scales with circle */}
                    <div style={{
                      fontSize: `clamp(0.38rem, ${Math.max(finalSize/11, 1.2)}vw, 0.65rem)`,
                      color: isActive ? step.color : "rgba(255,255,255,0.4)",
                      textAlign:"center",
                      fontFamily:"'Playfair Display',serif",
                      fontStyle: step.isHeart ? "italic" : "normal",
                      lineHeight:1.3,
                      whiteSpace:"pre-line",
                      transition:"all 0.5s ease",
                      maxWidth: finalSize + 10,
                    }}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active step detail card */}
            {current && (
              <div style={{
                background:"rgba(255,255,255,0.04)",
                border:`1px solid ${current.glow}`,
                borderRadius:20,
                padding:"24px 28px",
                backdropFilter:"blur(12px)",
                boxShadow:`0 0 40px ${current.glow}`,
                transition:"all 0.5s ease",
                minHeight:100,
              }}>
                <div style={{fontSize:"2rem",marginBottom:8}}>
                  {current.isHeart ? "💗" : (
                    <img loading="lazy" src={current.img} alt={current.label}
                      style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",boxShadow:`0 0 20px ${current.glow}`}}/>
                  )}
                </div>
                <p style={{
                  fontFamily:"'Playfair Display',serif",
                  fontStyle:"italic",
                  fontSize:"1.1rem",
                  color:"white",
                  margin:"0 0 6px",
                  whiteSpace:"pre-line",
                }}>
                  {current.label}
                </p>
                <p style={{fontSize:"0.78rem",color:current.color,margin:0,letterSpacing:"0.05em"}}>
                  {current.desc}
                </p>

                {/* Final heart message */}
                {isComplete && (
                  <div style={{marginTop:24,borderTop:"1px solid rgba(255,107,157,0.2)",paddingTop:20,animation:"fadeIn 0.8s ease"}}>
                    <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.15rem",color:"white",lineHeight:1.7,margin:"0",textShadow:"0 0 20px rgba(255,107,157,0.4)"}}>
                        You are the loml Hana💗
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SwipeHintWrapper({children}) {
  const [visible,setVisible]=useState(true);
  useEffect(()=>{
    const t=setTimeout(()=>setVisible(false),2600);
    return()=>clearTimeout(t);
  },[]);
  return (
    <div style={{position:"relative"}}>
      {children}
      {visible&&(
        <div style={{
          position:"absolute",inset:0,
          borderRadius:20,
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
          zIndex:60,
          pointerEvents:"none",
          background:"rgba(0,0,0,0.38)",
          animation:"swipeHintFade 2.6s ease forwards",
        }}>
          {/* Arrows + hand row */}
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {/* Left arrow pulses */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,animation:"hintPulseL 1.1s ease-in-out infinite"}}>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.9)"}}>‹</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.6)"}}>‹</span>
              <span style={{fontSize:"1.6rem",color:"rgba(255,255,255,0.3)"}}>‹</span>
            </div>
            {/* Hand icon */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <span style={{fontSize:"2.8rem",animation:"hintSwipe 1.1s ease-in-out infinite",display:"block"}}>👆</span>
              <span style={{color:"rgba(255,255,255,0.85)",fontSize:"0.82rem",fontFamily:"'Lora',serif",fontStyle:"italic",letterSpacing:"0.08em",textAlign:"center",lineHeight:1.5}}>
                swipe to browse<br/>memories
              </span>
            </div>
            {/* Right arrow pulses */}
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

function PhotoCarousel({photos,captions={},onDelete,deleteId,pwd,setPwd,deleting,handleDelete,cancelDelete}) {
  const {useState:us,useRef:ur,useEffect:ue}=React;
  const [idx,setIdx]=us(0);
  const [flyDir,setFlyDir]=us(null);
  const [noAnim,setNoAnim]=us(false);
  const [dragX,setDragX]=us(0);
  const [dragging,setDragging]=us(false);
  const [loadedImgs,setLoadedImgs]=us(new Set());
  const startX=ur(null);

  const dismiss=(dir)=>{
    if(flyDir)return;
    setFlyDir(dir);
    setTimeout(()=>{
      setNoAnim(true);
      setIdx(i=>dir==='left'?(i===photos.length-1?0:i+1):(i===0?photos.length-1:i-1));
      setFlyDir(null);
      setDragX(0);
      // re-enable animation next frame
      requestAnimationFrame(()=>requestAnimationFrame(()=>setNoAnim(false)));
    },340);
  };

  const onTD=e=>{e.stopPropagation();startX.current=e.touches[0].clientX;setDragging(true);};
  const onTM=e=>{if(!dragging||flyDir)return;e.stopPropagation();setDragX(e.touches[0].clientX-startX.current);};
  const onTE=e=>{
    e.stopPropagation();
    setDragging(false);
    if(Math.abs(dragX)>80)dismiss(dragX<0?'left':'right');
    else setDragX(0);
    startX.current=null;
  };
  const onMD=e=>{startX.current=e.clientX;setDragging(true);};
  const onMM=e=>{if(!dragging||flyDir)return;setDragX(e.clientX-startX.current);};
  const onMU=()=>{
    setDragging(false);
    if(Math.abs(dragX)>80)dismiss(dragX<0?'left':'right');
    else setDragX(0);
    startX.current=null;
  };

  if(!photos.length)return null;
  const p=photos[idx];
  const n=photos.length;
  // Which photo is peeking behind depends on drag/fly direction
  const peekDir=flyDir||(dragX<0?'left':dragX>0?'right':null);
  const peekPhoto=peekDir==='left'
    ? photos[(idx+1)%n]           // dragging left → next photo peeks
    : photos[(idx-1+n)%n];        // dragging right → prev photo peeks
  const peekBg=peekDir==='left'
    ? GHIBLI_SCENES[(idx+1)%GHIBLI_SCENES.length]
    : GHIBLI_SCENES[(idx-1+GHIBLI_SCENES.length)%GHIBLI_SCENES.length];
  const SceneBg=GHIBLI_SCENES[idx%GHIBLI_SCENES.length];

  // Fly-off transform
  const flyX=flyDir==='left'?-900:flyDir==='right'?900:dragX;
  const flyRot=flyDir==='left'?-30:flyDir==='right'?30:dragX*0.04;
  const flyTrans=flyDir?`translateX(${flyX}px) rotate(${flyRot}deg)`:`translateX(${dragX}px) rotate(${dragX*0.04}deg)`;
  const flyAnim=noAnim?'none':flyDir?'transform 0.34s cubic-bezier(.4,0,.8,1)':dragging?'none':'transform 0.22s ease-out';

  // Peek card: scales up and moves in from the correct side as top card is dragged
  const progress=flyDir?1:Math.min(Math.abs(dragX)/150,1);
  const peekScale=0.92+progress*0.08;
  // Slide in from correct side: starts offset, moves to 0
  const peekOffsetX=peekDir==='left'
    ? 60*(1-progress)              // comes in from right side
    : -60*(1-progress);            // comes in from left side
  const peekBrightness=0.6+progress*0.4;

  const cardBody=(photo,bgComp,isTop)=>{
    const Bg=bgComp;
    const loaded=loadedImgs.has(photo.url);
    return <>
      <div style={{position:"absolute",inset:0,zIndex:0,opacity:loaded?1:0,transition:"opacity 0.4s ease"}}><Bg/></div>
      {/* Skeleton shimmer shown while loading */}
      {!loaded&&<div style={{position:"absolute",inset:0,zIndex:5,background:"linear-gradient(135deg,#1a1a2e,#16213e)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"70%",borderRadius:4,overflow:"hidden",background:"rgba(255,255,255,0.06)"}}>
          <div style={{width:"100%",paddingBottom:"100%",background:"linear-gradient(90deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.03) 100%)",backgroundSize:"200% 100%",animation:"skeletonSlide 1.4s ease-in-out infinite"}}/>
        </div>
      </div>}
      <div style={{position:"relative",zIndex:10,padding:"44px 52px 26px",display:"flex",flexDirection:"column",alignItems:"center",opacity:loaded?1:0,transition:"opacity 0.4s ease"}}>
        <div style={{width:"100%",background:"#fafaf5",borderRadius:3,padding:"6px 6px 0 6px",
          boxShadow:"0 8px 30px rgba(0,0,0,0.7)",
          transform:`rotate(${isTop?-0.8:0.6}deg)`}}>
          <img loading="lazy" src={photo.url} alt="" decoding="async"
            style={{width:"100%",height:"auto",display:"block",borderRadius:2,pointerEvents:"none"}}
            onLoad={()=>setLoadedImgs(prev=>new Set([...prev,photo.url]))}
          />
          <div style={{position:"relative",height:22,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <PolaroidFlora scene={photos.indexOf(photo)%GHIBLI_SCENES.length}/>
            {captions[photo.name]&&(
              <p style={{margin:"0 20px",textAlign:"center",fontFamily:"'Lora',serif",fontStyle:"italic",
                fontSize:"0.65rem",color:"#5a3a2a",lineHeight:1.2,zIndex:1,overflow:"hidden",
                whiteSpace:"nowrap",textOverflow:"ellipsis"}}>"{captions[photo.name]}"</p>
            )}
          </div>
        </div>
      </div>
      <div style={{position:"relative",zIndex:10,textAlign:"center",color:"rgba(255,255,255,0.8)",
        fontSize:"0.72rem",fontStyle:"italic",letterSpacing:"0.1em",padding:"4px 0 26px",
        opacity:loaded?1:0,transition:"opacity 0.4s ease"}}>
        {photos.indexOf(photo)+1} / {photos.length}
      </div>
    </>;
  };

  return (
    <div style={{position:"relative",maxWidth:400,margin:"0 auto",paddingBottom:4}}>
      <div style={{display:"none"}}>{photos.map(ph=><img key={ph.name} src={ph.url} alt=""/>)}</div>

      {/* Outer wrapper: position:relative so arrows anchor here */}
      <div style={{position:"relative"}}>

        {/* ANCHOR: in-flow invisible card — gives wrapper its true stable height */}
        <div style={{visibility:"hidden",pointerEvents:"none",borderRadius:20,overflow:"hidden"}}>
          {cardBody(p,SceneBg,false)}
        </div>

        {/* STACK: sits exactly on top of anchor */}
        <div style={{position:"absolute",inset:0}}>
          {/* Back card */}
          {photos.length>1&&peekDir&&(
            <div style={{position:"absolute",inset:0,borderRadius:20,overflow:"hidden",
              transform:`scale(${peekScale}) translateX(${peekOffsetX}px) translateY(${(1-peekScale)*40}px)`,
              transformOrigin:"center top",
              filter:`brightness(${peekBrightness})`,
              transition:noAnim?"none":dragging?"none":"transform 0.28s ease, filter 0.28s ease",
              zIndex:5,pointerEvents:"none"}}>
              {cardBody(peekPhoto,peekBg,false)}
            </div>
          )}

          {/* Top card */}
          <div style={{
            position:"absolute",inset:0,
            borderRadius:20,overflow:"hidden",
            transform:flyTrans,
            transition:flyAnim,
            zIndex:10,cursor:dragging?"grabbing":"grab",
            userSelect:"none",touchAction:"pan-y",
          }}
            onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
            onTouchStart={onTD} onTouchMove={onTM} onTouchEnd={onTE}
          >
            {cardBody(p,SceneBg,true)}
            {deleteId===p.name?(
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.9)",
                padding:"10px 14px",display:"flex",flexDirection:"column",gap:8,zIndex:20}}>
                <span style={{color:"white",fontSize:"0.75rem",fontStyle:"italic",textAlign:"center"}}>Enter password to delete:</span>
                <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                  <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter")handleDelete();if(e.key==="Escape")cancelDelete();}}
                    placeholder="password" autoFocus
                    style={{flex:1,maxWidth:130,border:"none",borderRadius:14,padding:"5px 10px",fontSize:"0.82rem",outline:"none"}}/>
                  <button onClick={handleDelete} disabled={deleting}
                    style={{background:"#c0392b",color:"white",border:"none",borderRadius:14,padding:"5px 12px",fontSize:"0.8rem",cursor:"pointer"}}>{deleting?"...":"Delete"}</button>
                  <button onClick={cancelDelete}
                    style={{background:"#555",color:"white",border:"none",borderRadius:14,padding:"5px 10px",fontSize:"0.8rem",cursor:"pointer"}}>✕</button>
                </div>
              </div>
            ):(
              <button onClick={()=>onDelete(p.name)}
                style={{position:"absolute",top:10,right:12,background:"rgba(0,0,0,0.5)",
                  border:"1px solid rgba(255,255,255,0.2)",color:"white",width:26,height:26,
                  borderRadius:"50%",cursor:"pointer",fontSize:"0.7rem",
                  display:"flex",alignItems:"center",justifyContent:"center",zIndex:20}}>✕</button>
            )}
          </div>
        </div>

        {/* Arrows — on the outer wrapper, top:50% of the stable anchor height */}
        {photos.length>1&&<>
          <button onClick={e=>{e.stopPropagation();if(!flyDir)dismiss('right');}}
            style={{position:"absolute",left:-18,top:"50%",transform:"translateY(-50%)",
              background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.25)",
              color:"white",width:36,height:36,borderRadius:"50%",cursor:"pointer",
              fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",
              backdropFilter:"blur(6px)",zIndex:50}}>‹</button>
          <button onClick={e=>{e.stopPropagation();if(!flyDir)dismiss('left');}}
            style={{position:"absolute",right:-18,top:"50%",transform:"translateY(-50%)",
              background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.25)",
              color:"white",width:36,height:36,borderRadius:"50%",cursor:"pointer",
              fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",
              backdropFilter:"blur(6px)",zIndex:50}}>›</button>
        </>}
      </div>

      {/* Dots */}
      {photos.length>1&&(
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20}}>
          {photos.map((_,i)=>(
            <div key={i} onClick={()=>{if(!flyDir)setIdx(i);}}
              style={{width:i===idx?18:7,height:7,borderRadius:4,
                background:i===idx?"#d4a843":"rgba(255,255,255,0.3)",
                cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
      )}
    </div>
  );
}


function MemoriesSection() {
  const [open,setOpen]=useState(false);
  const [photos,setPhotos]=useState([]);
  const [captions,setCaptions]=useState({});
  const [loadingPhotos,setLoadingPhotos]=useState(true);
  const [uploading,setUploading]=useState(false);
  const [toast,setToast]=useState("");
  const [deleteId,setDeleteId]=useState(null);
  const [pwd,setPwd]=useState("");
  const [deleting,setDeleting]=useState(false);
  const [pendingFile,setPendingFile]=useState(null);
  const [pendingCaption,setPendingCaption]=useState("");
  const [trailStars,setTrailStars]=useState([]);
  const sectionRef=React.useRef(null);
  const fileRef=React.useRef(null);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),3000);};

  const BUCKET="memories";
  const photosCache = React.useRef(null);

  const PHOTO_CACHE_KEY = "hana_photos_cache";
  const PHOTO_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  const loadPhotos=async(force=false)=>{
    // 1. Try in-memory cache first (instant)
    if(!force && photosCache.current){
      setPhotos(photosCache.current);
      setLoadingPhotos(false);
      loadPhotosFromNetwork(); // refresh in background
      return;
    }
    // 2. Try localStorage cache for instant first paint on repeat visits
    if(!force){
      try{
        const cached = localStorage.getItem(PHOTO_CACHE_KEY);
        if(cached){
          const {photos: cachedPhotos, ts} = JSON.parse(cached);
          if(Date.now() - ts < PHOTO_CACHE_TTL && Array.isArray(cachedPhotos) && cachedPhotos.length > 0){
            photosCache.current = cachedPhotos;
            setPhotos(cachedPhotos);
            setLoadingPhotos(false);
            loadPhotosFromNetwork(); // still refresh in background
            return;
          }
        }
      }catch(e){/* ignore localStorage errors */}
    }
    setLoadingPhotos(true);
    await loadPhotosFromNetwork();
    setLoadingPhotos(false);
  };

  const loadPhotosFromNetwork=async(retries=3)=>{
    for(let attempt=0; attempt<retries; attempt++){
      try{
        const controller=new AbortController();
        const timeout=setTimeout(()=>controller.abort(),8000);
        const r=await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`,{
          method:"POST",
          headers:{...sbHeaders,"Content-Type":"application/json"},
          body:JSON.stringify({prefix:"",limit:200,offset:0,sortBy:{column:"created_at",order:"asc"}}),
          signal:controller.signal
        });
        clearTimeout(timeout);
        if(!r.ok) throw new Error(`HTTP ${r.status}`);
        const data=await r.json();
        if(Array.isArray(data)){
          const withUrls=data
            .filter(f=>f.name && f.name!==".emptyFolderPlaceholder" && !f.name.endsWith(".json"))
            .map(f=>({
              ...f,
              url:`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(f.name)}`
            }));
          photosCache.current = withUrls;
          setPhotos(withUrls);
          // Persist to localStorage for instant load on next visit
          try{ localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify({photos: withUrls, ts: Date.now()})); }catch(e){}
          // Load captions
          fetch(`${SUPABASE_URL}/rest/v1/photo_captions?select=filename,caption`,{headers:sbHeaders})
            .then(r=>r.ok?r.json():[])
            .then(data=>{
              if(Array.isArray(data)){
                const map={};
                data.forEach(d=>{map[d.filename]=d.caption;});
                setCaptions(map);
              }
            }).catch(()=>{});
          return; // success
        }
      }catch(e){
        if(attempt===retries-1){
          // All retries failed - keep showing cached if available
          if(photosCache.current) setPhotos(photosCache.current);
        } else {
          await new Promise(res=>setTimeout(res,1000*(attempt+1))); // backoff
        }
      }
    }
  };

  useEffect(()=>{loadPhotos();},[]);
  useEffect(()=>{if(open) loadPhotos();},[open]);

  const handleUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file)return;
    setPendingFile(file);
    setPendingCaption("");
    e.target.value="";
  };

  // Retry helper: attempts fn up to maxTries with exponential backoff
  const withRetry=async(fn,maxTries=3,delayMs=800)=>{
    let lastErr;
    for(let i=0;i<maxTries;i++){
      try{ const result=await fn(); return result; }
      catch(e){
        lastErr=e;
        if(i<maxTries-1) await new Promise(r=>setTimeout(r,delayMs*(i+1)));
      }
    }
    throw lastErr;
  };

  const doUpload=async()=>{
    if(!pendingFile)return;
    setUploading(true);
    try{
      const compressed = await new Promise((resolve, reject)=>{
        const img=new Image();
        const url=URL.createObjectURL(pendingFile);
        img.onload=()=>{
          try{
            const MAX=1200;
            let w=img.width,h=img.height;
            if(w>MAX||h>MAX){const ratio=Math.min(MAX/w,MAX/h);w=Math.round(w*ratio);h=Math.round(h*ratio);}
            const canvas=document.createElement("canvas");
            canvas.width=w;canvas.height=h;
            canvas.getContext("2d").drawImage(img,0,0,w,h);
            canvas.toBlob(blob=>{URL.revokeObjectURL(url);if(blob)resolve(blob);else reject(new Error("toBlob failed"));},"image/jpeg",0.8);
          }catch(err){URL.revokeObjectURL(url);reject(err);}
        };
        img.onerror=()=>{URL.revokeObjectURL(url);resolve(pendingFile);};
        img.src=url;
      });
      const fileName=`photo_${Date.now()}.jpg`;
      // Retry upload up to 3 times with backoff
      await withRetry(async()=>{
        const r=await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`,{
          method:"POST",
          headers:{"apikey":SUPABASE_ANON,"Authorization":`Bearer ${SUPABASE_ANON}`,"Content-Type":"image/jpeg","x-upsert":"true"},
          body:compressed
        });
        if(!r.ok){const err=await r.text();throw new Error(`Upload failed (${r.status}): ${err}`);}
      });
      // Save caption with retry
      if(pendingCaption.trim()){
        await withRetry(async()=>{
          const r=await fetch(`${SUPABASE_URL}/rest/v1/photo_captions`,{
            method:"POST",
            headers:{...sbHeaders,"Prefer":"return=minimal"},
            body:JSON.stringify({filename:fileName,caption:pendingCaption.trim()})
          });
          if(!r.ok){const err=await r.text();throw new Error(`Caption save failed: ${err}`);}
        });
      }
      showToast("Memory saved ✨");
      setPendingFile(null);setPendingCaption("");
      try{ localStorage.removeItem(PHOTO_CACHE_KEY); }catch(e){}
      await new Promise(r=>setTimeout(r,800));
      loadPhotos(true);
    }catch(e){console.error(e);showToast("Upload failed after retries: "+e.message);}
    setUploading(false);
  };

  const handleDelete=async()=>{
    if(pwd!=="Hana"){showToast("Wrong password ✕");setPwd("");return;}
    setDeleting(true);
    try{
      await withRetry(async()=>{
        const r=await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${deleteId}`,{
          method:"DELETE",
          headers:{"apikey":SUPABASE_ANON,"Authorization":`Bearer ${SUPABASE_ANON}`}
        });
        if(!r.ok){const err=await r.text();throw new Error(`Delete failed (${r.status}): ${err}`);}
      });
      showToast("Photo removed 🍃");setDeleteId(null);setPwd("");
      try{ localStorage.removeItem(PHOTO_CACHE_KEY); }catch(e){}
      photosCache.current=null;loadPhotos(true);
    }catch(e){console.error(e);showToast("Could not delete - try again");}
    setDeleting(false);
  };

  const bgStars=useMemo(()=>Array.from({length:50},(_,i)=>({id:i,size:Math.random()*2+1,top:Math.random()*100,left:Math.random()*100,d:(1.5+Math.random()*2).toFixed(1),dl:(Math.random()*3).toFixed(1)})),[]);
  const lastTrailTime=React.useRef(0);
  const spawnStars=(e,count=14)=>{
    const rect=sectionRef.current.getBoundingClientRect();
    const cx=(e.clientX!==undefined?e.clientX:(e.touches&&e.touches[0]?e.touches[0].clientX:rect.left+rect.width/2))-rect.left;
    const cy=(e.clientY!==undefined?e.clientY:(e.touches&&e.touches[0]?e.touches[0].clientY:rect.top+rect.height/2))-rect.top;
    const burst=Array.from({length:count},(_,i)=>({id:Date.now()+Math.random()+i,x:cx,y:cy,angle:(i/count)*360+Math.random()*30,dist:40+Math.random()*70,size:8+Math.random()*11,color:['#ffdd57','#ff9eb5','#b6d9ff','#ffe0ee','#fff4a0','#ffb6d9','#c8f0a0'][i%7],dur:0.6+Math.random()*0.5}));
    setTrailStars(s=>[...s.slice(-120),...burst]);
    setTimeout(()=>setTrailStars(s=>s.filter(st=>!burst.find(n=>n.id===st.id))),1400);
  };
  const handleMove=(e)=>{const now=Date.now();if(now-lastTrailTime.current<80)return;lastTrailTime.current=now;spawnStars(e,7);};

  return (
    <div ref={sectionRef} onClick={e=>spawnStars(e,14)} onMouseMove={handleMove} onTouchMove={e=>{e.preventDefault();handleMove(e);}} onTouchStart={e=>spawnStars(e,14)}
      style={{background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",padding:"80px 20px",position:"relative",overflow:"hidden",cursor:"crosshair",userSelect:"none"}}>
      <style>{`
        @keyframes starShoot{0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:1;}100%{transform:translate(var(--sx),var(--sy)) scale(0) rotate(var(--sr));opacity:0;}}
        @keyframes trailDot{0%{transform:translate(0,0) scale(0);opacity:0;}20%{transform:translate(calc(var(--sx)*0.35),calc(var(--sy)*0.35)) scale(1.1);opacity:1;}100%{transform:translate(var(--sx),var(--sy)) scale(0);opacity:0;}}
      `}</style>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        {bgStars.map(s=><div key={s.id} style={{position:"absolute",width:s.size,height:s.size,background:"white",borderRadius:"50%",top:`${s.top}%`,left:`${s.left}%`,animation:`blink ${s.d}s ease-in-out infinite ${s.dl}s`}} />)}
      </div>
      {trailStars.map(s=>{
        const rad=s.angle*Math.PI/180;
        const sx=Math.cos(rad)*s.dist+"px";
        const sy=Math.sin(rad)*s.dist+"px";
        const sr=(-90+Math.random()*180)+"deg";
        return(
          <div key={s.id} style={{position:"absolute",left:s.x,top:s.y,pointerEvents:"none",zIndex:20}}>
            <div style={{position:"absolute",width:s.size,height:s.size,marginLeft:-s.size/2,marginTop:-s.size/2,background:s.color,clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",filter:`drop-shadow(0 0 5px ${s.color})`,"--sx":sx,"--sy":sy,"--sr":sr,animation:`starShoot ${s.dur}s ease-out forwards`}} />
            <div style={{position:"absolute",width:s.size*0.4,height:s.size*0.4,marginLeft:-s.size*0.2,marginTop:-s.size*0.2,borderRadius:"50%",background:s.color,opacity:0.55,"--sx":`calc(${sx} * 0.6)`,"--sy":`calc(${sy} * 0.6)`,animation:`trailDot ${s.dur*0.75}s ease-out forwards`}} />
          </div>
        );
      })}

      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(1.8rem,4vw,2.8rem)",color:"white",marginBottom:16}}>Memories</h2>
        <p style={{color:"rgba(255,255,255,0.6)",marginBottom:36,maxWidth:520,margin:"0 auto 36px"}}>Tap anywhere to make it sparkle ✨</p>

        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:8}}>
          <button onClick={e=>{e.stopPropagation();setOpen(o=>!o);}}
            style={{display:"inline-flex",alignItems:"center",gap:10,background:"transparent",border:"2px solid rgba(212,168,67,0.6)",color:"#d4a843",padding:"14px 32px",borderRadius:60,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",cursor:"pointer"}}>
            <span style={{fontSize:"1.3rem"}}>{open?"🌙":"🌸"}</span>
            {open?"Close memories":"View memories"}
          </button>
          <button onClick={e=>{e.stopPropagation();fileRef.current.click();}}
            style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(212,168,67,0.15)",border:"2px solid rgba(212,168,67,0.5)",color:"#d4a843",padding:"14px 28px",borderRadius:60,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",cursor:"pointer"}}>
            {uploading?"Uploading...":"+ Add photo 📷"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{display:"none"}} onClick={e=>e.stopPropagation()} />
        </div>

        {/* Caption input shown after selecting a file */}
        {pendingFile&&(
          <div onClick={e=>e.stopPropagation()} style={{maxWidth:340,margin:"16px auto 0",background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"18px 20px",border:"1px solid rgba(212,168,67,0.3)"}}>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:"0.82rem",fontStyle:"italic",marginBottom:10,textAlign:"center"}}>📷 {pendingFile.name.slice(0,28)}...</p>
            <input
              value={pendingCaption}
              onChange={e=>setPendingCaption(e.target.value)}
              maxLength={80}
              placeholder="Add a caption... (optional)"
              style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(212,168,67,0.35)",borderRadius:10,padding:"10px 14px",color:"white",fontSize:"0.92rem",outline:"none",fontFamily:"'Lora',serif",boxSizing:"border-box",marginBottom:12}}
            />
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              <button onClick={()=>{setPendingFile(null);setPendingCaption("");}} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.5)",padding:"8px 18px",borderRadius:20,cursor:"pointer",fontFamily:"'Lora',serif",fontSize:"0.85rem"}}>Cancel</button>
              <button onClick={doUpload} disabled={uploading} style={{background:"#d4a843",border:"none",color:"#2c1810",padding:"8px 22px",borderRadius:20,cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.9rem",fontWeight:600,opacity:uploading?0.5:1}}>{uploading?"Saving...":"Save memory ✨"}</button>
            </div>
          </div>
        )}

        {open&&(
          <div style={{marginTop:36}} onClick={e=>e.stopPropagation()}>
            {loadingPhotos?(
              <div style={{color:"rgba(255,255,255,0.5)",fontStyle:"italic"}}>
                <div style={{fontSize:"1.5rem",marginBottom:8,animation:"blink 1.2s ease-in-out infinite"}}>✨</div>
                <p>Loading memories...</p>
              </div>
            ):photos.length===0?(
              <div>
                <p style={{color:"rgba(255,255,255,0.4)",fontStyle:"italic",marginBottom:12}}>No photos yet. Add the first one 🌸</p>
                <button onClick={()=>loadPhotos(true)} style={{background:"none",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.5)",padding:"7px 18px",borderRadius:20,cursor:"pointer",fontSize:"0.82rem",fontStyle:"italic",fontFamily:"'Lora',serif"}}>↻ Refresh</button>
              </div>
            ):(
              <SwipeHintWrapper>
                <PhotoCarousel photos={photos} captions={captions} onDelete={(name)=>{setDeleteId(name);setPwd("");}}
                  deleteId={deleteId} pwd={pwd} setPwd={setPwd} deleting={deleting}
                  handleDelete={handleDelete} cancelDelete={()=>{setDeleteId(null);setPwd("");}} />
              </SwipeHintWrapper>
            )}
            <button onClick={()=>setOpen(false)} style={{marginTop:28,background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.4)",padding:"8px 22px",borderRadius:30,fontFamily:"'Lora',serif",fontSize:"0.8rem",fontStyle:"italic",cursor:"pointer"}}>close ↑</button>
          </div>
        )}
      </div>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#2c1810",color:"#fef9f0",padding:"12px 28px",borderRadius:40,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.9rem",zIndex:9999}}>{toast}</div>}
    </div>
  );
}



function formatTime(ts) {
  if (!ts) return "";
  // Supabase returns UTC time without Z - append Z to force UTC parsing, then show in IST
  const s = typeof ts === "string" ? ts.replace(" ","T").replace(/(\+00:00|Z)?$/,"Z") : ts;
  const d = new Date(s);
  return d.toLocaleString("en-IN", {timeZone:"Asia/Kolkata",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true});
}

const SUPABASE_URL="https://wwkmcswcnroimwaiqqoe.supabase.co";
const SUPABASE_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3a21jc3djbnJvaW13YWlxcW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzIyNTUsImV4cCI6MjA4ODIwODI1NX0.Ky87Fia1y2I10AFEj_cxS6lrFd42Ct2k460qWQdmxn8";
const sbHeaders={"Content-Type":"application/json","apikey":SUPABASE_ANON,"Authorization":`Bearer ${SUPABASE_ANON}`};

function CommentCard({m, onDeleted, sbHeaders, showToast}) {
  const [asking, setAsking] = useState(false);
  const [pwd, setPwd] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (pwd !== "Hana") { showToast("Wrong password ✕"); setPwd(""); return; }
    setDeleting(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${m.id}`, {method:"DELETE", headers:{...sbHeaders,"Prefer":"return=representation"}});
      if (r.status === 200 || r.status === 204) { showToast("Deleted 🍃"); setAsking(false); setPwd(""); onDeleted(); }
      else { const err=await r.text(); console.error("Delete error:",err); showToast("Could not delete - check Supabase policies"); }
    } catch(e) { console.error(e); showToast("Could not delete - try again"); }
    setDeleting(false);
  };

  return (
    <div style={{background:"white",borderRadius:14,padding:"20px 24px",marginBottom:16,boxShadow:"0 2px 20px rgba(0,0,0,0.05)",borderLeft:`3px solid ${m.author==="Her"?"#5a8c4a":"#d4a843"}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:6}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.85rem",color:m.author==="Her"?"#5a8c4a":"#d4a843"}}>{m.author==="Her"?"Bushra ❤️":"Aamir 💛"}</span>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"0.72rem",color:"#c4a98a",fontStyle:"italic"}}>{formatTime(m.created_at)}</span>
          {!asking && (
            <button onClick={()=>setAsking(true)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.75rem",color:"#c4a98a",padding:"2px 6px",borderRadius:6,opacity:0.6}} title="Delete">✕</button>
          )}
        </div>
      </div>
      <div style={{fontSize:"0.95rem",color:"#6b4c3b",lineHeight:1.85,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.text}</div>
      {asking && (
        <div style={{marginTop:14,padding:"12px 14px",background:"#fef9f0",borderRadius:10,border:"1px solid rgba(212,168,67,0.25)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{fontSize:"0.8rem",color:"#6b4c3b",fontStyle:"italic"}}>Enter password to delete:</span>
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")handleDelete();if(e.key==="Escape"){setAsking(false);setPwd("");}}} placeholder="password" autoFocus style={{border:"1px solid rgba(212,168,67,0.4)",borderRadius:20,padding:"4px 12px",fontSize:"0.85rem",outline:"none",fontFamily:"'Lora',serif",width:130}} />
          <button onClick={handleDelete} disabled={deleting} style={{background:"#c0392b",color:"white",border:"none",borderRadius:20,padding:"4px 14px",fontSize:"0.8rem",cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>{deleting?"...":"Delete"}</button>
          <button onClick={()=>{setAsking(false);setPwd("");}} style={{background:"none",border:"1px solid #ccc",borderRadius:20,padding:"4px 12px",fontSize:"0.8rem",cursor:"pointer",color:"#888"}}>Cancel</button>
        </div>
      )}
    </div>
  );
}

function VideoPlayer({videoId}) {
  const [open, setOpen] = useState(false);
  const thumb = "https://img.youtube.com/vi/qylISCGkX1Y/hqdefault.jpg";
  const [thumbLoaded, setThumbLoaded] = useState(false);

  return (
    <>
      {/* Thumbnail card */}
      <div onClick={()=>setOpen(true)} style={{
        position:"relative", cursor:"pointer",
        borderRadius:20, overflow:"hidden",
        boxShadow:"0 20px 60px rgba(0,0,0,0.7)",
        aspectRatio:"460/409",
        maxWidth:380,
        margin:"0 auto",
      }}>
        {/* YouTube thumbnail */}
        <img loading="lazy" src={thumb} alt="video thumbnail"
          style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.4s ease"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        />
        {/* Dark overlay */}
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.08)"}}/>
        {/* Play button */}
        <div style={{
          position:"absolute",top:"50%",left:"50%",
          transform:"translate(-50%,-50%)",
          width:44,height:44,borderRadius:"50%",
          background:"rgba(0,0,0,0.28)",
          backdropFilter:"blur(4px)",
          border:"1.5px solid rgba(255,255,255,0.25)",
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"transform 0.2s ease, background 0.2s ease",
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translate(-50%,-50%) scale(1.1)";e.currentTarget.style.background="rgba(0,0,0,0.45)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translate(-50%,-50%) scale(1)";e.currentTarget.style.background="rgba(0,0,0,0.28)";}}
        >
          <div style={{width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"12px solid rgba(255,255,255,0.85)",marginLeft:3}}/>
        </div>
      </div>

      {/* Lightbox */}
      {open&&(
        <div onClick={()=>setOpen(false)} style={{
          position:"fixed",inset:0,zIndex:9999,
          background:"rgba(0,0,0,0.92)",
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:"20px",
          animation:"fadeIn 0.2s ease",
        }}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:700,position:"relative"}}>
            {/* Close */}
            <button onClick={()=>setOpen(false)} style={{
              position:"absolute",top:-40,right:0,
              background:"none",border:"none",color:"rgba(255,255,255,0.6)",
              fontSize:"1.4rem",cursor:"pointer",padding:"4px 10px",
            }}>✕</button>
            {/* Iframe only loads when lightbox opens */}
            <div style={{position:"relative",paddingBottom:"56.25%",borderRadius:16,overflow:"hidden"}}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position:"absolute",inset:0,width:"100%",height:"100%"}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VideoSlider() {
  const VIDEOS = [
    {id:"JZtnlFuytrA", thumb:"https://img.youtube.com/vi/JZtnlFuytrA/maxresdefault.jpg", isShort:false},
    {id:"d-prAggDs9Q", thumb:"https://img.youtube.com/vi/d-prAggDs9Q/maxresdefault.jpg", isShort:true},
    {id:"qylISCGkX1Y", thumb:"https://img.youtube.com/vi/qylISCGkX1Y/hqdefault.jpg", isShort:true},
    {id:"IqByc5c9OwI", thumb:"https://img.youtube.com/vi/IqByc5c9OwI/maxresdefault.jpg", isShort:true},
  ];
  const [idx,setIdx]=useState(0);
  const [open,setOpen]=useState(false);
  const dragStart=useRef(null);
  const prev=()=>setIdx(i=>(i-1+VIDEOS.length)%VIDEOS.length);
  const next=()=>setIdx(i=>(i+1)%VIDEOS.length);
  const onTouchStart=e=>{dragStart.current=e.touches[0].clientX;};
  const onTouchEnd=e=>{
    if(dragStart.current===null)return;
    const dx=e.changedTouches[0].clientX-dragStart.current;
    if(Math.abs(dx)>40){dx<0?next():prev();}
    dragStart.current=null;
  };
  const v=VIDEOS[idx];
  return (
    <>
      <div style={{position:"relative"}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Thumbnail */}
        <div onClick={()=>setOpen(true)} style={{
          position:"relative",cursor:"pointer",borderRadius:20,overflow:"hidden",
          boxShadow:"0 20px 60px rgba(0,0,0,0.7)",
          aspectRatio:v.isShort?"9/16":"460/409",
          maxWidth:v.isShort?260:380,margin:"0 auto",
        }}>
          <img loading="lazy" src={v.thumb} alt="thumbnail"
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
            onError={e=>{e.target.src=`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;}}
          />
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.08)"}}/>
          <div style={{
            position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
            width:44,height:44,borderRadius:"50%",background:"rgba(0,0,0,0.3)",
            backdropFilter:"blur(4px)",border:"1.5px solid rgba(255,255,255,0.25)",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <div style={{width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"12px solid rgba(255,255,255,0.85)",marginLeft:3}}/>
          </div>
        </div>
        {/* Arrows */}
        <button onClick={prev} style={{
          position:"absolute",left:-16,top:"50%",transform:"translateY(-50%)",
          background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)",
          color:"white",width:34,height:34,borderRadius:"50%",cursor:"pointer",
          fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",
          backdropFilter:"blur(6px)",zIndex:10,
        }}>‹</button>
        <button onClick={next} style={{
          position:"absolute",right:-16,top:"50%",transform:"translateY(-50%)",
          background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)",
          color:"white",width:34,height:34,borderRadius:"50%",cursor:"pointer",
          fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",
          backdropFilter:"blur(6px)",zIndex:10,
        }}>›</button>
      </div>
      {/* Dots */}
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:14}}>
        {VIDEOS.map((_,i)=>(
          <div key={i} onClick={()=>setIdx(i)} style={{
            width:i===idx?18:7,height:7,borderRadius:4,
            background:i===idx?"#d4a843":"rgba(255,255,255,0.3)",
            cursor:"pointer",transition:"all 0.3s",
          }}/>
        ))}
      </div>
      {/* Lightbox */}
      {open&&(
        <div onClick={()=>setOpen(false)} style={{
          position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.92)",
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:"20px",animation:"fadeIn 0.2s ease",
        }}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:v.isShort?360:700,position:"relative"}}>
            <button onClick={()=>setOpen(false)} style={{
              position:"absolute",top:-40,right:0,background:"none",border:"none",
              color:"rgba(255,255,255,0.6)",fontSize:"1.4rem",cursor:"pointer",padding:"4px 10px",
            }}>✕</button>
            <div style={{position:"relative",paddingBottom:v.isShort?"177.78%":"56.25%",borderRadius:16,overflow:"hidden"}}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
                title="video" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position:"absolute",inset:0,width:"100%",height:"100%"}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CommentsSection() {
  const [name,setName]=useState(null);
  const [text,setText]=useState("");
  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),3000);};
  const load=async()=>{
    setLoading(true);
    try{
      const r=await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=ts.desc`,{headers:sbHeaders});
      const data=await r.json();
      setMessages(Array.isArray(data)?data:[]);
    }catch{setMessages([]);}
    setLoading(false);
  };
  useEffect(()=>{load();},[]);
  const submit=async()=>{
    if(!text.trim()||!name||saving)return;
    setSaving(true);
    try{
      const r=await fetch(`${SUPABASE_URL}/rest/v1/comments`,{method:"POST",headers:{...sbHeaders,"Prefer":"return=representation"},body:JSON.stringify({text:text.trim(),author:name})});
      if(r.ok){setText("");showToast(name==="Her"?"Her words are saved 💚":"Your words are saved 💛");load();}
      else{showToast("Could not save - try again 🍃");}
    }catch{showToast("Could not save - try again 🍃");}
    setSaving(false);
  };
  return (
    <div style={{background:"linear-gradient(180deg,#f0f7e8 0%,#fef9f0 100%)",padding:"80px 20px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"flex",gap:14,justifyContent:"center",marginBottom:32,flexWrap:"wrap"}}>
          {[["Her","Bushra is writing ❤️"],["Him","Aamir is writing 💛"]].map(([val,label])=>(
            <button key={val} onClick={()=>setName(n=>n===val?null:val)} style={{padding:"10px 26px",borderRadius:40,border:`2px solid ${name===val?"#2c1810":"#d4a843"}`,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.95rem",cursor:"pointer",background:name===val?"#2c1810":"white",color:name===val?"#fef9f0":"#2c1810"}}>{label}</button>
          ))}
        </div>
        {name==="Her"&&(
          <div style={{marginBottom:40,position:"relative"}}>
            <div style={{position:"absolute",top:18,left:0,right:0,display:"flex",justifyContent:"space-around",paddingLeft:48,paddingRight:24,zIndex:10,pointerEvents:"none"}}>
              {[0,1,2,3,4,5,6,7].map(i=>(
                <div key={i} style={{width:18,height:18,borderRadius:"50%",border:"3px solid #c9a96e",background:"#fef9f0",boxShadow:"inset 0 1px 3px rgba(0,0,0,0.15)"}} />
              ))}
            </div>
            <div style={{position:"absolute",top:0,left:0,bottom:0,width:44,background:"linear-gradient(90deg,#e8b4b8 0%,#f0c8cc 60%,#f8dde0 100%)",borderRadius:"16px 0 0 16px",boxShadow:"inset -2px 0 8px rgba(0,0,0,0.08)",zIndex:1}} />
            <div style={{position:"absolute",top:52,left:64,bottom:20,width:2,background:"rgba(220,80,80,0.35)",zIndex:2,pointerEvents:"none"}} />
            <div style={{background:"#fffef5",borderRadius:16,boxShadow:"0 8px 40px rgba(0,0,0,0.12),4px 4px 0 #c9a96e",overflow:"hidden",position:"relative",paddingTop:44}}>
              <div style={{padding:"8px 24px 24px 70px",position:"relative",zIndex:3}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.78rem",color:"#c4a98a",marginBottom:8,letterSpacing:"0.08em"}}>your notes, Bushra ❤️</p>
                <textarea value={text} onChange={e=>setText(e.target.value.slice(0,1000))} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}}} placeholder={"Write anything on your mind 💚"} rows={8} style={{width:"100%",border:"none",outline:"none",fontFamily:"'Lora',serif",fontSize:"1rem",color:"#2c1810",background:"transparent",resize:"none",lineHeight:1.8}} />
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8,paddingTop:12,borderTop:"1px dashed rgba(212,168,67,0.3)"}}>
                  <span style={{fontSize:"0.78rem",color:"#c4a98a",fontStyle:"italic"}}>{text.length} / 1000</span>
                  <button onClick={submit} disabled={saving||!text.trim()} style={{background:"#5a8c4a",color:"#fef9f0",border:"none",padding:"10px 24px",borderRadius:40,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.92rem",cursor:"pointer",opacity:saving||!text.trim()?0.45:1}}>{saving?"Saving...":"Leave your words 🍃"}</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {name==="Him"&&(
          <div style={{background:"white",borderRadius:16,padding:28,boxShadow:"0 4px 40px rgba(0,0,0,0.07)",border:"1.5px solid rgba(212,168,67,0.2)",marginBottom:40}}>
            <textarea value={text} onChange={e=>setText(e.target.value.slice(0,1000))} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}}} placeholder={"💛"} rows={5} style={{width:"100%",border:"none",outline:"none",fontFamily:"'Lora',serif",fontSize:"1rem",color:"#2c1810",background:"transparent",resize:"none",lineHeight:1.8}} />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16,paddingTop:16,borderTop:"1px solid rgba(212,168,67,0.2)"}}>
              <span style={{fontSize:"0.78rem",color:"#c4a98a",fontStyle:"italic"}}>{text.length} / 1000</span>
              <button onClick={submit} disabled={saving||!text.trim()} style={{background:"#2c1810",color:"#fef9f0",border:"none",padding:"10px 24px",borderRadius:40,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.92rem",cursor:"pointer",opacity:saving||!text.trim()?0.45:1}}>{saving?"Saving...":"Leave your words ✦"}</button>
            </div>
          </div>
        )}
        {loading?<p style={{textAlign:"center",color:"#c4a98a",fontStyle:"italic"}}>Loading...</p>
          :messages.length===0?<p style={{textAlign:"center",color:"#c4a98a",fontStyle:"italic"}}></p>
          :messages.map((m,i)=>(
            <CommentCard key={m.id||i} m={m} onDeleted={load} sbHeaders={sbHeaders} showToast={showToast} />
          ))}
      </div>
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"#2c1810",color:"#fef9f0",padding:"12px 28px",borderRadius:40,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"0.9rem",zIndex:9999}}>{toast}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════

const globalCss=`
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'Lora',serif;background:#fef9f0;color:#2c1810;overflow-x:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
  h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-style:italic;margin-bottom:24px;color:#2c1810;line-height:1.2;}
  p{font-size:1.03rem;line-height:1.95;color:#6b4c3b;margin-bottom:16px;}
  img{content-visibility:auto;}
  @keyframes sunPulse{0%,100%{box-shadow:0 0 60px 20px rgba(249,216,72,0.4);}50%{box-shadow:0 0 80px 30px rgba(249,216,72,0.6);}}
  @keyframes drift{from{transform:translateX(0);}to{transform:translateX(110vw);}}
  @keyframes blink{0%,100%{opacity:0.2;}50%{opacity:1;}}
  @keyframes catFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
  @keyframes catBlink{0%,90%,100%{height:8px;}93%,97%{height:1px;}}
  @keyframes tailWag{0%,100%{transform:rotate(-15deg);}50%{transform:rotate(15deg);}}
  @keyframes totoroBob{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(8px);}}
  @keyframes fly{0%{transform:translate(0,0);opacity:0;}25%{opacity:1;}75%{opacity:0.8;}100%{transform:translate(30px,-40px);opacity:0;}}
  @keyframes wave1{0%,100%{transform:translateX(0) scaleY(1);}50%{transform:translateX(-18px) scaleY(1.12);}}
  @keyframes shimmer{0%,100%{text-shadow:0 0 18px rgba(255,182,193,0.5),0 0 40px rgba(255,182,193,0.2);}50%{text-shadow:0 0 28px rgba(255,182,193,0.9),0 0 60px rgba(255,182,193,0.4);}}
  @keyframes skeletonSlide{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
  @keyframes steam{0%{transform:translateY(0) scale(1);opacity:0.4;}50%{transform:translateY(-12px) scale(1.3);opacity:0.6;}100%{transform:translateY(-24px) scale(1.6);opacity:0;}}
  @keyframes swipeHintFade{0%{opacity:1;}70%{opacity:1;}100%{opacity:0;}}
  @keyframes hintSwipe{0%{transform:translateX(0);}30%{transform:translateX(-18px);}60%{transform:translateX(14px);}100%{transform:translateX(0);}}
  @keyframes hintPulseL{0%,100%{opacity:0.4;}50%{opacity:1;transform:translateX(-4px);}}
  @keyframes hintPulseR{0%,100%{opacity:0.4;}50%{opacity:1;transform:translateX(4px);}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  @keyframes cursedPulse{0%,100%{opacity:0.7;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.12);}}
  @keyframes cursedLine{0%,100%{opacity:0.4;transform:scaleX(0.8);}50%{opacity:1;transform:scaleX(1.05);}}
  @keyframes hanaSparkle{0%,100%{color:white;text-shadow:0 0 20px rgba(255,182,193,0.4);}30%{color:#ffd6e8;text-shadow:0 0 30px rgba(255,182,193,1),0 0 60px rgba(255,182,193,0.6),0 0 100px rgba(255,150,180,0.4);}60%{color:#ffe8f0;text-shadow:0 0 15px rgba(255,182,193,0.6);}}
  @keyframes chapterBloom{from{opacity:0;filter:blur(12px) brightness(2);}to{opacity:1;filter:blur(0) brightness(1);}}
  .chapter-section{animation:chapterBloom 1.1s ease-out both;}
`;

export default function App() {
  const [customCards, setCustomCards] = useState([]);
  useEffect(()=>{
    fetch(`${SUPABASE_URL}/rest/v1/dreams?select=*&order=id.asc`, {headers: sbHeaders})
      .then(r=>r.ok?r.json():Promise.resolve([]))
      .then(data=>{
        if(Array.isArray(data)) setCustomCards(data.map(d=>({id:d.id,title:d.title,desc:d.description,emoji:d.emoji,bgId:d.bg_id})));
      })
      .catch(()=>{});
  },[]);
  const bannerStars=useMemo(()=>Array.from({length:20},(_,i)=>({id:i,size:Math.random()*2+1,top:Math.random()*100,left:Math.random()*100,d:(1.5+Math.random()*2).toFixed(1),dl:(Math.random()*3).toFixed(1)})),[]);

  return (
    <>
      <Analytics />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital@0;1&display=swap" />
      <style>{globalCss}</style>
      <ScrollBar />
      <CursorTrail />
      <GoldDust />

      {/* CAT BANNER */}
      <div style={{width:"100%",background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)",padding:"20px 16px 24px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",gap:14}}>
        <div style={{position:"absolute",inset:0}}>{bannerStars.map(s=><div key={s.id} style={{position:"absolute",width:s.size,height:s.size,background:"white",borderRadius:"50%",top:`${s.top}%`,left:`${s.left}%`,animation:`blink ${s.d}s ease-in-out infinite ${s.dl}s`}} />)}</div>
        <div style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
          <AnimeCat /><AnimeCat style={{animationDelay:"0.8s"}} /><AnimeCat style={{animationDelay:"1.6s"}} /><AnimeCat style={{animationDelay:"0.4s"}} />
        </div>
        <div style={{position:"relative",zIndex:2,textAlign:"center",padding:"10px 24px",background:"rgba(255,182,193,0.07)",borderRadius:14,border:"1px solid rgba(255,182,193,0.2)",backdropFilter:"blur(4px)"}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(0.9rem,4vw,1.1rem)",color:"white",letterSpacing:"0.06em",margin:0,lineHeight:1.7,textShadow:"0 0 20px rgba(255,182,193,0.6)",animation:"shimmer 3s ease-in-out infinite"}}>
            For the most precious<br/>and beautiful girl 🌸
          </p>
        </div>
      </div>

      {/* HELLO HANA */}
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",padding:"40px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(255,182,193,0.08) 0%,transparent 70%)"}} />
        <div style={{position:"relative",zIndex:1}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,6vw,4rem)",fontStyle:"italic",color:"white",textShadow:"0 0 40px rgba(255,182,193,0.4)",marginBottom:0}}>Hello <span style={{animation:"hanaSparkle 3s ease-in-out infinite",display:"inline-block"}}>Hana</span>,</h1>
          <p style={{fontSize:"1.1rem",color:"rgba(255,255,255,0.55)",marginTop:12,fontStyle:"italic",letterSpacing:"0.05em",marginBottom:0}}>kaise ho aap? 🐱</p>
        </div>
      </div>

      {/* SAKURA HERO */}
      <SakuraHero />

      {/* CHAPTER 1 */}
      <WaveDivider fill="#fef9f0" />
      <div style={{background:"#fef9f0",marginTop:-2}}>
        <div style={{padding:"80px 20px",maxWidth:860,margin:"0 auto"}}>
          <ChapterBloom><CursedGlow><p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12}}>Chapter One</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2>How it all began  -  and what it became</h2></Fade>
          <Fade delay={0.2}><p>1st May 2023, that was the day I first texted you on WhatsApp. The conversation was short and it was over quickly. And then 13th October 2023, the day I found you on Instagram. I sent a follow request, you accepted and we talked.</p></Fade>
          <Fade delay={0.25}><p>You said you were thinking what if I was angry for the abrupt closure on WhatsApp. But I told you, that it was understandable cause we barely knew each other.</p></Fade>
          <Fade delay={0.3}><p>We just started talking casually about our days, about our likes, about ourselves, trying to know each other without any expectations. Gradually, we felt peace and it became a habit to check on each other, and to know everything about each other  -  from favourite colour, to what drinks we like to that momos shop in Versova where you wanted to take me with you and the cat café where I wanted to go with you. We started planning on things that we would do when we meet without forcing each other. It all felt like a dream but it was peaceful, like it changed something from within.</p></Fade>
          <Fade delay={0.1}><p>Things were not smooth always, you had your struggles but you always made things work with your strength and determination. I was just trying to be there for you like you were there for me. Things happened, but we always found our ways back to each other. You said it was difficult for you to trust but I was changing perceptions and that I am a peaceful part of life that you always want to go back to. That day, I made a promise to myself that I will never break your trust and will always hold on to you no matter what. You gave me peace too and you became my happy place and home.</p></Fade>
          <Fade delay={0.1}><p>When you changed job and it was for the first time that you had to do night shift, I was worried. But you were strong and you handled it with courage and you made it work. Even though our entire schedule changed but we still found time for each other and we used to be happiest when we were talking.</p></Fade>
          <Fade delay={0.1}><p>I never pushed you to meet because I was respecting you, your beliefs, your comfort, your pace. That was not fear on my end, not really. The fear went away the moment I thought: we will meet when the time is right, and we will. That certainty was enough. That was how much I trusted what we had.</p></Fade>
          <Fade delay={0.1}><p>I remember the first letter that you sent me, titled <em style={{color:"#8B5E3C"}}>"He"</em>  -  I was so happy to read it as if I was on the clouds. 9th January 2024, the first time I confessed that I liked you, and you said you liked me too. I was the happiest that day. Life became so beautiful from the time we met each other. And from that point, I became a version of myself I had never been before. Someone softer, more open, more alive. Someone I genuinely liked being. The only thing is, I do not know where to take this version anymore without you.</p></Fade>
          <div style={{textAlign:"center",fontSize:"1.6rem",color:"#d4a843",opacity:0.45,margin:"10px 0",letterSpacing:10}}>· · ·</div>
        </div>
      </div>

      {/* QUOTE 1 */}
      <Fade>
        <div style={{padding:"44px 20px",textAlign:"center",background:"#5a8c4a"}}>
          <blockquote style={{maxWidth:600,margin:"0 auto",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.15rem",lineHeight:1.85,color:"#fef9f0"}}>
            "We were the first thing in the morning and the last thing before sleep for each other -  that is not a habit. That is a home."
            <cite style={{display:"block",marginTop:12,fontSize:"0.78rem",letterSpacing:"0.15em",fontStyle:"normal",opacity:0.55}}> -  🌻🌻🌻</cite>
          </blockquote>
        </div>
      </Fade>

      {/* CHAPTER 2  -  PROSE */}
      <div style={{background:"linear-gradient(180deg,#c8eaf5 0%,#d8f0d0 38%,#a8cc88 65%,#7aaa60 100%)",padding:"80px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:0,left:"-10%",right:"-10%",height:"55%",background:"radial-gradient(ellipse 80% 60% at 20% 100%,#5a9040 0%,transparent 60%),radial-gradient(ellipse 70% 55% at 80% 100%,#4a8030 0%,transparent 55%)",pointerEvents:"none"}} />
        <div style={{maxWidth:720,margin:"0 auto",position:"relative",zIndex:1}}>
          <ChapterBloom><CursedGlow><p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12}}>Chapter Two</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2>A Sound Like Falling Into Something Warm</h2></Fade>
          <Fade delay={0.2}><p>One random night, I saw a missed call from your number and then I called you back and you answered the call. I heard your voice for the first time. I was so happy, it gave me butterflies after hearing your beautiful voice. Then slowly we started talking more on calls for hours without even realising. Either we were doing some work or talking to each other and it always felt less. The time used to fly so fast when we were talking. Now, everything has slowed down. Every day feels like it is stretched and night feels the quietest it has ever been.</p></Fade>
          <Fade delay={0.1}><p>We started watching movies and series together, playing games, cup pong, ludo and paintball. I know I used to be all talking and nagging while playing. You didn't like that but still you played happily every time with me.</p></Fade>
          <Fade delay={0.1}><p>We used to talk endlessly about random topics, about us, about our plans, about things we would do together. Those hours felt different, like the world had gone quiet and it was just us. I liked the way you used to say <em style={{color:"#8B5E3C"}}>"shut up"</em> sometimes like it is the warmest thing. We always made sure that we are there for each other, whenever we were happy or when something exciting or good happens. Even if we aren't feeling well or if there is something that's bothering us, whether it's a work problem or if we are feeling low or anything, we were always there for each other. And it used to make us feel heard and calm. I was so happy to have you  -  someone I could share everything with, where I didn't have to pretend or be performative. I could be vulnerable and still it would be okay, cause I know you are there for me.</p></Fade>
          <Fade delay={0.1}><p>I remember whenever I used to go anywhere or I had to take late night flights, how you always used to be awake for me and used to make sure that I reached safely and how you used to be on the call with me till the end. I used to feel so happy and lucky that you were always there. That's what love is.</p></Fade>
          <Fade delay={0.1}><p>Every morning, we talked first. Every night before I went to sleep, it was you. Not sometimes. Not usually. Every single day, for so long. That is not a coincidence. That is choosing someone, over and over.</p></Fade>
          <Fade delay={0.1}><p>You said the right person will appreciate your efforts. Hana, if I was not being appreciated, I would never have gotten this attached. I would have felt it. I knew and I know one thing with complete certainty  -  you are the right person for me. That is why I never hesitated showing you all the love and care I had. That is why I shared every vulnerability, every fear, every quiet thing. Because you were my safe place. You still are. You are my home.</p></Fade>
          <div style={{textAlign:"center",fontSize:"1.6rem",color:"#d4a843",opacity:0.45,margin:"10px 0",letterSpacing:10}}>· · ·</div>
        </div>
      </div>

      {/* CHAPTER 3  -  THE MISSING */}
      <div style={{background:"linear-gradient(180deg,#0d0d1a 0%,#12122a 40%,#1a1a3a 70%,#0f0f20 100%)",padding:"90px 20px",position:"relative",overflow:"hidden"}}>
        {/* Stars */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          {Array.from({length:60},(_,i)=>(
            <div key={i} style={{position:"absolute",width:i%5===0?2.5:1.5,height:i%5===0?2.5:1.5,borderRadius:"50%",background:"white",opacity:0.3+Math.random()*0.5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,animation:`blink ${2+Math.random()*3}s ease-in-out infinite ${Math.random()*4}s`}}/>
          ))}
        </div>
        {/* Moon */}
        <div style={{position:"absolute",top:"8%",right:"8%",width:52,height:52,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fffde0,#f5e090)",boxShadow:"0 0 30px 10px rgba(255,240,150,0.2)",opacity:0.85,pointerEvents:"none"}}/>

        <div style={{maxWidth:720,margin:"0 auto",position:"relative",zIndex:1}}>
          <ChapterBloom><CursedGlow><p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"rgba(255,182,193,0.7)",marginBottom:12}}>Chapter Three</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2 style={{color:"white",fontFamily:"'Playfair Display',serif",fontStyle:"italic",textShadow:"0 0 30px rgba(255,182,193,0.3)"}}>Everything the Quiet Holds</h2></Fade>

          <Fade delay={0.2}><p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.95}}>I miss you ma'am, a lot. There is not just a single aspect that I miss about you. It's not that I just miss the conversations that we used to have all the time  -  I miss you, everything about you, the warmth, the love and the care that you had for me.</p></Fade>

          <Fade delay={0.1}><p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.95}}>I miss you whenever I see the moon or when I see the beautiful sunset or the beautiful sky. I miss you daily, not only when I am alone doing nothing but also when I am surrounded by people all around. It's just that nothing feels good without you.</p></Fade>

          <Fade delay={0.1}>
            <div style={{margin:"36px 0",padding:"22px 28px",borderLeft:"3px solid rgba(255,182,193,0.5)",background:"rgba(255,182,193,0.06)",borderRadius:"0 12px 12px 0"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,220,230,0.9)",margin:0,lineHeight:1.9}}>It was not just the attachment. Attachment fades with time but it's the love which never fades. The love still gives me hope and makes me hold onto you.</p>
            </div>
          </Fade>

          <Fade delay={0.1}><p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.95}}>I love you so much. I love everything about you. Never did I have the feeling that you are not enough for me. You are not unlovable  -  you deserve all the love and happiness in this world. Believe me when I say this ma'am.</p></Fade>

          <Fade delay={0.1}>
            <div style={{margin:"36px 0",padding:"22px 28px",borderLeft:"3px solid rgba(212,168,67,0.5)",background:"rgba(212,168,67,0.06)",borderRadius:"0 12px 12px 0"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,235,180,0.9)",margin:0,lineHeight:1.9}}>What will I do with the whole garden if my favourite flower isn't there.</p>
            </div>
          </Fade>

          <Fade delay={0.1}><p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.95}}>We have already done the hardest part, which was finding each other among millions of people. Now let's do one more thing and never lose each other.</p></Fade>

          <Fade delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,182,193,0.8)",marginTop:32,lineHeight:1.85}}>
              Kya hi hoga mera tumhare bina 🥺
            </p>
          </Fade>

          <div style={{textAlign:"center",fontSize:"1.6rem",color:"rgba(212,168,67,0.4)",margin:"10px 0",letterSpacing:10}}>· · ·</div>
        </div>
      </div>

      {/* WIND RISES INTERLUDE */}
      <Fade>
        <div style={{padding:"60px 20px",background:"linear-gradient(180deg,#fef9f0 0%,#f5e6c8 100%)",display:"flex",justifyContent:"center"}}>
          <div style={{maxWidth:480,width:"100%",borderRadius:20,overflow:"hidden",boxShadow:"0 12px 50px rgba(0,0,0,0.13)",border:"1px solid rgba(212,168,67,0.25)"}}>
            <div style={{height:200,position:"relative",overflow:"hidden"}}>
              <SceneWindRises/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(transparent,#fffef8)",zIndex:10}} />
            </div>
            <div style={{padding:"28px 32px 36px",background:"#fffef8",textAlign:"center"}}>
              <div style={{fontSize:"2rem",marginBottom:12,display:"flex",justifyContent:"center"}}>
                <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 85 Q38 70 35 55" stroke="#5a8c3a" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40 85 Q40 68 40 52" stroke="#5a8c3a" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40 85 Q42 70 45 55" stroke="#5a8c3a" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40 85 Q36 72 30 58" stroke="#6aa040" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M40 85 Q44 72 50 58" stroke="#6aa040" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M37 68 Q30 62 32 56 Q38 60 37 68Z" fill="#7aba50" opacity="0.85"/>
                  <path d="M43 68 Q50 62 48 56 Q42 60 43 68Z" fill="#7aba50" opacity="0.85"/>
                  <g transform="translate(28,42)">
                    <circle cx="0" cy="0" r="5" fill="#f9c6d0" opacity="0.7"/>
                    {[0,60,120,180,240,300].map((a,i)=><ellipse key={i} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4" ry="3" fill="#f9c6d0" opacity="0.75" transform={`rotate(${a},${Math.cos(a*Math.PI/180)*7},${Math.sin(a*Math.PI/180)*7})`}/>)}
                    <circle cx="0" cy="0" r="3.5" fill="#fde68a"/>
                  </g>
                  <g transform="translate(52,44)">
                    <circle cx="0" cy="0" r="5" fill="#c4b5fd" opacity="0.7"/>
                    {[0,60,120,180,240,300].map((a,i)=><ellipse key={i} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4" ry="3" fill="#c4b5fd" opacity="0.75" transform={`rotate(${a},${Math.cos(a*Math.PI/180)*7},${Math.sin(a*Math.PI/180)*7})`}/>)}
                    <circle cx="0" cy="0" r="3.5" fill="#fde68a"/>
                  </g>
                  <g transform="translate(40,36)">
                    {[0,45,90,135,180,225,270,315].map((a,i)=><ellipse key={i} cx={Math.cos(a*Math.PI/180)*10} cy={Math.sin(a*Math.PI/180)*10} rx="5.5" ry="3.5" fill="#fda4af" opacity="0.9" transform={`rotate(${a},${Math.cos(a*Math.PI/180)*10},${Math.sin(a*Math.PI/180)*10})`}/>)}
                    <circle cx="0" cy="0" r="6" fill="#fbbf24"/>
                    <circle cx="0" cy="0" r="3.5" fill="#f59e0b"/>
                  </g>
                  <g transform="translate(22,52)">
                    {[0,72,144,216,288].map((a,i)=><ellipse key={i} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" fill="#86efac" opacity="0.85" transform={`rotate(${a},${Math.cos(a*Math.PI/180)*6},${Math.sin(a*Math.PI/180)*6})`}/>)}
                    <circle cx="0" cy="0" r="3.5" fill="#fde68a"/>
                  </g>
                  <g transform="translate(58,52)">
                    {[0,72,144,216,288].map((a,i)=><ellipse key={i} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" fill="#fca5a5" opacity="0.85" transform={`rotate(${a},${Math.cos(a*Math.PI/180)*6},${Math.sin(a*Math.PI/180)*6})`}/>)}
                    <circle cx="0" cy="0" r="3.5" fill="#fde68a"/>
                  </g>
                  <circle cx="32" cy="30" r="4" fill="#fbcfe8" opacity="0.8"/>
                  <circle cx="32" cy="30" r="2" fill="#f9a8d4"/>
                  <circle cx="48" cy="28" r="4" fill="#a5f3fc" opacity="0.8"/>
                  <circle cx="48" cy="28" r="2" fill="#67e8f9"/>
                  <path d="M36 80 Q40 77 44 80 Q40 83 36 80Z" fill="#fda4af" opacity="0.8"/>
                </svg>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"#2c1810",marginBottom:20,fontWeight:600,lineHeight:1.5}}>
                {"The Wind Rises \u2014 the first one we watched together"}
              </div>
              <div style={{borderLeft:"3px solid #d4a843",borderRight:"3px solid #d4a843",padding:"14px 24px",background:"rgba(212,168,67,0.06)",borderRadius:8,marginBottom:20}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"#8a6a2a",lineHeight:1.8,margin:0}}>
                  {"\u201cThe wind is rising\u2026 we must try to live.\u201d"}
                </p>
                <p style={{fontSize:"0.75rem",letterSpacing:"0.12em",color:"#b8904a",margin:"8px 0 0",opacity:0.8}}>
                  {"\u2014 The Wind Rises"}
                </p>
              </div>
              <p style={{fontSize:"0.88rem",color:"#6b4c3b",lineHeight:1.8,margin:0}}>
                The first movie we ever watched together, and somehow it said everything.
              </p>
            </div>
          </div>
        </div>
      </Fade>

      {/* CHAPTER 3  -  DREAMS */}
      <div style={{background:"linear-gradient(180deg,#fbe8c8 0%,#f5d4a0 26%,#e8c888 46%,#c4a464 66%,#8db87a 80%,#6a9a58 100%)",padding:"80px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"radial-gradient(ellipse 90% 70% at 15% 100%,#5a8a3a 0%,transparent 55%),radial-gradient(ellipse 75% 65% at 85% 100%,#4a7a2a 0%,transparent 60%)",pointerEvents:"none"}} />
        <div style={{maxWidth:960,margin:"0 auto",position:"relative",zIndex:1}}>
          <ChapterBloom><CursedGlow><p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12}}>Chapter Four</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2>Everything we were going to do</h2></Fade>
          <Fade delay={0.15}><p style={{marginBottom:36}}>We made so many plans. They were the whole shape of a future we were building together in our head, moment by moment. There was still many more to come.</p></Fade>
          <style>{`
            .dream-grid { display:grid; gap:22px; grid-template-columns: 1fr; }
            @media(min-width:600px) { .dream-grid { grid-template-columns: repeat(2, 1fr); } }
            @media(min-width:900px) { .dream-grid { grid-template-columns: repeat(4, 1fr); } }
            .dream-grid > div { height: 100%; }
            .dream-grid > div > div { height: 100%; }
          `}</style>
          <div className="dream-grid">
            {[
              {scene:<SceneCafe/>,emoji:"☕",title:"Café hopping & Cat Café",desc:"We planned to go to so many cafes. I really wanted to go the cat cafe with you. Boba you liked really much, which we planned to go for as well and the momos place that you said was really good. There was a whole city to explore together and then the entire country and the world."},
              {scene:<SceneBeach/>,emoji:"🌊",title:"Night beach walk",desc:"Do you remember ma'am when we planned that someday we will go for walking on the beach in the night when there is no one around and all we could hear is the waves and the cold wind touching our face."},
              {scene:<SceneFireworks/>,emoji:"🎆",title:"New Year's Eve fireworks",desc:"We planned this, the sky exploding into fireworks at midnight and us witnessing it together. It will be such an amazing experience with you by my side."},
              {scene:<SceneNight/>,emoji:"🕌",title:"Muhammad Ali road in Ramadan",desc:"I wanted to go here in Ramadan. I knew places where I wanted to take you in Ramadan and have all the delicious food with you. Nalli nihari, kebabs, sweets and everything. That would have been really fun. You could bring your sister too if you want."},
              {scene:<SceneMovie/>,emoji:"🎬",title:"Movie dates - for real",desc:"Not Rave. Actually sitting next to each other in the dark, sharing popcorn, whispering reactions."},
              {scene:<SceneStars/>,emoji:"✨",title:"Stargazing",desc:"Sitting in an open sky, losing track of time. Just us and more stars than we could ever count and enjoying both the silence and endless yapping."},
              {scene:<SceneForest/>,emoji:"🌍",title:"Travelling",desc:"I wanted to go to Kerala with you in India first. I have been asked to go there but I always said, I won't cause I promised to go there with my love, and also so many places here in India and all over the world. Don't worry, won't make you walk too much Hana. Aur Ha tumko chhod kar kahi bhi nahi jaaunga mai, I promise. I wanted to go to the Umrah as well with you, would have been peaceful."},
              {scene:<SceneBadminton/>,emoji:"🏸",title:"Badminton",desc:"I so want to play badminton with you and I have a feeling that you are gonna do good and don't worry I won't nag, pakka!"},
              {scene:<ScenePottery/>,emoji:"🏺",title:"Pottery",desc:"I know you liked pottery so much. It would be a really an amazing experience to try our hands on making something. We can try making a pot first and put a cactus plant in that."},
              {scene:<SceneMorning/>,emoji:"🍳",title:"French toast and cats",desc:"I really wanted to have the French toast made by you Hana (yes, I can have sugar made by my sugar 😌). You do make amazing food. I really liked the pancakes that you sent and the pulao, loved it. I am sorry, I couldn't get you the cat. But if you give me one chance, I will get you one pakka, wo bhi orange cat, I know you like them."},
            ].map((card,i)=>(
              <Fade key={i} delay={i*0.05}>
                <DreamCard scene={card.scene} emoji={card.emoji} title={card.title} desc={card.desc} />
              </Fade>
            ))}
            <CustomDreamCardBuilder cards={customCards} onAdd={setCustomCards} />
          </div>
        </div>
      </div>

      {/* CHAPTER 4  -  LETTER */}
      <div style={{background:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a843' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\"),linear-gradient(135deg,#fef9f0 0%,#f5e6c8 100%)",padding:"80px 20px"}}>
        <ChapterBloom><CursedGlow><p style={{textAlign:"center",fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12}}>Chapter Five</p></CursedGlow></ChapterBloom>
        <Fade delay={0.1}><h2 style={{textAlign:"center",marginBottom:40}}>What I want to say to you</h2></Fade>
        <Fade delay={0.2}>
        <div style={{maxWidth:700,margin:"0 auto",background:"white",borderRadius:4,padding:"56px 52px",boxShadow:"0 8px 60px rgba(0,0,0,0.08),4px 4px 0 #d4a843"}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.25rem",color:"#2c1810",marginBottom:8}}>Hana,</p>
          <p>Firstly, I am not blaming you for anything and you are not a bad person. You said you took this decision after thinking very much, I know you must have thought something. That's okay! I still don't know what exactly you thought though that made you take this step.</p>
          <p>I know now that our brain makes decisions sometimes in ways that are meant to protect us based on our past experiences. That's okay. But all I wanted was for you to not carry those thoughts alone. You can trust me with that ma'am. That's what being there for each other means.</p>
          <p>I know one thing with all my heart - when you said you don't like me, you didn't mean it. In our entire relationship, none of your actions were like that. They were always full of love and care.</p>
          <p>I know love can feel frightening at times with the thought of what if it doesn't work out or what if we aren't enough. I want you to know something, we don't always have to be perfect and flawless ma'am.</p>
          <div style={{margin:"28px 0",padding:"20px 24px",background:"linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.04))",borderLeft:"4px solid #d4a843",borderRadius:"0 12px 12px 0"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"#2c1810",margin:0,lineHeight:1.85}}>I fell in love with all of you &mdash; the you that is strong, but also the you that is scared. It was never with terms and conditions. I love you exactly for who you are and you will always be more than enough for me.</p>
          </div>
          <p>Also, know that I am not angry ma'am, neither do I hate you for anything. You will always be in the good side of my heart. You deserve everything. You are strong. You are a good person in every way which is rare. Be that way.</p>
          <p>Never doubt yourself. Never feel that you are less in anything or that you are not enough. Don't put yourself in guilt for anything. You were always more than enough and you were always there for me from the time we met, even if you don't realise it.</p>
          <p>I know things have been heavy. I know you said you cannot pretend everything is okay &mdash; and I do not want you to. I never wanted you to carry anything quietly that you could have said out loud to me.</p>
          <p>Please forgive me for anything I did or said which hurt you. You know right, I will never hurt you intentionally. It was never my intention. I am sorry for all the pain and suffering that you had to go through. Please never be sad okay. If you are sad I will know, cause I used to be a magician you know.</p>
          <p>One question I kept asking myself - what exactly do I want? And the only answer I got every single time was: your happiness. I just want you to be happy and achieve everything you desire, InshAllah.</p>
          <p>This brings me to a question &mdash; are you happy with this ma'am. Did this bring you peace and are you really okay with this. It's a request Hana, please answer this honestly, whenever you are ready.</p>
          <p>We loved each other across distance, across time, across so long without ever being in the same place - and it held. That kind of love does not weaken from distance, it proves itself through it. Think about what it could become if we actually hold onto each other.</p>
          <p>There are literally pages that I can write which are still yet to come for us and still left for us to do together. This is just the beginning.</p>
          <p>You might ask why I am trying this much. What's my intention. It's very clear to me &mdash; to make you my forever, to make you feel loved no matter how the situation is, to always cheer for your success, to be there for you even in your difficult times and always stand beside you.</p>
          <div style={{margin:"28px 0",padding:"20px 24px",background:"linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.04))",borderLeft:"4px solid #d4a843",borderRadius:"0 12px 12px 0"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:"#2c1810",margin:0,lineHeight:1.85}}>You are the choice that I made with all my heart. I still believe in us and I know we can always make this work if we just hold on to each other and believe in what we had, InshaAllah. I lub you the most Hana &#128149;&#128149;</p>
          </div>
          <div style={{margin:"36px 0 28px",textAlign:"center",padding:"18px 0",borderTop:"1px solid rgba(212,168,67,0.25)",borderBottom:"1px solid rgba(212,168,67,0.25)"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"#8a6a2a",margin:0,letterSpacing:"0.02em"}}>"Your happiness is my answer for every question"</p>
          </div>
          <div style={{marginTop:28,textAlign:"right",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"#2c1810"}}>Azeez 💛</div>
        </div>
        </Fade>
      </div>

      {/* COSMIC LOVE */}
      <CosmicLoveSection />

      {/* MEMORIES */}
      <MemoriesSection />

      {/* VIDEO */}
      <div style={{background:"linear-gradient(180deg,#1a1a2e 0%,#16213e 100%)",padding:"60px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:420,margin:"0 auto"}}>
          <p style={{fontSize:"0.7rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:10,fontFamily:"'Playfair Display',serif"}}>A little something</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(1.5rem,4vw,2.2rem)",color:"white",marginBottom:28,textShadow:"0 0 30px rgba(255,182,193,0.3)"}}>For you 🌸</h2>

          <VideoSlider />
        </div>
      </div>

      {/* COMMENTS */}
      <CommentsSection />

      {/* FOOTER */}
      <Fade>
        <footer style={{textAlign:"center",padding:"60px 20px",background:"#fef9f0"}}>
          <div style={{color:"#d4a843",fontSize:"1rem",letterSpacing:12,marginBottom:24,opacity:0.45}}>✦ ✦ ✦</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"#6b4c3b",textAlign:"center",marginBottom:0}}>
            Made with so much love,<br/>and the quiet belief there is still more to come.<br/>
            <em style={{fontSize:"0.85rem",opacity:0.6}}> -  Aamir 💛</em>
          </p>
        </footer>
      </Fade>
    </>
  );
}
