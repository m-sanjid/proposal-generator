"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { FileText, Eye, Palette, Download, Zap, Shield } from "lucide-react"
import { LandingSection, LandingSectionHeader } from "./landing-section"

const features = [
  {
    id: "editor",
    title: "Rich Text Editor",
    description: "Format executive summaries, scope, and terms with bold, lists, and links — no markdown required.",
    icon: FileText,
    size: "large",
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-500 dark:text-violet-400",
    accentColor: "violet",
  },
  {
    id: "preview",
    title: "Live Preview",
    description: "See your proposal come to life in real-time as you build it.",
    icon: Eye,
    size: "small",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
    accentColor: "blue",
  },
  {
    id: "templates",
    title: "Smart Templates",
    description: "Start from professional templates for consulting, agencies, and freelancers.",
    icon: Zap,
    size: "small",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-500 dark:text-amber-400",
    accentColor: "amber",
  },
  {
    id: "branding",
    title: "Custom Branding",
    description: "Upload your logo, set theme colors, and tailor every section label.",
    icon: Palette,
    size: "small",
    gradient: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-500 dark:text-pink-400",
    accentColor: "pink",
  },
  {
    id: "storage",
    title: "Local Save",
    description: "Proposals save to your browser automatically. Your data stays on your device.",
    icon: Shield,
    size: "small",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    accentColor: "emerald",
  },
  {
    id: "export",
    title: "PDF Export",
    description: "Export polished PDFs with preserved formatting, or download a PNG snapshot instantly.",
    icon: Download,
    size: "large",
    gradient: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    accentColor: "cyan",
  },
]

interface FeatureCardProps {
  feature: (typeof features)[0]
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const Icon = feature.icon
  const isLarge = feature.size === "large"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={`relative group ${isLarge ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border p-6 transition-all duration-500 md:p-8 ${
          isHovered
            ? "border-[var(--landing-accent)] bg-[var(--landing-surface)]"
            : "border-[var(--landing-border)] bg-[var(--landing-surface)]/50"
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500`}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Spotlight effect following mouse */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
            }}
          />
        )}

        {/* Icon with animation */}
        <motion.div
          className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--landing-border)] bg-gradient-to-br ${feature.gradient}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className={`w-7 h-7 ${feature.iconColor}`} />

          {/* Icon glow on hover */}
          <motion.div
            className={`absolute inset-0 rounded-2xl blur-xl opacity-0 bg-gradient-to-br ${feature.gradient}`}
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
            {feature.title}
            {isLarge && (
              <motion.span
                className="rounded-full bg-[var(--landing-accent-soft)] px-2 py-0.5 text-xs text-[var(--landing-muted)]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Popular
              </motion.span>
            )}
          </h3>
          <p className="leading-relaxed text-[var(--landing-muted)]">
            {feature.description}
          </p>
        </div>

        {/* Corner decoration elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-bl-full opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${feature.accentColor === 'violet' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(59, 130, 246, 0.3)'}, transparent, transparent, ${feature.accentColor === 'violet' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(34, 211, 238, 0.2)'})`,
            padding: "1px",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

// Additional feature highlights
function FeatureHighlights() {
  const highlights = [
    { icon: Zap, text: "Lightning fast" },
    { icon: Shield, text: "Enterprise secure" },
  ]

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
    >
      {highlights.map(({ icon: Icon, text }, i) => (
        <motion.div
          key={text}
          className="flex items-center gap-2 rounded-full border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
        >
          <Icon className="h-4 w-4 text-violet-500" />
          <span className="text-sm text-[var(--landing-muted)]">{text}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <LandingSection id="features" className="relative">
      <div className="pointer-events-none absolute inset-0 grid-pattern-subtle" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <LandingSectionHeader
        badge="FEATURES"
        title={
          <>
            Everything you need to <span className="gradient-text-purple">win deals</span>
          </>
        }
        description="Create, customize, and close deals faster with our all-in-one proposal platform."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        <FeatureCard feature={features[0]} index={0} />
        <FeatureCard feature={features[1]} index={1} />
        <FeatureCard feature={features[2]} index={2} />
        <FeatureCard feature={features[3]} index={3} />
        <FeatureCard feature={features[4]} index={4} />
        <FeatureCard feature={features[5]} index={5} />
      </div>

      <FeatureHighlights />
    </LandingSection>
  )
}
