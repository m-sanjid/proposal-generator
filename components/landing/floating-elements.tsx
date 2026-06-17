"use client"

import { motion } from "motion/react"

interface FloatingElementProps {
  className?: string
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function FloatingElement({
  className = "",
  delay = 0,
  duration = 6,
  children
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Predefined floating shapes for backgrounds
export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple orb top right */}
      <FloatingElement
        className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-violet-500/10 blur-3xl"
        delay={0}
        duration={8}
      >
        <div className="w-full h-full" />
      </FloatingElement>

      {/* Blue orb bottom left */}
      <FloatingElement
        className="absolute bottom-40 left-[10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
        delay={2}
        duration={10}
      >
        <div className="w-full h-full" />
      </FloatingElement>

      {/* Small accent shapes */}
      <FloatingElement
        className="absolute top-1/3 left-[20%]"
        delay={1}
        duration={5}
      >
        <div className="w-3 h-3 rounded-full bg-violet-400/40" />
      </FloatingElement>

      <FloatingElement
        className="absolute top-1/2 right-[25%]"
        delay={0.5}
        duration={4}
      >
        <div className="w-2 h-2 rounded-full bg-purple-400/50" />
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-1/3 right-[15%]"
        delay={1.5}
        duration={6}
      >
        <div className="w-4 h-4 rotate-45 bg-indigo-400/30" />
      </FloatingElement>

      <FloatingElement
        className="absolute top-[60%] left-[30%]"
        delay={2.5}
        duration={7}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
      </FloatingElement>
    </div>
  )
}

// Animated grid pattern
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 grid-pattern opacity-30"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--landing-bg)_70%)]" />
    </div>
  )
}

// Particles effect
export function ParticlesBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
