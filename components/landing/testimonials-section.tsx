"use client"

import { motion, useInView } from "motion/react"
import { useRef, useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { LandingSection, LandingSectionHeader } from "./landing-section"

const testimonials = [
  {
    quote:
      "ProposalFlow has completely transformed how we create client proposals. We've cut our proposal time by 70%.",
    author: "Sarah Chen",
    role: "Founder",
    company: "DesignLab Studio",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "The templates are beautiful and professional. Our clients are always impressed with the quality.",
    author: "Michael Rodriguez",
    role: "Sales Director",
    company: "TechForward Inc",
    avatar: "MR",
    rating: 5,
  },
  {
    quote:
      "Finally, a proposal tool that's as easy to use as it is powerful. The e-signature feature alone saved us hours.",
    author: "Emily Watson",
    role: "Creative Director",
    company: "Brightwave Agency",
    avatar: "EW",
    rating: 5,
  },
  {
    quote:
      "Our close rate increased by 40% after switching to ProposalFlow. The analytics are game-changing.",
    author: "David Park",
    role: "CEO",
    company: "Growth Ventures",
    avatar: "DP",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but the AI templates are incredibly smart. They nail our brand every time.",
    author: "Jessica Liu",
    role: "Marketing Lead",
    company: "Innovate Labs",
    avatar: "JL",
    rating: 5,
  },
  {
    quote:
      "The collaboration features make it so easy to work with my team. We can all edit proposals in real-time.",
    author: "James Wilson",
    role: "Account Manager",
    company: "Scale Agency",
    avatar: "JW",
    rating: 5,
  },
]

const allTestimonials = [...testimonials, ...testimonials]

const stats = [
  { value: 2500, suffix: "+", label: "Happy customers" },
  { value: 50000, suffix: "+", label: "Proposals created" },
  { value: 87, suffix: "%", label: "Win rate increase" },
  { value: 4.9, suffix: "/5", label: "Average rating", isDecimal: true },
]

function useAnimatedCounter(value: number, isDecimal: boolean = false, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      if (isDecimal) {
        setCount(parseFloat((easeOut * value).toFixed(1)))
      } else {
        setCount(Math.floor(easeOut * value))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration, isDecimal])

  return { count, ref }
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <div className="w-[350px] flex-shrink-0 sm:w-[400px]">
      <motion.div
        className="group relative h-full rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--landing-accent)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <Quote className="absolute top-4 right-4 h-8 w-8 text-[var(--landing-muted)]/20 transition-colors group-hover:text-violet-500/30" />

        <div className="mb-4 flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              viewport={{ once: true }}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[var(--landing-muted)] sm:text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-semibold text-white"
            whileHover={{ scale: 1.1 }}
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <p className="text-sm font-medium">{testimonial.author}</p>
            <p className="text-xs text-[var(--landing-muted)]">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.div>
    </div>
  )
}

function TestimonialMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--landing-bg)] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[var(--landing-bg)] to-transparent" />

      <motion.div
        className="flex gap-6 py-4"
        animate={{ x: [0, -50 * testimonials.length * 8] }}
        transition={{
          x: {
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {allTestimonials.map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.author}-${i}`} testimonial={testimonial} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

function StatsSection() {
  return (
    <motion.div
      className="mt-16 grid grid-cols-2 gap-8 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-8 py-12 text-center md:grid-cols-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      viewport={{ once: true }}
    >
      {stats.map((stat, i) => {
        const { count, ref } = useAnimatedCounter(stat.value, stat.isDecimal)

        return (
          <motion.div
            key={stat.label}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="mb-2 text-4xl font-bold md:text-5xl">
              {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}
              <span className="text-violet-500">{stat.suffix}</span>
            </div>
            <div className="text-sm text-[var(--landing-muted)]">{stat.label}</div>
            <div className="absolute inset-0 -z-10 rounded-lg bg-violet-500/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <LandingSection id="testimonials" className="relative">
      <div className="pointer-events-none absolute inset-0 grid-pattern-subtle" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      <LandingSectionHeader
        badge="TESTIMONIALS"
        title={
          <>
            Loved by <span className="gradient-text-purple">teams</span> everywhere
          </>
        }
        description="See what professionals are saying about ProposalFlow"
      />

      <TestimonialMarquee />
      <StatsSection />
    </LandingSection>
  )
}
