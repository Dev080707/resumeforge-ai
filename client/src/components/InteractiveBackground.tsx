import { useEffect, useRef } from "react";

/**
 * Fixed, full-screen decorative background: a fine dot grid with a soft
 * spotlight that follows the cursor. Pure appearance — pointer-events-none
 * so it never intercepts clicks, and sits behind all page content (-z-10).
 * Mouse position is written directly to CSS custom properties on the
 * container (not React state) so it doesn't trigger re-renders.
 */
export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      containerRef.current?.style.setProperty("--x", `${e.clientX}px`);
      containerRef.current?.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-black"
      style={{ ["--x" as string]: "50%", ["--y" as string]: "50%" }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle, #a1a1aa 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* cursor spotlight — light mode */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: "radial-gradient(560px circle at var(--x) var(--y), rgba(0,0,0,0.07), transparent 42%)",
        }}
      />
      {/* cursor spotlight — dark mode */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "radial-gradient(560px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 42%)",
        }}
      />
    </div>
  );
}
