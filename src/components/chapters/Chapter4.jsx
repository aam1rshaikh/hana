import Fade from "../ui/Fade";
import ChapterBloom from "../ui/ChapterBloom";
import CursedGlow from "../ui/CursedGlow";
import Chapter3Stars from "../effects/Chapter3Stars";

export default function Chapter4() {
  return (
    <div id="chapter-4" style={{ background: "linear-gradient(180deg,#0d0d1a 0%,#12122a 40%,#1a1a3a 70%,#0f0f20 100%)", padding: "80px 20px", position: "relative", overflow: "hidden" }}>
      <Chapter3Stars />
      {/* Moon */}
      <div style={{ position: "absolute", top: "8%", right: "8%", width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#fffde0,#f5e090)", boxShadow: "0 0 30px 10px rgba(255,240,150,0.2)", opacity: 0.85, pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <ChapterBloom><CursedGlow><p style={{ fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,182,193,0.7)", marginBottom: 12 }}>Chapter Four</p></CursedGlow></ChapterBloom>
        <Fade delay={0.1}><h2 style={{ color: "white", fontFamily: "'Playfair Display',serif", fontStyle: "italic", textShadow: "0 0 30px rgba(255,182,193,0.3)" }}>Everything the Quiet Holds</h2></Fade>

        <Fade delay={0.2}><p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.95 }}>How have you been ma'am. I wanna know about you, how you are, how you are doing. How the days have been lately. How was the Ramadan. if you are taking care of yourself ma'am. How the work is now a days, everything about you. It always feels that there is something missing and incomplete knowing that I don't know about all this. I always pray for your happiness and wellbeing and hope that you are doing okay.</p></Fade>
        <Fade delay={0.2}><p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.95 }}>I miss you ma'am, a lot. There is not just a single aspect that I miss about you. It's not that I just miss the conversations that we used to have all the time — I miss you, everything about you, the warmth, the love and the care that we had for each other.</p></Fade>
        <Fade delay={0.1}><p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.95 }}>I miss you whenever I see the moon or when I see the beautiful sunset or the beautiful sky. I miss you daily, not only when I am alone doing nothing but also when I am surrounded by people all around. It's just that nothing feels good without you.</p></Fade>

        <Fade delay={0.1}>
          <div style={{ margin: "36px 0", padding: "22px 28px", borderLeft: "3px solid rgba(255,182,193,0.5)", background: "rgba(255,182,193,0.06)", borderRadius: "0 12px 12px 0" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,220,230,0.9)", margin: 0, lineHeight: 1.9 }}>It was not just the attachment. Attachment fades with time but it's the love which never fades. The love still gives me hope and makes me hold onto you.</p>
          </div>
        </Fade>

        <Fade delay={0.1}><p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.95 }}>I love you so much. I love everything about you. Never did I have the feeling that you are not enough for me. You are not unlovable — you deserve all the love and happiness in this world. Believe me when I say this ma'am.</p></Fade>

        <Fade delay={0.1}>
          <div style={{ margin: "36px 0", padding: "22px 28px", borderLeft: "3px solid rgba(212,168,67,0.5)", background: "rgba(212,168,67,0.06)", borderRadius: "0 12px 12px 0" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,235,180,0.9)", margin: 0, lineHeight: 1.9 }}>What will I do with the whole garden if my favourite flower isn't there.</p>
          </div>
        </Fade>

        <Fade delay={0.1}><p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.95 }}>We have already done the hardest part, which was finding each other among millions of people. Now let's do one more thing and never lose each other.</p></Fade>

        <Fade delay={0.1}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,182,193,0.8)", marginTop: 32, lineHeight: 1.85 }}>
            Kya hi hoga mera tumhare bina 🥺
          </p>
        </Fade>

        <div style={{ textAlign: "center", fontSize: "1.6rem", color: "rgba(212,168,67,0.4)", margin: "10px 0", letterSpacing: 10 }}>· · ·</div>
      </div>
    </div>
  );
}
