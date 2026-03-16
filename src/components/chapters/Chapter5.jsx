import Fade from "../ui/Fade";
import ChapterBloom from "../ui/ChapterBloom";
import CursedGlow from "../ui/CursedGlow";
import { DreamCard, CustomDreamCardBuilder } from "../interactive/DreamCard";

// ── Scene functions for dream cards (exact from original) ──
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
    {[["6%",68,52],["18%",52,40],["74%",62,48],["86%",48,36]].map(([l,h,w],i)=><div key={i}>
      <div style={{position:"absolute",width:w,height:h,borderRadius:"50%",background:"radial-gradient(ellipse at 40% 40%,#2a6020,#1a4010)",bottom:20,left:l}} />
      <div style={{position:"absolute",width:8,height:24,background:"#3a2010",borderRadius:3,bottom:0,left:`calc(${l} + ${w/2-4}px)`}} />
    </div>)}
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

// ── SceneWindRises (exact from original) ──
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

// ── Chapter5: Wind Rises interlude + Dreams ──
export default function Chapter5({ customCards, setCustomCards }) {
  return (
    <div id="chapter-5">
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
          <ChapterBloom><CursedGlow><p style={{fontSize:"0.72rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#d4a843",marginBottom:12}}>Chapter Five</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2>Everything we were going to do</h2></Fade>
          <Fade delay={0.15}><p style={{marginBottom:36}}>We made so many plans. They were the whole shape of a future we were building together in our head, moment by moment. There are still many more to come InshaAllah.</p></Fade>
          <div className="dream-grid">
            {[
              {scene:<SceneCafe/>,emoji:"☕",title:"Café hopping & Cat Café",desc:"We planned to go to so many cafes. I really wanted to go the cat cafe with you. Boba you liked really much, which we planned to go for as well and the momos place that you said was really good. There was a whole city to explore together and then the entire country and the world."},
              {scene:<SceneBeach/>,emoji:"🌊",title:"Night beach walk",desc:"Do you remember ma'am when we planned that someday we will go for walking on the beach in the night when there is no one around and all we could hear is the waves and the cold wind touching our face."},
              {scene:<SceneFireworks/>,emoji:"🎆",title:"New Year's Eve fireworks",desc:"We planned this, the sky exploding into fireworks at midnight and us witnessing it together. It will be such an amazing experience with you by my side."},
              {scene:<SceneNight/>,emoji:"🕌",title:"Muhammad Ali road in Ramadan",desc:"I wanted to go here in Ramadan. I knew places where I wanted to take you in Ramadan and have all the delicious food with you. Nalli nihari, kebabs, sweets and everything. That would have been really fun. You could bring your sister too if you want."},
              {scene:<SceneMovie/>,emoji:"🎬",title:"Movie dates - for real",desc:"Not Rave. Actually sitting next to each other in the dark, sharing popcorn, whispering reactions."},
              {scene:<SceneStars/>,emoji:"✨",title:"Stargazing",desc:"Sitting in an open sky, losing track of time. Just us and more stars than we could ever count and enjoying both the silence and endless yapping."},
              {scene:<SceneForest/>,emoji:"🌍",title:"Travelling",desc:"I wanted to go to Kerala first with you in India. I have been asked to go there but I always said, I won't cause I promised to go there with my love. And also so many places here in India and all over the world InshaAllah. Don't worry, won't make you walk too much Hana. Aur Ha tumko chhod kar kahi bhi nahi jaaunga mai, I promise. I wanted to go to the Umrah as well with you, would have been peaceful."},
              {scene:<SceneBadminton/>,emoji:"🏸",title:"Badminton",desc:"I so want to play badminton with you and I have a feeling that you are gonna do good and don't worry I won't nag, pakka 😸!"},
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
    </div>
  );
}
