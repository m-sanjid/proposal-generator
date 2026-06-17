import { InvoiceData } from "@/types"

export interface Template {
  id: string
  name: string
  description: string
  category: "consulting" | "agency" | "technical" | "saas"
  thumbnail: string // emoji for now
  data: InvoiceData
}

// Base template data with common defaults
const baseTemplateData: Omit<InvoiceData, "documentTitle" | "documentNumber" | "sender" | "recipient" | "items" | "executiveSummary" | "scopeOfWork" | "timeline" | "termsConditions"> = {
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  taxRate: 0,
  discountAmount: 0,
  notes: [],
  terms: "Payment is due within 30 days of invoice date.",
  branding: {
    logo: null,
    themeColor: "#2563eb",
  },
  acceptance: {
    clientName: "",
    signatureDate: "",
    showSignatureLine: true,
  },
  sections: [
    { id: "executiveSummary", label: "Executive Summary", enabled: true },
    { id: "scopeOfWork", label: "Scope of Work", enabled: true },
    { id: "timeline", label: "Timeline", enabled: true },
    { id: "financialBreakdown", label: "Financial Breakdown", enabled: true },
    { id: "termsConditions", label: "Terms & Conditions", enabled: true },
    { id: "notes", label: "Notes", enabled: false },
    { id: "acceptance", label: "Acceptance", enabled: true },
  ],
}

export const templates: Template[] = [
  {
    id: "consulting",
    name: "Consulting Proposal",
    description: "Professional consulting and advisory services proposal",
    category: "consulting",
    thumbnail: "💼",
    data: {
      ...baseTemplateData,
      documentTitle: "CONSULTING PROPOSAL",
      documentNumber: "CON-001",
      sender: {
        name: "Your Consulting Firm",
        email: "hello@consulting.com",
        phone: "+1 (555) 123-4567",
        address: "123 Business Ave, Suite 100, New York, NY 10001",
        website: "www.consulting.com",
        taxId: "",
      },
      recipient: {
        name: "Client Name",
        company: "Client Company",
        email: "client@company.com",
        phone: "+1 (555) 987-6543",
        address: "456 Corporate Blvd, Los Angeles, CA 90001",
      },
      items: [
        { id: "1", description: "Strategy Consultation (8 hours)", quantity: 8, rate: 250 },
        { id: "2", description: "Market Research & Analysis", quantity: 1, rate: 2500 },
        { id: "3", description: "Implementation Support", quantity: 20, rate: 200 },
      ],
      executiveSummary: {
        objective: "To provide strategic consulting services that will help optimize your business operations and drive sustainable growth.",
        solution: "Our team will conduct a comprehensive analysis of your current processes, identify key improvement areas, and develop an actionable roadmap for implementation.",
        objectiveLabel: "Objective",
        solutionLabel: "Our Approach",
      },
      scopeOfWork: {
        phases: [
          { id: "1", title: "Discovery & Assessment", description: "Comprehensive review of current operations, stakeholder interviews, and data analysis." },
          { id: "2", title: "Strategy Development", description: "Create detailed recommendations and strategic roadmap based on findings." },
          { id: "3", title: "Implementation Planning", description: "Develop execution plan with timelines, resources, and success metrics." },
        ],
        exclusions: [
          { id: "1", text: "Direct implementation of recommended changes" },
          { id: "2", text: "Ongoing operational management" },
        ],
      },
      timeline: {
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        estimatedDuration: "6 Weeks",
        milestones: [
          { id: "1", title: "Kickoff Meeting", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "2", title: "Discovery Complete", date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "3", title: "Strategy Presentation", date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "4", title: "Final Deliverables", date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
        ],
      },
      termsConditions: {
        terms: [
          { id: "1", label: "Payment Terms", value: "50% upfront, 50% upon completion" },
          { id: "2", label: "Confidentiality", value: "All information shared will be kept strictly confidential" },
          { id: "3", label: "Revisions", value: "Up to 2 rounds of revisions included" },
        ],
        additionalTerms: "All intellectual property developed during this engagement will transfer to the client upon full payment.",
      },
    },
  },
  {
    id: "agency",
    name: "Creative Agency Proposal",
    description: "Branding, design, and creative services proposal",
    category: "agency",
    thumbnail: "🎨",
    data: {
      ...baseTemplateData,
      documentTitle: "CREATIVE PROPOSAL",
      documentNumber: "CRE-001",
      branding: { logo: null, themeColor: "#ec4899" },
      sender: {
        name: "Creative Studio",
        email: "hello@creativestudio.com",
        phone: "+1 (555) 234-5678",
        address: "789 Design District, Brooklyn, NY 11201",
        website: "www.creativestudio.com",
        taxId: "",
      },
      recipient: {
        name: "Client Name",
        company: "Brand Company",
        email: "brand@company.com",
        phone: "+1 (555) 876-5432",
        address: "321 Marketing Way, Chicago, IL 60601",
      },
      items: [
        { id: "1", description: "Brand Strategy & Discovery", quantity: 1, rate: 3500 },
        { id: "2", description: "Logo Design (3 concepts)", quantity: 1, rate: 2500 },
        { id: "3", description: "Brand Guidelines Document", quantity: 1, rate: 1500 },
        { id: "4", description: "Social Media Templates (10)", quantity: 10, rate: 150 },
      ],
      executiveSummary: {
        objective: "To develop a distinctive brand identity that captures your company's essence and resonates with your target audience.",
        solution: "We'll craft a comprehensive visual identity system including logo, color palette, typography, and brand guidelines that set you apart from competitors.",
        objectiveLabel: "The Vision",
        solutionLabel: "Our Creative Approach",
      },
      scopeOfWork: {
        phases: [
          { id: "1", title: "Brand Discovery", description: "Deep dive into your brand values, audience, and competitive landscape." },
          { id: "2", title: "Concept Development", description: "Create 3 unique logo concepts with mood boards and rationale." },
          { id: "3", title: "Refinement", description: "Refine chosen direction based on feedback." },
          { id: "4", title: "Brand Guidelines", description: "Comprehensive brand book with usage guidelines." },
        ],
        exclusions: [
          { id: "1", text: "Photography and video production" },
          { id: "2", text: "Website development" },
          { id: "3", text: "Print production costs" },
        ],
      },
      timeline: {
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        estimatedDuration: "4 Weeks",
        milestones: [
          { id: "1", title: "Discovery Workshop", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "2", title: "Concept Presentation", date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "3", title: "Final Logo Delivery", date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "4", title: "Brand Guidelines Complete", date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
        ],
      },
      termsConditions: {
        terms: [
          { id: "1", label: "Payment", value: "50% deposit to begin, 50% on completion" },
          { id: "2", label: "Revisions", value: "3 rounds of revisions included per phase" },
          { id: "3", label: "Ownership", value: "Full rights transfer upon final payment" },
        ],
        additionalTerms: "Additional revisions beyond the included rounds will be billed at $150/hour.",
      },
    },
  },
  {
    id: "technical",
    name: "Technical Project Proposal",
    description: "Software development and engineering services",
    category: "technical",
    thumbnail: "⚙️",
    data: {
      ...baseTemplateData,
      documentTitle: "TECHNICAL PROPOSAL",
      documentNumber: "TECH-001",
      branding: { logo: null, themeColor: "#10b981" },
      sender: {
        name: "Dev Solutions Inc",
        email: "projects@devsolutions.com",
        phone: "+1 (555) 345-6789",
        address: "555 Tech Park, San Francisco, CA 94105",
        website: "www.devsolutions.com",
        taxId: "",
      },
      recipient: {
        name: "Client Name",
        company: "Tech Company",
        email: "tech@company.com",
        phone: "+1 (555) 765-4321",
        address: "888 Innovation Blvd, Austin, TX 78701",
      },
      items: [
        { id: "1", description: "Project Planning & Architecture", quantity: 40, rate: 175 },
        { id: "2", description: "Frontend Development (React)", quantity: 80, rate: 150 },
        { id: "3", description: "Backend Development (Node.js)", quantity: 60, rate: 160 },
        { id: "4", description: "Testing & QA", quantity: 30, rate: 125 },
        { id: "5", description: "Deployment & DevOps Setup", quantity: 20, rate: 175 },
      ],
      executiveSummary: {
        objective: "To build a robust, scalable web application that streamlines your business processes and provides an excellent user experience.",
        solution: "We will develop a modern full-stack application using React and Node.js, with a focus on performance, security, and maintainability.",
        objectiveLabel: "Project Goal",
        solutionLabel: "Technical Solution",
      },
      scopeOfWork: {
        phases: [
          { id: "1", title: "Planning & Architecture", description: "Technical specifications, database design, and API architecture." },
          { id: "2", title: "Core Development", description: "Build frontend components, backend APIs, and database integrations." },
          { id: "3", title: "Integration & Testing", description: "System integration, unit tests, and end-to-end testing." },
          { id: "4", title: "Deployment", description: "Production deployment, CI/CD setup, and documentation." },
        ],
        exclusions: [
          { id: "1", text: "Third-party API subscription costs" },
          { id: "2", text: "Hosting and infrastructure fees" },
          { id: "3", text: "Post-launch maintenance (available separately)" },
        ],
      },
      timeline: {
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        estimatedDuration: "8 Weeks",
        milestones: [
          { id: "1", title: "Project Kickoff", date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "2", title: "Architecture Approval", date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "3", title: "MVP Complete", date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "4", title: "Final Delivery", date: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
        ],
      },
      termsConditions: {
        terms: [
          { id: "1", label: "Payment Schedule", value: "25% upfront, 25% at MVP, 50% on completion" },
          { id: "2", label: "Source Code", value: "Full source code ownership upon final payment" },
          { id: "3", label: "Warranty", value: "30-day bug fix warranty included" },
        ],
        additionalTerms: "Change requests outside the original scope will be quoted separately.",
      },
    },
  },
  {
    id: "saas",
    name: "SaaS Sales Proposal",
    description: "Software subscription and service agreement",
    category: "saas",
    thumbnail: "☁️",
    data: {
      ...baseTemplateData,
      documentTitle: "SERVICE PROPOSAL",
      documentNumber: "SVC-001",
      branding: { logo: null, themeColor: "#6366f1" },
      sender: {
        name: "CloudPlatform Inc",
        email: "sales@cloudplatform.io",
        phone: "+1 (555) 456-7890",
        address: "100 Cloud Way, Seattle, WA 98101",
        website: "www.cloudplatform.io",
        taxId: "",
      },
      recipient: {
        name: "Client Name",
        company: "Enterprise Corp",
        email: "procurement@enterprise.com",
        phone: "+1 (555) 654-3210",
        address: "200 Corporate Center, Boston, MA 02101",
      },
      items: [
        { id: "1", description: "Enterprise License (Annual)", quantity: 1, rate: 12000 },
        { id: "2", description: "Implementation & Onboarding", quantity: 1, rate: 3500 },
        { id: "3", description: "Custom Integrations (2)", quantity: 2, rate: 2500 },
        { id: "4", description: "Training Sessions (5 hours)", quantity: 5, rate: 300 },
      ],
      executiveSummary: {
        objective: "To provide a comprehensive cloud solution that enhances productivity, streamlines workflows, and scales with your growing business.",
        solution: "Our enterprise platform offers advanced features, dedicated support, and seamless integrations tailored to your organization's specific needs.",
        objectiveLabel: "Value Proposition",
        solutionLabel: "Solution Overview",
      },
      scopeOfWork: {
        phases: [
          { id: "1", title: "Platform Setup", description: "Enterprise account configuration, user provisioning, and security setup." },
          { id: "2", title: "Integration", description: "Connect with existing systems (CRM, ERP, SSO)." },
          { id: "3", title: "Training", description: "Comprehensive training for admins and end users." },
          { id: "4", title: "Go-Live Support", description: "Dedicated support during rollout period." },
        ],
        exclusions: [
          { id: "1", text: "Custom feature development" },
          { id: "2", text: "Data migration services" },
          { id: "3", text: "Third-party software licenses" },
        ],
      },
      timeline: {
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        estimatedDuration: "3 Weeks",
        milestones: [
          { id: "1", title: "Contract Signed", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "2", title: "Platform Ready", date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "3", title: "Training Complete", date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
          { id: "4", title: "Full Rollout", date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
        ],
      },
      termsConditions: {
        terms: [
          { id: "1", label: "Subscription", value: "Annual billing, auto-renewal with 30-day notice" },
          { id: "2", label: "SLA", value: "99.9% uptime guarantee" },
          { id: "3", label: "Support", value: "24/7 priority support included" },
        ],
        additionalTerms: "Usage beyond plan limits will be billed at standard overage rates.",
      },
    },
  },
]

// Blank template for "Start from Scratch"
export const blankTemplate: Template = {
  id: "blank",
  name: "Blank Proposal",
  description: "Start with a clean slate",
  category: "consulting",
  thumbnail: "📄",
  data: {
    ...baseTemplateData,
    documentTitle: "PROPOSAL",
    documentNumber: "PRO-001",
    sender: {
      name: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      taxId: "",
    },
    recipient: {
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [
      { id: "1", description: "", quantity: 1, rate: 0 },
    ],
    executiveSummary: {
      objective: "",
      solution: "",
      objectiveLabel: "Objective",
      solutionLabel: "Proposed Solution",
    },
    scopeOfWork: {
      phases: [],
      exclusions: [],
    },
    timeline: {
      startDate: "",
      estimatedDuration: "",
      milestones: [],
    },
    termsConditions: {
      terms: [],
      additionalTerms: "",
    },
  },
}

export function getTemplateById(id: string): Template | undefined {
  if (id === "blank") return blankTemplate
  return templates.find(t => t.id === id)
}

export function getAllTemplates(): Template[] {
  return [blankTemplate, ...templates]
}
