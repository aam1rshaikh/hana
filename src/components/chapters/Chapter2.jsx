import Fade from "../ui/Fade";
import ChapterBloom from "../ui/ChapterBloom";
import CursedGlow from "../ui/CursedGlow";

export default function Chapter2() {
  return (
    <div id="chapter-2" style={{ background: "linear-gradient(180deg,#c8eaf5 0%,#d8f0d0 38%,#a8cc88 65%,#7aaa60 100%)", padding: "80px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: "-10%", right: "-10%", height: "55%", background: "radial-gradient(ellipse 80% 60% at 20% 100%,#5a9040 0%,transparent 60%),radial-gradient(ellipse 70% 55% at 80% 100%,#4a8030 0%,transparent 55%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <ChapterBloom><CursedGlow><p style={{ fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d4a843", marginBottom: 12 }}>Chapter Two</p></CursedGlow></ChapterBloom>
        <Fade delay={0.1}><h2>A Sound Like Falling Into Something Warm</h2></Fade>
        <Fade delay={0.2}><p>One random night, I saw a missed call from your number and then I called you back and you answered the call. I heard your voice for the first time. I was so happy, it gave me butterflies after hearing your beautiful voice. Then slowly we started talking more on calls for hours without even realising. Either we were doing some work or talking to each other and it always felt less. The time used to fly so fast when we were talking. Now, everything has slowed down. Every day feels like it is stretched and night feels the quietest it has ever been.</p></Fade>
        <Fade delay={0.1}><p>We started watching movies and series together, playing games, cup pong, ludo and paintball. I know I used to be all talking and nagging while playing. You didn't like that but still you played happily every time with me 😌.</p></Fade>
        <Fade delay={0.1}><p>We used to talk endlessly about random topics, about us, about our plans, about things we would do together. Those hours felt different, like the world had gone quiet and it was just us. I liked the way you used to say <em style={{ color: "#8B5E3C" }}>"shut up"</em> sometimes like it is the warmest thing. We always made sure that we are there for each other, whenever we were happy or when something exciting or good happens. Even if we aren't feeling well or if there is something that's bothering us, whether it's a work problem or if we are feeling low or anything, we were always there for each other. And it used to make us feel heard and calm. I was so happy to have you — someone I could share everything with, where I didn't have to pretend or be performative. I could be vulnerable and still it would be okay, cause I know you are there for me.</p></Fade>
        <Fade delay={0.1}><p>I remember whenever I used to go anywhere or I had to take late night flights, how you always used to be awake for me and used to make sure that I reached safely and how you used to be on the call with me till the end. I used to feel so happy and lucky that you were always there. That's what love is.</p></Fade>
        <Fade delay={0.1}><p>Every morning, we talked first. Every night before I went to sleep, it was you. Not sometimes. Not usually. Every single day, for so long. That is not a coincidence. That is choosing someone, over and over.</p></Fade>
        <Fade delay={0.1}><p>You said the right person will appreciate your efforts. Hana, if I was not being appreciated, I would never have gotten this attached. I would have felt it. I knew and I know one thing with complete certainty — you are the right person for me. That is why I never hesitated showing you all the love and care I had. That is why I shared every vulnerability, every fear, every quiet thing. Because you were my safe place. You still are. You are my home.</p></Fade>
        <div style={{ textAlign: "center", fontSize: "1.6rem", color: "#d4a843", opacity: 0.45, margin: "10px 0", letterSpacing: 10 }}>· · ·</div>
      </div>
    </div>
  );
}
