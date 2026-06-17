"use client"

import { LandingSection, LandingSectionHeader } from "@/components/landing/landing-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is ProposalFlow free to use?",
    answer:
      "Yes. The Free plan includes up to 5 proposals, basic templates, and PDF export. Upgrade to Pro when you need unlimited proposals, custom branding, and advanced features.",
  },
  {
    question: "Where is my proposal data stored?",
    answer:
      "Proposals are saved locally in your browser using localStorage. Your data stays on your device — no account required to get started.",
  },
  {
    question: "Can I export proposals as PDF?",
    answer:
      "Absolutely. Export polished PDFs with one click, or download a PNG snapshot of your live preview for quick sharing.",
  },
  {
    question: "Do you offer templates?",
    answer:
      "Yes. Start from professionally designed templates for consulting, agencies, freelancers, and more. Customize every section to match your brand.",
  },
  {
    question: "Does ProposalFlow work offline?",
    answer:
      "Once loaded, you can continue editing proposals offline. Changes sync to local storage automatically when you save.",
  },
  {
    question: "Can I customize branding?",
    answer:
      "Upload your logo, set theme colors, and tailor section labels. Pro plans unlock full white-label branding across every proposal.",
  },
]

export function FaqSection() {
  return (
    <LandingSection id="faq">
      <LandingSectionHeader
        badge="FAQ"
        title={
          <>
            Questions? <span className="gradient-text-purple">We&apos;ve got answers.</span>
          </>
        }
        description="Everything you need to know before creating your first proposal."
      />

      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-2 md:px-6">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base text-[var(--landing-fg)] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--landing-muted)]">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </LandingSection>
  )
}
