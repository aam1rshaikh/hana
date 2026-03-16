import { useState, useEffect } from "react";
import Fade from "../ui/Fade";

export default // ─── INSTAGRAM CHAT SECTION ─────────────────────────────────────────────────
function InstagramChatSection() {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const stats = [
    { emoji: "💬", value: "1,33,273", label: "messages sent on instagram", sub: "" },
    { emoji: "📅", value: "2y 3m 15d", label: "days of conversation on instagram", sub: "" },
    { emoji: "📖", value: "5,61,454", label: "words exchanged", sub: "as many words as the entire Lord of the Rings trilogy" },
  ];

  const funFacts = [
  ];

  const handleButtonClick = () => {
    setShowPasswordPrompt(true);
    // Add a hash state to handle browser back button
    window.history.pushState({ passwordPrompt: true }, '', '#password-prompt');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "hana") {
      // Navigate to the chat page
      window.location.href = "https://hana-aamir.vercel.app";
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleCancel = () => {
    setShowPasswordPrompt(false);
    setPassword("");
    setError(false);
    // Go back in history to remove the password prompt state
    if (window.location.hash === '#password-prompt') {
      window.history.back();
    }
  };
  
  // Handle browser back button when password prompt is open
  useEffect(() => {
    const handlePopState = (e) => {
      if (showPasswordPrompt && !e.state?.passwordPrompt) {
        setShowPasswordPrompt(false);
        setPassword("");
        setError(false);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showPasswordPrompt]);

  return (
    <div id="instagram-chat" style={{ background: "#f4e6d4", padding: "40px 20px 80px", position: "relative", overflow: "visible" }}>
      {/* Warm crumbled paper base with realistic texture */}
      <div style={{ position: "absolute", inset: "-5px", pointerEvents: "none", background: "linear-gradient(135deg, #f8ead8 0%, #f2e0c8 25%, #f5e3cc 50%, #f0ddc5 75%, #f6e5d0 100%)", zIndex: 0, clipPath: "polygon(0% 2%, 1.5% 0.8%, 3% 1.2%, 5% 0.5%, 7% 1.8%, 9% 0.9%, 11% 1.5%, 14% 0.7%, 17% 1.9%, 20% 1.1%, 23% 0.6%, 26% 1.7%, 30% 0.9%, 34% 1.4%, 38% 0.8%, 42% 1.6%, 46% 1.2%, 50% 0.7%, 54% 1.5%, 58% 1%, 62% 1.8%, 66% 0.9%, 70% 1.3%, 74% 1.1%, 78% 0.8%, 82% 1.6%, 86% 1.2%, 90% 0.9%, 93% 1.4%, 96% 1.1%, 98.5% 1.7%, 100% 1%, 99.2% 3%, 99.5% 6%, 100% 9%, 99.3% 12%, 99.7% 15%, 99.1% 19%, 99.6% 23%, 99% 27%, 99.5% 31%, 99.2% 35%, 99.7% 39%, 99.1% 43%, 99.5% 47%, 99.3% 51%, 99.8% 55%, 99.2% 59%, 99.6% 63%, 99.1% 67%, 99.5% 71%, 99.3% 75%, 99.7% 79%, 99.2% 83%, 99.6% 87%, 99.1% 91%, 99.4% 94%, 99.8% 97%, 99.5% 99%, 98% 99.3%, 95% 99.7%, 92% 99.1%, 89% 99.5%, 86% 99.2%, 82% 99.6%, 78% 99.1%, 74% 99.5%, 70% 99.3%, 66% 99.7%, 62% 99.2%, 58% 99.6%, 54% 99%, 50% 99.4%, 46% 99.2%, 42% 99.7%, 38% 99.1%, 34% 99.5%, 30% 99.3%, 26% 99.6%, 22% 99.2%, 18% 99.7%, 14% 99.1%, 10% 99.4%, 7% 99.2%, 4% 99.6%, 1.5% 99.1%, 0.7% 98%, 0.3% 95%, 0.8% 92%, 0.2% 88%, 0.6% 84%, 0.9% 80%, 0.3% 76%, 0.7% 72%, 0.4% 68%, 0.8% 64%, 0.3% 60%, 0.6% 56%, 0.9% 52%, 0.4% 48%, 0.7% 44%, 0.3% 40%, 0.8% 36%, 0.2% 32%, 0.6% 28%, 0.4% 24%, 0.9% 20%, 0.3% 16%, 0.7% 12%, 0.5% 8%, 0.2% 5%, 0.6% 3%)" }} />
      
      {/* Strong visible crumple wrinkles - shadowy creases */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `
        radial-gradient(ellipse 420px 180px at 18% 15%, rgba(160,120,80,0.22) 15%, rgba(140,100,60,0.12) 40%, transparent 75%),
        radial-gradient(ellipse 380px 160px at 72% 22%, rgba(150,110,70,0.2) 15%, rgba(130,95,58,0.1) 40%, transparent 75%),
        radial-gradient(ellipse 450px 190px at 35% 45%, rgba(155,115,75,0.24) 15%, rgba(135,98,62,0.13) 40%, transparent 75%),
        radial-gradient(ellipse 350px 150px at 85% 58%, rgba(145,105,65,0.19) 15%, rgba(125,92,55,0.09) 40%, transparent 75%),
        radial-gradient(ellipse 400px 170px at 25% 75%, rgba(158,118,78,0.21) 15%, rgba(138,100,60,0.11) 40%, transparent 75%),
        radial-gradient(ellipse 320px 140px at 65% 88%, rgba(148,108,68,0.18) 15%, rgba(128,93,56,0.08) 40%, transparent 75%)
      `, zIndex: 1 }} />
      
      {/* Bright crumple ridges - highlighted peaks */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `
        radial-gradient(ellipse 350px 160px at 28% 18%, rgba(255,248,235,0.55) 20%, rgba(255,250,240,0.25) 50%, transparent 80%),
        radial-gradient(ellipse 320px 145px at 68% 28%, rgba(255,250,238,0.5) 20%, rgba(255,252,242,0.22) 50%, transparent 80%),
        radial-gradient(ellipse 380px 165px at 45% 52%, rgba(255,249,237,0.58) 20%, rgba(255,251,241,0.27) 50%, transparent 80%),
        radial-gradient(ellipse 300px 135px at 82% 65%, rgba(255,247,233,0.48) 20%, rgba(255,249,238,0.2) 50%, transparent 80%),
        radial-gradient(ellipse 340px 150px at 22% 82%, rgba(255,248,236,0.52) 20%, rgba(255,250,239,0.24) 50%, transparent 80%)
      `, zIndex: 1 }} />
      
      {/* Paper fiber and grain texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='4' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23grain)' opacity='0.15'/%3E%3C/svg%3E\")", mixBlendMode: "multiply", opacity: 0.7, zIndex: 1 }} />
      
      {/* Warm aged paper color patches */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `
        radial-gradient(circle 550px at 15% 20%, rgba(220,190,150,0.18) 0%, transparent 70%),
        radial-gradient(circle 480px at 80% 35%, rgba(210,180,140,0.15) 0%, transparent 65%),
        radial-gradient(circle 520px at 40% 75%, rgba(215,185,145,0.16) 0%, transparent 68%)
      `, zIndex: 0 }} />

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>

            {/* Ghibli flower bouquet + two orange cats */}
            <div style={{ display: "inline-block", marginBottom: 28, filter: "drop-shadow(0 8px 32px rgba(255,140,80,0.25))" }}>
              <svg viewBox="0 0 320 260" width="320" height="260" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
                <defs>
                  <radialGradient id="glowOrb" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(255,200,100,0.18)"/>
                    <stop offset="100%" stopColor="rgba(255,200,100,0)"/>
                  </radialGradient>
                  <style>{`
                    @keyframes catBreathL { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
                    @keyframes catBreathR { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
                    @keyframes tailSwayL { 0%,100%{transform:rotate(-18deg) translateX(-2px)} 50%{transform:rotate(18deg) translateX(2px)} }
                    @keyframes tailSwayR { 0%,100%{transform:rotate(18deg) translateX(2px)} 50%{transform:rotate(-18deg) translateX(-2px)} }
                    @keyframes floatPetal { 0%{opacity:0;transform:translateY(0) rotate(0deg)} 15%{opacity:0.9} 85%{opacity:0.5} 100%{opacity:0;transform:translateY(-38px) rotate(40deg) translateX(12px)} }
                    @keyframes floatPetal2 { 0%{opacity:0;transform:translateY(0) rotate(0deg)} 15%{opacity:0.8} 85%{opacity:0.4} 100%{opacity:0;transform:translateY(-44px) rotate(-35deg) translateX(-10px)} }
                    @keyframes leafSway { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
                    @keyframes stemWobble { 0%,100%{transform:rotate(-1.5deg)} 50%{transform:rotate(1.5deg)} }
                    @keyframes earWiggleL { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(2deg)} }
                    @keyframes earWiggleR { 0%,100%{transform:rotate(8deg)} 50%{transform:rotate(-2deg)} }
                  `}</style>
                </defs>

                {/* soft glow behind bouquet */}
                <ellipse cx="160" cy="130" rx="110" ry="90" fill="url(#glowOrb)" />

                {/* ── BOUQUET ── */}
                <g style={{ transformOrigin: "160px 200px", animation: "stemWobble 3.5s ease-in-out infinite" }}>
                  {/* stems */}
                  <line x1="160" y1="200" x2="148" y2="130" stroke="#5a8a3a" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="160" y1="200" x2="160" y2="118" stroke="#5a8a3a" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="160" y1="200" x2="173" y2="128" stroke="#5a8a3a" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="160" y1="200" x2="138" y2="140" stroke="#4a7a2a" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="160" y1="200" x2="182" y2="140" stroke="#4a7a2a" strokeWidth="2" strokeLinecap="round"/>

                  {/* leaves */}
                  <g style={{ transformOrigin: "148px 155px", animation: "leafSway 2.8s ease-in-out infinite" }}>
                    <ellipse cx="140" cy="155" rx="14" ry="7" fill="#6aaa45" transform="rotate(-30 140 155)"/>
                  </g>
                  <g style={{ transformOrigin: "173px 153px", animation: "leafSway 3.1s ease-in-out infinite 0.4s" }}>
                    <ellipse cx="181" cy="153" rx="13" ry="7" fill="#78b84e" transform="rotate(30 181 153)"/>
                  </g>
                  <g style={{ transformOrigin: "135px 145px", animation: "leafSway 2.6s ease-in-out infinite 0.8s" }}>
                    <ellipse cx="128" cy="148" rx="11" ry="6" fill="#5a9a38" transform="rotate(-45 128 148)"/>
                  </g>

                  {/* wrap ribbon */}
                  <path d="M148,198 Q160,188 172,198 L168,212 Q160,208 152,212 Z" fill="#e8c4f0" opacity="0.85"/>
                  <path d="M153,198 Q160,192 167,198" stroke="#c890d8" strokeWidth="1" fill="none"/>

                  {/* flower 1 — center big pink */}
                  <g>
                    {[0,60,120,180,240,300].map((a,i)=>(
                      <ellipse key={i} cx={160+Math.cos(a*Math.PI/180)*13} cy={118+Math.sin(a*Math.PI/180)*13}
                        rx="9" ry="6" fill={i%2===0?"#ffb8d8":"#ffd0e8"}
                        transform={`rotate(${a} ${160+Math.cos(a*Math.PI/180)*13} ${118+Math.sin(a*Math.PI/180)*13})`}/>
                    ))}
                    <circle cx="160" cy="118" r="9" fill="#ffe066"/>
                    <circle cx="160" cy="118" r="5" fill="#ffcc00"/>
                    {[0,90,180,270].map((a,i)=>(
                      <circle key={i} cx={160+Math.cos(a*Math.PI/180)*6} cy={118+Math.sin(a*Math.PI/180)*6} r="1.5" fill="#ff8800" opacity="0.7"/>
                    ))}
                  </g>

                  {/* flower 2 — left white daisy */}
                  <g>
                    {[0,45,90,135,180,225,270,315].map((a,i)=>(
                      <ellipse key={i} cx={138+Math.cos(a*Math.PI/180)*11} cy={133+Math.sin(a*Math.PI/180)*11}
                        rx="7" ry="4" fill="white" opacity="0.92"
                        transform={`rotate(${a} ${138+Math.cos(a*Math.PI/180)*11} ${133+Math.sin(a*Math.PI/180)*11})`}/>
                    ))}
                    <circle cx="138" cy="133" r="7" fill="#ffe566"/>
                    <circle cx="138" cy="133" r="4" fill="#ffcc00"/>
                  </g>

                  {/* flower 3 — right orange */}
                  <g>
                    {[0,60,120,180,240,300].map((a,i)=>(
                      <ellipse key={i} cx={182+Math.cos(a*Math.PI/180)*12} cy={131+Math.sin(a*Math.PI/180)*12}
                        rx="8" ry="5" fill={i%2===0?"#ffb04a":"#ffcf78"}
                        transform={`rotate(${a} ${182+Math.cos(a*Math.PI/180)*12} ${131+Math.sin(a*Math.PI/180)*12})`}/>
                    ))}
                    <circle cx="182" cy="131" r="7.5" fill="#ff8c22"/>
                    <circle cx="182" cy="131" r="4" fill="#ff6a00"/>
                  </g>

                  {/* flower 4 — far left small lavender */}
                  <g>
                    {[0,72,144,216,288].map((a,i)=>(
                      <ellipse key={i} cx={130+Math.cos(a*Math.PI/180)*9} cy={146+Math.sin(a*Math.PI/180)*9}
                        rx="6.5" ry="4" fill="#d4aaff"
                        transform={`rotate(${a} ${130+Math.cos(a*Math.PI/180)*9} ${146+Math.sin(a*Math.PI/180)*9})`}/>
                    ))}
                    <circle cx="130" cy="146" r="6" fill="#b388ee"/>
                    <circle cx="130" cy="146" r="3" fill="#9c6fdc"/>
                  </g>

                  {/* flower 5 — far right small coral */}
                  <g>
                    {[0,72,144,216,288].map((a,i)=>(
                      <ellipse key={i} cx={190+Math.cos(a*Math.PI/180)*9} cy={144+Math.sin(a*Math.PI/180)*9}
                        rx="6" ry="4" fill="#ffaaaa"
                        transform={`rotate(${a} ${190+Math.cos(a*Math.PI/180)*9} ${144+Math.sin(a*Math.PI/180)*9})`}/>
                    ))}
                    <circle cx="190" cy="144" r="5.5" fill="#ff7a7a"/>
                    <circle cx="190" cy="144" r="2.5" fill="#ee4444"/>
                  </g>

                  {/* floating petals */}
                  <ellipse cx="145" cy="105" rx="5" ry="3" fill="#ffb8d8" opacity="0" style={{ animation: "floatPetal 3.2s ease-in-out infinite 0.5s" }} transform="rotate(20 145 105)"/>
                  <ellipse cx="175" cy="108" rx="4" ry="2.5" fill="#ffe566" opacity="0" style={{ animation: "floatPetal2 3.8s ease-in-out infinite 1.2s" }} transform="rotate(-15 175 108)"/>
                  <ellipse cx="130" cy="118" rx="4" ry="2.5" fill="#d4aaff" opacity="0" style={{ animation: "floatPetal 4.1s ease-in-out infinite 2s" }} transform="rotate(35 130 118)"/>
                </g>

                {/* ── LEFT ORANGE CAT ── */}
                <g style={{ animation: "catBreathL 2.8s ease-in-out infinite", transformOrigin: "95px 210px" }}>
                  {/* tail */}
                  <g style={{ transformOrigin: "105px 215px", animation: "tailSwayL 2.2s ease-in-out infinite" }}>
                    <path d="M105,215 Q82,205 78,190 Q75,178 85,175" stroke="#e07828" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    <path d="M85,175 Q88,170 83,168" stroke="#e07828" strokeWidth="5" fill="none" strokeLinecap="round"/>
                  </g>
                  {/* body */}
                  <ellipse cx="95" cy="218" rx="22" ry="18" fill="#f08830"/>
                  {/* tummy */}
                  <ellipse cx="95" cy="222" rx="13" ry="11" fill="#ffd090" opacity="0.75"/>
                  {/* front paws */}
                  <ellipse cx="82" cy="233" rx="7" ry="5" fill="#e07828"/>
                  <ellipse cx="108" cy="233" rx="7" ry="5" fill="#e07828"/>
                  <ellipse cx="82" cy="235" rx="5" ry="3" fill="#ffd090" opacity="0.6"/>
                  <ellipse cx="108" cy="235" rx="5" ry="3" fill="#ffd090" opacity="0.6"/>
                  {/* neck */}
                  <ellipse cx="95" cy="204" rx="13" ry="9" fill="#f08830"/>
                  {/* head */}
                  <circle cx="95" cy="192" r="18" fill="#f08830"/>
                  {/* ears */}
                  <g style={{ transformOrigin: "83px 178px", animation: "earWiggleL 3s ease-in-out infinite" }}>
                    <polygon points="83,178 75,162 91,167" fill="#f08830"/>
                    <polygon points="83,178 78,166 89,169" fill="#ffb8a0" opacity="0.7"/>
                  </g>
                  <g style={{ transformOrigin: "107px 178px", animation: "earWiggleR 3.3s ease-in-out infinite 0.3s" }}>
                    <polygon points="107,178 99,162 115,167" fill="#f08830"/>
                    <polygon points="107,178 102,166 113,169" fill="#ffb8a0" opacity="0.7"/>
                  </g>
                  {/* stripes */}
                  <path d="M80,185 Q88,182 82,179" stroke="#c05e10" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
                  <path d="M110,185 Q102,182 108,179" stroke="#c05e10" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
                  <path d="M92,177 Q95,172 98,177" stroke="#c05e10" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                  {/* eyes — looking at right cat (slightly right) */}
                  <ellipse cx="91" cy="191" rx="4.5" ry="4.5" fill="white"/>
                  <ellipse cx="101" cy="191" rx="4.5" ry="4.5" fill="white"/>
                  <ellipse cx="92.5" cy="191" rx="2.8" ry="3" fill="#2a1a00"/>
                  <ellipse cx="102.5" cy="191" rx="2.8" ry="3" fill="#2a1a00"/>
                  <circle cx="93.2" cy="190" r="1" fill="white"/>
                  <circle cx="103.2" cy="190" r="1" fill="white"/>
                  {/* nose */}
                  <ellipse cx="95" cy="196" rx="2.5" ry="1.8" fill="#ff8888"/>
                  {/* whiskers */}
                  <line x1="78" y1="194" x2="91" y2="196" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="78" y1="197" x2="91" y2="197" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="112" y1="194" x2="99" y2="196" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="112" y1="197" x2="99" y2="197" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  {/* mouth */}
                  <path d="M93,198 Q95,200 97,198" stroke="#c05555" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  {/* blush */}
                  <ellipse cx="84" cy="197" rx="5" ry="3" fill="#ffaaaa" opacity="0.35"/>
                  <ellipse cx="106" cy="197" rx="5" ry="3" fill="#ffaaaa" opacity="0.35"/>
                </g>

                {/* ── RIGHT ORANGE CAT ── */}
                <g style={{ animation: "catBreathR 3.1s ease-in-out infinite 0.4s", transformOrigin: "225px 210px" }}>
                  {/* tail */}
                  <g style={{ transformOrigin: "215px 215px", animation: "tailSwayR 2.5s ease-in-out infinite 0.2s" }}>
                    <path d="M215,215 Q238,205 242,190 Q245,178 235,175" stroke="#d06820" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    <path d="M235,175 Q232,170 237,168" stroke="#d06820" strokeWidth="5" fill="none" strokeLinecap="round"/>
                  </g>
                  {/* body */}
                  <ellipse cx="225" cy="218" rx="22" ry="18" fill="#e87820"/>
                  {/* tummy */}
                  <ellipse cx="225" cy="222" rx="13" ry="11" fill="#ffd090" opacity="0.75"/>
                  {/* front paws */}
                  <ellipse cx="212" cy="233" rx="7" ry="5" fill="#d06820"/>
                  <ellipse cx="238" cy="233" rx="7" ry="5" fill="#d06820"/>
                  <ellipse cx="212" cy="235" rx="5" ry="3" fill="#ffd090" opacity="0.6"/>
                  <ellipse cx="238" cy="235" rx="5" ry="3" fill="#ffd090" opacity="0.6"/>
                  {/* neck */}
                  <ellipse cx="225" cy="204" rx="13" ry="9" fill="#e87820"/>
                  {/* head */}
                  <circle cx="225" cy="192" r="18" fill="#e87820"/>
                  {/* ears */}
                  <g style={{ transformOrigin: "213px 178px", animation: "earWiggleL 2.8s ease-in-out infinite 0.5s" }}>
                    <polygon points="213,178 205,162 221,167" fill="#e87820"/>
                    <polygon points="213,178 208,166 219,169" fill="#ffb8a0" opacity="0.7"/>
                  </g>
                  <g style={{ transformOrigin: "237px 178px", animation: "earWiggleR 3.1s ease-in-out infinite 0.8s" }}>
                    <polygon points="237,178 229,162 245,167" fill="#e87820"/>
                    <polygon points="237,178 232,166 243,169" fill="#ffb8a0" opacity="0.7"/>
                  </g>
                  {/* stripes */}
                  <path d="M210,185 Q218,182 212,179" stroke="#a04800" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
                  <path d="M240,185 Q232,182 238,179" stroke="#a04800" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
                  <path d="M222,177 Q225,172 228,177" stroke="#a04800" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                  {/* eyes — looking at left cat */}
                  <ellipse cx="219" cy="191" rx="4.5" ry="4.5" fill="white"/>
                  <ellipse cx="231" cy="191" rx="4.5" ry="4.5" fill="white"/>
                  <ellipse cx="218.5" cy="191" rx="2.8" ry="3" fill="#2a1a00"/>
                  <ellipse cx="230.5" cy="191" rx="2.8" ry="3" fill="#2a1a00"/>
                  <circle cx="219.2" cy="190" r="1" fill="white"/>
                  <circle cx="231.2" cy="190" r="1" fill="white"/>
                  {/* nose */}
                  <ellipse cx="225" cy="196" rx="2.5" ry="1.8" fill="#ff8888"/>
                  {/* whiskers */}
                  <line x1="208" y1="194" x2="221" y2="196" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="208" y1="197" x2="221" y2="197" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="242" y1="194" x2="229" y2="196" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  <line x1="242" y1="197" x2="229" y2="197" stroke="#fff" strokeWidth="1" opacity="0.7"/>
                  {/* mouth */}
                  <path d="M223,198 Q225,200 227,198" stroke="#c05555" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  {/* blush */}
                  <ellipse cx="214" cy="197" rx="5" ry="3" fill="#ffaaaa" opacity="0.35"/>
                  <ellipse cx="236" cy="197" rx="5" ry="3" fill="#ffaaaa" opacity="0.35"/>
                </g>

                {/* tiny heart between cats */}
                <text x="157" y="208" fontSize="13" textAnchor="middle" style={{ animation: "hanaSparkle 2s ease-in-out infinite" }}>🧡</text>
              </svg>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#2c1f0e", fontSize: "clamp(1.5rem,4vw,2.2rem)", marginBottom: 14, textShadow: "none", fontFamily: "'Special Elite', 'Courier New', monospace" }}>
              Our conversations
            </h2>
          </div>
        </Fade>

        {/* Stat cards */}
        <Fade delay={0.1}>
          <style>{`
            @media (max-width: 480px) {
              .stat-card-last { grid-column: 1 / -1 !important; }
            }
          `}</style>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <div key={i} className={i === 2 ? "stat-card-last" : ""} style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(160,130,80,0.35)",
                borderRadius: 4,
                padding: "22px 18px",
                textAlign: "center",
                boxShadow: "2px 3px 12px rgba(100,70,30,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
                transition: "transform 0.2s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem,4vw,1.7rem)", fontWeight: 700, color: "#2c1f0e", marginBottom: 4, fontFamily: "'Special Elite', 'Courier New', monospace", letterSpacing: "-0.01em" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(80,55,20,0.65)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Courier New', monospace" }}>{s.label}</div>
                {s.sub && <div style={{ fontSize: "0.72rem", color: "rgba(100,70,30,0.6)", fontStyle: "italic", fontFamily: "'Special Elite', 'Courier New', monospace" }}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </Fade>

        {/* Fun facts */}
        <Fade delay={0.15}>
          <div style={{ marginBottom: 40 }}>
            {funFacts.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "14px 0",
                borderBottom: i < funFacts.length - 1 ? "1px solid rgba(220,80,160,0.1)" : "none",
              }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>{f.emoji}</span>
                <p style={{ margin: 0, color: "rgba(255,200,230,0.8)", fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic", fontFamily: "'Lora', serif" }}>{f.text}</p>
              </div>
            ))}
          </div>
        </Fade>

        {/* Toggle button */}
        <Fade delay={0.2}>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleButtonClick}
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1.5px solid rgba(140,100,50,0.45)",
                color: "#2c1f0e",
                fontFamily: "'Special Elite', 'Courier New', monospace",
                fontStyle: "normal",
                fontSize: "1rem",
                padding: "14px 36px",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: "2px 3px 8px rgba(100,70,30,0.15)",
                letterSpacing: "0.06em",
                transition: "all 0.3s ease",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "3px 4px 14px rgba(100,70,30,0.22)"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "2px 3px 8px rgba(100,70,30,0.15)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <span>💬</span>
              <span>Read our conversations</span>
            </button>
          </div>
        </Fade>

        {/* Password Modal */}
        {showPasswordPrompt && (
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{
              position: "relative",
              background: "linear-gradient(135deg, #f8ead8 0%, #f2e0c8 25%, #f5e3cc 50%, #f0ddc5 75%, #f6e5d0 100%)",
              borderRadius: 16,
              padding: "36px 32px",
              width: "100%",
              maxWidth: 420,
              boxShadow: "0 20px 60px rgba(100,70,40,0.3), 0 0 0 1px rgba(160,120,80,0.2)",
              overflow: "hidden"
            }}>
              {/* Crumble texture overlay */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `
                radial-gradient(ellipse 200px 100px at 20% 30%, rgba(160,120,80,0.15) 20%, transparent 70%),
                radial-gradient(ellipse 180px 90px at 75% 25%, rgba(150,110,70,0.12) 20%, transparent 70%),
                radial-gradient(ellipse 190px 95px at 40% 70%, rgba(155,115,75,0.14) 20%, transparent 70%)
              `, zIndex: 0 }} />
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `
                radial-gradient(ellipse 170px 85px at 30% 20%, rgba(255,248,235,0.4) 25%, transparent 75%),
                radial-gradient(ellipse 160px 80px at 70% 60%, rgba(255,250,238,0.35) 25%, transparent 75%)
              `, zIndex: 0 }} />
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23grain)' opacity='0.12'/%3E%3C/svg%3E\")", mixBlendMode: "multiply", opacity: 0.6, zIndex: 0 }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔒</div>
                  <p style={{
                    color: "#8a6a3a",
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    marginBottom: 0,
                    fontFamily: "'Special Elite', 'Courier New', monospace"
                  }}>Hint: The name I call you most & how I've saved your contact 🌸</p>
                </div>

                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: 10,
                      border: error ? "2px solid rgba(200,80,60,0.5)" : "1.5px solid rgba(160,120,80,0.3)",
                      background: "rgba(255,250,240,0.6)",
                      color: "#5a4a2a",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                      marginBottom: 16,
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "inset 0 2px 4px rgba(100,70,40,0.1)"
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.target.style.border = "2px solid rgba(212,168,67,0.6)";
                        e.target.style.background = "rgba(255,252,245,0.8)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!error) {
                        e.target.style.border = "1.5px solid rgba(160,120,80,0.3)";
                        e.target.style.background = "rgba(255,250,240,0.6)";
                      }
                    }}
                  />
                  
                  {error && (
                    <p style={{
                      color: "#c85050",
                      fontSize: "0.85rem",
                      marginBottom: 12,
                      marginTop: -8,
                      fontStyle: "italic",
                      fontFamily: "'Playfair Display',serif"
                    }}>Incorrect password. Try again! 💛</p>
                  )}

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "13px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #d4a843 0%, #c99a38 100%)",
                      border: "1.5px solid rgba(180,140,60,0.4)",
                      color: "#3a2a10",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(212,168,67,0.25)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #e0b84f 0%, #d5a640 100%)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(212,168,67,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #d4a843 0%, #c99a38 100%)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(212,168,67,0.25)";
                    }}
                  >
                    Enter
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      flex: 1,
                      padding: "13px",
                      borderRadius: 10,
                      background: "rgba(160,120,80,0.15)",
                      border: "1.5px solid rgba(140,100,60,0.3)",
                      color: "#6a5a3a",
                      cursor: "pointer",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(100,70,40,0.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(160,120,80,0.25)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(100,70,40,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(160,120,80,0.15)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(100,70,40,0.15)";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
