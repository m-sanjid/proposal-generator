"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(easeOut * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  // Format number with commas
  const formattedValue = displayValue.toLocaleString()

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  )
}

// Stat item with animated counter
interface StatItemProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  index?: number
}

export function StatItem({ value, suffix = "", prefix = "", label, index = 0 }: StatItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div
        className="mb-2 text-4xl font-bold md:text-5xl"
        style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
      >
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-sm text-[var(--landing-muted)]">{label}</div>
    </motion.div>
  )
}
