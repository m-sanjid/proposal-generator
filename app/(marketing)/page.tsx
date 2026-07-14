import Link from "next/link"
import {
  ArrowRight,
  Eye,
  FileDown,
  FolderOpen,
  LayoutPanelTop,
  PenTool,
  ShieldCheck,
} from "lucide-react"

import { templates, type Template } from "@/lib/templates"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const categoryStyles: Record<
  Template["category"],
  {
    badge: string
    dot: string
  }
> = {
  consulting: {
    badge: "bg-sky-100 text-sky-900",
    dot: "bg-sky-500",
  },
  agency: {
    badge: "bg-rose-100 text-rose-900",
    dot: "bg-rose-500",
  },
  technical: {
    badge: "bg-emerald-100 text-emerald-900",
    dot: "bg-emerald-600",
  },
  saas: {
    badge: "bg-violet-100 text-violet-900",
    dot: "bg-violet-500",
  },
}

const featuredTemplate = templates.find((template) => template.id === "technical") ?? templates[0]

const templateReadouts = templates.map((template) => ({
  ...template,
  total: template.data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
  enabledSections: template.data.sections.filter((section) => section.enabled),
}))

const featuredTotal = currencyFormatter.format(
  featuredTemplate.data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
)

const workspaceSteps = [
  {
    index: "01",
    title: "Start from a real proposal shape",
    detail:
      "Choose consulting, agency, technical, SaaS, or start blank. Each template already carries sections, milestones, and line items.",
  },
  {
    index: "02",
    title: "Edit the document while it stays legible",
    detail:
      "Adjust sender details, branding, scope, timeline, pricing, terms, and acceptance without losing the document structure.",
  },
  {
    index: "03",
    title: "Keep preview and form in the same loop",
    detail:
      "Use form, preview, or the split workspace to catch issues before the proposal ever leaves your browser.",
  },
  {
    index: "04",
    title: "Hand off clean exports",
    detail:
      "Preview the PDF, download PDF or PNG, and keep working drafts saved in the dashboard for later edits.",
  },
]

const verifiedCapabilities = [
  {
    title: "Split editing",
    description: "Form, preview, and side-by-side editing modes are built into the editor.",
    icon: LayoutPanelTop,
  },
  {
    title: "Export ready",
    description: "Generate a PDF preview, download a PDF, or capture the proposal as PNG.",
    icon: FileDown,
  },
  {
    title: "Draft memory",
    description: "Save proposals to the dashboard in your browser and return to them when the client replies.",
    icon: FolderOpen,
  },
]

export default function Home() {
  return (
    <main className="proposal-marketing relative overflow-x-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-14 pt-5 sm:px-6 lg:px-8">
        <header className="proposal-rise flex items-center justify-between gap-4 py-2">
          <Link href="/" className="flex min-h-10 items-center gap-3 rounded-full pr-3 text-sm font-medium text-[var(--proposal-ink)] transition-colors hover:text-[var(--proposal-accent)]">
            <span className="proposal-panel inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--proposal-surface-strong)] text-[13px] font-semibold tracking-[0.18em] text-[var(--proposal-accent)]">
              PF
            </span>
            <span className="flex flex-col leading-none">
              <span>ProposalFlow</span>
              <span className="font-mono text-[11px] text-[var(--proposal-muted)]">proposal instrument</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--proposal-line)] bg-[var(--proposal-surface)] px-4 text-[12px] font-medium text-[var(--proposal-ink)] transition-transform duration-200 hover:bg-[var(--proposal-surface-strong)] active:scale-[0.98]"
            >
              Open dashboard
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-start gap-6 py-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8 lg:py-10">
          <div className="proposal-rise flex flex-col justify-center lg:sticky lg:top-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex min-h-10 items-center rounded-full border border-[var(--proposal-line)] bg-[var(--proposal-surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                compact landing / medium controls
              </span>
              <span className="inline-flex min-h-10 items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-900 dark:border-emerald-950/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                live template readout
              </span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--proposal-muted)]">
              Create, preview, export
            </p>
            <h1 className="mt-3 max-w-[11ch] text-balance text-[clamp(3rem,7vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--proposal-ink)]">
              Draft the proposal.
              <span className="mt-1 block text-[var(--proposal-accent)]">Ship the PDF.</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-pretty text-[15px] leading-7 text-[var(--proposal-muted-strong)] sm:text-base">
              ProposalFlow keeps the real document anatomy in frame: summary, scope, timeline, pricing,
              terms, branding, and acceptance. Start from an actual template, edit beside a live preview,
              then export when the proposal is ready.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/editor?new=true"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--proposal-accent)] px-5 text-[13px] font-semibold text-white transition-transform duration-200 hover:bg-[var(--proposal-accent-strong)] active:scale-[0.98]"
              >
                Start a proposal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#workflow"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--proposal-line)] bg-[var(--proposal-surface)] px-5 text-[13px] font-medium text-[var(--proposal-ink)] transition-transform duration-200 hover:bg-[var(--proposal-surface-strong)] active:scale-[0.98]"
              >
                See the workflow
              </Link>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Four built-in template families plus a blank starting point.",
                "PDF preview, PDF download, and PNG export in the editor.",
                "Browser-saved drafts available again in the dashboard.",
              ].map((item) => (
                <div
                  key={item}
                  className="proposal-panel flex min-h-10 items-start gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--proposal-muted-strong)]"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--proposal-accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="proposal-rise proposal-rise-delay">
            <div className="proposal-panel rounded-[28px] p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-[var(--proposal-line)] bg-[var(--proposal-surface)] px-4 py-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                    Proposal instrument
                  </p>
                  <h2 className="text-[15px] font-semibold text-[var(--proposal-ink)] sm:text-base">
                    Real template data, visible before you click anything
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="proposal-dot bg-emerald-500" aria-hidden="true" />
                  <span className="proposal-dot bg-amber-400" aria-hidden="true" />
                  <span className="proposal-dot bg-rose-400" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px]">
                <article className="proposal-panel rounded-[24px] bg-[var(--proposal-surface-strong)] p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--proposal-line)] bg-[var(--proposal-surface)] text-2xl">
                          {featuredTemplate.thumbnail}
                        </span>
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--proposal-muted)]">
                            Selected template
                          </p>
                          <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--proposal-ink)]">
                            {featuredTemplate.name}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-[var(--proposal-muted-strong)]">
                        {featuredTemplate.description}. The structure below comes directly from the template:
                        enabled sections, line items, and milestone-driven delivery.
                      </p>
                    </div>

                    <div className="grid min-w-[168px] gap-2 rounded-[20px] border border-[var(--proposal-line)] bg-[var(--proposal-surface)] p-3">
                      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--proposal-muted)]">
                        <span>Total</span>
                        <span className="tabular-nums text-[var(--proposal-ink)]">{featuredTotal}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--proposal-muted)]">
                        <span>Duration</span>
                        <span className="tabular-nums text-[var(--proposal-ink)]">
                          {featuredTemplate.data.timeline.estimatedDuration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--proposal-muted)]">
                        <span>Milestones</span>
                        <span className="tabular-nums text-[var(--proposal-ink)]">
                          {featuredTemplate.data.timeline.milestones.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="proposal-panel rounded-[22px] bg-[var(--proposal-surface)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                          Enabled sections
                        </p>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)] tabular-nums">
                          {featuredTemplate.data.sections.filter((section) => section.enabled).length} active
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {featuredTemplate.data.sections
                          .filter((section) => section.enabled)
                          .map((section) => (
                            <span
                              key={section.id}
                              className="inline-flex min-h-10 items-center rounded-full border border-[var(--proposal-line)] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[var(--proposal-ink)] dark:bg-white/5"
                            >
                              {section.label}
                            </span>
                          ))}
                      </div>

                      <div className="proposal-trace mt-5 h-1.5 rounded-full bg-[var(--proposal-line-soft)]" aria-hidden="true" />
                    </div>

                    <div className="proposal-panel rounded-[22px] bg-[var(--proposal-surface)] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                        Line items
                      </p>
                      <div className="mt-3 space-y-2">
                        {featuredTemplate.data.items.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-2xl border border-[var(--proposal-line)] bg-white/70 px-3 py-2.5 text-sm dark:bg-white/5"
                          >
                            <span className="text-[var(--proposal-muted-strong)]">{item.description}</span>
                            <span className="font-mono text-[12px] tabular-nums text-[var(--proposal-ink)]">
                              {currencyFormatter.format(item.quantity * item.rate)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {[
                      {
                        label: "Preview",
                        value: "PDF modal",
                        icon: Eye,
                      },
                      {
                        label: "Export",
                        value: "PDF + PNG",
                        icon: FileDown,
                      },
                      {
                        label: "Drafts",
                        value: "Dashboard saved",
                        icon: FolderOpen,
                      },
                    ].map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.label}
                          className="proposal-panel flex min-h-[94px] items-center gap-3 rounded-[20px] bg-[var(--proposal-surface)] px-4 py-3"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--proposal-line)] bg-white/75 text-[var(--proposal-accent)] dark:bg-white/5">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--proposal-muted)]">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium text-[var(--proposal-ink)]">{item.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>

                <aside className="space-y-3">
                  {templateReadouts.map((template) => {
                    const tone = categoryStyles[template.category]
                    const isFeatured = template.id === featuredTemplate.id

                    return (
                      <div
                        key={template.id}
                        className={`proposal-panel rounded-[22px] px-4 py-3 transition-transform duration-200 ${
                          isFeatured ? "bg-[var(--proposal-surface-strong)]" : "bg-[var(--proposal-surface)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`proposal-dot ${tone.dot}`} aria-hidden="true" />
                              <p className="truncate text-sm font-semibold text-[var(--proposal-ink)]">
                                {template.name}
                              </p>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex min-h-10 items-center rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${tone.badge}`}
                              >
                                {template.category}
                              </span>
                              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--proposal-muted)] tabular-nums">
                                {template.data.timeline.estimatedDuration}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[12px] tabular-nums text-[var(--proposal-ink)]">
                            {currencyFormatter.format(template.total)}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--proposal-muted)]">
                          <span>{template.enabledSections.length} sections</span>
                          <span>{template.data.timeline.milestones.length} milestones</span>
                        </div>
                      </div>
                    )
                  })}
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="proposal-rise mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="proposal-panel rounded-[28px] p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--proposal-line)] pb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--proposal-muted)]">
                  Workflow signal
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[var(--proposal-ink)]">
                  Everything important stays in frame.
                </h2>
              </div>
              <p className="max-w-md text-pretty text-sm leading-6 text-[var(--proposal-muted-strong)]">
                No pricing table, no testimonial filler, no fake analytics. Just the document flow this
                product actually supports.
              </p>
            </div>

            <div className="mt-4 divide-y divide-[var(--proposal-line)]">
              {workspaceSteps.map((step) => (
                <div key={step.index} className="grid gap-3 py-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4">
                  <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-[var(--proposal-muted)]">
                    {step.index}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--proposal-ink)] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-pretty text-sm leading-6 text-[var(--proposal-muted-strong)]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="proposal-panel rounded-[28px] p-4 sm:p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                Verified in the app
              </p>
              <div className="mt-4 space-y-3">
                {verifiedCapabilities.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="proposal-panel rounded-[22px] bg-[var(--proposal-surface)] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--proposal-line)] bg-white/75 text-[var(--proposal-accent)] dark:bg-white/5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--proposal-ink)]">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-[var(--proposal-muted-strong)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="proposal-panel rounded-[28px] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--proposal-line)] bg-[var(--proposal-surface)] text-[var(--proposal-accent)]">
                  <PenTool className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--proposal-muted)]">
                    Ready to write
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--proposal-ink)]">
                    Open the editor and start from the document, not from a blank page.
                  </h2>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/editor?new=true"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--proposal-accent)] px-5 text-[13px] font-semibold text-white transition-transform duration-200 hover:bg-[var(--proposal-accent-strong)] active:scale-[0.98]"
                >
                  Start a proposal
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--proposal-line)] bg-[var(--proposal-surface)] px-5 text-[13px] font-medium text-[var(--proposal-ink)] transition-transform duration-200 hover:bg-[var(--proposal-surface-strong)] active:scale-[0.98]"
                >
                  Browse saved drafts
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
