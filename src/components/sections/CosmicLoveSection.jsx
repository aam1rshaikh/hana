import { useState, useEffect, useRef } from "react";
import Fade from "../ui/Fade";

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

export default function CosmicLoveSection() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const sectionRef = useRef(null);

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
      <div style={{width:"100%",overflow:"hidden",lineHeight:0,marginBottom:-2}}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{width:"100%",height:60,display:"block"}}>
          <path d="M0,0 C300,80 900,0 1200,60 L1200,0 L0,0 Z" fill="#fef9f0"/>
        </svg>
      </div>

      <div style={{textAlign:"center",padding:"40px 20px 0",position:"relative"}}>
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

        {unlocked && (
          <div style={{maxWidth:480,margin:"0 auto"}}>
            <p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:24,fontFamily:"'Playfair Display',serif"}}>
              Scale of my love
            </p>

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
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all 0.6s cubic-bezier(0.34,1.56,0.64,1)",flexShrink:0}}>
                    <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:isActive?6:0}}>
                      {isActive && (
                        <div style={{position:"absolute",width:finalSize*1.7,height:finalSize*1.7,borderRadius:"50%",background:`radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,animation:"jjkOrb 2s ease-in-out infinite",pointerEvents:"none"}}/>
                      )}
                      {step.isHeart ? (
                        <div style={{width:finalSize,height:finalSize,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%, #ff8fb3, #ff3d7f)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:finalSize*0.45,boxShadow:isActive?`0 0 30px ${step.glow}, 0 0 60px ${step.glow}`:"none",transition:"all 0.6s ease",position:"relative",zIndex:1}}>💗</div>
                      ) : (
                        <div style={{width:finalSize,height:finalSize,borderRadius:"50%",overflow:"hidden",boxShadow:isActive?`0 0 20px ${step.glow}, 0 0 40px ${step.glow}`:`0 0 4px ${step.glow}`,transition:"all 0.6s ease",position:"relative",zIndex:1,background:"#111",flexShrink:0,opacity:isActive?1:0.7}}>
                          <img loading="lazy" src={step.img} alt={step.label} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:"50%"}}/>
                        </div>
                      )}
                    </div>
                    <div style={{fontSize:`clamp(0.38rem, ${Math.max(finalSize/11, 1.2)}vw, 0.65rem)`,color:isActive?step.color:"rgba(255,255,255,0.4)",textAlign:"center",fontFamily:"'Playfair Display',serif",fontStyle:step.isHeart?"italic":"normal",lineHeight:1.3,whiteSpace:"pre-line",transition:"all 0.5s ease",maxWidth:finalSize+10}}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {current && (
              <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${current.glow}`,borderRadius:20,padding:"24px 28px",backdropFilter:"blur(12px)",boxShadow:`0 0 40px ${current.glow}`,transition:"all 0.5s ease",minHeight:100}}>
                <div style={{fontSize:"2rem",marginBottom:8}}>
                  {current.isHeart ? "💗" : (
                    <img loading="lazy" src={current.img} alt={current.label}
                      style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",boxShadow:`0 0 20px ${current.glow}`}}/>
                  )}
                </div>
                <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",color:"white",margin:"0 0 6px",whiteSpace:"pre-line"}}>
                  {current.label}
                </p>
                <p style={{fontSize:"0.78rem",color:current.color,margin:0,letterSpacing:"0.05em"}}>
                  {current.desc}
                </p>
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
