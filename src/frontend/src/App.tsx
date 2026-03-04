import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  accent: string;
  glowColor: string;
  tag: string;
}

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
    title: "Duck Duck Go",
    description:
      "Private, proxy-powered search — nothing you look up is saved or tracked, and all results are fully unblocked.",
    url: "https://duckduckgo.com/",
    accent: "from-orange-500/20 to-amber-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.75_0.18_55/0.4)]",
    tag: "Private Search",
  },
];

const movies: LinkItem[] = [
  {
    id: "1",
    title: "Tubi",
    description:
      "Free movies and TV — thousands of titles, no subscription required.",
    url: "https://tubitv.com/",
    accent: "from-red-500/20 to-rose-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.2_25/0.4)]",
    tag: "Free Movies",
  },
  {
    id: "2",
    title: "Pluto TV",
    description:
      "Free streaming TV with movies, live channels, and on-demand content.",
    url: "https://pluto.tv/",
    accent: "from-blue-500/20 to-indigo-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.65_0.2_250/0.4)]",
    tag: "Free Streaming",
  },
  {
    id: "3",
    title: "Crackle",
    description:
      "Free movies and originals from Sony Pictures — no subscription needed.",
    url: "https://www.crackle.com/",
    accent: "from-yellow-500/20 to-orange-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.78_0.18_80/0.4)]",
    tag: "Movies",
  },
  {
    id: "4",
    title: "Kanopy",
    description: "Free classic and indie films through your library card.",
    url: "https://www.kanopy.com/",
    accent: "from-fuchsia-500/20 to-purple-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.72_0.19_315/0.4)]",
    tag: "Classic Films",
  },
  {
    id: "5",
    title: "Plex",
    description: "Free movies and TV with a huge on-demand catalog.",
    url: "https://watch.plex.tv/",
    accent: "from-lime-500/20 to-green-600/10",
    glowColor: "group-hover:shadow-[0_0_40px_oklch(0.75_0.2_145/0.4)]",
    tag: "Movies & TV",
  },
];

// Pre-generated star data to avoid Math.random in render
const stars = Array.from({ length: 60 }, (_, i) => ({
  id: `star-${i}`,
  width: ((i * 7 + 3) % 20) / 10 + 0.5,
  height: ((i * 11 + 5) % 20) / 10 + 0.5,
  left: ((i * 137.508) % 100).toFixed(2),
  top: ((i * 97.6) % 100).toFixed(2),
  opacity: ((i * 13) % 50) / 100 + 0.1,
  animOpacity: ((i * 17) % 60) / 100 + 0.1,
  duration: ((i * 3) % 30) / 10 + 2,
  delay: ((i * 7) % 40) / 10,
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
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
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block rounded-2xl border border-border bg-card p-6 cursor-pointer transition-all duration-300 ${item.glowColor} overflow-hidden`}
    >
      {/* Card gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
      />

      {/* Subtle shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-200">
              {item.tag}
            </span>
            <span className="block w-1 h-1 rounded-full bg-border" />
            <span className="font-body text-[10px] text-muted-foreground/50">
              {new URL(item.url).hostname}
            </span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-white transition-colors duration-200 mb-1.5 leading-tight">
            {item.title}
          </h2>
          <p className="font-body text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 mt-0.5">
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
      </div>
    </motion.a>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[oklch(0.72_0.19_295/0.08)] blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-[oklch(0.68_0.22_190/0.07)] blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full bg-[oklch(0.75_0.18_340/0.06)] blur-[90px]" />
      </div>

      {/* Star particles */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
            animate={{ opacity: [null, 0.05, star.animOpacity] }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: star.delay,
            }}
          />
        ))}
      </div>

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

        {/* Main content */}
        <main className="flex-1 px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="links" className="w-full">
              <TabsList className="w-full mb-8 bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-1 h-auto">
                <TabsTrigger
                  value="links"
                  data-ocid="nav.links.tab"
                  className="flex-1 rounded-xl py-2.5 text-sm font-body font-medium tracking-wide data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_16px_oklch(0.72_0.19_295/0.3)] text-muted-foreground transition-all duration-200"
                >
                  Links
                </TabsTrigger>
                <TabsTrigger
                  value="movies"
                  data-ocid="nav.movies.tab"
                  className="flex-1 rounded-xl py-2.5 text-sm font-body font-medium tracking-wide data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 data-[state=active]:shadow-[0_0_16px_oklch(0.65_0.2_25/0.3)] text-muted-foreground transition-all duration-200"
                >
                  Movies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="links" className="mt-0">
                <motion.div
                  className="grid gap-4"
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
              </TabsContent>

              <TabsContent value="movies" className="mt-0">
                <motion.div
                  className="grid gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {movies.map((movie, index) => (
                    <LinkCard
                      key={movie.id}
                      item={movie}
                      ocidPrefix="movies"
                      index={index}
                    />
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
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
