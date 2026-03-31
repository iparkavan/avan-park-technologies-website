"use client";

import { useEffect, useRef, useState, FC, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CardProps {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
}

interface ParallaxCardProps {
  children: ReactNode;
  yFactor?: number;
  delay?: number;
  className?: string;
}

// ── Card ──────────────────────────────────────────────────────────────────────
const Card: FC<CardProps> = ({ className = "", children, ...props }) => (
  <div className={`rounded-2xl overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar: FC<AvatarProps> = ({ src, alt, className = "" }) => (
  <div
    className={`relative rounded-full overflow-hidden border-2 border-[#1a1a1a] shrink-0 ${className}`}
    style={{ width: 40, height: 40 }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

// ── Grain overlay ─────────────────────────────────────────────────────────────
const GrainOverlay: FC = () => (
  <div
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px",
    }}
  />
);

// ── Animated Number ───────────────────────────────────────────────────────────
const AnimatedNumber: FC<AnimatedNumberProps> = ({ target, suffix = "" }) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ── Parallax Card ─────────────────────────────────────────────────────────────
const ParallaxCard: FC<ParallaxCardProps> = ({
  children,
  yFactor = 40,
  delay = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [yFactor, -yFactor],
  );
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Shared configs ────────────────────────────────────────────────────────────
const hoverScale = {
  scale: 1.025,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

const avatarSrcs: string[] = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start 100%", "start 0%"],
  });

  const margin: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [40, 0],
  );
  const radius: MotionValue<number> = useTransform(scrollY, [0, 300], [24, 24]);

  return (
    <motion.div
      ref={ref}
      className="min-h-screen relative"
      style={{
        background: "#141414",
        fontFamily: "'Satoshi', 'DM Sans', sans-serif",
        marginLeft: margin,
        marginRight: margin,
        borderRadius: radius,
      }}
    >
      <GrainOverlay />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-[-100px] left-[-60px] w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6c3fc5 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14 relative z-10">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-indie underline leading-none tracking-tight text-white"
            style={{
              // fontFamily: "'Clash Display', 'Satoshi', sans-serif",
              // letterSpacing: "-0.03em",
              fontSize: "clamp(40px, 9vw, 86px)",
            }}
          >
            Overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#a1a1aa] text-sm sm:text-base lg:text-lg leading-relaxed sm:max-w-[240px] lg:max-w-xs sm:text-right sm:mt-2 lg:mt-3"
          >
            We've passionately brought projects to life since our inception.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MOBILE < 640px — single column stacked layout
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Row 1: Projects + Impressions side by side */}
          <div className="grid grid-cols-2 gap-3">
            <ParallaxCard delay={0.05}>
              <motion.div whileHover={hoverScale}>
                <Card
                  className="p-5 flex flex-col justify-between min-h-[160px] cursor-pointer relative group"
                  style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
                >
                  <p className="text-[38px] font-black leading-none text-white">
                    <AnimatedNumber target={100} suffix="+" />
                  </p>
                  <div>
                    <p className="text-sm font-bold text-white">Projects</p>
                    <p className="text-[#6b7280] text-xs leading-relaxed mt-1">
                      Branding, SEO & more
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#6c3fc5] transition-all duration-500 rounded-full" />
                </Card>
              </motion.div>
            </ParallaxCard>

            <ParallaxCard delay={0.08}>
              <motion.div whileHover={hoverScale}>
                <Card
                  className="p-5 flex flex-col justify-between min-h-[160px] cursor-pointer"
                  style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
                >
                  <p className="text-[38px] font-black leading-none text-white">
                    <AnimatedNumber target={5} suffix="M+" />
                  </p>
                  <div>
                    <p className="text-sm font-bold text-white">Impressions</p>
                    <p className="text-[#6b7280] text-xs leading-relaxed mt-1">
                      5M+ impressions
                    </p>
                  </div>
                </Card>
              </motion.div>
            </ParallaxCard>
          </div>

          {/* Purple team card — full width */}
          <ParallaxCard delay={0.1}>
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-6 flex flex-col justify-between min-h-[200px] cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #6d28d9 0%, #4c1d95 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute top-[-40px] right-[-40px] w-[130px] h-[130px] rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, #fff 0%, transparent 70%)",
                  }}
                />
                <p className="text-[48px] font-black leading-none text-white">
                  <AnimatedNumber target={16} suffix="+" />
                </p>
                <div>
                  <p className="text-xl font-bold text-white mb-2">
                    Team Members
                  </p>
                  <p className="text-[#c4b5fd] text-sm leading-relaxed mb-4">
                    A dynamic team of creatives shaping ideas into stunning
                    realities
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 rounded-full bg-white text-[#4c1d95] text-sm font-semibold"
                  >
                    Know More
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* iPad image — full width */}
          <ParallaxCard delay={0.12}>
            <Card
              className="overflow-hidden cursor-pointer"
              style={{ height: 180 }}
            >
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"
                alt="iPad device"
                className="w-full h-full object-cover"
              />
            </Card>
          </ParallaxCard>

          {/* Row 3: Jars + Clients */}
          <div className="grid grid-cols-2 gap-3">
            <ParallaxCard delay={0.14}>
              <Card
                className="overflow-hidden cursor-pointer"
                style={{ height: 160 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1596465157267-0d0fd00b2d8e?w=600&q=80"
                  alt="Branded jars"
                  className="w-full h-full object-cover"
                />
              </Card>
            </ParallaxCard>

            <ParallaxCard delay={0.16}>
              <motion.div whileHover={hoverScale}>
                <Card
                  className="p-5 flex flex-col justify-between cursor-pointer"
                  style={{ background: "#ffffff", height: 160 }}
                >
                  <p className="text-[38px] font-black leading-none text-[#111827]">
                    <AnimatedNumber target={50} suffix="+" />
                  </p>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Clients</p>
                    <p className="text-[#6b7280] text-xs leading-relaxed mt-1">
                      Tech, Healthcare & beyond
                    </p>
                  </div>
                </Card>
              </motion.div>
            </ParallaxCard>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TABLET 640–1023px — 2-column asymmetric grid
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden sm:grid lg:hidden gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto auto",
          }}
        >
          {/* 100+ Projects */}
          <ParallaxCard delay={0.06}>
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-6 flex flex-col justify-between min-h-[190px] cursor-pointer relative group"
                style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
              >
                <p className="text-[52px] font-black leading-none text-white">
                  <AnimatedNumber target={100} suffix="+" />
                </p>
                <div>
                  <p className="text-lg font-bold text-white mb-1">Projects</p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Across Branding, Packaging, SEO, Product design and
                    development!
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#6c3fc5] transition-all duration-500 rounded-full" />
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Purple — spans 2 rows */}
          <ParallaxCard delay={0.1} className="row-span-2">
            <motion.div whileHover={hoverScale} className="h-full">
              <Card
                className="p-6 flex flex-col justify-between h-full min-h-[400px] cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #6d28d9 0%, #4c1d95 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute top-[-50px] right-[-50px] w-[160px] h-[160px] rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, #fff 0%, transparent 70%)",
                  }}
                />
                <p className="text-[64px] font-black leading-none text-white">
                  <AnimatedNumber target={16} suffix="+" />
                </p>
                <div>
                  <p className="text-2xl font-bold text-white mb-2">
                    Team Members
                  </p>
                  <p className="text-[#c4b5fd] text-sm leading-relaxed mb-5">
                    A dynamic team of creatives shaping ideas into stunning
                    realities
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f0ebff" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 rounded-full bg-white text-[#4c1d95] text-sm font-semibold"
                  >
                    Know More
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Jars */}
          <ParallaxCard delay={0.08}>
            <Card
              className="overflow-hidden cursor-pointer"
              style={{ minHeight: 190 }}
            >
              <img
                src="https://images.unsplash.com/photo-1596465157267-0d0fd00b2d8e?w=600&q=80"
                alt="Branded jars"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ minHeight: 190 }}
              />
            </Card>
          </ParallaxCard>

          {/* iPad */}
          <ParallaxCard delay={0.12}>
            <Card
              className="overflow-hidden cursor-pointer"
              style={{ minHeight: 190 }}
            >
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80"
                alt="iPad device"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ minHeight: 190 }}
              />
            </Card>
          </ParallaxCard>

          {/* 5M+ */}
          <ParallaxCard delay={0.14}>
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-6 flex flex-col justify-between min-h-[190px] cursor-pointer"
                style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
              >
                <p className="text-[52px] font-black leading-none text-white">
                  <AnimatedNumber target={5} suffix="M+" />
                </p>
                <div>
                  <p className="text-lg font-bold text-white mb-1">
                    Impressions
                  </p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    5M+ impressions and 3M+ views in one year
                  </p>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* 50+ Clients */}
          <ParallaxCard delay={0.16}>
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-6 flex flex-col justify-between min-h-[190px] cursor-pointer"
                style={{ background: "#ffffff" }}
              >
                <p className="text-[52px] font-black leading-none text-[#111827]">
                  <AnimatedNumber target={50} suffix="+" />
                </p>
                <div>
                  <p className="text-lg font-bold text-[#111827] mb-1">
                    Clients
                  </p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Across Technology, Healthcare, Finance, and beyond
                  </p>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DESKTOP 1024px+ — original 4-column bento layout
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden lg:grid gap-4 xl:gap-5"
          style={{
            gridTemplateColumns: "1fr 1.15fr 1fr 0.9fr",
            gridTemplateRows: "auto auto",
          }}
        >
          {/* Card 1 — 100+ Projects */}
          <ParallaxCard delay={0.1} yFactor={30} className="row-start-1">
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-7 flex flex-col justify-between h-full min-h-[220px] cursor-pointer group relative"
                style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
              >
                <div>
                  <p
                    className="text-[64px] font-black leading-none text-white mb-3"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    <AnimatedNumber target={100} suffix="+" />
                  </p>
                  <p className="text-xl font-bold text-white mb-3">Projects</p>
                </div>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  Across Branding, Packaging, SEO, Product design and
                  development!
                </p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#6c3fc5] transition-all duration-500 rounded-full" />
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Card 2 — 16+ Team Members (purple tall) */}
          <ParallaxCard
            delay={0.18}
            yFactor={-20}
            className="row-start-1 row-span-2"
          >
            <motion.div whileHover={hoverScale} className="h-full">
              <Card
                className="p-7 flex flex-col justify-between h-full min-h-[468px] cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #6d28d9 0%, #4c1d95 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, #fff 0%, transparent 70%)",
                  }}
                />
                <p
                  className="text-[72px] font-black leading-none text-white"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <AnimatedNumber target={16} suffix="+" />
                </p>
                <div>
                  <p className="text-2xl font-bold text-white mb-3">
                    Team Members
                  </p>
                  <p className="text-[#c4b5fd] text-sm leading-relaxed mb-6">
                    A dynamic team of creatives shaping ideas into stunning
                    realities
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f0ebff" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 rounded-full bg-white text-[#4c1d95] text-sm font-semibold transition-colors"
                  >
                    Know More
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Card 3 — iPad image */}
          <ParallaxCard delay={0.22} yFactor={25} className="row-start-1">
            <motion.div whileHover={hoverScale}>
              <Card
                className="overflow-hidden h-full min-h-[220px] cursor-pointer"
                style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80"
                  alt="iPad device"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ minHeight: 220 }}
                />
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Card 4 — 5M+ Impressions */}
          <ParallaxCard delay={0.28} yFactor={20} className="row-start-1">
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-7 flex flex-col justify-between h-full min-h-[220px] cursor-pointer"
                style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
              >
                <p
                  className="text-[64px] font-black leading-none text-white"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <AnimatedNumber target={5} suffix="M+" />
                </p>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-white mb-2">
                    Impressions
                  </p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Generated 5M+ impressions and over 3M+ views in one year
                  </p>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Card 5 — Jar photo */}
          <ParallaxCard delay={0.14} yFactor={-30} className="row-start-2">
            <motion.div whileHover={hoverScale}>
              <Card
                className="overflow-hidden cursor-pointer"
                style={{
                  background: "#1c1c1c",
                  border: "1px solid #2a2a2a",
                  minHeight: 220,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1596465157267-0d0fd00b2d8e?w=600&q=80"
                  alt="Branded jars"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ minHeight: 220 }}
                />
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Card 6 — 50+ Clients */}
          <ParallaxCard delay={0.26} yFactor={-20} className="row-start-2">
            <motion.div whileHover={hoverScale}>
              <Card
                className="p-7 flex flex-col justify-between cursor-pointer"
                style={{ background: "#ffffff", minHeight: 220 }}
              >
                <p
                  className="text-[64px] font-black leading-none text-[#111827]"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <AnimatedNumber target={50} suffix="+" />
                </p>
                <div className="mt-auto">
                  <p className="text-xl font-bold text-[#111827] mb-2">
                    Clients
                  </p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Across Technology, Healthcare, Finance, and beyond
                  </p>
                </div>
              </Card>
            </motion.div>
          </ParallaxCard>

          {/* Grid spacer */}
          <div className="row-start-2" />
        </div>

        {/* ── About Us Footer Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.005 }}
          className="mt-3 rounded-2xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 cursor-pointer gap-3"
          style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="flex -space-x-3 shrink-0">
              {avatarSrcs.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Avatar src={src} alt={`Team member ${i + 1}`} />
                </motion.div>
              ))}
            </div>
            <p className="text-white text-base sm:text-xl font-bold truncate">
              About Us
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 24px rgba(109,40,217,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-4 sm:px-6 lg:px-7 py-2 sm:py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold shrink-0"
            style={{
              background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
            }}
          >
            Know More
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </motion.div>
  );
}

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function Overview() {
//   const ref = useRef(null);

//   const { scrollYProgress, scrollY } = useScroll({
//     target: ref,
//     offset: ["start 100%", "start 0%"],
//     // 👆 animation happens within viewport entry
//   });

//   // Fast + visible expansion within 100vh
//   const margin = useTransform(scrollYProgress, [0, 1], [60, 0]);
//   //   const { scrollY } = useScroll();

//   //   // Animate margin from 20px → 0px
//   //   const margin = useTransform(scrollY, [30, 300], [50, 50]);

//   //   // Optional: smooth border radius shrink
//   const radius = useTransform(scrollY, [0, 300], [24, 24]);
//   return (
//     <motion.section
//       //   style={{
//       //     marginLeft: margin,
//       //     marginRight: margin,
//       //     borderRadius: radius,
//       //   }}
//       ref={ref}
//       style={{
//         marginLeft: margin,
//         marginRight: margin,
//         borderRadius: radius,
//       }}
//       className="bg-secondary rounded-t-3xl h-screen p-6"
//     >
//       <div className="max-w-6xl mx-auto text-center">
//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-6xl text-primary font-display font-semibold font-indie underline tracking-tight"
//         >
//           Overview
//         </motion.h2>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
//         >
//           We don’t just build products — we craft digital experiences that
//           deliver impact, clarity, and growth.
//         </motion.p>

//         {/* Cards */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Card 1 */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
//           >
//             <h3 className="text-xl font-semibold mb-3">Strategy</h3>
//             <p className="text-muted-foreground">
//               Clear product thinking and structured planning to build what truly
//               matters.
//             </p>
//           </motion.div>

//           {/* Card 2 */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
//           >
//             <h3 className="text-xl font-semibold mb-3">Design</h3>
//             <p className="text-muted-foreground">
//               Clean, modern UI/UX focused on usability and conversion.
//             </p>
//           </motion.div>

//           {/* Card 3 */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="p-8 rounded-2xl bg-muted/40 backdrop-blur-sm border border-border shadow-sm"
//           >
//             <h3 className="text-xl font-semibold mb-3">Development</h3>
//             <p className="text-muted-foreground">
//               Scalable, high-performance web apps built with modern tech.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }
