export default function AnimeCat({style={}}) {
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
