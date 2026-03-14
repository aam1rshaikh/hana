// Shared singleton fade observer used by Fade and ChapterBloom
export const fadeObserver = typeof IntersectionObserver !== "undefined"
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
