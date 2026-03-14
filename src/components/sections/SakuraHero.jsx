import React from "react";

function SceneForest() {
  return <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#1a3a20 0%,#2a5030 25%,#3a6840 50%,#508855 72%,#90c890 100%)"}}>
    {[["6%",68,52],["18%",52,40],["74%",62,48],["86%",48,36]].map(([l,h,w],i)=><React.Fragment key={i}>
      <div style={{position:"absolute",width:w,height:h,borderRadius:"50%",background:"radial-gradient(ellipse at 40% 40%,#2a6020,#1a4010)",bottom:20,left:l}} />
      <div style={{position:"absolute",width:8,height:24,background:"#3a2010",borderRadius:3,bottom:0,left:`calc(${l} + ${w/2-4}px)`}} />
    </React.Fragment>)}
  </div>;
}

export default function SakuraHero() {
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
        </defs>

        {/* falling petals */}
        {petals.map(p=>(
          <ellipse key={p.id} cx={p.left*8} cy={-20} rx={p.size*0.68} ry={p.size*0.42}
            fill={p.id%3===0?"#ff90c0":"#ffc8e0"}
            style={{"--pr":p.pr,"--px":p.px,animation:`petalDrift ${p.dur}s ease-in infinite ${p.delay}s`,opacity:0}}/>
        ))}

        {/* BALLOON */}
        <g style={{animation:"balloonFloat 5s ease-in-out infinite",transformOrigin:"400px 155px"}}>
          <g style={{animation:"stringWave 3.2s ease-in-out infinite",transformOrigin:"400px 215px"}}>
            <path d="M400,214 Q391,252 397,292 Q403,332 395,368 Q389,398 394,428"
              stroke="#b03060" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.65"/>
          </g>
          <path d="M400,212 C400,212 338,186 336,150 C334,118 357,102 380,110 C390,114 397,123 400,133 C403,123 410,114 420,110 C443,102 466,118 464,150 C462,186 400,212 400,212 Z"
            fill="url(#hG)"/>
          <ellipse cx="373" cy="132" rx="17" ry="12" fill="url(#hSheen)" opacity="0.82"/>
          <ellipse cx="385" cy="124" rx="8" ry="5" fill="white" opacity="0.48"/>
          <ellipse cx="400" cy="214" rx="5.5" ry="4" fill="#b03060"/>
        </g>

        {/* LEFT CAT (cream) */}
        <g transform="translate(262,500)">
          <g style={{animation:"catJumpL 2.8s ease-in-out infinite",transformOrigin:"0 0"}}>
            <g style={{animation:"tailL 1.2s ease-in-out infinite",transformOrigin:"0 -10px"}}>
              <path d="M-3,-10 Q-27,-33 -23,-60 Q-19,-80 -7,-76" stroke="#f0d8b0" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
            <ellipse cx="0" cy="-30" rx="21" ry="25" fill="#fef0e0"/>
            <ellipse cx="0" cy="-23" rx="13" ry="17" fill="white" opacity="0.55"/>
            <g style={{animation:"pawL 2.8s ease-in-out infinite",transformOrigin:"-17px -53px"}}>
              <ellipse cx="-17" cy="-53" rx="9" ry="6.5" fill="#fef0e0"/>
              <ellipse cx="-23" cy="-58" rx="5" ry="3.5" fill="#fef0e0"/>
            </g>
            <ellipse cx="13" cy="-9" rx="9" ry="6.5" fill="#fef0e0"/>
            <circle cx="0" cy="-58" r="21" fill="#fef0e0"/>
            <polygon points="-17,-74 -8,-58 -23,-58" fill="#fef0e0"/>
            <polygon points="-15,-71 -9,-60 -21,-60" fill="#ffb8b8" opacity="0.55"/>
            <polygon points="17,-74 8,-58 23,-58" fill="#fef0e0"/>
            <polygon points="15,-71 9,-60 21,-60" fill="#ffb8b8" opacity="0.55"/>
            <g style={{transformOrigin:"-7px -59px",animation:"blinkL 4s ease-in-out infinite"}}>
              <ellipse cx="-7" cy="-59" rx="4.5" ry="4.5" fill="#3a2810"/>
              <circle cx="-6" cy="-61" r="1.8" fill="white"/>
            </g>
            <g style={{transformOrigin:"7px -59px",animation:"blinkL 4s ease-in-out infinite 0.3s"}}>
              <ellipse cx="7" cy="-59" rx="4.5" ry="4.5" fill="#3a2810"/>
              <circle cx="8" cy="-61" r="1.8" fill="white"/>
            </g>
            <ellipse cx="0" cy="-53" rx="3" ry="2.2" fill="#ff9eb5"/>
            <path d="M-4,-50 Q0,-47 4,-50" stroke="#cc7090" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            <line x1="-21" y1="-54" x2="-5" y2="-54" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="-21" y1="-51" x2="-5" y2="-52" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="21"  y1="-54" x2="5"  y2="-54" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <line x1="21"  y1="-51" x2="5"  y2="-52" stroke="rgba(120,80,40,0.28)" strokeWidth="0.9"/>
            <ellipse cx="-13" cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.4"/>
            <ellipse cx="13"  cy="-51" rx="6" ry="3" fill="#ffb0b0" opacity="0.4"/>
          </g>
        </g>

        {/* RIGHT CAT (blue-grey) */}
        <g transform="translate(538,500)">
          <g style={{animation:"catJumpR 2.8s ease-in-out infinite 0.6s",transformOrigin:"0 0"}}>
            <g style={{animation:"tailR 1.3s ease-in-out infinite",transformOrigin:"0 -10px"}}>
              <path d="M3,-10 Q27,-33 23,-60 Q19,-80 7,-76" stroke="#b8c4d8" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
            <ellipse cx="0" cy="-30" rx="21" ry="25" fill="#d8dff0"/>
            <ellipse cx="0" cy="-23" rx="13" ry="17" fill="#eef0f8" opacity="0.55"/>
            <g style={{animation:"pawR 2.8s ease-in-out infinite 0.6s",transformOrigin:"17px -53px"}}>
              <ellipse cx="17" cy="-53" rx="9" ry="6.5" fill="#d8dff0"/>
              <ellipse cx="23" cy="-58" rx="5" ry="3.5" fill="#d8dff0"/>
            </g>
            <ellipse cx="-13" cy="-9" rx="9" ry="6.5" fill="#d8dff0"/>
            <circle cx="0" cy="-58" r="21" fill="#d8dff0"/>
            <path d="M-5,-72 L-3,-64" stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            <path d="M0,-74 L0,-65"   stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            <path d="M5,-72 L3,-64"   stroke="#b0b8cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
            <polygon points="-17,-74 -8,-58 -23,-58" fill="#d8dff0"/>
            <polygon points="-15,-71 -9,-60 -21,-60" fill="#ffb8cc" opacity="0.5"/>
            <polygon points="17,-74 8,-58 23,-58" fill="#d8dff0"/>
            <polygon points="15,-71 9,-60 21,-60" fill="#ffb8cc" opacity="0.5"/>
            <g style={{transformOrigin:"-7px -59px",animation:"blinkR 5s ease-in-out infinite"}}>
              <ellipse cx="-7" cy="-59" rx="4.5" ry="4.5" fill="#22203a"/>
              <circle cx="-6" cy="-61" r="1.8" fill="white"/>
            </g>
            <g style={{transformOrigin:"7px -59px",animation:"blinkR 5s ease-in-out infinite 0.4s"}}>
              <ellipse cx="7" cy="-59" rx="4.5" ry="4.5" fill="#22203a"/>
              <circle cx="8" cy="-61" r="1.8" fill="white"/>
            </g>
            <ellipse cx="0" cy="-53" rx="3" ry="2.2" fill="#ff9eb5"/>
            <path d="M-4,-50 Q0,-48 4,-50" stroke="#cc7090" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            <line x1="-21" y1="-54" x2="-5" y2="-54" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="-21" y1="-51" x2="-5" y2="-52" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="21"  y1="-54" x2="5"  y2="-54" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
            <line x1="21"  y1="-51" x2="5"  y2="-52" stroke="rgba(80,80,120,0.25)" strokeWidth="0.9"/>
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
