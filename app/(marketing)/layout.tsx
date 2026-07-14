export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="landing-page min-h-screen bg-(--landing-bg) text-[var(--landing-fg)]">{children}</div>
}
