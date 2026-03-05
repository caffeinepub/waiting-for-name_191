import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Settings, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  accent: string;
  glowColor: string;
  tag: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const links: LinkItem[] = [
  {
    id: "1",
    title: "Space",
    description:
      "An unblocking and productivity web app — clear your mind, unlock your flow.",
    url: "https://matter.night.isroot.in/",
    accent: "from-violet-500/20 to-purple-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.19_295/0.4)]",
    tag: "Productivity",
  },
  {
    id: "2",
    title: "DayDream X",
    description:
      "A thinking and daydreaming tool — let your imagination roam free.",
    url: "https://thinking.night.isroot.in/",
    accent: "from-cyan-500/20 to-teal-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.22_190/0.4)]",
    tag: "Thinking",
  },
  {
    id: "3",
    title: "Galaxy V6 Classroom",
    description:
      "A classroom onboarding experience — step into a new way to learn together.",
    url: "https://zoo.alexkrav.se/onboarding/",
    accent: "from-rose-500/20 to-pink-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.75_0.18_340/0.4)]",
    tag: "Classroom",
  },
  {
    id: "4",
    title: "Nebulo OS",
    description:
      "An education + algebra practice OS experience — math as an operating system.",
    url: "https://oknomoreonalittlebit.pyesetz.net/",
    accent: "from-emerald-500/20 to-green-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.2_130/0.4)]",
    tag: "Algebra",
  },
];

// ─── Color Palette ─────────────────────────────────────────────────────────────
const CURSOR_COLORS = [
  { label: "Blue", value: "#3b82f6" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Sky", value: "#0ea5e9" },
  { label: "Indigo", value: "#6366f1" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Magenta", value: "#d946ef" },
  { label: "Pink", value: "#ec4899" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Yellow", value: "#eab308" },
  { label: "Lime", value: "#84cc16" },
  { label: "Green", value: "#22c55e" },
  { label: "Teal", value: "#14b8a6" },
  { label: "White", value: "#ffffff" },
];

// ─── Background Options ────────────────────────────────────────────────────────
const BACKGROUNDS = [
  { id: 0, label: "Starfield", desc: "Twinkling stars in deep space" },
  { id: 1, label: "Neon Grid", desc: "Perspective grid rushing forward" },
  { id: 2, label: "Matrix Rain", desc: "Cascading digital characters" },
  { id: 3, label: "Nebula Drift", desc: "Slow cosmic color clouds" },
  { id: 4, label: "Holo Waves", desc: "Rainbow sine waves shifting" },
  { id: 5, label: "Haunted Static", desc: "TV noise in the dark" },
  { id: 6, label: "Void Spiral", desc: "Rotating spiral into nothingness" },
  { id: 7, label: "Cyber Fog", desc: "Teal mist drifting through dark" },
  { id: 8, label: "Glitch Storm", desc: "Chaotic digital interference" },
  { id: 9, label: "Dark Pulse", desc: "Concentric rings from the deep" },
];

// ─── Motion Variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// ─── CursorFollower ────────────────────────────────────────────────────────────
function CursorFollower({ color }: { color: string }) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trailPos, setTrailPos] = useState({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);

    // Smooth trailing glow
    const animateTrail = () => {
      setTrailPos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.06,
        y: prev.y + (targetRef.current.y - prev.y) * 0.06,
      }));
      rafRef.current = requestAnimationFrame(animateTrail);
    };
    rafRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Large trailing glow */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: trailPos.x,
          top: trailPos.y,
          width: 320,
          height: 320,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color}28 0%, ${color}10 40%, transparent 70%)`,
          filter: "blur(8px)",
          transition: "background 0.4s ease",
        }}
      />
      {/* Sharp cursor dot */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: pos.x,
          top: pos.y,
          width: 10,
          height: 10,
          transform: "translate(-50%, -50%)",
          background: color,
          borderRadius: "50%",
          boxShadow: `0 0 12px 4px ${color}80`,
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </>
  );
}

// ─── AnimatedBackground ────────────────────────────────────────────────────────
function AnimatedBackground({ bgIndex }: { bgIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Canvas-based backgrounds (0,1,2,4,5,6,8,9 need canvas; 3,7 are CSS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    stopRaf();
    timeRef.current = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── 0: Starfield ──────────────────────────────────────────────────────────
    if (bgIndex === 0) {
      const starCount = 200;
      const starData = Array.from({ length: starCount }, (_, i) => ({
        x: ((i * 137.508) % 100) / 100,
        y: ((i * 97.6) % 100) / 100,
        r: ((i * 7 + 3) % 20) / 10 + 0.3,
        twinkle: ((i * 13) % 50) / 100 + 0.05,
        speed: ((i * 3) % 30) / 10000 + 0.001,
        phase: (i * 0.7) % (Math.PI * 2),
      }));

      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        for (const s of starData) {
          const opacity =
            s.twinkle + 0.3 * Math.sin(t * s.speed * 1000 + s.phase);
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, opacity))})`;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 1: Neon Grid ──────────────────────────────────────────────────────────
    if (bgIndex === 1) {
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, 0, W, H);

        const vp = { x: W / 2, y: H * 0.45 };
        const gridLines = 14;
        const speed = 0.4;
        const offset = (t * speed) % 1;

        // Vertical lines
        for (let i = -gridLines / 2; i <= gridLines / 2; i++) {
          const ratio = (i / (gridLines / 2) + 1) / 2;
          const startX = ratio * W;
          const hue = 180 + i * 10;
          const alpha = 0.5 - Math.abs(i / gridLines) * 0.3;
          ctx.beginPath();
          ctx.moveTo(startX, H);
          ctx.lineTo(vp.x, vp.y);
          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Horizontal lines (perspective)
        for (let row = 0; row <= 12; row++) {
          const t2 = ((row / 12 + offset) % 1) ** 2;
          const y = vp.y + (H - vp.y) * t2;
          const alpha = t2 * 0.6;
          const hue = 260 + t2 * 80;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 2: Matrix Rain ─────────────────────────────────────────────────────────
    if (bgIndex === 2) {
      const cols = Math.floor(canvas.width / 16);
      const drops = Array.from(
        { length: cols },
        (_, i) => -Math.floor((i * 7.3) % 30),
      );
      const chars = "アイウエオカキクケコ0123456789ABCDEF";

      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < cols; i++) {
          const charIdx = Math.floor(Math.random() * chars.length);
          const ch = chars[charIdx];
          const x = i * 16 + 8;
          const y = drops[i] * 16;

          // Leading char bright
          ctx.fillStyle = "#00ffcc";
          ctx.font = "13px monospace";
          ctx.fillText(ch, x - 6, y);

          // Trail
          ctx.fillStyle = `rgba(0, 220, 120, ${0.3 + Math.random() * 0.4})`;
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            x - 6,
            y - 16,
          );

          if (drops[i] * 16 > H && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 4: Holographic Waves ──────────────────────────────────────────────────
    if (bgIndex === 4) {
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const waveCount = 8;
        for (let w = 0; w < waveCount; w++) {
          const hue = (t * 30 + w * 45) % 360;
          const amp = 28 + w * 8;
          const freq = 0.006 + w * 0.001;
          const phase = t * (0.4 + w * 0.07) + w * 1.2;
          const yBase = (w + 1) * (H / (waveCount + 1));

          ctx.beginPath();
          for (let x = 0; x <= W; x += 3) {
            const y = yBase + Math.sin(x * freq + phase) * amp;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.35)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 5: Haunted Static ─────────────────────────────────────────────────────
    if (bgIndex === 5) {
      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const imageData = ctx.createImageData(W, H);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const v = Math.floor(Math.random() * 80);
          const visible = Math.random() > 0.55;
          data[i] = visible ? v : 0;
          data[i + 1] = visible ? v : 0;
          data[i + 2] = visible ? v + 10 : 0;
          data[i + 3] = visible ? 180 : 0;
        }
        ctx.putImageData(imageData, 0, 0);

        // Occasional bright horizontal scan lines
        if (Math.random() > 0.85) {
          const lineY = Math.floor(Math.random() * H);
          ctx.fillStyle = `rgba(180, 200, 220, ${Math.random() * 0.15})`;
          ctx.fillRect(0, lineY, W, 1 + Math.floor(Math.random() * 3));
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 6: Void Spiral ────────────────────────────────────────────────────────
    if (bgIndex === 6) {
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;
        const arms = 3;
        const pointsPerArm = 120;

        for (let a = 0; a < arms; a++) {
          const armOffset = (a / arms) * Math.PI * 2;
          for (let p = 0; p < pointsPerArm; p++) {
            const progress = p / pointsPerArm;
            const angle = progress * Math.PI * 6 + armOffset + t * 0.3;
            const radius = progress * Math.min(W, H) * 0.42;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const alpha = progress * 0.7;
            const hue = 250 + progress * 60;
            const size = (1 - progress) * 3 + 0.5;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 8: Glitch Storm ───────────────────────────────────────────────────────
    if (bgIndex === 8) {
      let glitchRects: {
        x: number;
        y: number;
        w: number;
        h: number;
        color: string;
        life: number;
      }[] = [];
      let frameCount = 0;

      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        frameCount++;
        if (frameCount % 8 === 0 && Math.random() > 0.3) {
          const count = Math.floor(Math.random() * 5) + 1;
          for (let i = 0; i < count; i++) {
            const colors = [
              "#00ffff",
              "#ff00ff",
              "#00ff88",
              "#8800ff",
              "#ff0088",
            ];
            glitchRects.push({
              x: Math.random() * W,
              y: Math.random() * H,
              w: Math.random() * 300 + 20,
              h: Math.random() * 30 + 2,
              color: colors[Math.floor(Math.random() * colors.length)],
              life: Math.floor(Math.random() * 6) + 2,
            });
          }
        }

        glitchRects = glitchRects.filter((r) => r.life > 0);
        for (const r of glitchRects) {
          ctx.fillStyle = `${r.color}33`;
          ctx.fillRect(r.x, r.y, r.w, r.h);
          ctx.strokeStyle = `${r.color}88`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(r.x, r.y, r.w, r.h);
          r.life--;
        }

        // Scan line overlay
        if (Math.random() > 0.7) {
          const sy = Math.random() * H;
          ctx.fillStyle = "rgba(0, 255, 255, 0.03)";
          ctx.fillRect(0, sy, W, 1);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 9: Dark Pulse ─────────────────────────────────────────────────────────
    if (bgIndex === 9) {
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;
        const maxR = Math.sqrt(cx * cx + cy * cy);
        const ringCount = 10;

        for (let i = 0; i < ringCount; i++) {
          const phase = (t * 0.4 + i / ringCount) % 1;
          const r = phase * maxR;
          const alpha = (1 - phase) * 0.35;
          const hue = 240 + i * 8;

          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      stopRaf();
      window.removeEventListener("resize", resize);
    };
  }, [bgIndex, stopRaf]);

  // CSS-based backgrounds (3: Nebula Drift, 7: Cyber Fog)
  const cssBackgrounds: Record<number, React.ReactNode> = {
    3: (
      <div className="absolute inset-0 overflow-hidden">
        {[
          {
            id: "n1",
            color: "#7c3aed",
            x: "10%",
            y: "15%",
            s: "600px",
            dur: "18s",
            del: "0s",
            animClass: "nebulaFloat0",
          },
          {
            id: "n2",
            color: "#9333ea",
            x: "60%",
            y: "5%",
            s: "500px",
            dur: "22s",
            del: "4s",
            animClass: "nebulaFloat1",
          },
          {
            id: "n3",
            color: "#db2777",
            x: "30%",
            y: "60%",
            s: "450px",
            dur: "15s",
            del: "2s",
            animClass: "nebulaFloat2",
          },
          {
            id: "n4",
            color: "#6d28d9",
            x: "75%",
            y: "50%",
            s: "400px",
            dur: "20s",
            del: "7s",
            animClass: "nebulaFloat0",
          },
          {
            id: "n5",
            color: "#7e22ce",
            x: "5%",
            y: "75%",
            s: "350px",
            dur: "25s",
            del: "1s",
            animClass: "nebulaFloat1",
          },
        ].map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.s,
              height: orb.s,
              background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
              filter: "blur(60px)",
              animation: `${orb.animClass} ${orb.dur} ease-in-out infinite`,
              animationDelay: orb.del,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <style>{`
          @keyframes nebulaFloat0 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2) translateX(40px)} }
          @keyframes nebulaFloat1 { 0%,100%{transform:translate(-50%,-50%) scale(1.1)} 50%{transform:translate(-50%,-50%) scale(0.9) translateY(50px)} }
          @keyframes nebulaFloat2 { 0%,100%{transform:translate(-50%,-50%) scale(0.95)} 50%{transform:translate(-50%,-50%) scale(1.15) translateX(-30px)} }
        `}</style>
      </div>
    ),
    7: (
      <div className="absolute inset-0 overflow-hidden">
        {[
          {
            id: "c1",
            color: "#0891b2",
            x: "20%",
            y: "30%",
            s: "700px",
            dur: "20s",
            del: "0s",
            animClass: "cyberFog0",
          },
          {
            id: "c2",
            color: "#0e7490",
            x: "70%",
            y: "10%",
            s: "550px",
            dur: "17s",
            del: "3s",
            animClass: "cyberFog1",
          },
          {
            id: "c3",
            color: "#155e75",
            x: "50%",
            y: "70%",
            s: "480px",
            dur: "24s",
            del: "6s",
            animClass: "cyberFog0",
          },
          {
            id: "c4",
            color: "#164e63",
            x: "10%",
            y: "80%",
            s: "420px",
            dur: "19s",
            del: "9s",
            animClass: "cyberFog1",
          },
        ].map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.s,
              height: orb.s,
              background: `radial-gradient(circle, ${orb.color}16 0%, transparent 70%)`,
              filter: "blur(80px)",
              animation: `${orb.animClass} ${orb.dur} ease-in-out infinite`,
              animationDelay: orb.del,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <style>{`
          @keyframes cyberFog0 { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-50%,-50%) translateX(60px) translateY(-20px)} }
          @keyframes cyberFog1 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.1) translateX(-40px)} }
        `}</style>
      </div>
    ),
  };

  const isCssOnly = bgIndex === 3 || bgIndex === 7;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ background: "oklch(0.04 0 0)" }}
    >
      {isCssOnly ? (
        cssBackgrounds[bgIndex]
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
}

// ─── SettingsPanel ─────────────────────────────────────────────────────────────
function SettingsPanel({
  cursorColor,
  bgIndex,
  onCursorColorChange,
  onBgChange,
}: {
  cursorColor: string;
  bgIndex: number;
  onCursorColorChange: (c: string) => void;
  onBgChange: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        data-ocid="settings.open_modal_button"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-card/70 backdrop-blur-md border border-border hover:bg-card/90 hover:border-primary/40 transition-all duration-200"
        aria-label="Open settings"
      >
        <Settings className="w-4 h-4 text-muted-foreground" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-ocid="settings.dialog"
          className="max-w-md bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-[0_0_80px_oklch(0.72_0.19_295/0.15)]"
        >
          <DialogHeader className="mb-2">
            <DialogTitle className="font-display text-xl text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Settings
            </DialogTitle>
          </DialogHeader>

          <button
            type="button"
            onClick={() => setOpen(false)}
            data-ocid="settings.close_button"
            className="absolute top-4 right-4 rounded-full w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150"
            aria-label="Close settings"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Cursor Color */}
          <div className="mt-4">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Cursor Color
            </p>
            <div className="flex flex-wrap gap-2">
              {CURSOR_COLORS.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  data-ocid="settings.toggle"
                  title={c.label}
                  onClick={() => onCursorColorChange(c.value)}
                  className="relative w-7 h-7 rounded-full transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{
                    background: c.value,
                    boxShadow:
                      cursorColor === c.value
                        ? `0 0 0 2px oklch(0.04 0 0), 0 0 0 4px ${c.value}, 0 0 16px ${c.value}80`
                        : `0 0 8px ${c.value}40`,
                  }}
                  aria-label={c.label}
                  aria-pressed={cursorColor === c.value}
                />
              ))}
            </div>
          </div>

          {/* Background */}
          <div className="mt-6">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Background
            </p>
            <div className="grid grid-cols-2 gap-2" data-ocid="settings.panel">
              {BACKGROUNDS.map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  data-ocid={`settings.item.${bg.id + 1}`}
                  onClick={() => onBgChange(bg.id)}
                  className={`relative text-left px-3 py-2.5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    bgIndex === bg.id
                      ? "border-primary/60 bg-primary/10 text-foreground shadow-[0_0_12px_oklch(0.72_0.19_295/0.2)]"
                      : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/60"
                  }`}
                >
                  <span className="block font-body text-xs font-semibold">
                    {bg.label}
                  </span>
                  <span className="block font-body text-[10px] opacity-60 mt-0.5 leading-tight">
                    {bg.desc}
                  </span>
                  {bgIndex === bg.id && (
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── LinkCard ─────────────────────────────────────────────────────────────────
function LinkCard({
  item,
  ocidPrefix,
  index,
}: {
  item: LinkItem;
  ocidPrefix: string;
  index: number;
}) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex-shrink-0 w-72 rounded-2xl border border-border bg-card p-5 cursor-pointer transition-all duration-300 ${item.glowColor} overflow-hidden`}
    >
      {/* Card gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-200">
              {item.tag}
            </span>
            <span className="block w-1 h-1 rounded-full bg-border flex-shrink-0" />
            <span className="font-body text-[10px] text-muted-foreground/50 truncate">
              {new URL(item.url).hostname}
            </span>
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-white transition-colors duration-200 mb-1.5 leading-tight">
            {item.title}
          </h2>
          <p className="font-body text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 mt-0.5">
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [cursorColor, setCursorColor] = useState("#3b82f6");
  const [bgIndex, setBgIndex] = useState(0);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground bgIndex={bgIndex} />

      {/* Cursor follower */}
      <CursorFollower color={cursorColor} />

      {/* Settings panel */}
      <SettingsPanel
        cursorColor={cursorColor}
        bgIndex={bgIndex}
        onCursorColorChange={setCursorColor}
        onBgChange={setBgIndex}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-16 pb-8 px-6 text-center">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-body font-medium tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Collection</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-none mb-4">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.72_0.19_295)] via-[oklch(0.68_0.22_190)] to-[oklch(0.75_0.18_340)]">
                Cosmos
              </span>
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              A curated gateway to tools, classrooms, and digital worlds worth
              exploring.
            </p>
          </motion.div>
        </header>

        {/* Main content — horizontal link cards */}
        <main className="flex-1 px-6 pb-12">
          <AnimatePresence>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map((link, index) => (
                <LinkCard
                  key={link.id}
                  item={link}
                  ocidPrefix="links"
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-6 text-center">
          <p className="font-body text-xs text-muted-foreground/50">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
