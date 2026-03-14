export const globalCss = `
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;-webkit-tap-highlight-color:transparent;}
  body{font-family:'Lora',serif;background:#fef9f0;color:#2c1810;overflow-x:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeSpeed;overscroll-behavior-y:none;}
  h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-style:italic;margin-bottom:24px;color:#2c1810;line-height:1.2;}
  p{font-size:1.03rem;line-height:1.95;color:#6b4c3b;margin-bottom:16px;}
  img{max-width:100%;height:auto;}
  button{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
  input,textarea{-webkit-tap-highlight-color:transparent;}
  .section-gpu{contain:layout style;transform:translateZ(0);}
  .section-offscreen{content-visibility:auto;contain-intrinsic-size:0 600px;}
  @keyframes sunPulse{0%,100%{box-shadow:0 0 60px 20px rgba(249,216,72,0.4);}50%{box-shadow:0 0 80px 30px rgba(249,216,72,0.6);}}
  @keyframes drift{from{transform:translate3d(0,0,0);}to{transform:translate3d(110vw,0,0);}}
  @keyframes blink{0%,100%{opacity:0.2;}50%{opacity:1;}}
  @keyframes catFloat{0%,100%{transform:translate3d(0,0,0);}50%{transform:translate3d(0,-6px,0);}}
  @keyframes catBlink{0%,90%,100%{height:8px;}93%,97%{height:1px;}}
  @keyframes tailWag{0%,100%{transform:rotate(-15deg);}50%{transform:rotate(15deg);}}
  @keyframes totoroBob{0%,100%{transform:translate3d(0,0,0);}50%{transform:translate3d(0,-8px,0);}}
  @keyframes fadeUp{from{opacity:0;transform:translate3d(0,30px,0);}to{opacity:1;transform:translate3d(0,0,0);}}
  @keyframes bounce{0%,100%{transform:translate3d(-50%,0,0);}50%{transform:translate3d(-50%,8px,0);}}
  @keyframes fly{0%{transform:translate3d(0,0,0);opacity:0;}25%{opacity:1;}75%{opacity:0.8;}100%{transform:translate3d(30px,-40px,0);opacity:0;}}
  @keyframes wave1{0%,100%{transform:translate3d(0,0,0) scaleY(1);}50%{transform:translate3d(-18px,0,0) scaleY(1.12);}}
  @keyframes shimmer{0%,100%{text-shadow:0 0 18px rgba(255,182,193,0.5),0 0 40px rgba(255,182,193,0.2);}50%{text-shadow:0 0 28px rgba(255,182,193,0.9),0 0 60px rgba(255,182,193,0.4);}}
  @keyframes skeletonSlide{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
  @keyframes steam{0%{transform:translate3d(0,0,0) scale(1);opacity:0.4;}50%{transform:translate3d(0,-12px,0) scale(1.3);opacity:0.6;}100%{transform:translate3d(0,-24px,0) scale(1.6);opacity:0;}}
  @keyframes swipeHintFade{0%{opacity:1;}70%{opacity:1;}100%{opacity:0;}}
  @keyframes hintSwipe{0%{transform:translate3d(0,0,0);}30%{transform:translate3d(-18px,0,0);}60%{transform:translate3d(14px,0,0);}100%{transform:translate3d(0,0,0);}}
  @keyframes hintPulseL{0%,100%{opacity:0.4;}50%{opacity:1;transform:translate3d(-4px,0,0);}}
  @keyframes hintPulseR{0%,100%{opacity:0.4;}50%{opacity:1;transform:translate3d(4px,0,0);}}
  @keyframes fadeIn{from{opacity:0;transform:translate3d(0,10px,0);}to{opacity:1;transform:translate3d(0,0,0);}}
  @keyframes cursedPulse{0%,100%{opacity:0.7;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.12);}}
  @keyframes cursedLine{0%,100%{opacity:0.4;transform:scaleX(0.8);}50%{opacity:1;transform:scaleX(1.05);}}
  @keyframes hanaSparkle{0%,100%{color:white;text-shadow:0 0 20px rgba(255,182,193,0.4);}30%{color:#ffd6e8;text-shadow:0 0 30px rgba(255,182,193,1),0 0 60px rgba(255,182,193,0.6),0 0 100px rgba(255,150,180,0.4);}60%{color:#ffe8f0;text-shadow:0 0 15px rgba(255,182,193,0.6);}}
  @keyframes chapterBloom{from{opacity:0;filter:blur(12px) brightness(2);}to{opacity:1;filter:blur(0) brightness(1);}}
  @keyframes heartFloat{0%{opacity:1;transform:translate3d(0,0,0) scale(1.2);}30%{opacity:0.9;transform:translate3d(calc(var(--dx)*0.4),-20px,0) scale(1);}100%{opacity:0;transform:translate3d(var(--dx),-65px,0) scale(0.3);}}
  @keyframes dustRise{0%{transform:translate3d(0,105vh,0) scale(0.6);opacity:0;}8%{opacity:1;}90%{opacity:0.7;}100%{transform:translate3d(var(--drift),calc(-8vh),0) scale(1.1);opacity:0;}}
  @keyframes starShoot{0%{transform:translate3d(0,0,0) scale(1) rotate(0deg);opacity:1;}100%{transform:translate3d(var(--sx),var(--sy),0) scale(0) rotate(var(--sr));opacity:0;}}
  @keyframes trailDot{0%{transform:translate3d(0,0,0) scale(0);opacity:0;}20%{transform:translate3d(calc(var(--sx)*0.35),calc(var(--sy)*0.35),0) scale(1.1);opacity:1;}100%{transform:translate3d(var(--sx),var(--sy),0) scale(0);opacity:0;}}
  .dream-grid{display:grid;gap:22px;grid-template-columns:1fr;}
  @media(min-width:600px){.dream-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:900px){.dream-grid{grid-template-columns:repeat(4,1fr);}}
  .dream-grid>div{height:100%;}
  .dream-grid>div>div{height:100%;}
`;
