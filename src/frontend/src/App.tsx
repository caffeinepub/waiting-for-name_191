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
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  Lock,
  LogIn,
  MessageSquare,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  Trash2,
  Unlock,
  User,
  Users,
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

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
}

// ─── Password Hashing ─────────────────────────────────────────────────────────
async function hashPassword(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(pw),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const BM_PW_KEY = "cosmos_bm_pw_hash";
const BM_ITEMS_KEY = "cosmos_bookmarks";

// ─── Data ─────────────────────────────────────────────────────────────────────
const links: LinkItem[] = [
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

const spaceLinks: LinkItem[] = [
  {
    id: "space-1",
    title: "Space — Ganga",
    description:
      "An unblocking and productivity web app — clear your mind, unlock your flow.",
    url: "https://matter.gangashrestha.com.np/",
    accent: "from-violet-500/20 to-purple-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.19_295/0.4)]",
    tag: "Productivity",
  },
  {
    id: "space-2",
    title: "Space — RYM",
    description:
      "An unblocking and productivity web app — explore your flow across servers.",
    url: "https://matter.rymconstrucciones.cl/",
    accent: "from-indigo-500/20 to-violet-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.22_280/0.4)]",
    tag: "Productivity",
  },
  {
    id: "space-3",
    title: "Space — Night",
    description:
      "An unblocking and productivity web app — clear your mind under the night sky.",
    url: "https://matter.night.isroot.in/",
    accent: "from-blue-500/20 to-indigo-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.2_260/0.4)]",
    tag: "Productivity",
  },
];

const dayDreamLinks: LinkItem[] = [
  {
    id: "dd-1",
    title: "Day Dream X — Ganga",
    description:
      "A thinking and daydreaming tool — let your imagination roam free.",
    url: "https://thinking.gangashrestha.com.np/",
    accent: "from-cyan-500/20 to-teal-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.22_190/0.4)]",
    tag: "Thinking",
  },
  {
    id: "dd-2",
    title: "Day Dream X — RYM",
    description:
      "A thinking and daydreaming tool — explore the space between ideas.",
    url: "https://thinking.rymconstrucciones.cl/",
    accent: "from-teal-500/20 to-cyan-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.2_180/0.4)]",
    tag: "Thinking",
  },
  {
    id: "dd-3",
    title: "Day Dream X — Night",
    description:
      "A thinking and daydreaming tool — dream deeper under the night sky.",
    url: "https://thinking.night.isroot.in/",
    accent: "from-sky-500/20 to-blue-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.62_0.2_220/0.4)]",
    tag: "Thinking",
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
  // Cars / Racing
  {
    id: 10,
    label: "Night Highway",
    desc: "Headlights streaming on a dark road",
  },
  { id: 11, label: "Neon Speedway", desc: "Neon race cars dashing past" },
  { id: 12, label: "Drift Circuit", desc: "Cars drifting with smoke trails" },
  { id: 13, label: "Street Race", desc: "City street light trails" },
  { id: 14, label: "Rally Rush", desc: "Rally cars with dust particles" },
  { id: 15, label: "Turbo Boost", desc: "Speed lines rushing forward" },
  { id: 16, label: "Traffic Flow", desc: "Top-down city traffic lanes" },
  {
    id: 17,
    label: "Exhaust Trail",
    desc: "Billowing blue-purple exhaust fumes",
  },
  // Cartoons
  { id: 18, label: "Bubble Pop", desc: "Colorful cartoon bubbles bouncing" },
  { id: 19, label: "Star Shower", desc: "Cartoon stars falling and twinkling" },
  { id: 20, label: "Rainbow Bounce", desc: "Arcing rainbows pulsing" },
  { id: 21, label: "Cloud Float", desc: "Fluffy clouds drifting by" },
  { id: 22, label: "Confetti Rain", desc: "Multicolor confetti falling" },
  { id: 23, label: "Pixel Fireworks", desc: "Blocky pixel-art bursts" },
  { id: 24, label: "Cartoon Lightning", desc: "Bright bold lightning flashes" },
  { id: 25, label: "Comic Dots", desc: "Ben-Day halftone dots pulsing" },
  // Anime
  { id: 26, label: "Sakura Fall", desc: "Cherry blossom petals drifting" },
  { id: 27, label: "Energy Aura", desc: "Glowing ki aura rings pulsing" },
  { id: 28, label: "Speed Lines", desc: "Radial action speed lines" },
  { id: 29, label: "Power Charge", desc: "Electric energy crackling out" },
  { id: 30, label: "Portal Gate", desc: "Spinning magic portal rings" },
  { id: 31, label: "Starblast", desc: "Shooting star beams crossing" },
  { id: 32, label: "Spirit Realm", desc: "Ethereal floating orbs and wisps" },
  { id: 33, label: "Blade Flash", desc: "Sword slash streak effects" },
  // Spooky
  { id: 34, label: "Ghost Drift", desc: "Translucent ghosts floating up" },
  { id: 35, label: "Blood Drip", desc: "Red liquid dripping from top" },
  { id: 36, label: "Bat Swarm", desc: "Bats flying across a dark sky" },
  { id: 37, label: "Pumpkin Glow", desc: "Glowing jack-o-lantern faces" },
  { id: 38, label: "Spider Web", desc: "Growing spider web lines" },
  { id: 39, label: "Fog Creep", desc: "Eerie fog rolling in" },
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

    // ── 10: Night Highway ─────────────────────────────────────────────────────
    if (bgIndex === 10) {
      // Pre-compute headlight pairs along the horizon perspective road
      const headlightCount = 12;
      const headlights = Array.from({ length: headlightCount }, (_, i) => ({
        lane: (i % 3) - 1, // -1, 0, 1
        phase: (i * 0.083) % 1, // 0..1 progress along road
        speed: 0.18 + (i % 4) * 0.05,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        // Dark night sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55);
        sky.addColorStop(0, "#010308");
        sky.addColorStop(1, "#050f1a");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H * 0.55);
        // Road surface
        const road = ctx.createLinearGradient(0, H * 0.5, 0, H);
        road.addColorStop(0, "#0a0a0a");
        road.addColorStop(1, "#111");
        ctx.fillStyle = road;
        ctx.fillRect(0, H * 0.5, W, H * 0.5);
        // Horizon glow
        ctx.save();
        ctx.filter = "blur(40px)";
        ctx.fillStyle = "rgba(30,60,120,0.35)";
        ctx.fillRect(0, H * 0.45, W, H * 0.15);
        ctx.restore();
        // Road center lines
        const vp = { x: W / 2, y: H * 0.52 };
        for (let dash = 0; dash < 10; dash++) {
          const prog = ((dash * 0.1 + t * 0.6) % 1) ** 1.8;
          const lx = vp.x;
          const ly = vp.y + (H - vp.y) * prog;
          const lw = prog * 12;
          const lh = prog * 30;
          ctx.fillStyle = `rgba(255,220,80,${prog * 0.6})`;
          ctx.fillRect(lx - lw / 2, ly, lw, lh);
        }
        // Headlights / taillights
        for (const hl of headlights) {
          const prog = ((hl.phase + t * hl.speed) % 1) ** 1.6;
          const spreadX = W * 0.38 * prog;
          const y = vp.y + (H - vp.y) * prog;
          const laneOffX = hl.lane * spreadX * 0.55;
          const cx2 = W / 2 + laneOffX;
          const isOncoming = hl.lane <= 0;
          // Glow beam
          ctx.save();
          ctx.filter = `blur(${4 + prog * 10}px)`;
          const beamColor = isOncoming
            ? "rgba(255,240,180,"
            : "rgba(220,50,50,";
          ctx.fillStyle = `${beamColor}${prog * 0.7})`;
          ctx.beginPath();
          ctx.ellipse(
            cx2 - laneOffX * 0.3,
            y,
            spreadX * 0.18 + 4,
            prog * 20 + 2,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.restore();
          // Headlight dots
          const dotR = 2 + prog * 4;
          for (const side of [-1, 1]) {
            ctx.beginPath();
            ctx.arc(
              cx2 + side * (dotR * 2.5 + prog * 8),
              y,
              dotR,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = isOncoming
              ? `rgba(255,245,200,${0.7 + prog * 0.3})`
              : `rgba(220,40,40,${0.7 + prog * 0.3})`;
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 11: Neon Speedway ─────────────────────────────────────────────────────
    if (bgIndex === 11) {
      const carData = Array.from({ length: 8 }, (_, i) => ({
        lane: i % 4, // 0..3 vertical lanes
        phase: (i * 0.125) % 1,
        speed: 0.3 + (i % 3) * 0.15,
        hue: [0, 60, 120, 200, 280, 320, 40, 170][i],
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, W, H);
        // Track lanes (horizontal stripes)
        const laneH = H / 4;
        for (const car of carData) {
          const x = ((car.phase + t * car.speed) % 1) * (W + 200) - 100;
          const y = car.lane * laneH + laneH / 2;
          const col = `hsl(${car.hue},100%,60%)`;
          // Trail
          const trailLen = 120 + car.speed * 200;
          const grad = ctx.createLinearGradient(x - trailLen, y, x, y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, col);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x - trailLen, y);
          ctx.lineTo(x, y);
          ctx.stroke();
          // Car body (simple rectangle)
          ctx.save();
          ctx.shadowColor = col;
          ctx.shadowBlur = 18;
          ctx.fillStyle = col;
          ctx.fillRect(x - 18, y - 7, 36, 14);
          // Windshield
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fillRect(x - 8, y - 5, 14, 10);
          ctx.restore();
          // Wheels
          ctx.fillStyle = "#222";
          for (const wx of [-10, 8]) {
            ctx.beginPath();
            ctx.ellipse(x + wx, y + 7, 5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + wx, y - 7, 5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 12: Drift Circuit ─────────────────────────────────────────────────────
    if (bgIndex === 12) {
      const smokeParticles: {
        x: number;
        y: number;
        r: number;
        alpha: number;
        vx: number;
        vy: number;
      }[] = [];
      const carPos = { angle: 0 };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,5,10,0.18)";
        ctx.fillRect(0, 0, W, H);
        // Circuit oval track
        const cx2 = W / 2;
        const cy2 = H / 2;
        const rx = W * 0.38;
        const ry = H * 0.32;
        ctx.save();
        ctx.strokeStyle = "rgba(80,80,80,0.35)";
        ctx.lineWidth = 60;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,200,0,0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, rx + 30, ry + 30, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, rx - 30, ry - 30, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        carPos.angle = t * 1.2;
        const carX = cx2 + Math.cos(carPos.angle) * rx;
        const carY = cy2 + Math.sin(carPos.angle) * ry;
        // Spawn smoke
        if (Math.floor(t * 60) % 2 === 0) {
          smokeParticles.push({
            x: carX,
            y: carY,
            r: 8,
            alpha: 0.4,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -0.5 - Math.random() * 0.5,
          });
        }
        // Draw smoke
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
          const p = smokeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.r += 0.6;
          p.alpha -= 0.008;
          if (p.alpha <= 0) {
            smokeParticles.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,200,220,${p.alpha})`;
          ctx.fill();
        }
        // Draw car
        const heading = carPos.angle + Math.PI / 2;
        ctx.save();
        ctx.translate(carX, carY);
        ctx.rotate(heading);
        ctx.shadowColor = "rgba(255,100,0,0.8)";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#ff6600";
        ctx.fillRect(-10, -18, 20, 36);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(-6, -8, 12, 16);
        ctx.restore();
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 13: Street Race ───────────────────────────────────────────────────────
    if (bgIndex === 13) {
      const trailCount = 30;
      const trails = Array.from({ length: trailCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        y: ((i * 73.1) % 100) / 100,
        angle: ((i * 47) % 360) * (Math.PI / 180),
        length: 40 + ((i * 23) % 100),
        speed: 0.8 + (i % 5) * 0.4,
        hue: (i * 19) % 360,
        phase: (i * 0.033) % 1,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(2,2,8,0.15)";
        ctx.fillRect(0, 0, W, H);
        for (const tr of trails) {
          const progress = (tr.phase + t * 0.012 * tr.speed) % 1;
          const x = (tr.x + Math.cos(tr.angle) * progress * 1.5) % 1;
          const y = tr.y;
          const px = (x < 0 ? x + 1 : x) * W;
          const py = y * H;
          const len = tr.length * (0.5 + progress);
          const endX = px - Math.cos(tr.angle) * len;
          const endY = py - Math.sin(tr.angle) * len;
          const grad = ctx.createLinearGradient(endX, endY, px, py);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, `hsla(${tr.hue},100%,70%,0.8)`);
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          // Bright head dot
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${tr.hue},100%,90%,0.9)`;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 14: Rally Rush ────────────────────────────────────────────────────────
    if (bgIndex === 14) {
      const dustParticles: {
        x: number;
        y: number;
        r: number;
        alpha: number;
        vx: number;
        vy: number;
      }[] = [];
      const cars2 = Array.from({ length: 3 }, (_, i) => ({
        x: -60 + i * 0.33 * (window.innerWidth + 120),
        y: 0.3 * window.innerHeight + i * 0.2 * window.innerHeight,
        speed: 180 + i * 60,
        color: ["#e74c3c", "#2ecc71", "#3498db"][i],
        phase: i * 0.33,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(10,8,4,0.15)";
        ctx.fillRect(0, 0, W, H);
        // Ground
        ctx.fillStyle = "rgba(80,55,20,0.25)";
        ctx.fillRect(0, H * 0.55, W, H * 0.45);
        for (const car of cars2) {
          const px =
            ((car.phase + (t * car.speed) / (W + 120)) % 1) * (W + 120) - 60;
          const py = car.y;
          // Spawn dust
          if (Math.random() > 0.4) {
            dustParticles.push({
              x: px - 20,
              y: py + 12,
              r: 5,
              alpha: 0.5,
              vx: -1.5 - Math.random() * 2,
              vy: -0.5 - Math.random(),
            });
          }
          // Car silhouette
          ctx.save();
          ctx.shadowColor = car.color;
          ctx.shadowBlur = 15;
          ctx.fillStyle = car.color;
          ctx.fillRect(px - 22, py - 10, 44, 20);
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(px - 10, py - 8, 20, 14);
          ctx.restore();
        }
        // Update dust
        for (let i = dustParticles.length - 1; i >= 0; i--) {
          const p = dustParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.r += 0.8;
          p.alpha -= 0.01;
          if (p.alpha <= 0 || dustParticles.length > 200) {
            dustParticles.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,150,90,${p.alpha})`;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 15: Turbo Boost ───────────────────────────────────────────────────────
    if (bgIndex === 15) {
      const lineCount = 60;
      const speedLines = Array.from({ length: lineCount }, (_, i) => ({
        angle: (i / lineCount) * Math.PI * 2,
        length: 80 + ((i * 37) % 120),
        speed: 1.8 + (i % 4) * 0.5,
        phase: (i * 0.0167) % 1,
        hue: 180 + ((i * 5) % 80),
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,2,8,0.25)";
        ctx.fillRect(0, 0, W, H);
        const cx2 = W / 2;
        const cy2 = H / 2;
        for (const sl of speedLines) {
          const prog = (sl.phase + t * sl.speed * 0.15) % 1;
          const startR = prog * Math.max(W, H) * 0.7;
          const endR = startR + sl.length * (0.5 + prog * 1.5);
          const sx = cx2 + Math.cos(sl.angle) * startR;
          const sy = cy2 + Math.sin(sl.angle) * startR;
          const ex = cx2 + Math.cos(sl.angle) * endR;
          const ey = cy2 + Math.sin(sl.angle) * endR;
          const alpha = (1 - prog) * 0.7;
          const grad = ctx.createLinearGradient(sx, sy, ex, ey);
          grad.addColorStop(0, `hsla(${sl.hue},100%,70%,${alpha})`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 + (1 - prog) * 2;
          ctx.stroke();
        }
        // Central bright lens flare
        ctx.save();
        ctx.filter = "blur(30px)";
        ctx.fillStyle = `rgba(100,200,255,${0.08 + 0.04 * Math.sin(t * 3)})`;
        ctx.beginPath();
        ctx.arc(cx2, cy2, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 16: Traffic Flow ──────────────────────────────────────────────────────
    if (bgIndex === 16) {
      const laneCount = 6;
      const carsPerLane = 5;
      const carGrid = Array.from({ length: laneCount }, (_, li) =>
        Array.from({ length: carsPerLane }, (_, ci) => ({
          phase: (ci / carsPerLane + li * 0.17) % 1,
          speed: 0.08 + (li % 3) * 0.04,
          color:
            li % 2 === 0
              ? ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db"][ci % 5]
              : ["#9b59b6", "#1abc9c", "#e74c3c", "#f39c12", "#2980b9"][ci % 5],
          width: 28 + (ci % 3) * 6,
          height: 16 + (ci % 2) * 4,
        })),
      );
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,5,5,0.3)";
        ctx.fillRect(0, 0, W, H);
        // Road grid lines
        ctx.strokeStyle = "rgba(50,50,50,0.6)";
        ctx.lineWidth = 1;
        for (let l = 0; l <= laneCount; l++) {
          const y = (l / laneCount) * H;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }
        const laneH = H / laneCount;
        for (let li = 0; li < carGrid.length; li++) {
          const lane = carGrid[li];
          for (const car of lane) {
            const prog = (car.phase + t * car.speed) % 1;
            const x = prog * (W + car.width + 40) - car.width;
            const y = li * laneH + laneH / 2;
            ctx.save();
            ctx.shadowColor = car.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = car.color;
            ctx.fillRect(x, y - car.height / 2, car.width, car.height);
            // Windows
            ctx.fillStyle = "rgba(0,0,0,0.4)";
            ctx.fillRect(
              x + car.width * 0.3,
              y - car.height * 0.35,
              car.width * 0.35,
              car.height * 0.7,
            );
            ctx.restore();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 17: Exhaust Trail ─────────────────────────────────────────────────────
    if (bgIndex === 17) {
      const exhaustParticles: {
        x: number;
        y: number;
        r: number;
        alpha: number;
        vx: number;
        vy: number;
        hue: number;
      }[] = [];
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,5,0.12)";
        ctx.fillRect(0, 0, W, H);
        // Spawn exhaust from multiple car exhausts
        for (let i = 0; i < 3; i++) {
          const ex = ((t * (0.2 + i * 0.08) + i * 0.33) % 1) * W;
          const ey = H * (0.3 + i * 0.2);
          for (let j = 0; j < 3; j++) {
            exhaustParticles.push({
              x: ex - 30,
              y: ey + (Math.random() - 0.5) * 10,
              r: 8 + Math.random() * 8,
              alpha: 0.5,
              vx: -1.5 - Math.random() * 2,
              vy: (Math.random() - 0.5) * 0.8,
              hue: 240 + Math.random() * 60,
            });
          }
        }
        // Update particles
        for (let i = exhaustParticles.length - 1; i >= 0; i--) {
          const p = exhaustParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.r += 1;
          p.alpha -= 0.006;
          if (p.alpha <= 0 || exhaustParticles.length > 400) {
            exhaustParticles.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.filter = `blur(${p.r * 0.4}px)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},60%,55%,${p.alpha})`;
          ctx.fill();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 18: Bubble Pop ────────────────────────────────────────────────────────
    if (bgIndex === 18) {
      const bubbleCount = 25;
      const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        vy: 0.3 + (i % 5) * 0.1,
        r: 18 + (i % 8) * 10,
        hue: (i * 37) % 360,
        phase: (i * 0.04) % 1,
        wobble: (i * 0.71) % (Math.PI * 2),
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(10,5,20,0.18)";
        ctx.fillRect(0, 0, W, H);
        for (const b of bubbles) {
          const y = H - ((b.phase + t * b.vy * 0.1) % 1) * (H + b.r * 2) - b.r;
          const x = b.x * W + Math.sin(t * 0.5 + b.wobble) * 20;
          ctx.save();
          // Bubble body
          const grad = ctx.createRadialGradient(
            x - b.r * 0.3,
            y - b.r * 0.3,
            b.r * 0.1,
            x,
            y,
            b.r,
          );
          grad.addColorStop(0, `hsla(${b.hue},100%,80%,0.5)`);
          grad.addColorStop(0.7, `hsla(${b.hue},100%,55%,0.2)`);
          grad.addColorStop(1, `hsla(${b.hue},100%,60%,0.4)`);
          ctx.beginPath();
          ctx.arc(x, y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = `hsla(${b.hue},100%,80%,0.5)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          // Highlight arc
          ctx.beginPath();
          ctx.arc(
            x - b.r * 0.28,
            y - b.r * 0.28,
            b.r * 0.3,
            Math.PI * 1.1,
            Math.PI * 1.7,
          );
          ctx.strokeStyle = "rgba(255,255,255,0.55)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 19: Star Shower ───────────────────────────────────────────────────────
    if (bgIndex === 19) {
      const starCount = 20;
      const cartoonStars = Array.from({ length: starCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        vy: 0.6 + (i % 4) * 0.2,
        size: 12 + (i % 5) * 8,
        hue: [40, 50, 60, 200, 280][i % 5],
        phase: (i * 0.05) % 1,
        spin: (i % 2 === 0 ? 1 : -1) * (0.5 + (i % 3) * 0.3),
      }));
      const drawStar = (
        cx2: number,
        cy2: number,
        r: number,
        angle: number,
        hue: number,
      ) => {
        const points = 5;
        ctx.save();
        ctx.translate(cx2, cy2);
        ctx.rotate(angle);
        ctx.beginPath();
        for (let p = 0; p < points * 2; p++) {
          const a = (p / (points * 2)) * Math.PI * 2 - Math.PI / 2;
          const rad = p % 2 === 0 ? r : r * 0.42;
          p === 0
            ? ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad)
            : ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        }
        ctx.closePath();
        ctx.fillStyle = `hsl(${hue},100%,65%)`;
        ctx.fill();
        ctx.strokeStyle = `hsl(${hue},100%,90%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,0,15,0.2)";
        ctx.fillRect(0, 0, W, H);
        for (const s of cartoonStars) {
          const y =
            ((s.phase + t * s.vy * 0.08) % 1) * (H + s.size * 2) - s.size;
          const x = s.x * W + Math.sin(t * 0.3 + s.phase * 10) * 15;
          const angle = t * s.spin;
          drawStar(x, y, s.size, angle, s.hue);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 20: Rainbow Bounce ────────────────────────────────────────────────────
    if (bgIndex === 20) {
      const arcCount = 7;
      const arcs = Array.from({ length: arcCount }, (_, i) => ({
        cx: 0.1 + ((i * 0.13) % 0.8),
        cy: 0.5 + ((i * 0.09) % 0.4),
        radiusBase: 60 + i * 40,
        phase: (i * 0.143) % 1,
        speed: 0.2 + i * 0.05,
      }));
      const RAINBOW = [
        "#ff0000",
        "#ff7700",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#8b00ff",
        "#ff00ff",
      ];
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,5,15,0.18)";
        ctx.fillRect(0, 0, W, H);
        for (const arc of arcs) {
          const pulse =
            1 + 0.3 * Math.sin(t * arc.speed * 2 + arc.phase * Math.PI * 2);
          const baseR = arc.radiusBase * pulse;
          const arcX = arc.cx * W;
          const arcY = arc.cy * H;
          for (let ci = 0; ci < RAINBOW.length; ci++) {
            const r = baseR - ci * 10;
            if (r <= 0) continue;
            ctx.beginPath();
            ctx.arc(arcX, arcY, r, Math.PI, Math.PI * 2);
            ctx.strokeStyle = RAINBOW[ci];
            ctx.lineWidth = 8;
            ctx.globalAlpha = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 21: Cloud Float ───────────────────────────────────────────────────────
    if (bgIndex === 21) {
      const cloudCount = 6;
      const clouds = Array.from({ length: cloudCount }, (_, i) => ({
        x: (i * 0.17) % 1,
        y: 0.1 + ((i * 0.15) % 0.65),
        speed: 0.015 + (i % 3) * 0.008,
        scale: 0.7 + (i % 4) * 0.3,
        phase: (i * 0.167) % 1,
      }));
      const drawCloud = (x: number, y: number, scale: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = "rgba(230,240,255,0.75)";
        const blobs = [
          [0, 0, 40],
          [-38, 10, 32],
          [38, 10, 32],
          [-20, -15, 28],
          [20, -15, 28],
          [0, -22, 22],
        ] as [number, number, number][];
        for (const [bx, by, br] of blobs) {
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(10,18,40,0.2)";
        ctx.fillRect(0, 0, W, H);
        // Sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, "rgba(20,40,100,0.3)");
        sky.addColorStop(1, "rgba(60,120,200,0.15)");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);
        for (const cloud of clouds) {
          const x =
            (((cloud.phase + t * cloud.speed) % 1.2) - 0.1) * (W + 200) - 100;
          const y = cloud.y * H + Math.sin(t * 0.3 + cloud.phase * 10) * 8;
          drawCloud(x, y, cloud.scale);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 22: Confetti Rain ─────────────────────────────────────────────────────
    if (bgIndex === 22) {
      const confettiCount = 60;
      const confetti = Array.from({ length: confettiCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        vy: 0.8 + (i % 5) * 0.3,
        vx: (((i * 73) % 100) / 100 - 0.5) * 0.5,
        w: 6 + (i % 5) * 5,
        h: 4 + (i % 3) * 3,
        hue: (i * 37) % 360,
        phase: (i * 0.0167) % 1,
        spin: (i % 2 === 0 ? 1 : -1) * (1 + (i % 3)),
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,5,10,0.2)";
        ctx.fillRect(0, 0, W, H);
        for (const c of confetti) {
          const y = ((c.phase + t * c.vy * 0.07) % 1) * (H + 30) - 15;
          const x =
            (c.x * W + Math.sin(t * 0.5 * c.vy + c.phase * 20) * 25) % W;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t * c.spin);
          ctx.fillStyle = `hsl(${c.hue},100%,65%)`;
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 23: Pixel Fireworks ───────────────────────────────────────────────────
    if (bgIndex === 23) {
      interface Firework {
        x: number;
        y: number;
        particles: { dx: number; dy: number; life: number; hue: number }[];
      }
      const fireworks: Firework[] = [];
      let fwFrame = 0;
      const launchPositions = Array.from({ length: 6 }, (_, i) => ({
        x: (i * 0.17 + 0.08) % 1,
        y: (i * 0.13 + 0.1) % 0.7,
      }));
      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(2,2,10,0.2)";
        ctx.fillRect(0, 0, W, H);
        fwFrame++;
        if (fwFrame % 28 === 0) {
          const pos =
            launchPositions[Math.floor(fwFrame / 28) % launchPositions.length];
          const hue = Math.floor((fwFrame / 28) * 47) % 360;
          const particles = Array.from({ length: 24 }, (_, pi) => {
            const angle = (pi / 24) * Math.PI * 2;
            const speed = 2 + (pi % 3);
            return {
              dx: Math.cos(angle) * speed,
              dy: Math.sin(angle) * speed,
              life: 1,
              hue,
            };
          });
          fireworks.push({ x: pos.x * W, y: pos.y * H, particles });
        }
        for (let fi = fireworks.length - 1; fi >= 0; fi--) {
          const fw = fireworks[fi];
          let alive = false;
          for (const p of fw.particles) {
            if (p.life <= 0) continue;
            alive = true;
            p.life -= 0.025;
            fw.x += p.dx * 0.02;
            // Each particle is a pixel square
            const px = fw.x + p.dx * (1 - p.life) * 40;
            const py = fw.y + p.dy * (1 - p.life) * 40;
            const size = Math.max(2, p.life * 6);
            ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life})`;
            ctx.fillRect(Math.round(px), Math.round(py), size, size);
          }
          if (!alive) fireworks.splice(fi, 1);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 24: Cartoon Lightning ─────────────────────────────────────────────────
    if (bgIndex === 24) {
      interface Bolt {
        points: { x: number; y: number }[];
        life: number;
        hue: number;
      }
      const bolts: Bolt[] = [];
      let boltFrame = 0;
      const generateBolt = (W: number, H: number): Bolt => {
        const startX = Math.random() * W;
        const startY = 0;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = H * (0.4 + Math.random() * 0.5);
        const points: { x: number; y: number }[] = [{ x: startX, y: startY }];
        const steps = 8 + Math.floor(Math.random() * 6);
        for (let s = 1; s <= steps; s++) {
          const t3 = s / steps;
          const x = startX + (endX - startX) * t3 + (Math.random() - 0.5) * 60;
          const y = startY + (endY - startY) * t3;
          points.push({ x, y });
        }
        return {
          points,
          life: 1,
          hue: [60, 180, 280, 320][Math.floor(Math.random() * 4)],
        };
      };
      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,10,0.25)";
        ctx.fillRect(0, 0, W, H);
        boltFrame++;
        if (boltFrame % 20 === 0) bolts.push(generateBolt(W, H));
        for (let bi = bolts.length - 1; bi >= 0; bi--) {
          const bolt = bolts[bi];
          bolt.life -= 0.06;
          if (bolt.life <= 0) {
            bolts.splice(bi, 1);
            continue;
          }
          // Flash
          if (bolt.life > 0.7) {
            ctx.save();
            ctx.filter = "blur(40px)";
            ctx.fillStyle = `hsla(${bolt.hue},100%,80%,${bolt.life * 0.3})`;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();
          }
          ctx.save();
          ctx.shadowColor = `hsl(${bolt.hue},100%,80%)`;
          ctx.shadowBlur = 20;
          ctx.strokeStyle = `hsla(${bolt.hue},100%,85%,${bolt.life})`;
          ctx.lineWidth = 3 + bolt.life * 4;
          ctx.lineJoin = "round";
          ctx.beginPath();
          bolt.points.forEach((pt, pi) =>
            pi === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y),
          );
          ctx.stroke();
          // Core bright line
          ctx.strokeStyle = `rgba(255,255,255,${bolt.life * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 25: Comic Dots ────────────────────────────────────────────────────────
    if (bgIndex === 25) {
      const dotSpacing = 40;
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#0a0010";
        ctx.fillRect(0, 0, W, H);
        const cols = Math.ceil(W / dotSpacing) + 1;
        const rows = Math.ceil(H / dotSpacing) + 1;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * dotSpacing;
            const y = row * dotSpacing;
            const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2);
            const wave = Math.sin(dist * 0.04 - t * 2.5) * 0.5 + 0.5;
            const r = 4 + wave * 10;
            const hue = (col * 7 + row * 11 + t * 20) % 360;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue},100%,60%,${0.3 + wave * 0.5})`;
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 26: Sakura Fall ───────────────────────────────────────────────────────
    if (bgIndex === 26) {
      const petalCount = 40;
      const petals = Array.from({ length: petalCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        vy: 0.5 + (i % 5) * 0.15,
        vx: (((i * 73) % 100) / 100 - 0.5) * 0.3,
        rx: 8 + (i % 4) * 3,
        ry: 5 + (i % 3) * 2,
        hue: 340 + (i % 6) * 5,
        phase: (i * 0.025) % 1,
        spinSpeed: (i % 2 === 0 ? 0.4 : -0.4) + (i % 3) * 0.2,
        wobble: (i * 0.63) % (Math.PI * 2),
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,2,10,0.15)";
        ctx.fillRect(0, 0, W, H);
        for (const p of petals) {
          const y = ((p.phase + t * p.vy * 0.06) % 1) * (H + 40) - 20;
          const x = p.x * W + Math.sin(t * 0.4 + p.wobble) * 30 + t * p.vx * 20;
          ctx.save();
          ctx.translate(x % W, y);
          ctx.rotate(t * p.spinSpeed);
          // Petal ellipse
          ctx.beginPath();
          ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
          const petalGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.rx);
          petalGrad.addColorStop(0, `hsla(${p.hue},85%,85%,0.9)`);
          petalGrad.addColorStop(1, `hsla(${p.hue},75%,65%,0.5)`);
          ctx.fillStyle = petalGrad;
          ctx.fill();
          // Vein
          ctx.beginPath();
          ctx.moveTo(-p.rx * 0.7, 0);
          ctx.lineTo(p.rx * 0.7, 0);
          ctx.strokeStyle = `hsla(${p.hue},80%,70%,0.4)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 27: Energy Aura ───────────────────────────────────────────────────────
    if (bgIndex === 27) {
      const ringCount2 = 8;
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const cx2 = W / 2;
        const cy2 = H / 2;
        // Background glow
        ctx.save();
        ctx.filter = "blur(80px)";
        const auraGrad = ctx.createRadialGradient(
          cx2,
          cy2,
          0,
          cx2,
          cy2,
          H * 0.6,
        );
        auraGrad.addColorStop(
          0,
          `hsla(60,100%,70%,${0.08 + 0.04 * Math.sin(t * 2)})`,
        );
        auraGrad.addColorStop(
          0.5,
          `hsla(40,100%,60%,${0.05 + 0.03 * Math.sin(t * 1.5)})`,
        );
        auraGrad.addColorStop(1, "transparent");
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        // Rings
        for (let i = 0; i < ringCount2; i++) {
          const phase = (t * 0.5 + i / ringCount2) % 1;
          const r = 30 + phase * Math.min(W, H) * 0.55;
          const alpha = (1 - phase) * 0.6;
          const hue = 40 + i * 20 + t * 10;
          ctx.beginPath();
          ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${hue},100%,70%,${alpha})`;
          ctx.lineWidth = 3 - phase * 2;
          ctx.stroke();
          // Energy sparks on ring
          if (i % 2 === 0) {
            const sparkCount = 8;
            for (let s = 0; s < sparkCount; s++) {
              const sa =
                (s / sparkCount) * Math.PI * 2 +
                t * 1.5 * (i % 2 === 0 ? 1 : -1);
              const sx = cx2 + Math.cos(sa) * r;
              const sy = cy2 + Math.sin(sa) * r;
              ctx.beginPath();
              ctx.arc(sx, sy, 2.5 * (1 - phase), 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${hue + 20},100%,85%,${alpha})`;
              ctx.fill();
            }
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 28: Speed Lines ───────────────────────────────────────────────────────
    if (bgIndex === 28) {
      const lineCount2 = 80;
      const speedLineData = Array.from({ length: lineCount2 }, (_, i) => ({
        angle: (i / lineCount2) * Math.PI * 2,
        lengthRatio: 0.3 + ((i * 0.0074) % 0.5),
        startRatio: 0.05 + ((i * 0.0087) % 0.15),
        speed: 2 + (i % 5) * 0.8,
        phase: (i * 0.0125) % 1,
        width: 0.8 + (i % 3) * 0.5,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(5,2,8,0.3)";
        ctx.fillRect(0, 0, W, H);
        const cx2 = W / 2;
        const cy2 = H / 2;
        const maxR = Math.sqrt(cx2 ** 2 + cy2 ** 2);
        for (const sl of speedLineData) {
          const prog = (sl.phase + t * sl.speed * 0.08) % 1;
          const startR = sl.startRatio * maxR + prog * maxR * 0.3;
          const endR = startR + sl.lengthRatio * maxR;
          const sx = cx2 + Math.cos(sl.angle) * startR;
          const sy = cy2 + Math.sin(sl.angle) * startR;
          const ex = cx2 + Math.cos(sl.angle) * endR;
          const ey = cy2 + Math.sin(sl.angle) * endR;
          const alpha = (1 - prog) * 0.8;
          const grad = ctx.createLinearGradient(sx, sy, ex, ey);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = grad;
          ctx.lineWidth = sl.width;
          ctx.stroke();
        }
        // Central flash
        ctx.save();
        ctx.filter = "blur(15px)";
        ctx.fillStyle = `rgba(255,255,255,${0.05 + 0.03 * Math.sin(t * 5)})`;
        ctx.beginPath();
        ctx.arc(cx2, cy2, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 29: Power Charge ──────────────────────────────────────────────────────
    if (bgIndex === 29) {
      interface Arc2 {
        angle: number;
        arcLen: number;
        r: number;
        speed: number;
        phase: number;
        hue: number;
      }
      const arcData: Arc2[] = Array.from({ length: 20 }, (_, i) => ({
        angle: (i * 0.314) % (Math.PI * 2),
        arcLen: 0.3 + ((i * 0.047) % 0.6),
        r: 40 + (i % 8) * 25,
        speed: (i % 2 === 0 ? 1 : -1) * (0.5 + (i % 4) * 0.3),
        phase: (i * 0.05) % 1,
        hue: [200, 220, 240, 260, 280][i % 5],
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,8,0.2)";
        ctx.fillRect(0, 0, W, H);
        const cx2 = W / 2;
        const cy2 = H / 2;
        // Core glow
        ctx.save();
        ctx.filter = "blur(50px)";
        ctx.fillStyle = `rgba(60,120,255,${0.12 + 0.06 * Math.sin(t * 3)})`;
        ctx.beginPath();
        ctx.arc(cx2, cy2, 60, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        for (const arc of arcData) {
          const startAngle = arc.angle + t * arc.speed;
          const endAngle = startAngle + arc.arcLen * Math.PI * 2;
          ctx.save();
          ctx.shadowColor = `hsl(${arc.hue},100%,70%)`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(cx2, cy2, arc.r, startAngle, endAngle);
          ctx.strokeStyle = `hsla(${arc.hue},100%,65%,0.7)`;
          ctx.lineWidth = 2;
          ctx.stroke();
          // Spark at arc end
          const sparkX = cx2 + Math.cos(endAngle) * arc.r;
          const sparkY = cy2 + Math.sin(endAngle) * arc.r;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${arc.hue + 20},100%,90%,0.9)`;
          ctx.fill();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 30: Portal Gate ───────────────────────────────────────────────────────
    if (bgIndex === 30) {
      const portalRings = 12;
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const cx2 = W / 2;
        const cy2 = H / 2;
        // Background
        ctx.fillStyle = "#020008";
        ctx.fillRect(0, 0, W, H);
        // Portal glow
        ctx.save();
        ctx.filter = "blur(60px)";
        const portalGrad = ctx.createRadialGradient(
          cx2,
          cy2,
          0,
          cx2,
          cy2,
          H * 0.5,
        );
        portalGrad.addColorStop(
          0,
          `hsla(280,100%,50%,${0.15 + 0.06 * Math.sin(t * 2)})`,
        );
        portalGrad.addColorStop(0.4, "hsla(200,100%,50%,0.08)");
        portalGrad.addColorStop(1, "transparent");
        ctx.fillStyle = portalGrad;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        for (let i = 0; i < portalRings; i++) {
          const baseR = 30 + i * 22;
          const spinDir = i % 2 === 0 ? 1 : -1;
          const angle = t * (0.3 + i * 0.06) * spinDir;
          const hue = 260 + i * 15;
          ctx.save();
          ctx.translate(cx2, cy2);
          ctx.rotate(angle);
          // Dotted ring
          const dotCount = 6 + i * 2;
          for (let d = 0; d < dotCount; d++) {
            const da = (d / dotCount) * Math.PI * 2;
            const dx = Math.cos(da) * baseR;
            const dy = Math.sin(da) * baseR;
            const alpha = 0.5 + 0.4 * Math.sin(t * 3 + i + d);
            ctx.beginPath();
            ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue},100%,70%,${alpha})`;
            ctx.fill();
          }
          // Ring arc
          ctx.beginPath();
          ctx.arc(0, 0, baseR, 0, Math.PI * 1.6);
          ctx.strokeStyle = `hsla(${hue},80%,55%,0.3)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 31: Starblast ─────────────────────────────────────────────────────────
    if (bgIndex === 31) {
      const beamCount = 12;
      const beams = Array.from({ length: beamCount }, (_, i) => ({
        phase: (i / beamCount) % 1,
        speed: 0.4 + (i % 4) * 0.2,
        angle: (i * 0.524) % (Math.PI * 2),
        hue: [40, 180, 280, 320, 60][i % 5],
        width: 1.5 + (i % 3),
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,8,0.25)";
        ctx.fillRect(0, 0, W, H);
        const maxR = Math.sqrt(W * W + H * H);
        for (const b of beams) {
          const prog = (b.phase + t * b.speed * 0.12) % 1;
          const headPos = prog * maxR;
          const tailPos = Math.max(0, headPos - maxR * 0.18);
          // Beam comes from off-screen along angle
          const ox = W / 2 - Math.cos(b.angle) * maxR;
          const oy = H / 2 - Math.sin(b.angle) * maxR;
          const hx = ox + Math.cos(b.angle) * headPos;
          const hy = oy + Math.sin(b.angle) * headPos;
          const tx2 = ox + Math.cos(b.angle) * tailPos;
          const ty2 = oy + Math.sin(b.angle) * tailPos;
          const alpha = Math.sin(prog * Math.PI) * 0.8;
          const grad = ctx.createLinearGradient(tx2, ty2, hx, hy);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.7, `hsla(${b.hue},100%,70%,${alpha * 0.5})`);
          grad.addColorStop(1, `hsla(${b.hue},100%,90%,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(tx2, ty2);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = grad;
          ctx.lineWidth = b.width;
          ctx.stroke();
          // Bright head
          ctx.save();
          ctx.shadowColor = `hsl(${b.hue},100%,80%)`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(hx, hy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${b.hue},100%,90%,${alpha})`;
          ctx.fill();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 32: Spirit Realm ──────────────────────────────────────────────────────
    if (bgIndex === 32) {
      const orbCount = 18;
      const orbs = Array.from({ length: orbCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        y: ((i * 97.6) % 100) / 100,
        r: 10 + (i % 5) * 12,
        hue: 160 + (i % 8) * 25,
        phaseX: (i * 0.63) % (Math.PI * 2),
        phaseY: (i * 0.41) % (Math.PI * 2),
        speedX: 0.3 + (i % 4) * 0.12,
        speedY: 0.2 + (i % 3) * 0.1,
        glowR: 30 + (i % 5) * 20,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,3,8,0.18)";
        ctx.fillRect(0, 0, W, H);
        for (const orb of orbs) {
          const x =
            (orb.x * W + Math.sin(t * orb.speedX + orb.phaseX) * 60) % W;
          const y =
            (orb.y * H + Math.cos(t * orb.speedY + orb.phaseY) * 40) % H;
          // Glow
          ctx.save();
          ctx.filter = `blur(${orb.r * 0.8}px)`;
          ctx.beginPath();
          ctx.arc((x + W) % W, (y + H) % H, orb.glowR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${orb.hue},80%,60%,0.15)`;
          ctx.fill();
          ctx.restore();
          // Core
          const coreGrad = ctx.createRadialGradient(
            (x + W) % W,
            (y + H) % H,
            0,
            (x + W) % W,
            (y + H) % H,
            orb.r,
          );
          coreGrad.addColorStop(0, `hsla(${orb.hue},100%,90%,0.9)`);
          coreGrad.addColorStop(0.5, `hsla(${orb.hue},80%,60%,0.5)`);
          coreGrad.addColorStop(1, `hsla(${orb.hue},60%,40%,0)`);
          ctx.beginPath();
          ctx.arc((x + W) % W, (y + H) % H, orb.r, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 33: Blade Flash ───────────────────────────────────────────────────────
    if (bgIndex === 33) {
      interface Slash {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        life: number;
        hue: number;
        width: number;
      }
      const slashes: Slash[] = [];
      let slashFrame = 0;
      const slashOrigins = Array.from({ length: 6 }, (_, i) => ({
        x: (i * 0.19 + 0.05) % 1,
        y: (i * 0.17 + 0.1) % 0.8,
        angle: (i * 0.52) % (Math.PI * 2),
      }));
      const draw = () => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,5,0.22)";
        ctx.fillRect(0, 0, W, H);
        slashFrame++;
        if (slashFrame % 25 === 0) {
          const origin =
            slashOrigins[Math.floor(slashFrame / 25) % slashOrigins.length];
          const len = 80 + Math.floor((slashFrame / 25) % 5) * 40;
          const hue = [180, 200, 40, 280][Math.floor(slashFrame / 25) % 4];
          slashes.push({
            x1: origin.x * W,
            y1: origin.y * H,
            x2: origin.x * W + Math.cos(origin.angle) * len,
            y2: origin.y * H + Math.sin(origin.angle) * len,
            life: 1,
            hue,
            width: 3 + (Math.floor(slashFrame / 25) % 3),
          });
        }
        for (let si = slashes.length - 1; si >= 0; si--) {
          const s = slashes[si];
          s.life -= 0.04;
          if (s.life <= 0) {
            slashes.splice(si, 1);
            continue;
          }
          ctx.save();
          ctx.shadowColor = `hsl(${s.hue},100%,70%)`;
          ctx.shadowBlur = 30;
          // Outer glow
          ctx.strokeStyle = `hsla(${s.hue},100%,60%,${s.life * 0.5})`;
          ctx.lineWidth = s.width * 4;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x2, s.y2);
          ctx.stroke();
          // Core
          ctx.strokeStyle = `rgba(255,255,255,${s.life * 0.9})`;
          ctx.lineWidth = s.width;
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x2, s.y2);
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 34: Ghost Drift ───────────────────────────────────────────────────────
    if (bgIndex === 34) {
      const ghostCount = 8;
      const ghosts = Array.from({ length: ghostCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        vy: 0.15 + (i % 4) * 0.06,
        size: 30 + (i % 4) * 20,
        phase: (i * 0.125) % 1,
        wobble: (i * 0.71) % (Math.PI * 2),
        alpha: 0.3 + (i % 3) * 0.15,
      }));
      const drawGhost = (x: number, y: number, size: number, alpha: number) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(230,240,255,${alpha})`;
        // Body (ellipse top)
        ctx.beginPath();
        ctx.ellipse(x, y - size * 0.1, size * 0.5, size * 0.6, 0, Math.PI, 0);
        // Wavy bottom
        const waveSegs = 4;
        for (let w = 0; w <= waveSegs; w++) {
          const wx = x + size * 0.5 - (w * size) / waveSegs;
          const wy =
            y +
            size * 0.5 +
            Math.sin((w / waveSegs) * Math.PI * 2) * size * 0.12;
          ctx.lineTo(wx, wy);
        }
        ctx.closePath();
        const ghostGrad = ctx.createRadialGradient(
          x,
          y - size * 0.1,
          0,
          x,
          y - size * 0.1,
          size * 0.7,
        );
        ghostGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        ghostGrad.addColorStop(1, `rgba(180,200,255,${alpha * 0.3})`);
        ctx.fillStyle = ghostGrad;
        ctx.fill();
        // Eyes
        ctx.fillStyle = `rgba(20,20,40,${alpha * 1.5})`;
        for (const ex of [-size * 0.18, size * 0.18]) {
          ctx.beginPath();
          ctx.ellipse(
            x + ex,
            y - size * 0.05,
            size * 0.08,
            size * 0.1,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.restore();
      };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(2,0,5,0.15)";
        ctx.fillRect(0, 0, W, H);
        for (const g of ghosts) {
          const y = H - ((g.phase + t * g.vy * 0.05) % 1) * (H + g.size * 2);
          const x = g.x * W + Math.sin(t * 0.4 + g.wobble) * 25;
          drawGhost(
            x,
            y,
            g.size,
            g.alpha + 0.1 * Math.sin(t * 1.5 + g.phase * 10),
          );
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 35: Blood Drip ────────────────────────────────────────────────────────
    if (bgIndex === 35) {
      const dripCount = 16;
      const drips = Array.from({ length: dripCount }, (_, i) => ({
        x: ((i * 137.5 + 10) % 100) / 100,
        speed: 0.3 + (i % 5) * 0.15,
        width: 4 + (i % 4) * 4,
        phase: (i * 0.0625) % 1,
        maxLen: 0.3 + (i % 4) * 0.15,
        hue: 0 + (i % 3) * 5,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(2,0,0,0.18)";
        ctx.fillRect(0, 0, W, H);
        for (const d of drips) {
          const prog = (d.phase + t * d.speed * 0.05) % 1;
          const dripLen = Math.min(prog * 3, d.maxLen) * H;
          const x = d.x * W;
          // Drip body
          const grad = ctx.createLinearGradient(x, 0, x, dripLen);
          grad.addColorStop(0, `hsla(${d.hue},100%,40%,0.9)`);
          grad.addColorStop(0.8, `hsla(${d.hue},100%,30%,0.8)`);
          grad.addColorStop(1, `hsla(${d.hue},100%,25%,0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.rect(x - d.width / 2, 0, d.width, dripLen);
          ctx.fill();
          // Drip bulb at bottom
          if (dripLen > 20) {
            ctx.save();
            ctx.shadowColor = `hsl(${d.hue},100%,35%)`;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.ellipse(
              x,
              dripLen,
              d.width * 0.8,
              d.width * 1.2,
              0,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = `hsla(${d.hue},100%,35%,0.85)`;
            ctx.fill();
            ctx.restore();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 36: Bat Swarm ─────────────────────────────────────────────────────────
    if (bgIndex === 36) {
      const batCount = 20;
      const bats = Array.from({ length: batCount }, (_, i) => ({
        x: ((i * 137.5) % 100) / 100,
        y: ((i * 97.6) % 100) / 100,
        speed: 0.6 + (i % 4) * 0.3,
        size: 10 + (i % 4) * 6,
        phase: (i * 0.05) % 1,
        vy: (((i * 73) % 100) / 100 - 0.5) * 0.2,
        wingPhase: (i * 0.8) % (Math.PI * 2),
      }));
      const drawBat = (
        x: number,
        y: number,
        size: number,
        wingAngle: number,
      ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = "rgba(30,0,40,0.9)";
        ctx.strokeStyle = "rgba(80,20,90,0.7)";
        ctx.lineWidth = 0.8;
        // Left wing
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -size * 0.8,
          Math.sin(wingAngle) * size * 0.6 - size * 0.2,
          -size * 1.5,
          0,
          -size * 0.5,
          size * 0.3,
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Right wing
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          size * 0.8,
          Math.sin(wingAngle) * size * 0.6 - size * 0.2,
          size * 1.5,
          0,
          size * 0.5,
          size * 0.3,
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Body
        ctx.beginPath();
        ctx.ellipse(0, size * 0.1, size * 0.18, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20,0,30,1)";
        ctx.fill();
        ctx.restore();
      };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,3,0.2)";
        ctx.fillRect(0, 0, W, H);
        // Full moon
        ctx.save();
        ctx.shadowColor = "rgba(220,210,180,0.5)";
        ctx.shadowBlur = 50;
        ctx.beginPath();
        ctx.arc(W * 0.78, H * 0.2, 55, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230,220,180,0.25)";
        ctx.fill();
        ctx.restore();
        for (const bat of bats) {
          const x =
            (((bat.phase + t * bat.speed * 0.03) % 1.2) - 0.1) *
              (W + bat.size * 4) -
            bat.size * 2;
          const y = bat.y * H + Math.sin(t * 0.5 + bat.phase * 20) * H * 0.08;
          drawBat(x, y, bat.size, t * 8 + bat.wingPhase);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 37: Pumpkin Glow ──────────────────────────────────────────────────────
    if (bgIndex === 37) {
      const pumpkinCount = 6;
      const pumpkins = Array.from({ length: pumpkinCount }, (_, i) => ({
        x: (i * 0.18 + 0.07) % 1,
        y: 0.2 + ((i * 0.15) % 0.55),
        size: 35 + (i % 4) * 20,
        phase: (i * 0.167) % 1,
        eyeType: i % 3,
      }));
      const drawPumpkin = (
        x: number,
        y: number,
        size: number,
        t2: number,
        eyeType: number,
      ) => {
        const glowAlpha = 0.3 + 0.15 * Math.sin(t2 * 2.5 + x);
        ctx.save();
        // Outer glow
        ctx.filter = `blur(${size * 0.4}px)`;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,100,0,${glowAlpha})`;
        ctx.fill();
        ctx.restore();
        ctx.save();
        // Pumpkin body (3 lobes)
        const bodyColor = "rgba(200,70,5,0.7)";
        for (let lobe = -1; lobe <= 1; lobe++) {
          ctx.beginPath();
          ctx.ellipse(
            x + lobe * size * 0.3,
            y,
            size * 0.48,
            size * 0.55,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = bodyColor;
          ctx.fill();
          ctx.strokeStyle = "rgba(255,120,0,0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Stem
        ctx.fillStyle = "rgba(40,80,20,0.8)";
        ctx.fillRect(x - 4, y - size * 0.55 - 12, 8, 14);
        // Carved face glow
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(255,150,20,${0.5 + 0.2 * Math.sin(t2 * 3)})`;
        // Eyes
        const eyeShapes = [
          () => {
            for (const side of [-1, 1]) {
              ctx.beginPath();
              ctx.moveTo(x + side * size * 0.2, y - size * 0.1);
              ctx.lineTo(
                x + side * (size * 0.2 + size * 0.12),
                y - size * 0.22,
              );
              ctx.lineTo(x + side * (size * 0.2 + size * 0.24), y - size * 0.1);
              ctx.closePath();
              ctx.fill();
            }
          },
          () => {
            for (const side of [-1, 1]) {
              ctx.beginPath();
              ctx.arc(
                x + side * size * 0.22,
                y - size * 0.15,
                size * 0.1,
                0,
                Math.PI * 2,
              );
              ctx.fill();
            }
          },
          () => {
            for (const side of [-1, 1]) {
              ctx.fillRect(
                x + side * (size * 0.3) - size * 0.08,
                y - size * 0.22,
                size * 0.16,
                size * 0.12,
              );
            }
          },
        ];
        eyeShapes[eyeType]?.();
        // Mouth
        ctx.beginPath();
        ctx.arc(x, y + size * 0.2, size * 0.25, 0.3, Math.PI - 0.3);
        ctx.lineWidth = size * 0.06;
        ctx.strokeStyle = `rgba(255,150,20,${0.5 + 0.2 * Math.sin(t2 * 3)})`;
        ctx.stroke();
        ctx.restore();
      };
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,2,0.18)";
        ctx.fillRect(0, 0, W, H);
        for (const p of pumpkins) {
          drawPumpkin(p.x * W, p.y * H, p.size, t, p.eyeType);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 38: Spider Web ────────────────────────────────────────────────────────
    if (bgIndex === 38) {
      const webData = [
        { cx: 0, cy: 0 },
        { cx: 1, cy: 0 },
        { cx: 0, cy: 1 },
        { cx: 0.5, cy: 0.5 },
      ];
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,3,0.2)";
        ctx.fillRect(0, 0, W, H);
        const spokeCount = 12;
        const ringCount3 = 8;
        for (const wd of webData) {
          const wx = wd.cx * W;
          const wy = wd.cy * H;
          const maxR = Math.min(W, H) * (0.35 + 0.1 * Math.sin(t * 0.2));
          const prog = Math.min(1, t * 0.08);
          ctx.save();
          ctx.strokeStyle = "rgba(200,200,220,0.3)";
          ctx.lineWidth = 0.7;
          // Spokes
          for (let s = 0; s < spokeCount; s++) {
            const angle = (s / spokeCount) * Math.PI * 2;
            const endR = maxR * prog;
            ctx.beginPath();
            ctx.moveTo(wx, wy);
            ctx.lineTo(
              wx + Math.cos(angle) * endR,
              wy + Math.sin(angle) * endR,
            );
            ctx.stroke();
          }
          // Rings (connecting arcs)
          for (let r = 1; r <= ringCount3; r++) {
            const ringR = (r / ringCount3) * maxR * prog;
            if (ringR <= 0) continue;
            ctx.beginPath();
            ctx.arc(wx, wy, ringR, 0, Math.PI * 2);
            ctx.globalAlpha = 0.25 + 0.05 * Math.sin(t * 0.5 + r);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          // Spider
          const sAngle = t * 0.4;
          const sR = maxR * 0.5 * prog;
          const sx = wx + Math.cos(sAngle) * sR;
          const sy = wy + Math.sin(sAngle) * sR;
          ctx.beginPath();
          ctx.arc(sx, sy, 5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180,0,0,0.7)";
          ctx.fill();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── 39: Fog Creep ─────────────────────────────────────────────────────────
    if (bgIndex === 39) {
      const fogLayers = Array.from({ length: 5 }, (_, i) => ({
        x: (i * 0.2) % 1,
        y: 0.5 + ((i * 0.1) % 0.4),
        w: 0.5 + ((i * 0.15) % 0.4),
        h: 0.12 + ((i * 0.04) % 0.1),
        speed: 0.015 + i * 0.005,
        alpha: 0.08 + i * 0.03,
        phase: (i * 0.2) % 1,
      }));
      const draw = (t: number) => {
        const W = canvas.width;
        const H = canvas.height;
        ctx.fillStyle = "rgba(0,0,3,0.15)";
        ctx.fillRect(0, 0, W, H);
        // Eerie moonlight gradient
        ctx.save();
        ctx.filter = "blur(80px)";
        ctx.fillStyle = `rgba(30,50,60,${0.15 + 0.05 * Math.sin(t * 0.3)})`;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        for (const layer of fogLayers) {
          const x =
            (((layer.phase + t * layer.speed) % 1.5) - 0.25) * (W * 1.5) -
            W * 0.25;
          const y = layer.y * H + Math.sin(t * 0.3 + layer.phase * 10) * 20;
          const fogW = layer.w * W * 1.5;
          const fogH = layer.h * H;
          ctx.save();
          ctx.filter = `blur(${fogH * 0.5}px)`;
          const fogGrad = ctx.createRadialGradient(
            x + fogW / 2,
            y,
            0,
            x + fogW / 2,
            y,
            fogW / 2,
          );
          fogGrad.addColorStop(0, `rgba(180,200,210,${layer.alpha * 1.5})`);
          fogGrad.addColorStop(0.5, `rgba(140,170,180,${layer.alpha})`);
          fogGrad.addColorStop(1, "transparent");
          ctx.fillStyle = fogGrad;
          ctx.fillRect(x, y - fogH / 2, fogW, fogH * 2);
          ctx.restore();
        }
        // Ground fog tendrils
        ctx.save();
        ctx.filter = "blur(25px)";
        for (let fx = 0; fx < 8; fx++) {
          const tendrilX = (((fx * 0.13 + t * 0.02) % 1.2) - 0.1) * W;
          const tendrilY = H * 0.85 + Math.sin(t * 0.5 + fx) * H * 0.05;
          ctx.beginPath();
          ctx.ellipse(tendrilX, tendrilY, 80 + fx * 20, 30, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160,190,200,${0.1 + 0.04 * Math.sin(t * 0.4 + fx)})`;
          ctx.fill();
        }
        ctx.restore();
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
            <div
              className="max-h-72 overflow-y-auto pr-1"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "oklch(0.3 0.05 295) transparent",
              }}
            >
              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="settings.panel"
              >
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
  const [bmPassword, setBmPassword] = useState("");

  const handleEnter = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUsernameError(true);
      return;
    }
    if (bmPassword.trim()) {
      const hash = await hashPassword(bmPassword.trim());
      localStorage.setItem(BM_PW_KEY, hash);
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

              <div
                className="max-h-72 overflow-y-auto mb-8 pr-1"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(139,92,246,0.4) transparent",
                }}
              >
                <div className="grid grid-cols-2 gap-2">
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

              {/* Bookmarks password (optional) */}
              <div className="w-full mb-1">
                <Input
                  data-ocid="onboarding.bm_password.input"
                  type="password"
                  placeholder="Bookmarks password (optional)"
                  value={bmPassword}
                  onChange={(e) => setBmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEnter();
                  }}
                  className="h-12 rounded-xl bg-white/5 border border-white/15 hover:border-white/25 font-body text-sm text-white placeholder:text-white/25 text-center focus-visible:ring-2 focus-visible:ring-violet-500/60 focus:border-violet-500/40 transition-all duration-200"
                />
                <p className="mt-1.5 text-[11px] text-white/30 font-body flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Protects your saved bookmarks — leave blank to skip
                </p>
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

const rosinLinks: LinkItem[] = [
  {
    id: "rosin-1",
    title: "Rosin",
    description:
      "Chrome proxy experience — browse freely through a secure gateway.",
    url: "https://chrome.hospedajemariafresia.cl/",
    accent: "from-amber-500/20 to-yellow-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.78_0.18_80/0.4)]",
    tag: "Browser",
  },
  {
    id: "rosin-2",
    title: "Rosin",
    description:
      "Enhance your browsing — unlock a better web experience instantly.",
    url: "https://enhance.hospedajemariafresia.cl/",
    accent: "from-lime-500/20 to-green-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.2_140/0.4)]",
    tag: "Enhance",
  },
  {
    id: "rosin-3",
    title: "Rosin",
    description: "Extend your reach — powerful tools to go further online.",
    url: "https://extend.hospedajemariafresia.cl/",
    accent: "from-cyan-500/20 to-blue-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.22_220/0.4)]",
    tag: "Tools",
  },
  {
    id: "rosin-4",
    title: "Rosin",
    description: "Hello — a welcoming portal to seamless online exploration.",
    url: "https://hello.hospedajemariafresia.cl/",
    accent: "from-violet-500/20 to-purple-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.22_285/0.4)]",
    tag: "Portal",
  },
  {
    id: "rosin-5",
    title: "Rosin",
    description: "Research hub — deep dive into knowledge and discovery.",
    url: "https://research.hospedajemariafresia.cl/",
    accent: "from-rose-500/20 to-pink-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.2_350/0.4)]",
    tag: "Research",
  },
];

const galaxyV6Links: LinkItem[] = [
  {
    id: "gv6-1",
    title: "Galaxy V6",
    description:
      "Galaxy V6 onboarding — step into the world of creative lighting.",
    url: "https://lighting.creativelighting.co.za/onboarding/",
    accent: "from-yellow-500/20 to-orange-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.78_0.2_60/0.4)]",
    tag: "Lighting",
  },
  {
    id: "gv6-2",
    title: "Galaxy V6",
    description:
      "Red Light onboarding — a bold immersive experience in crimson.",
    url: "https://redlight.redlight.li/onboarding/",
    accent: "from-red-500/20 to-rose-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.26_25/0.4)]",
    tag: "Red Light",
  },
  {
    id: "gv6-3",
    title: "Galaxy V6",
    description:
      "World of Lighting onboarding — illuminate every corner of the web.",
    url: "https://world.worldoflighting.co.za/onboarding/",
    accent: "from-indigo-500/20 to-violet-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.62_0.24_280/0.4)]",
    tag: "World",
  },
  {
    id: "gv6-4",
    title: "Galaxy V6",
    description:
      "Save Whales onboarding — make a difference for the ocean's giants.",
    url: "https://save-whales.alexkrav.se/onboarding/",
    accent: "from-teal-500/20 to-cyan-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.2_195/0.4)]",
    tag: "Ocean",
  },
  {
    id: "gv6-5",
    title: "Galaxy V6",
    description: "Wild Life onboarding — explore the untamed world of nature.",
    url: "https://wild-life.alexkrav.se/onboarding/",
    accent: "from-green-500/20 to-emerald-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.22_145/0.4)]",
    tag: "Nature",
  },
];

const cherriLinks: LinkItem[] = [
  {
    id: "cherri-1",
    title: "Cherri",
    description: "Hygiene onboarding — clean habits for a cleaner world.",
    url: "https://hygiene.yodetergente.cl/onboarding/",
    accent: "from-sky-500/20 to-blue-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.22_240/0.4)]",
    tag: "Hygiene",
  },
  {
    id: "cherri-2",
    title: "Cherri",
    description:
      "Music4Fun onboarding — your gateway to rhythm and creativity.",
    url: "https://music4fun.isoluxltda.cl/onboarding/",
    accent: "from-fuchsia-500/20 to-pink-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.26_320/0.4)]",
    tag: "Music",
  },
  {
    id: "cherri-3",
    title: "Cherri",
    description:
      "English Skills onboarding — sharpen your language proficiency.",
    url: "https://englishskills.pensionadocanino.com/onboarding/",
    accent: "from-orange-500/20 to-amber-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.75_0.2_55/0.4)]",
    tag: "Education",
  },
  {
    id: "cherri-4",
    title: "Cherri",
    description: "EduPortal onboarding — your door to a world of learning.",
    url: "https://eduportal.debahamondesaviana.cl/onboarding/",
    accent: "from-emerald-500/20 to-teal-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.2_165/0.4)]",
    tag: "Learning",
  },
  {
    id: "cherri-5",
    title: "Cherri",
    description:
      "Construction Services onboarding — build better with expert guidance.",
    url: "https://construction.services.codd70.ru/onboarding/",
    accent: "from-stone-500/20 to-gray-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.55_0.04_60/0.4)]",
    tag: "Construction",
  },
];

const elderRocksLinks: LinkItem[] = [
  {
    id: "er-1",
    title: "ElderRocks",
    description: "ElderRocks — a gateway to education and discovery.",
    url: "https://www.eduherefirst.it.com/",
    accent: "from-emerald-500/20 to-green-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.22_145/0.4)]",
    tag: "Education",
  },
  {
    id: "er-2",
    title: "ElderRocks",
    description: "ElderRocks — blue-tinted learning for curious minds.",
    url: "https://www.blueedu.org/",
    accent: "from-blue-500/20 to-cyan-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.22_240/0.4)]",
    tag: "Learning",
  },
  {
    id: "er-3",
    title: "ElderRocks",
    description: "ElderRocks — explore the world through a unique lens.",
    url: "https://www.blahaj.li/",
    accent: "from-sky-500/20 to-indigo-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.2_220/0.4)]",
    tag: "Explore",
  },
  {
    id: "er-4",
    title: "ElderRocks",
    description: "ElderRocks — cloud-powered content and resources.",
    url: "https://d3w3yey1eziiqh.cloudfront.net/",
    accent: "from-violet-500/20 to-purple-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.22_285/0.4)]",
    tag: "Cloud",
  },
  {
    id: "er-5",
    title: "ElderRocks",
    description: "ElderRocks — fast and reliable cloud delivery.",
    url: "https://dx6ons5d88zif.cloudfront.net/",
    accent: "from-amber-500/20 to-orange-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.75_0.2_60/0.4)]",
    tag: "Network",
  },
];

// ─── BookmarksTab ─────────────────────────────────────────────────────────────
function BookmarksTab({ onOpen }: { onOpen: (item: LinkItem) => void }) {
  const [pwHash, setPwHash] = useState<string | null>(() =>
    localStorage.getItem(BM_PW_KEY),
  );
  const [locked, setLocked] = useState(true);

  // Set-password view state
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [setPwError, setSetPwError] = useState("");

  // Unlock view state
  const [unlockPw, setUnlockPw] = useState("");
  const [unlockError, setUnlockError] = useState("");

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(BM_ITEMS_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");

  const saveBookmarks = (items: BookmarkItem[]) => {
    setBookmarks(items);
    localStorage.setItem(BM_ITEMS_KEY, JSON.stringify(items));
  };

  const handleSetPassword = async () => {
    if (!newPw.trim() || !confirmPw.trim()) {
      setSetPwError("Both fields are required.");
      return;
    }
    if (newPw !== confirmPw) {
      setSetPwError("Passwords do not match.");
      return;
    }
    const hash = await hashPassword(newPw);
    localStorage.setItem(BM_PW_KEY, hash);
    setPwHash(hash);
    setLocked(false);
    setSetPwError("");
    setNewPw("");
    setConfirmPw("");
  };

  const handleUnlock = async () => {
    if (!unlockPw.trim()) {
      setUnlockError("Enter your password.");
      return;
    }
    const hash = await hashPassword(unlockPw);
    if (hash === pwHash) {
      setLocked(false);
      setUnlockError("");
      setUnlockPw("");
    } else {
      setUnlockError("Incorrect password.");
    }
  };

  const handleAddBookmark = () => {
    if (!addTitle.trim() || !addUrl.trim()) return;
    const url = addUrl.startsWith("http") ? addUrl : `https://${addUrl}`;
    const item: BookmarkItem = {
      id: Date.now().toString(),
      title: addTitle.trim(),
      url,
    };
    saveBookmarks([...bookmarks, item]);
    setAddTitle("");
    setAddUrl("");
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    saveBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const handleOpen = (bm: BookmarkItem) => {
    onOpen({
      id: bm.id,
      title: bm.title,
      url: bm.url,
      description: bm.url,
      accent: "from-violet-500/20 to-purple-600/10",
      glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.22_285/0.4)]",
      tag: "Bookmark",
    });
  };

  // ── View A: Set Password ──────────────────────────────────────────────────
  if (!pwHash) {
    return (
      <motion.div
        key="bm-set-pw"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto mt-8"
      >
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-8 shadow-[0_0_60px_oklch(0.6_0.22_285/0.12)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/15 border border-primary/30">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Protect Your Bookmarks
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm mb-6">
            Set a password to keep your bookmarks private. You'll need it each
            time you visit.
          </p>

          <div className="space-y-3">
            <input
              data-ocid="bookmarks.input"
              type="password"
              placeholder="New password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetPassword()}
              className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
            />
            <input
              data-ocid="bookmarks.textarea"
              type="password"
              placeholder="Confirm password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetPassword()}
              className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
            />
            {setPwError && (
              <p
                data-ocid="bookmarks.error_state"
                className="text-xs font-body text-red-400"
              >
                {setPwError}
              </p>
            )}
            <button
              data-ocid="bookmarks.submit_button"
              type="button"
              onClick={handleSetPassword}
              className="w-full py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_oklch(0.72_0.19_295/0.15)] hover:shadow-[0_0_30px_oklch(0.72_0.19_295/0.25)]"
            >
              Set Password
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── View B: Unlock ────────────────────────────────────────────────────────
  if (locked) {
    return (
      <motion.div
        key="bm-unlock"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto mt-8"
      >
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-8 shadow-[0_0_60px_oklch(0.6_0.22_285/0.12)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/15 border border-primary/30">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              BookMarks
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm mb-6">
            Enter your password to access your bookmarks.
          </p>

          <div className="space-y-3">
            <input
              data-ocid="bookmarks.search_input"
              type="password"
              placeholder="Password"
              value={unlockPw}
              onChange={(e) => setUnlockPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
            />
            {unlockError && (
              <p
                data-ocid="bookmarks.error_state"
                className="text-xs font-body text-red-400"
              >
                {unlockError}
              </p>
            )}
            <button
              data-ocid="bookmarks.primary_button"
              type="button"
              onClick={handleUnlock}
              className="w-full py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_oklch(0.72_0.19_295/0.15)] hover:shadow-[0_0_30px_oklch(0.72_0.19_295/0.25)]"
            >
              <span className="flex items-center justify-center gap-2">
                <Unlock className="w-4 h-4" />
                Unlock
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── View C: Unlocked Bookmarks ────────────────────────────────────────────
  return (
    <motion.div
      key="bm-unlocked"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-[0_0_60px_oklch(0.6_0.22_285/0.12)]">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/15 border border-primary/30">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              BookMarks
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-ocid="bookmarks.secondary_button"
              type="button"
              onClick={() => {
                setShowAddForm((v) => !v);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-foreground font-body text-xs font-semibold transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Bookmark
            </button>
            <button
              data-ocid="bookmarks.toggle"
              type="button"
              onClick={() => setLocked(true)}
              title="Lock bookmarks"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border text-muted-foreground hover:text-foreground font-body text-xs font-semibold transition-all duration-200"
            >
              <Lock className="w-3.5 h-3.5" />
              Lock
            </button>
          </div>
        </div>

        {/* Add form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              key="add-form"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="bg-background/40 border border-border rounded-xl p-4 space-y-3">
                <input
                  data-ocid="bookmarks.input"
                  type="text"
                  placeholder="Bookmark title"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
                />
                <input
                  data-ocid="bookmarks.search_input"
                  type="url"
                  placeholder="https://..."
                  value={addUrl}
                  onChange={(e) => setAddUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBookmark()}
                  className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
                />
                <div className="flex gap-2">
                  <button
                    data-ocid="bookmarks.save_button"
                    type="button"
                    onClick={handleAddBookmark}
                    className="flex-1 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body text-xs font-semibold transition-all duration-200"
                  >
                    Save
                  </button>
                  <button
                    data-ocid="bookmarks.cancel_button"
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setAddTitle("");
                      setAddUrl("");
                    }}
                    className="flex-1 py-2 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border text-muted-foreground font-body text-xs font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bookmark list */}
        {bookmarks.length === 0 ? (
          <div data-ocid="bookmarks.empty_state" className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/20 border border-border mb-4">
              <Bookmark className="w-5 h-5 text-muted-foreground/40" />
            </div>
            <p className="font-body text-muted-foreground text-sm">
              No bookmarks yet — add your first one above
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.map((bm, idx) => (
              <motion.div
                key={bm.id}
                data-ocid={`bookmarks.item.${idx + 1}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-background/30 hover:bg-background/50 border border-border hover:border-primary/30 cursor-pointer transition-all duration-200"
                onClick={() => handleOpen(bm)}
              >
                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                  <Bookmark className="w-3.5 h-3.5 text-primary/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold text-foreground truncate leading-tight">
                    {bm.title}
                  </p>
                  <p className="font-body text-xs text-muted-foreground truncate">
                    {getHostname(bm.url)}
                  </p>
                </div>
                <button
                  data-ocid={`bookmarks.delete_button.${idx + 1}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(bm.id);
                  }}
                  title="Delete bookmark"
                  className="flex-shrink-0 p-1.5 rounded-lg text-muted-foreground/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── ChatTab ──────────────────────────────────────────────────────────────────
interface GroupData {
  id: string; // room code (16-char hex)
  name: string;
  passwordHash: string;
  creatorUsername: string;
  members: string[];
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  ts: number;
}

const MY_ROOMS_KEY = "cosmos_my_rooms";

function getMyRooms(): GroupData[] {
  try {
    return JSON.parse(localStorage.getItem(MY_ROOMS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveMyRooms(rooms: GroupData[]) {
  localStorage.setItem(MY_ROOMS_KEY, JSON.stringify(rooms));
}

function getRoomMessages(roomId: string): ChatMessage[] {
  try {
    return JSON.parse(
      localStorage.getItem(`cosmos_room_${roomId}_msgs`) ?? "[]",
    );
  } catch {
    return [];
  }
}

function saveRoomMessages(roomId: string, msgs: ChatMessage[]) {
  localStorage.setItem(`cosmos_room_${roomId}_msgs`, JSON.stringify(msgs));
}

async function computeRoomCode(
  name: string,
  passwordHash: string,
): Promise<string> {
  const raw = `${name.toLowerCase().trim()}||${passwordHash}`;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

function encodeRoomCode(name: string, passwordHash: string): string {
  return btoa(`${name}||${passwordHash}`).replace(/=+$/, "");
}

function decodeRoomCode(
  code: string,
): { name: string; passwordHash: string } | null {
  try {
    const padded = code + "=".repeat((4 - (code.length % 4)) % 4);
    const decoded = atob(padded);
    const sep = decoded.indexOf("||");
    if (sep === -1) return null;
    return {
      name: decoded.slice(0, sep),
      passwordHash: decoded.slice(sep + 2),
    };
  } catch {
    return null;
  }
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

type ChatView = "list" | "room";

function ChatTab({ username }: { username: string }) {
  const [view, setView] = useState<ChatView>("list");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [roomGroup, setRoomGroup] = useState<GroupData | null>(null);

  // Form state — create (inline in list)
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createPw, setCreatePw] = useState("");
  const [createError, setCreateError] = useState("");

  // Form state — join (inline in list)
  const [showJoin, setShowJoin] = useState(false);
  const [joinName, setJoinName] = useState("");
  const [joinPw, setJoinPw] = useState("");
  const [joinError, setJoinError] = useState("");

  // Import room code
  const [importCode, setImportCode] = useState("");
  const [importError, setImportError] = useState("");

  // Room list
  const [rooms, setRooms] = useState<GroupData[]>(getMyRooms);

  // Chat room state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgText, setMsgText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // BroadcastChannel: sync messages across tabs on same browser
  useEffect(() => {
    if (view !== "room" || !selectedGroupId) return;
    const channel = new BroadcastChannel(`cosmos_room_${selectedGroupId}`);
    broadcastRef.current = channel;
    channel.onmessage = (ev) => {
      if (ev.data?.type === "new_message") {
        setMessages(getRoomMessages(selectedGroupId));
      }
    };
    return () => {
      channel.close();
      broadcastRef.current = null;
    };
  }, [view, selectedGroupId]);

  // Poll localStorage every 2s in room view (fallback for cross-tab sync)
  useEffect(() => {
    if (view !== "room" || !selectedGroupId) return;
    const refresh = () => setMessages(getRoomMessages(selectedGroupId));
    refresh();
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, [view, selectedGroupId]);

  // Scroll to bottom when messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger on message count
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Refresh room list when returning to list view
  useEffect(() => {
    if (view === "list") setRooms(getMyRooms());
  }, [view]);

  const openRoom = (group: GroupData) => {
    setSelectedGroupId(group.id);
    setRoomGroup(group);
    setMessages(getRoomMessages(group.id));
    setView("room");
  };

  const handleCreateGroup = async () => {
    const name = createName.trim();
    const pw = createPw.trim();
    if (!name || !pw) {
      setCreateError("Both fields are required.");
      return;
    }
    const hash = await hashPassword(pw);
    const roomCode = await computeRoomCode(name, hash);
    const existing = getMyRooms();
    if (existing.some((g) => g.id === roomCode)) {
      setCreateError("You already have a group with this name and password.");
      return;
    }
    const newRoom: GroupData = {
      id: roomCode,
      name,
      passwordHash: hash,
      creatorUsername: username,
      members: [username],
    };
    const updated = [...existing, newRoom];
    saveMyRooms(updated);
    setRooms(updated);
    setCreateName("");
    setCreatePw("");
    setCreateError("");
    setShowCreate(false);
    // Auto-open the room
    openRoom(newRoom);
  };

  const handleJoinGroup = async () => {
    const name = joinName.trim();
    const pw = joinPw.trim();
    if (!name || !pw) {
      setJoinError("Both fields are required.");
      return;
    }
    const hash = await hashPassword(pw);
    const roomCode = await computeRoomCode(name, hash);
    const existing = getMyRooms();
    if (existing.some((g) => g.id === roomCode)) {
      setJoinError("You are already in this group.");
      return;
    }
    const newRoom: GroupData = {
      id: roomCode,
      name,
      passwordHash: hash,
      creatorUsername: "",
      members: [username],
    };
    const updated = [...existing, newRoom];
    saveMyRooms(updated);
    setRooms(updated);
    setJoinName("");
    setJoinPw("");
    setJoinError("");
    setShowJoin(false);
    openRoom(newRoom);
  };

  const handleImportCode = () => {
    const code = importCode.trim();
    if (!code) return;
    const decoded = decodeRoomCode(code);
    if (!decoded) {
      setImportError("Invalid room code.");
      return;
    }
    computeRoomCode(decoded.name, decoded.passwordHash).then((roomCode) => {
      const existing = getMyRooms();
      if (existing.some((g) => g.id === roomCode)) {
        setImportError("You already have this room.");
        return;
      }
      const newRoom: GroupData = {
        id: roomCode,
        name: decoded.name,
        passwordHash: decoded.passwordHash,
        creatorUsername: "",
        members: [username],
      };
      const updated = [...existing, newRoom];
      saveMyRooms(updated);
      setRooms(updated);
      setImportCode("");
      setImportError("");
      openRoom(newRoom);
    });
  };

  const handleSendMessage = () => {
    if (!msgText.trim() || !selectedGroupId) return;
    const msg: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      author: username,
      text: msgText.trim(),
      ts: Date.now(),
    };
    const current = getRoomMessages(selectedGroupId);
    const updated = [...current, msg];
    saveRoomMessages(selectedGroupId, updated);
    setMessages(updated);
    setMsgText("");
    // Broadcast to other tabs
    broadcastRef.current?.postMessage({ type: "new_message" });
  };

  const handleCopyRoomCode = () => {
    if (!roomGroup) return;
    const code = encodeRoomCode(roomGroup.name, roomGroup.passwordHash);
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  // ── Room view ─────────────────────────────────────────────────────────────
  if (view === "room" && roomGroup) {
    return (
      <motion.div
        key="chat-room"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto flex flex-col"
        style={{ height: "calc(100vh - 280px)", minHeight: "480px" }}
        data-ocid="chat.panel"
      >
        {/* Room header */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-t-2xl bg-card/60 backdrop-blur-md border border-border border-b-0">
          <button
            type="button"
            data-ocid="chat.close_button"
            onClick={() => setView("list")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground text-xs font-body font-medium transition-all duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-display text-base font-semibold text-foreground truncate flex-1">
            {roomGroup.name}
          </span>
          {/* Share button — copies room code */}
          <button
            type="button"
            data-ocid="chat.secondary_button"
            onClick={handleCopyRoomCode}
            title="Copy room code to share with friends"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary hover:text-foreground text-xs font-body font-medium transition-all duration-150"
          >
            {copiedCode ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedCode ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-violet-500/8 border-x border-violet-500/20 px-4 py-2 flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
          <p className="font-body text-[11px] text-violet-300/70 leading-relaxed">
            Share the{" "}
            <span className="text-violet-300 font-semibold">room code</span>{" "}
            (tap Share above) with friends. They paste it in the Chat tab to
            join this room and chat together.
          </p>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-card/40 backdrop-blur-sm border-x border-border space-y-3">
          {messages.length === 0 ? (
            <div
              data-ocid="chat.empty_state"
              className="flex flex-col items-center justify-center h-full gap-3 text-center py-16"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary/50" />
              </div>
              <p className="font-body text-sm text-muted-foreground">
                No messages yet — start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.author === username;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex flex-col max-w-[70%] gap-1 ${isOwn ? "items-end" : "items-start"}`}
                  >
                    <span className="font-body text-[10px] text-muted-foreground/60 px-1">
                      {msg.author} · {formatTime(msg.ts)}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-2xl font-body text-sm leading-relaxed ${
                        isOwn
                          ? "bg-primary/20 border border-primary/30 text-foreground rounded-tr-sm"
                          : "bg-card/80 border border-border text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="flex gap-2 px-4 py-3 rounded-b-2xl bg-card/60 backdrop-blur-md border border-border border-t-0">
          <input
            data-ocid="chat.input"
            type="text"
            placeholder="Type a message..."
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
          />
          <button
            type="button"
            data-ocid="chat.submit_button"
            onClick={handleSendMessage}
            disabled={!msgText.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body text-sm font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Group list view (default) ─────────────────────────────────────────────
  return (
    <motion.div
      key="chat-list"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Group Chat
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="chat.secondary_button"
            onClick={() => {
              setShowJoin(!showJoin);
              setShowCreate(false);
              setJoinError("");
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-body text-xs font-semibold transition-all duration-200"
          >
            <LogIn className="w-3.5 h-3.5" />
            Join
          </button>
          <button
            type="button"
            data-ocid="chat.primary_button"
            onClick={() => {
              setShowCreate(!showCreate);
              setShowJoin(false);
              setCreateError("");
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/35 text-foreground font-body text-xs font-semibold transition-all duration-200 shadow-[0_0_16px_oklch(0.72_0.19_295/0.12)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Create
          </button>
        </div>
      </div>

      {/* Create form (inline) */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            key="create-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-card/60 backdrop-blur-md border border-primary/30 rounded-2xl p-5 shadow-[0_0_30px_oklch(0.72_0.19_295/0.1)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-primary/15 border border-primary/30">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Create a Group
                </h3>
              </div>
              <div className="space-y-3">
                <input
                  data-ocid="chat.input"
                  type="text"
                  placeholder="Group name (e.g. Squad Room)"
                  value={createName}
                  onChange={(e) => {
                    setCreateName(e.target.value);
                    setCreateError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateGroup();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <input
                  data-ocid="chat.input"
                  type="password"
                  placeholder="Group password (shared with friends)"
                  value={createPw}
                  onChange={(e) => {
                    setCreatePw(e.target.value);
                    setCreateError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateGroup();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <p className="text-[11px] text-muted-foreground/60 font-body">
                  Friends join using the same group name + password. Share the{" "}
                  <strong className="text-foreground/60">Room Code</strong> from
                  inside the chat for easy access.
                </p>
                {createError && (
                  <p
                    data-ocid="chat.error_state"
                    className="text-xs font-body text-red-400"
                  >
                    {createError}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    data-ocid="chat.primary_button"
                    onClick={handleCreateGroup}
                    className="flex-1 py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body font-semibold text-sm transition-all"
                  >
                    Create &amp; Enter
                  </button>
                  <button
                    type="button"
                    data-ocid="chat.cancel_button"
                    onClick={() => setShowCreate(false)}
                    className="px-4 py-2.5 rounded-xl bg-card/50 border border-border text-muted-foreground hover:text-foreground font-body text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join form (inline) */}
      <AnimatePresence>
        {showJoin && (
          <motion.div
            key="join-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-card/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_30px_oklch(0.68_0.22_190/0.08)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Join a Group
                </h3>
              </div>
              <div className="space-y-3">
                <input
                  data-ocid="chat.input"
                  type="text"
                  placeholder="Group name (exact, same as creator used)"
                  value={joinName}
                  onChange={(e) => {
                    setJoinName(e.target.value);
                    setJoinError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleJoinGroup();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                />
                <input
                  data-ocid="chat.input"
                  type="password"
                  placeholder="Group password"
                  value={joinPw}
                  onChange={(e) => {
                    setJoinPw(e.target.value);
                    setJoinError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleJoinGroup();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                />
                <p className="text-[11px] text-muted-foreground/60 font-body">
                  Or paste a{" "}
                  <strong className="text-foreground/60">Room Code</strong>{" "}
                  below to join instantly.
                </p>
                <div className="flex gap-2">
                  <input
                    data-ocid="chat.search_input"
                    type="text"
                    placeholder="Paste Room Code here..."
                    value={importCode}
                    onChange={(e) => {
                      setImportCode(e.target.value);
                      setImportError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleImportCode();
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground/40 font-body text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                  />
                  <button
                    type="button"
                    data-ocid="chat.secondary_button"
                    onClick={handleImportCode}
                    className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-body text-xs font-semibold transition-all"
                  >
                    Import
                  </button>
                </div>
                {importError && (
                  <p
                    data-ocid="chat.error_state"
                    className="text-xs font-body text-red-400"
                  >
                    {importError}
                  </p>
                )}
                {joinError && (
                  <p
                    data-ocid="chat.error_state"
                    className="text-xs font-body text-red-400"
                  >
                    {joinError}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    data-ocid="chat.primary_button"
                    onClick={handleJoinGroup}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/35 text-foreground font-body font-semibold text-sm transition-all"
                  >
                    Join &amp; Enter
                  </button>
                  <button
                    type="button"
                    data-ocid="chat.cancel_button"
                    onClick={() => setShowJoin(false)}
                    className="px-4 py-2.5 rounded-xl bg-card/50 border border-border text-muted-foreground hover:text-foreground font-body text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room list */}
      {rooms.length === 0 ? (
        <div
          data-ocid="chat.empty_state"
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_oklch(0.72_0.19_295/0.15)]">
            <MessageSquare className="w-7 h-7 text-primary/50" />
          </div>
          <div>
            <p className="font-body text-base font-semibold text-foreground mb-1">
              No chat rooms yet
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Create a room, then share the{" "}
              <strong className="text-foreground/60">Room Code</strong> with
              friends so they can join.
            </p>
          </div>
          <button
            type="button"
            data-ocid="chat.open_modal_button"
            onClick={() => {
              setShowCreate(true);
              setShowJoin(false);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-body text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_oklch(0.72_0.19_295/0.2)]"
          >
            <Plus className="w-4 h-4" />
            Create First Room
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              data-ocid={`chat.item.${idx + 1}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-200 shadow-[0_0_20px_oklch(0.04_0_0/0.5)]"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-primary/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-semibold text-foreground truncate">
                  {room.name}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Password protected
                  {room.creatorUsername === username && (
                    <span className="ml-1 text-primary/60">· Creator</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                data-ocid="chat.primary_button"
                onClick={() => openRoom(room)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/35 text-foreground font-body text-xs font-semibold transition-all duration-150 shadow-[0_0_12px_oklch(0.72_0.19_295/0.12)]"
              >
                Open
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── School Bypass Links ──────────────────────────────────────────────────────
const _schoolBypassLinks: LinkItem[] = [
  {
    id: "bypass-1",
    title: "Google",
    description:
      "Access Google search and all its services — bypassed so it loads even when blocked.",
    url: "https://google.com",
    accent: "from-blue-500/20 to-cyan-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.22_260/0.4)]",
    tag: "Search",
  },
  {
    id: "bypass-2",
    title: "Defly.io",
    description:
      "Team-based flying shooter game — build bases, shoot enemies, control territory.",
    url: "https://defly.io",
    accent: "from-green-500/20 to-emerald-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.2_130/0.4)]",
    tag: "Game",
  },
  {
    id: "bypass-3",
    title: "Diep.io",
    description:
      "Tank battle arena — upgrade your tank, destroy shapes and players to level up.",
    url: "https://diep.io",
    accent: "from-orange-500/20 to-yellow-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.78_0.18_60/0.4)]",
    tag: "Game",
  },
  {
    id: "bypass-4",
    title: "SafeShare",
    description:
      "Watch YouTube videos safely without ads, comments, or distractions — school-friendly.",
    url: "https://safeshare.tv",
    accent: "from-teal-500/20 to-green-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.68_0.18_175/0.4)]",
    tag: "Video",
  },
  {
    id: "bypass-5",
    title: "ViewPure",
    description:
      "Clean, distraction-free YouTube player — just the video, nothing else.",
    url: "https://viewpure.com",
    accent: "from-purple-500/20 to-violet-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.6_0.22_280/0.4)]",
    tag: "Video",
  },
  {
    id: "bypass-6",
    title: "Watchkin",
    description:
      "Kid-friendly YouTube viewer that filters inappropriate content and ads.",
    url: "https://watchkin.com",
    accent: "from-pink-500/20 to-rose-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.18_340/0.4)]",
    tag: "Video",
  },
  {
    id: "bypass-7",
    title: "Y2meta",
    description:
      "Download YouTube videos and convert them to MP3 or MP4 — fast and free.",
    url: "https://www.y2meta.com",
    accent: "from-red-500/20 to-orange-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.22_30/0.4)]",
    tag: "Downloader",
  },
];

// ─── AppInner ─────────────────────────────────────────────────────────────────
type MainTab =
  | "links"
  | "space"
  | "daydream"
  | "rosin"
  | "galaxyv6"
  | "cherri"
  | "elderrocks"
  | "bookmarks"
  | "chat";

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: "links", label: "Links" },
  { id: "space", label: "Space" },
  { id: "daydream", label: "Day Dream X" },
  { id: "rosin", label: "Rosin" },
  { id: "galaxyv6", label: "Galaxy V6" },
  { id: "cherri", label: "Cherri" },
  { id: "elderrocks", label: "ElderRocks" },
  { id: "bookmarks", label: "BookMarks" },
  { id: "chat", label: "Chat" },
];

function AppInner() {
  const [cursorColor, setCursorColor] = useState("#3b82f6");
  const [bgIndex, setBgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<MainTab>("links");
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

            {/* Tab navigation */}
            <nav className="flex flex-wrap justify-center gap-2 mb-8 px-6">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`nav.${tab.id}.tab`}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "px-5 py-2 rounded-full text-sm font-body font-semibold tracking-wide transition-all duration-200 border flex items-center gap-1.5",
                    activeTab === tab.id
                      ? "bg-primary/20 border-primary/50 text-foreground shadow-[0_0_16px_oklch(0.72_0.19_295/0.25)]"
                      : "bg-card/40 border-border text-muted-foreground hover:border-border hover:bg-card/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {tab.id === "chat" && (
                    <MessageSquare className="w-3.5 h-3.5" />
                  )}
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Main content */}
            <main className="flex-1 px-6 pb-12">
              <AnimatePresence mode="wait">
                {activeTab === "links" && (
                  <motion.div
                    key="links"
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
                )}
                {activeTab === "space" && (
                  <motion.div
                    key="space"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {spaceLinks.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="space"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "daydream" && (
                  <motion.div
                    key="daydream"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {dayDreamLinks.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="daydream"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "rosin" && (
                  <motion.div
                    key="rosin"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {rosinLinks.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="rosin"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "galaxyv6" && (
                  <motion.div
                    key="galaxyv6"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {galaxyV6Links.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="galaxyv6"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "cherri" && (
                  <motion.div
                    key="cherri"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {cherriLinks.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="cherri"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "elderrocks" && (
                  <motion.div
                    key="elderrocks"
                    className="flex flex-wrap gap-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {elderRocksLinks.map((link, index) => (
                      <LinkCard
                        key={link.id}
                        item={link}
                        ocidPrefix="elderrocks"
                        index={index}
                        onOpen={setOpenedLink}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab === "bookmarks" && (
                  <BookmarksTab key="bookmarks" onOpen={setOpenedLink} />
                )}
                {activeTab === "chat" && (
                  <ChatTab key="chat" username={username ?? "Guest"} />
                )}
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
