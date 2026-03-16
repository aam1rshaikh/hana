// chapters/Chapter1.jsx
import Fade from "../ui/Fade";
import ChapterBloom from "../ui/ChapterBloom";
import CursedGlow from "../ui/CursedGlow";
import WaveDivider from "../ui/WaveDivider";

export default function Chapter1() {
  return (
    <>
      <WaveDivider fill="#fef9f0" />
      <div id="chapter-1" style={{ background: "#fef9f0", marginTop: -2 }}>
        <div style={{ padding: "80px 20px", maxWidth: 860, margin: "0 auto" }}>
          <ChapterBloom><CursedGlow><p style={{ fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d4a843", marginBottom: 12 }}>Chapter One</p></CursedGlow></ChapterBloom>
          <Fade delay={0.1}><h2>How it all began — and what it became</h2></Fade>
          <Fade delay={0.2}><p>1st May 2023, the day I first texted you on WhatsApp. The conversation was short and it was over quickly. And then 13th October 2023, the day I found you on Instagram. I sent a follow request, you accepted and I sent the very first text on 14th October 2023, <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8B5E3C", fontWeight: 600 }}>"Hey, How are you doing?"</em></p></Fade>
          <Fade delay={0.25}><p>You said you were thinking what if I was angry for the abrupt closure on WhatsApp. But I told you, that it was understandable cause we barely knew each other.</p></Fade>
          <Fade delay={0.3}><p>We just started talking casually about our days, about our likes, about ourselves, trying to know each other without any expectations. Gradually, we felt peace and it became a habit to check on each other, and to know everything about each other — from favourite colour, to what drinks we like to that momos shop in Versova where you wanted to take me with you and the cat café where I wanted to go with you. We started planning on things that we would do when we meet without forcing each other. It all felt like a dream but it was peaceful, like it changed something from within.</p></Fade>
          <Fade delay={0.1}><p>Things were not smooth always, you had your struggles but you always made things work with your strength and determination. I was just trying to be there for you like you were there for me. Things happened, but we always found our ways back to each other. You said it was difficult for you to trust but I was changing perceptions and that I am a peaceful part of life that you always want to go back to. That day, I made a promise to myself that I will never break your trust and will always hold on to you no matter what. You gave me peace too and you became my happy place and home.</p></Fade>
          <Fade delay={0.1}><p>When you changed job and it was for the first time that you had to do night shift, I was worried. But you were strong and you handled it with courage and you made it work. Even though our entire schedule changed but we still found time for each other and we used to be happiest when we were talking.</p></Fade>
          <Fade delay={0.1}><p>I never pushed you to meet because I was respecting you, your beliefs, your comfort, your pace. That was not fear on my end, not really. The fear went away the moment I thought: we will meet when the time is right, and we will. That certainty was enough. That was how much I trusted what we had.</p></Fade>
          <Fade delay={0.1}><p>I remember the first letter that you sent me, titled <em style={{ color: "#8B5E3C" }}>"He"</em> — I was so happy to read it as if I was on the clouds. 9th January 2024, the first time I confessed that I liked you, and you said you liked me too. I was the happiest that day. Life became so beautiful from the time we met each other. And from that point, I became a version of myself I had never been before. Someone softer, more open, more alive. Someone I genuinely liked being.</p></Fade>
          <div style={{ textAlign: "center", fontSize: "1.6rem", color: "#d4a843", opacity: 0.45, margin: "10px 0", letterSpacing: 10 }}>· · ·</div>
        </div>
      </div>

      {/* QUOTE 1 */}
      <Fade>
        <div style={{ padding: "44px 20px", textAlign: "center", background: "#5a8c4a" }}>
          <blockquote style={{ maxWidth: 600, margin: "0 auto", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.85, color: "#fef9f0" }}>
            "We were the first thing in the morning and the last thing before sleep for each other — that is not a habit. That is a home."
            <cite style={{ display: "block", marginTop: 12, fontSize: "0.78rem", letterSpacing: "0.15em", fontStyle: "normal", opacity: 0.55 }}> — 🌻🌻🌻</cite>
          </blockquote>
        </div>
      </Fade>
    </>
  );
}
