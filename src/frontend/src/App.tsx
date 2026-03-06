import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("The Cosmos crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#050505",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            color: "#fff",
            fontFamily: "sans-serif",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem" }}>⚠️</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Something went wrong in The Cosmos
          </div>
          <div
            style={{ fontSize: "0.875rem", color: "#888", maxWidth: "400px" }}
          >
            {this.state.error?.message ?? "An unexpected error occurred."}
          </div>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: "12px",
              padding: "10px 24px",
              borderRadius: "10px",
              border: "1px solid #333",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── URL Helper ───────────────────────────────────────────────────────────────
function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

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
  {
    id: "5",
    title: "Frogies Arcade",
    description:
      "Expert tennis courses and training — elevate your game with professional guidance.",
    url: "https://tennis.expert-courses.learn.kfa.cl/",
    accent: "from-yellow-500/20 to-orange-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.78_0.18_80/0.4)]",
    tag: "Sports",
  },
  {
    id: "7",
    title: "Lunnar V2",
    description:
      "Kubota Lab's lunar project — research and innovation from beyond the horizon.",
    url: "https://lunar.kubota-lab.com/",
    accent: "from-slate-500/20 to-gray-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.05_260/0.4)]",
    tag: "Research",
  },
  {
    id: "8",
    title: "Void Network V5",
    description:
      "Void Network V5 — next-generation network platform pushing the boundaries of connectivity.",
    url: "https://voidvcsa.blackbearshow.com/",
    accent: "from-purple-500/20 to-indigo-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.55_0.22_285/0.4)]",
    tag: "Network",
  },
  {
    id: "9",
    title: "EldurRocks",
    description:
      "EldurRocks — an education platform built for learning and growth.",
    url: "https://edur.n43.pw/",
    accent: "from-orange-500/20 to-red-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.7_0.22_40/0.4)]",
    tag: "Education",
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

const stepVariants = {
  enter: { opacity: 0, y: 32, scale: 0.97 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -24,
    scale: 0.97,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

// ─── CursorFollower ────────────────────────────────────────────────────────────
function CursorFollower({ color }: { color: string }) {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [opacity, setOpacity] = useState(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setOpacity(1);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setOpacity(0);
      }, 120);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: pos.x,
        top: pos.y,
        width: 120,
        height: 120,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}55 0%, ${color}33 30%, ${color}11 60%, transparent 80%)`,
        filter: "blur(10px)",
        opacity,
        transition: "opacity 0.18s ease, background 0.3s ease",
      }}
    />
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

// ─── Tab Types ────────────────────────────────────────────────────────────────
interface BrowserTab {
  id: string;
  title: string;
  url: string | null;
  isProxy: boolean;
}

const PROXY_TAB_ID = "proxy";

function createTab(item: LinkItem): BrowserTab {
  return {
    id: `tab-${item.id}-${Date.now()}`,
    title: item.title,
    url: item.url,
    isProxy: false,
  };
}

const proxyTab: BrowserTab = {
  id: PROXY_TAB_ID,
  title: "Proxy",
  url: null,
  isProxy: true,
};

// ─── ProxyContent ─────────────────────────────────────────────────────────────
type ProxyMethod = "ddg" | "google" | "bing";

const PROXY_METHODS: { id: ProxyMethod; label: string; desc: string }[] = [
  { id: "ddg", label: "DuckDuckGo HTML", desc: "Private search, no tracking" },
  {
    id: "google",
    label: "Google Translate",
    desc: "Bypasses most filters via translate.google.com",
  },
  {
    id: "bing",
    label: "Bing Cache",
    desc: "Cached pages via Bing's cache server",
  },
];

const SUGGESTION_CHIPS = [
  "news",
  "music",
  "games",
  "movies",
  "sports",
  "youtube",
  "reddit",
  "wikipedia",
  "discord",
];

function isLikelyUrl(input: string): boolean {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return true;
  // Has a dot and no spaces — likely a domain
  if (!trimmed.includes(" ") && trimmed.includes(".")) return true;
  return false;
}

function buildProxyUrl(input: string, method: ProxyMethod): string {
  const trimmed = input.trim();
  const asUrl = isLikelyUrl(trimmed)
    ? trimmed.startsWith("http")
      ? trimmed
      : `https://${trimmed}`
    : null;

  if (method === "ddg") {
    const q = asUrl ?? trimmed;
    return `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}&kp=-2&k1=-1&kl=wt-wt`;
  }
  if (method === "google") {
    const target =
      asUrl ??
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(trimmed)}&kp=-2&k1=-1&kl=wt-wt`;
    return `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(target)}`;
  }
  if (method === "bing") {
    const q = asUrl ?? trimmed;
    return `https://cc.bingj.com/cache.aspx?q=${encodeURIComponent(q)}&url=`;
  }
  return "";
}

function ProxyContent() {
  const [query, setQuery] = useState("");
  const [searchUrl, setSearchUrl] = useState<string | null>(null);
  const [method, setMethod] = useState<ProxyMethod>("ddg");
  const [addressBar, setAddressBar] = useState("");

  const handleGo = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const url = buildProxyUrl(trimmed, method);
    setSearchUrl(url);
    setAddressBar(url);
  };

  const handleSuggestion = (term: string) => {
    const url = buildProxyUrl(term, method);
    setQuery(term);
    setSearchUrl(url);
    setAddressBar(url);
  };

  return (
    <div data-ocid="proxy.panel" className="flex flex-col h-full">
      {/* ── Header bar ── */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-violet-500/20 bg-[oklch(0.08_0.04_295/0.95)] backdrop-blur-xl">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2.5">
          <Shield className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <span className="font-display text-sm font-semibold text-violet-300">
            Proxy — Bypass &amp; Browse
          </span>
          <span className="ml-auto font-body text-[10px] text-violet-400/40 tracking-wide">
            Nothing stored in history
          </span>
        </div>

        {/* Proxy method selector */}
        <div className="flex gap-1.5 mb-3">
          {PROXY_METHODS.map((pm, i) => (
            <button
              key={pm.id}
              type="button"
              data-ocid={
                `proxy.tab.${i + 1}` as
                  | "proxy.tab.1"
                  | "proxy.tab.2"
                  | "proxy.tab.3"
              }
              title={pm.desc}
              onClick={() => setMethod(pm.id)}
              className={[
                "flex-1 px-2 py-1.5 rounded-lg text-[10px] font-body font-semibold tracking-wide transition-all duration-150 border",
                method === pm.id
                  ? "bg-violet-600/30 border-violet-500/60 text-violet-200 shadow-[0_0_12px_oklch(0.52_0.26_295/0.25)]"
                  : "bg-violet-900/10 border-violet-500/15 text-violet-400/60 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-900/20",
              ].join(" ")}
            >
              {pm.label}
            </button>
          ))}
        </div>

        {/* URL / search input + Go button */}
        <div className="flex gap-2">
          <Input
            data-ocid="proxy.search_input"
            type="text"
            placeholder={
              method === "ddg"
                ? "Search or enter a URL..."
                : method === "google"
                  ? "URL or search query to route through Google Translate..."
                  : "Search or enter a URL to load via Bing cache..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGo();
            }}
            className="flex-1 h-9 rounded-lg bg-violet-900/20 border-violet-500/30 text-foreground placeholder:text-violet-400/30 font-body text-sm focus-visible:ring-violet-500/50 focus-visible:border-violet-500/60 transition-all duration-150"
          />
          <Button
            data-ocid="proxy.submit_button"
            onClick={handleGo}
            className="h-9 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white border-0 font-body text-sm font-medium shadow-[0_0_20px_oklch(0.52_0.26_295/0.35)] transition-all duration-150 flex-shrink-0"
          >
            <Search className="w-3.5 h-3.5 mr-1.5" />
            Go
          </Button>
        </div>

        {/* Address bar (shows loaded URL) */}
        {addressBar && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="font-body text-[9px] text-violet-500/50 uppercase tracking-widest flex-shrink-0">
              Loaded:
            </span>
            <span className="font-body text-[9px] text-violet-400/40 truncate">
              {addressBar}
            </span>
          </div>
        )}
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 relative">
        {searchUrl ? (
          <iframe
            key={searchUrl}
            src={searchUrl}
            title="Proxy Search"
            className="absolute inset-0 w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6 py-8 overflow-y-auto">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-violet-900/30 border border-violet-500/20 flex items-center justify-center shadow-[0_0_60px_oklch(0.52_0.26_295/0.3)] flex-shrink-0">
              <Shield className="w-9 h-9 text-violet-400" />
            </div>

            {/* Headline */}
            <div>
              <h3 className="font-display text-xl font-semibold text-violet-200 mb-1.5">
                Private &amp; Unblocked Browsing
              </h3>
              <p className="font-body text-sm text-violet-400/60 max-w-xs leading-relaxed">
                Search or open any URL. Switch proxy methods to bypass network
                filters.
              </p>
            </div>

            {/* Bypass tip card */}
            <div className="w-full max-w-sm rounded-xl border border-violet-500/20 bg-violet-900/15 px-4 py-3 text-left">
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs font-semibold text-violet-300 mb-0.5">
                    Bypass Tip
                  </p>
                  <p className="font-body text-[11px] text-violet-400/60 leading-relaxed">
                    This proxy routes searches through trusted domains that
                    bypass most network filters like iboss cloud. If one method
                    doesn't work, try switching —{" "}
                    <strong className="text-violet-300">
                      Google Translate
                    </strong>{" "}
                    is most effective on restrictive networks.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTION_CHIPS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSuggestion(term)}
                  className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-violet-900/30 border border-violet-500/20 text-violet-300 hover:bg-violet-800/40 hover:border-violet-400/40 transition-all duration-150 capitalize"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── IframePanel ──────────────────────────────────────────────────────────────
function IframePanel({
  item,
  onClose,
}: {
  item: LinkItem;
  onClose: () => void;
}) {
  // Initialize tabs: the opened link + always-present proxy tab
  const firstTab = useRef<BrowserTab>(createTab(item));
  const [tabs, setTabs] = useState<BrowserTab[]>(() => [
    firstTab.current,
    proxyTab,
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(
    () => firstTab.current.id,
  );
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showAddDropdown) {
          setShowAddDropdown(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, showAddDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showAddDropdown) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowAddDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showAddDropdown]);

  const openNewTab = (linkItem: LinkItem) => {
    const newTab = createTab(linkItem);
    setTabs((prev) => {
      // Insert before proxy tab
      const withoutProxy = prev.filter((t) => t.id !== PROXY_TAB_ID);
      return [...withoutProxy, newTab, proxyTab];
    });
    setActiveTabId(newTab.id);
    setShowAddDropdown(false);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabId === PROXY_TAB_ID) return; // proxy tab can't be closed
    setTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== tabId);
      // If we closed the active tab, switch to the one before it
      if (activeTabId === tabId) {
        const closedIdx = prev.findIndex((t) => t.id === tabId);
        const newActive = remaining[Math.max(0, closedIdx - 1)];
        if (newActive) setActiveTabId(newActive.id);
      }
      // If only proxy tab remains, close the whole panel
      if (remaining.length === 1 && remaining[0].id === PROXY_TAB_ID) {
        onClose();
        return remaining;
      }
      return remaining;
    });
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  // Links that aren't already open in a tab
  const availableLinks = links.filter(
    (l) => !tabs.some((t) => t.url === l.url),
  );

  return (
    <motion.div
      data-ocid="iframe.panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "oklch(0.04 0 0 / 0.97)" }}
    >
      {/* ── Top control bar ── */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-card/80 backdrop-blur-xl flex-shrink-0">
        <button
          type="button"
          data-ocid="iframe.close_button"
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all duration-150 text-xs font-body font-medium flex-shrink-0"
          aria-label="Back to The Cosmos"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Current tab info */}
        <div className="flex-1 min-w-0 flex items-center gap-2 px-2">
          {activeTab?.isProxy ? (
            <>
              <Shield className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
              <span className="font-display text-sm font-semibold text-violet-300 truncate">
                Proxy Search
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-sm font-semibold text-foreground truncate">
                {activeTab?.title}
              </span>
              {activeTab?.url && (
                <span className="hidden sm:block font-body text-[10px] text-muted-foreground/50 truncate">
                  {getHostname(activeTab.url)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Open in new browser tab (only for non-proxy) */}
        {activeTab && !activeTab.isProxy && activeTab.url && (
          <button
            type="button"
            data-ocid="iframe.secondary_button"
            onClick={() =>
              window.open(activeTab.url!, "_blank", "noopener,noreferrer")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/40 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all duration-150 text-xs font-body flex-shrink-0"
            aria-label="Open in new browser tab"
            title="Open in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Tab</span>
          </button>
        )}

        <button
          type="button"
          data-ocid="iframe.close_button"
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary/40 hover:bg-destructive/20 border border-border text-muted-foreground hover:text-destructive transition-all duration-150 flex-shrink-0"
          aria-label="Close panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex items-end gap-0 px-2 pt-1.5 border-b border-border bg-[oklch(0.06_0.01_0)] flex-shrink-0 overflow-x-auto scrollbar-none">
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeTabId;
          const isProxy = tab.id === PROXY_TAB_ID;

          return (
            <button
              key={tab.id}
              type="button"
              data-ocid={isProxy ? "iframe.proxy_tab" : `iframe.tab.${idx + 1}`}
              onClick={() => setActiveTabId(tab.id)}
              className={[
                "group relative flex items-center gap-1.5 px-3 py-2 min-w-0 max-w-[160px] rounded-t-lg text-xs font-body font-medium transition-all duration-150 flex-shrink-0 cursor-pointer select-none",
                isActive
                  ? isProxy
                    ? "bg-violet-900/50 border border-b-0 border-violet-500/40 text-violet-200 shadow-[inset_0_1px_0_oklch(0.72_0.26_295/0.3)]"
                    : "bg-card border border-b-0 border-border text-foreground shadow-[inset_0_1px_0_oklch(0.72_0.19_295/0.15)]"
                  : isProxy
                    ? "text-violet-400/70 hover:text-violet-300 hover:bg-violet-900/20"
                    : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-secondary/30",
              ].join(" ")}
              style={isActive ? { marginBottom: "-1px", zIndex: 1 } : {}}
            >
              {isProxy && (
                <Shield className="w-3 h-3 flex-shrink-0 text-violet-400" />
              )}
              <span className="truncate">{tab.title}</span>
              {!isProxy && (
                <button
                  type="button"
                  onClick={(e) => closeTab(tab.id, e)}
                  className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive transition-all duration-100 ml-0.5"
                  aria-label={`Close ${tab.title} tab`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </button>
          );
        })}

        {/* Add new tab button */}
        <div className="relative ml-1 flex-shrink-0" ref={dropdownRef}>
          <button
            type="button"
            data-ocid="iframe.add_tab_button"
            onClick={() => setShowAddDropdown((v) => !v)}
            className="w-7 h-7 mb-1.5 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary/40 border border-transparent hover:border-border transition-all duration-150"
            aria-label="Open new tab"
            title="Open a link in a new tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {/* Add tab dropdown */}
          <AnimatePresence>
            {showAddDropdown && (
              <motion.div
                data-ocid="iframe.add_tab_dropdown"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-[0_8px_40px_oklch(0.04_0_0/0.8)] z-50 overflow-hidden py-1"
              >
                <p className="px-3 py-1.5 text-[10px] font-body font-semibold tracking-widest uppercase text-muted-foreground/50">
                  Open in new tab
                </p>
                {availableLinks.length === 0 ? (
                  <p className="px-3 py-2 text-xs font-body text-muted-foreground/50 italic">
                    All links are already open
                  </p>
                ) : (
                  availableLinks.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => openNewTab(l)}
                      className="w-full text-left px-3 py-2 text-xs font-body text-foreground/80 hover:text-foreground hover:bg-secondary/40 transition-all duration-100 flex items-center gap-2"
                    >
                      <ExternalLink className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
                      <span className="truncate">{l.title}</span>
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right spacer */}
        <div className="flex-1" />
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 relative overflow-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="absolute inset-0"
            style={{ display: tab.id === activeTabId ? "block" : "none" }}
          >
            {tab.isProxy ? (
              <ProxyContent />
            ) : tab.url ? (
              <iframe
                src={tab.url}
                title={tab.title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── LinkCard ─────────────────────────────────────────────────────────────────
function LinkCard({
  item,
  ocidPrefix,
  index,
  onOpen,
}: {
  item: LinkItem;
  ocidPrefix: string;
  index: number;
  onOpen: (item: LinkItem) => void;
}) {
  return (
    <motion.button
      type="button"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(item)}
      className={`group relative flex-shrink-0 w-72 rounded-2xl border border-border bg-card p-5 cursor-pointer transition-all duration-300 ${item.glowColor} overflow-hidden text-left`}
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
              {getHostname(item.url)}
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
    </motion.button>
  );
}

// ─── OnboardingOverlay ────────────────────────────────────────────────────────
function OnboardingOverlay({
  onComplete,
  bgIndex,
  onBgChange,
}: {
  onComplete: (username: string, bg: number) => void;
  bgIndex: number;
  onBgChange: (i: number) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const handleEnter = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUsernameError(true);
      return;
    }
    onComplete(trimmed, bgIndex);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Dimming veil over background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <AnimatePresence mode="wait">
        {/* ── Step 1: Welcome ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 w-full max-w-md"
          >
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-10 flex flex-col items-center text-center shadow-[0_0_120px_oklch(0.72_0.19_295/0.2)]">
              {/* Decorative star cluster */}
              <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_40px_oklch(0.72_0.19_295/0.3)]">
                <Sparkles className="w-7 h-7 text-white/80" />
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.72_0.19_295)] via-[oklch(0.68_0.22_190)] to-[oklch(0.75_0.18_340)]">
                  The Cosmos
                </span>
              </h1>
              <p className="font-body text-sm text-white/50 mb-10 leading-relaxed">
                A curated gateway to tools, classrooms, and digital worlds worth
                exploring.
              </p>

              <Button
                data-ocid="onboarding.primary_button"
                onClick={() => setStep(2)}
                className="w-full h-12 rounded-xl font-body font-semibold text-sm tracking-wide bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_32px_oklch(0.72_0.19_295/0.35)] transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Choose Background ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 w-full max-w-lg"
          >
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-8 shadow-[0_0_120px_oklch(0.72_0.19_295/0.2)]">
              <h2 className="font-display text-3xl font-bold text-white text-center mb-1 tracking-tight">
                Choose Your Background
              </h2>
              <p className="font-body text-xs text-white/40 text-center mb-6 tracking-widest uppercase">
                This becomes your cosmic atmosphere
              </p>

              <div className="grid grid-cols-2 gap-2 mb-8">
                {BACKGROUNDS.map((bg, idx) => (
                  <button
                    key={bg.id}
                    type="button"
                    data-ocid={`onboarding.item.${idx + 1}`}
                    onClick={() => onBgChange(bg.id)}
                    className={`relative text-left px-4 py-3 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      bgIndex === bg.id
                        ? "border-violet-500/70 bg-violet-500/15 text-white shadow-[0_0_16px_oklch(0.72_0.19_295/0.25)]"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <span className="block font-body text-xs font-semibold leading-tight">
                      {bg.label}
                    </span>
                    <span className="block font-body text-[10px] opacity-50 mt-0.5 leading-tight">
                      {bg.desc}
                    </span>
                    {bgIndex === bg.id && (
                      <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
                    )}
                  </button>
                ))}
              </div>

              <Button
                data-ocid="onboarding.primary_button"
                onClick={() => setStep(3)}
                className="w-full h-12 rounded-xl font-body font-semibold text-sm tracking-wide bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_32px_oklch(0.72_0.19_295/0.3)] transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Username ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 w-full max-w-md"
          >
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-10 flex flex-col items-center text-center shadow-[0_0_120px_oklch(0.72_0.19_295/0.2)]">
              <div className="mb-6 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_30px_oklch(0.68_0.22_190/0.3)]">
                <User className="w-6 h-6 text-white/80" />
              </div>

              <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-1">
                Username
              </h2>
              <p className="font-body text-sm text-white/40 mb-8 leading-relaxed">
                What should The Cosmos call you?
              </p>

              <div className="w-full mb-2">
                <Input
                  data-ocid="onboarding.input"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEnter();
                  }}
                  maxLength={32}
                  className={`h-12 rounded-xl bg-white/5 border font-body text-sm text-white placeholder:text-white/25 text-center focus-visible:ring-2 focus-visible:ring-violet-500/60 transition-all duration-200 ${
                    usernameError
                      ? "border-red-500/60 bg-red-500/5"
                      : "border-white/15 hover:border-white/25 focus:border-violet-500/40"
                  }`}
                  autoFocus
                />
                {usernameError && (
                  <p
                    data-ocid="onboarding.error_state"
                    className="mt-2 text-xs text-red-400 font-body"
                  >
                    Please enter a username to continue.
                  </p>
                )}
              </div>

              <Button
                data-ocid="onboarding.primary_button"
                onClick={handleEnter}
                className="w-full h-12 mt-4 rounded-xl font-body font-semibold text-sm tracking-wide bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_32px_oklch(0.72_0.19_295/0.3)] transition-all duration-200"
              >
                Enter The Cosmos
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── AppInner ─────────────────────────────────────────────────────────────────
function AppInner() {
  const [cursorColor, setCursorColor] = useState("#3b82f6");
  const [bgIndex, setBgIndex] = useState(0);
  const [activeTab] = useState<"links">("links");
  const [openedLink, setOpenedLink] = useState<LinkItem | null>(null);

  // Onboarding state — null means "not yet checked"
  const [username, setUsername] = useState<string | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Read stored data on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("cosmos_username");
    const storedBg = localStorage.getItem("cosmos_bg");
    if (storedUsername) {
      setUsername(storedUsername);
      if (storedBg !== null) setBgIndex(Number(storedBg));
      setOnboardingDone(true);
    } else {
      setOnboardingDone(false);
    }
  }, []);

  const handleOnboardingComplete = (name: string, bg: number) => {
    localStorage.setItem("cosmos_username", name);
    localStorage.setItem("cosmos_bg", String(bg));
    setUsername(name);
    setBgIndex(bg);
    setOnboardingDone(true);
  };

  // While checking localStorage, show nothing (avoids flash)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated background — always rendered so onboarding can preview it */}
      <AnimatedBackground bgIndex={bgIndex} />

      {/* Cursor follower */}
      <CursorFollower color={cursorColor} />

      {/* Iframe panel — opens link inside The Cosmos */}
      <AnimatePresence>
        {openedLink && (
          <IframePanel
            key={openedLink.id}
            item={openedLink}
            onClose={() => setOpenedLink(null)}
          />
        )}
      </AnimatePresence>

      {/* Onboarding overlay — shown until complete */}
      <AnimatePresence>
        {!onboardingDone && (
          <OnboardingOverlay
            onComplete={handleOnboardingComplete}
            bgIndex={bgIndex}
            onBgChange={setBgIndex}
          />
        )}
      </AnimatePresence>

      {/* Main app — always mounted but visually present only after onboarding */}
      {onboardingDone && (
        <>
          {/* Settings panel */}
          <SettingsPanel
            cursorColor={cursorColor}
            bgIndex={bgIndex}
            onCursorColorChange={setCursorColor}
            onBgChange={setBgIndex}
          />

          {/* Username badge — top-left corner */}
          <motion.div
            data-ocid="user.panel"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-card/70 backdrop-blur-md border border-border shadow-sm hover:bg-card/90 transition-all duration-200"
          >
            <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="font-body text-xs font-semibold text-foreground max-w-[140px] truncate">
              {username}
            </span>
          </motion.div>

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
                  A curated gateway to tools, classrooms, and digital worlds
                  worth exploring.
                </p>
              </motion.div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-6 pb-12">
              {activeTab === "links" && (
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
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
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
        </>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
