import { LandingNav } from "@/components/landing/landing-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { WorkflowAnimation } from "@/components/landing/workflow-animation"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main>
      <LandingNav />
      <HeroSection />
      <WorkflowAnimation />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CTA />
      <Footer />
    </main>
  )
}
