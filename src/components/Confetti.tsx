import React, { useEffect } from "react";

// Lightweight confetti using DOM elements (no external deps)
const Confetti: React.FC<{ count?: number; durationMs?: number }> = ({
  count = 40,
  durationMs = 1800,
}) => {
  useEffect(() => {
    // Play celebration sound - crowd cheering and applause
    const audio = new Audio('https://opengameart.org/sites/default/files/Audience%20Applause-SoundBible.com-304513609.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Ignore if audio play fails (e.g., browser policy)
    });

    const root = document.createElement("div");
    root.className = "confetti-root pointer-events-none fixed inset-0 z-[9999]";
    document.body.appendChild(root);

    const colors = ["#f97316", "#fb7185", "#60a5fa", "#34d399", "#a78bfa"];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const size = Math.floor(Math.random() * 10) + 6;
      el.style.width = `${size}px`;
      el.style.height = `${size * 0.6}px`;
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${-Math.random() * 10 - 5}%`;
      el.style.opacity = (0.7 + Math.random() * 0.3).toString();
      el.style.transform = `rotate(${Math.random() * 360}deg)`;

      // random animation durations / delays
      const fall = 1200 + Math.random() * 1000;
      const delay = Math.random() * 300;
      el.style.animation = `confetti-fall ${fall}ms cubic-bezier(.2,.8,.2,1) ${delay}ms forwards, confetti-spin ${
        800 + Math.random() * 800
      }ms linear ${delay}ms forwards`;

      root.appendChild(el);
    }

    const timer = window.setTimeout(() => {
      root.remove();
    }, durationMs + 1200);

    return () => {
      window.clearTimeout(timer);
      if (root.parentNode) root.parentNode.removeChild(root);
    };
  }, [count, durationMs]);

  return null;
};

export default Confetti;
