"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Check, Sparkles, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Up to 5 proposals",
      "Basic templates",
      "PDF export",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
    accentColor: "white",
  },
  {
    name: "Pro",
    description: "For growing teams",
    price: { monthly: 19, yearly: 15 },
    features: [
      "Unlimited proposals",
      "Premium templates",
      "PDF & PNG export",
      "Priority support",
      "Custom branding",
      "Team collaboration",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    popular: true,
    accentColor: "violet",
  },
  {
    name: "Team",
    description: "For growing agencies",
    price: { monthly: null, yearly: null },
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise option",
    ],
    cta: "Contact Us",
    popular: false,
    accentColor: "white",
  },
]

// Animated price display
function AnimatedPrice({ price, isYearly }: { price: number; isYearly: boolean }) {
  const displayPrice = isYearly ? price : price

  return (
    <motion.span
      key={displayPrice}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-5xl font-bold"
    >
      ₹{displayPrice}
    </motion.span>
  )
}

// Toggle switch component
function BillingToggle({ isYearly, setIsYearly }: { isYearly: boolean; setIsYearly: (value: boolean) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-[var(--landing-border)] bg-[var(--landing-surface)] p-1.5 glass-card">
      <button
        onClick={() => setIsYearly(false)}
        className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
          !isYearly ? "text-[var(--landing-bg)]" : "text-[var(--landing-muted)] hover:text-[var(--landing-fg)]"
        }`}
      >
        {!isYearly && (
          <motion.span
            layoutId="billingBg"
            className="absolute inset-0 rounded-full bg-[var(--landing-fg)] shadow-lg"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span className="relative z-10">Monthly</span>
      </button>
      <button
        onClick={() => setIsYearly(true)}
        className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
          isYearly ? "text-[var(--landing-bg)]" : "text-[var(--landing-muted)] hover:text-[var(--landing-fg)]"
        }`}
      >
        {isYearly && (
          <motion.span
            layoutId="billingBg"
            className="absolute inset-0 rounded-full bg-[var(--landing-fg)] shadow-lg"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          Yearly
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 text-xs font-medium rounded-full">
            Save 20%
          </span>
        </span>
      </button>
    </div>
  )
}

// Pricing card
function PricingCard({ plan, index, isYearly }: { plan: typeof plans[0]; index: number; isYearly: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.popular
          ? "bg-gradient-to-b from-violet-500/10 to-purple-500/5 border-2 border-violet-500/30"
          : "border border-[var(--landing-border)] bg-[var(--landing-surface)] hover:border-[var(--landing-accent)]"
        }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-medium rounded-full shadow-lg shadow-violet-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </span>
        </motion.div>
      )}

      {/* Glow effect for popular plan */}
      {plan.popular && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl -z-10"
          animate={{ opacity: isHovered ? 0.3 : 0.15 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Plan Info */}
      <div className="mb-6">
        <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
          {plan.name}
          {plan.popular && <Zap className="w-4 h-4 text-violet-400" />}
        </h3>
        <p className="text-sm text-[var(--landing-muted)]">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        {plan.price.monthly !== null ? (
          <div className="flex items-baseline gap-1">
            <AnimatedPrice
              price={isYearly ? plan.price.yearly : plan.price.monthly}
              isYearly={isYearly}
            />
            <span className="text-[var(--landing-muted)]">/month</span>
          </div>
        ) : (
          <div className="text-4xl font-bold">Custom</div>
        )}
        {isYearly && plan.price.yearly !== null && plan.price.yearly > 0 && (
          <motion.p
            className="mt-1 text-sm text-[var(--landing-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Billed annually
          </motion.p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + featureIndex * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <motion.div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular
                  ? "bg-violet-500/20"
                  : "bg-[var(--landing-accent-soft)]"
                }`}
              whileHover={{ scale: 1.2 }}
            >
              <Check className={`h-3 w-3 ${plan.popular ? "text-violet-500" : "text-[var(--landing-muted)]"}`} />
            </motion.div>
            <span className="text-sm text-[var(--landing-muted)]">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <Link href={plan.name === "Team" ? "mailto:hello@proposalflow.com" : "/editor?new=true"}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative w-full overflow-hidden rounded-xl py-3.5 font-semibold transition-all ${
            plan.popular
              ? "bg-primary text-primary-foreground hover:shadow-lg"
              : "border border-[var(--landing-border)] bg-[var(--landing-surface)] hover:border-[var(--landing-accent)]"
          }`}
        >
          {/* Shine effect on popular */}
          {plan.popular && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{plan.cta}</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[var(--landing-bg)] py-24 lg:py-32"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern-subtle" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card text-sm font-medium text-[var(--landing-muted)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            PRICING
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Simple, <span className="gradient-text-purple">transparent</span> pricing
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--landing-muted)]">
            Start free and upgrade as you grow. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} isYearly={isYearly} />
          ))}
        </div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[var(--landing-muted)]">
            Trusted by 2,500+ agencies and freelancers worldwide
          </p>
        </motion.div>
      </div>
    </section>
  )
}
