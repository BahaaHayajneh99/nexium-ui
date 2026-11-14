// Shared content for every page of the "SaaS Website" PRO template (brand: Nimbus).
// Mirrors the structure of ecommerce-website-data.ts - a flat set of typed, hand-written
// content arrays plus small photo-url helpers, imported by whichever page needs them.

/** Wraps picsum.photos with a stable seed, same technique as ecomImage() in the e-commerce template. */
export function saasImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function saasAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

// ---- Features ----------------------------------------------------------------

export interface NxSaasFeature {
  icon: string;
  title: string;
  description: string;
  category?: 'Analytics' | 'Collaboration' | 'Security';
}

export const NX_SAAS_FEATURES: NxSaasFeature[] = [
  {
    icon: 'nx-chart-bar',
    title: 'Real-time dashboards',
    description: 'Build live dashboards from any data source and watch metrics update the moment they change, no refresh required.',
    category: 'Analytics',
  },
  {
    icon: 'nx-users',
    title: 'Team collaboration',
    description: 'Comment directly on a chart, @mention a teammate, and turn a spike in the data into a resolved conversation.',
    category: 'Collaboration',
  },
  {
    icon: 'nx-code',
    title: 'Full API access',
    description: 'Every metric, dashboard, and alert is available over a documented REST API so you can pipe Nimbus data anywhere.',
    category: 'Analytics',
  },
  {
    icon: 'nx-lock',
    title: 'Single sign-on (SSO)',
    description: 'SAML and OIDC SSO with SCIM provisioning, so your identity provider stays the single source of truth for access.',
    category: 'Security',
  },
  {
    icon: 'nx-shield',
    title: 'Audit logs',
    description: 'Every login, export, and permission change is recorded and retained, searchable down to the individual user.',
    category: 'Security',
  },
  {
    icon: 'nx-bell',
    title: 'Custom alerts',
    description: 'Set a threshold on any metric and get paged in Slack, email, or PagerDuty the moment it crosses the line.',
    category: 'Analytics',
  },
  {
    icon: 'nx-grid',
    title: '40+ integrations',
    description: 'Connect Stripe, Salesforce, Postgres, and dozens more in a few clicks - no engineering ticket required.',
    category: 'Collaboration',
  },
  {
    icon: 'nx-download',
    title: 'Scheduled exports',
    description: 'Send any report to a channel or inbox on a recurring schedule, as a PDF, CSV, or a live shareable link.',
    category: 'Collaboration',
  },
];

// ---- Pricing -------------------------------------------------------------------

export interface NxSaasPricingPlan {
  name: string;
  price: number | 'Custom';
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const NX_SAAS_PRICING_PLANS: NxSaasPricingPlan[] = [
  {
    name: 'Starter',
    price: 19,
    period: '/month',
    description: 'For small teams getting their first dashboards off the ground.',
    features: [
      'Up to 5 team members',
      '3 live dashboards',
      '7-day data retention',
      'Email support',
      'Core integrations',
    ],
  },
  {
    name: 'Growth',
    price: 59,
    period: '/month',
    description: 'For growing teams who live in their metrics every day.',
    features: [
      'Up to 25 team members',
      'Unlimited dashboards',
      '1-year data retention',
      'Priority support',
      'All integrations',
      'Custom alerts & webhooks',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations that need SSO, audit logs, and a dedicated contract.',
    features: [
      'Unlimited team members',
      'Unlimited dashboards',
      'Unlimited data retention',
      'SSO & SCIM provisioning',
      'Audit logs',
      'Dedicated success manager',
    ],
  },
];

// ---- Testimonials ----------------------------------------------------------------

export interface NxSaasTestimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export const NX_SAAS_TESTIMONIALS: NxSaasTestimonial[] = [
  {
    name: 'Renee Castillo',
    role: 'VP of Operations',
    company: 'Lumen Logistics',
    avatar: saasAvatar(33),
    quote:
      'We replaced four spreadsheets and a weekly stand-up with one Nimbus dashboard. Decisions that used to take a week now take an afternoon.',
  },
  {
    name: 'Tobias Lindgren',
    role: 'Head of Growth',
    company: 'Northwind Analytics',
    avatar: saasAvatar(15),
    quote:
      'The alerting alone paid for the subscription in the first month - we caught a churned-payment spike six hours after it started instead of six days.',
  },
  {
    name: 'Priya Sundaram',
    role: 'CTO',
    company: 'Beacon Health',
    avatar: saasAvatar(47),
    quote: 'SSO and audit logs were non-negotiable for us. Nimbus was the only analytics tool that had both out of the box.',
  },
  {
    name: 'Marcus Webb',
    role: 'Data Lead',
    company: 'Fieldstone Retail',
    avatar: saasAvatar(22),
    quote: "Our team actually opens the dashboards now instead of waiting for a weekly PDF. That alone changed how fast we move.",
  },
];

// ---- Trusted-by logos (plain names) ------------------------------------------------

export const NX_SAAS_CUSTOMER_LOGOS: string[] = [
  'Lumen Logistics',
  'Northwind Analytics',
  'Beacon Health',
  'Fieldstone Retail',
  'Harborlight Media',
  'Cascade Robotics',
];

// ---- Dashboard statistics / chart data -----------------------------------------------

export const NX_SAAS_MONTHS = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

export const NX_SAAS_SIGNUPS = [410, 528, 602, 714, 889, 1042];

export const NX_SAAS_REVENUE = [18400, 21900, 24600, 29800, 35200, 41650];

export interface NxSaasActivityEvent {
  icon: string;
  text: string;
  time: string;
}

export const NX_SAAS_RECENT_ACTIVITY: NxSaasActivityEvent[] = [
  { icon: 'nx-user', text: 'Harborlight Media invited 3 new teammates', time: '2 minutes ago' },
  { icon: 'nx-bell', text: 'Alert triggered: "Weekly active users" dropped 8% week over week', time: '41 minutes ago' },
  { icon: 'nx-grid', text: 'Fieldstone Retail connected the Shopify integration', time: '1 hour ago' },
  { icon: 'nx-chart-bar', text: 'New dashboard "Q4 Pipeline" published by Priya Sundaram', time: '3 hours ago' },
  { icon: 'nx-download', text: 'Scheduled export "Monthly Board Report" sent to 6 recipients', time: '6 hours ago' },
  { icon: 'nx-shield', text: 'SSO login policy updated by an org admin', time: 'Yesterday' },
];

// ---- Team ---------------------------------------------------------------------

export interface NxSaasTeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const NX_SAAS_TEAM: NxSaasTeamMember[] = [
  {
    name: 'Dana Whitfield',
    role: 'Founder & CEO',
    avatar: saasAvatar(60),
    bio: 'Spent six years running analytics at a logistics unicorn before starting Nimbus to fix the reporting tools she was stuck with.',
  },
  {
    name: 'Samuel Okoro',
    role: 'Co-founder & CTO',
    avatar: saasAvatar(51),
    bio: 'Built the first version of the Nimbus query engine on a weekend and never really stopped working on it.',
  },
  {
    name: 'Lina Fischer',
    role: 'Head of Customer Success',
    avatar: saasAvatar(40),
    bio: 'Leads onboarding and renewals, and is the reason most support tickets get answered in under an hour.',
  },
  {
    name: 'Carlos Mendez',
    role: 'Head of Security',
    avatar: saasAvatar(18),
    bio: 'Owns SOC 2 compliance, SSO, and audit logging, and reviews every integration before it ships.',
  },
];

// ---- Company milestones (for the About page timeline) -----------------------------------

export interface NxSaasMilestone {
  title: string;
  time: string;
  description: string;
}

export const NX_SAAS_MILESTONES: NxSaasMilestone[] = [
  { title: 'Nimbus founded', time: '2021', description: 'Started by two engineers frustrated with weekly PDF reports and stale spreadsheets.' },
  { title: 'First 100 customers', time: '2022', description: 'Crossed 100 paying teams within a year of launch, almost entirely through word of mouth.' },
  { title: 'SOC 2 Type II certified', time: '2023', description: 'Completed our first SOC 2 audit, unlocking deals with regulated enterprise customers.' },
  { title: 'SSO & audit logs shipped', time: '2024', description: 'Launched the security features our enterprise pipeline had been asking for since day one.' },
  { title: '50,000 teams, 40 countries', time: '2026', description: 'Nimbus dashboards now run in production for teams across 40 countries worldwide.' },
];

// ---- FAQs (Pricing page) ------------------------------------------------------------

export interface NxSaasFaq {
  q: string;
  a: string;
}

export const NX_SAAS_FAQS: NxSaasFaq[] = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes - upgrade or downgrade at any time from your billing settings. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Every plan includes a 14-day free trial with full access to its features, no credit card required to get started.',
  },
  {
    q: 'What happens if I go over my team member limit?',
    a: "We'll let you know before you hit the limit and offer to upgrade you to the next plan - we never lock you out mid-month.",
  },
  {
    q: 'Do you offer discounts for annual billing?',
    a: 'Yes - paying annually saves 20% compared to monthly billing on every plan, including Enterprise.',
  },
  {
    q: 'How does Enterprise pricing work?',
    a: 'Enterprise pricing is based on team size and data volume. Talk to our sales team and we will put together a custom quote within one business day.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. Growth and Enterprise plans add SSO, SCIM provisioning, and full audit logs for every account action.',
  },
];

// ---- Integrations --------------------------------------------------------------

export interface NxSaasIntegration {
  icon: string;
  name: string;
  category: 'Communication' | 'CRM' | 'Payments' | 'Data' | 'Productivity';
  description: string;
}

export const NX_SAAS_INTEGRATIONS: NxSaasIntegration[] = [
  {
    icon: 'nx-message',
    name: 'Slack',
    category: 'Communication',
    description: 'Pipe dashboard alerts and shared reports straight into any Slack channel your team already lives in.',
  },
  {
    icon: 'nx-video',
    name: 'Microsoft Teams',
    category: 'Communication',
    description: 'Post daily and weekly digests to a Teams channel and jump from an alert straight into the dashboard.',
  },
  {
    icon: 'nx-users',
    name: 'Salesforce',
    category: 'CRM',
    description: 'Sync pipeline and account data both ways so revenue dashboards never fall out of date with your CRM.',
  },
  {
    icon: 'nx-user-plus',
    name: 'HubSpot',
    category: 'CRM',
    description: 'Blend marketing and lifecycle data from HubSpot with product usage to see the full customer journey.',
  },
  {
    icon: 'nx-credit-card',
    name: 'Stripe',
    category: 'Payments',
    description: 'Track MRR, churn, and failed payments in real time, straight from your live Stripe ledger.',
  },
  {
    icon: 'nx-book',
    name: 'QuickBooks',
    category: 'Payments',
    description: 'Reconcile billing against your books automatically with a nightly two-way QuickBooks sync.',
  },
  {
    icon: 'nx-grid',
    name: 'Postgres',
    category: 'Data',
    description: 'Point Nimbus at any Postgres database and build dashboards directly on your production schema.',
  },
  {
    icon: 'nx-cloud',
    name: 'Snowflake',
    category: 'Data',
    description: 'Query your Snowflake warehouse directly, no extraction step and no data ever leaves your account.',
  },
  {
    icon: 'nx-share',
    name: 'Segment',
    category: 'Data',
    description: 'Receive every tracked event from Segment and turn raw customer data into a dashboard in minutes.',
  },
  {
    icon: 'nx-refresh',
    name: 'Zapier',
    category: 'Productivity',
    description: 'Trigger a Zap whenever a Nimbus alert fires, or feed any of 5,000+ apps into a live dashboard.',
  },
  {
    icon: 'nx-chart-bar',
    name: 'Google Analytics',
    category: 'Data',
    description: 'Combine web traffic and conversion data from GA with product metrics in a single shared view.',
  },
  {
    icon: 'nx-bell',
    name: 'PagerDuty',
    category: 'Productivity',
    description: 'Escalate a critical metric alert straight to the on-call engineer without leaving Nimbus.',
  },
];

// ---- Changelog ------------------------------------------------------------------

export interface NxSaasChangelogEntry {
  version: string;
  date: string;
  type: 'Feature' | 'Improvement' | 'Fix';
  title: string;
  description: string;
}

export const NX_SAAS_CHANGELOG: NxSaasChangelogEntry[] = [
  {
    version: 'v3.4.0',
    date: '2026-10-02',
    type: 'Feature',
    title: 'Cross-dashboard annotations',
    description: 'Drop a note on a spike or dip once and have it show up on every dashboard that charts the same metric.',
  },
  {
    version: 'v3.3.2',
    date: '2026-09-18',
    type: 'Fix',
    title: 'Fixed stale cache on scheduled exports',
    description: 'Scheduled PDF and CSV exports occasionally shipped data from the previous run - exports now always reflect the latest refresh.',
  },
  {
    version: 'v3.3.0',
    date: '2026-09-02',
    type: 'Feature',
    title: 'Snowflake connector',
    description: 'Query a Snowflake warehouse directly from Nimbus, with the same row-level permissions as your warehouse roles.',
  },
  {
    version: 'v3.2.1',
    date: '2026-08-14',
    type: 'Improvement',
    title: 'Faster dashboard load times',
    description: 'Rebuilt the query planner for multi-chart dashboards, cutting median load time by roughly 40%.',
  },
  {
    version: 'v3.2.0',
    date: '2026-07-22',
    type: 'Feature',
    title: 'Custom alert webhooks',
    description: 'Send any alert payload to a custom webhook URL in addition to Slack, email, and PagerDuty.',
  },
  {
    version: 'v3.1.3',
    date: '2026-07-01',
    type: 'Fix',
    title: 'Corrected timezone drift in weekly reports',
    description: "Weekly scheduled reports could roll over a day early for teams west of UTC - report windows now always match the account's timezone.",
  },
  {
    version: 'v3.1.0',
    date: '2026-06-10',
    type: 'Improvement',
    title: 'Redesigned mobile dashboard view',
    description: 'Dashboards viewed on a phone now reflow into a single column with touch-friendly chart controls.',
  },
  {
    version: 'v3.0.0',
    date: '2026-05-19',
    type: 'Feature',
    title: 'SCIM provisioning for Enterprise',
    description: 'Enterprise plans can now provision and deprovision Nimbus seats automatically from any SCIM-compatible identity provider.',
  },
];

// ---- Case studies --------------------------------------------------------------

export interface NxSaasCaseStudy {
  slug: string;
  company: string;
  industry: string;
  headlineStat: string;
  headlineLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
}

export const NX_SAAS_CASE_STUDIES: NxSaasCaseStudy[] = [
  {
    slug: 'lumen-logistics',
    company: 'Lumen Logistics',
    industry: 'Logistics',
    headlineStat: '4',
    headlineLabel: 'Spreadsheets replaced',
    summary: 'Lumen Logistics replaced four spreadsheets and a weekly stand-up with a single live Nimbus dashboard.',
    challenge:
      'Operations leadership at Lumen Logistics tracked fleet utilization, on-time delivery, and fuel cost across four separate spreadsheets, each manually updated by a different regional manager. Decisions waited for the weekly roll-up meeting, even when a problem needed same-day attention.',
    solution:
      'Lumen connected its Postgres operations database directly to Nimbus and rebuilt the four spreadsheets as a single live dashboard, with custom alerts on delivery delays and fuel cost spikes routed straight to Slack.',
    result:
      'Decisions that used to take a week now take an afternoon. On-time delivery rose 6 points in the first quarter after regional managers could see delays as they happened instead of five days later.',
    image: saasImage('nx-case-lumen', 640, 420),
  },
  {
    slug: 'northwind-analytics',
    company: 'Northwind Analytics',
    industry: 'Marketing analytics',
    headlineStat: '6hrs',
    headlineLabel: 'Time to detect churn spike',
    summary: 'Northwind Analytics caught a churned-payment spike six hours after it started instead of six days.',
    challenge:
      'Northwind relied on a monthly billing report to catch payment failures and churn. By the time a spike showed up in the report, the revenue was already gone and the root cause was hard to trace back.',
    solution:
      'The growth team wired Stripe into Nimbus and set custom alert thresholds on failed payments and involuntary churn, with alerts paging the on-call growth engineer through PagerDuty the moment a threshold was crossed.',
    result:
      'The alerting paid for the Nimbus subscription in the first month. A failed-payment spike from an expired card BIN was caught and fixed within six hours instead of surfacing in the next billing cycle.',
    image: saasImage('nx-case-northwind', 640, 420),
  },
  {
    slug: 'beacon-health',
    company: 'Beacon Health',
    industry: 'Healthcare',
    headlineStat: '100%',
    headlineLabel: 'Audit requests answered on time',
    summary: 'Beacon Health passed its first compliance audit using nothing but Nimbus audit logs and SSO reports.',
    challenge:
      'As a healthcare data platform, Beacon Health needed to prove exactly who accessed which dashboard and when, for every compliance audit. Their previous analytics tool had no audit trail at all.',
    solution:
      "Beacon moved onto Nimbus's Enterprise plan for SAML SSO with SCIM provisioning and full audit logging, giving the security team a searchable record of every login, export, and permission change.",
    result:
      "Beacon's security team answered every item in its first SOC 2 audit using nothing but exported Nimbus audit logs, cutting audit prep time from three weeks to four days.",
    image: saasImage('nx-case-beacon', 640, 420),
  },
  {
    slug: 'fieldstone-retail',
    company: 'Fieldstone Retail',
    industry: 'Retail',
    headlineStat: '3x',
    headlineLabel: 'More weekly dashboard views',
    summary: 'Fieldstone Retail tripled how often its team actually opens a dashboard instead of waiting for a PDF.',
    challenge:
      "Fieldstone's category managers received a weekly PDF report that was often out of date by the time it landed in their inbox, and almost nobody opened the shared spreadsheet behind it.",
    solution:
      'Fieldstone replaced the PDF with a live Nimbus dashboard connected to its Shopify and inventory data, with each category manager getting a personalized view filtered to their own product lines.',
    result:
      'Weekly active dashboard views tripled within two months, and stockout alerts now reach category managers the same day inventory drops below threshold instead of the following Monday.',
    image: saasImage('nx-case-fieldstone', 640, 420),
  },
];

// ---- Careers --------------------------------------------------------------------

export interface NxSaasJob {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Contract';
}

export const NX_SAAS_JOBS: NxSaasJob[] = [
  { title: 'Senior Backend Engineer', department: 'Engineering', location: 'Austin, TX', type: 'Full-time' },
  { title: 'Product Designer', department: 'Design', location: 'Remote', type: 'Remote' },
  { title: 'Customer Success Manager', department: 'Customer Success', location: 'Remote', type: 'Remote' },
  { title: 'Data Infrastructure Engineer', department: 'Engineering', location: 'Austin, TX', type: 'Full-time' },
  { title: 'Technical Content Writer', department: 'Marketing', location: 'Remote', type: 'Contract' },
];

export interface NxSaasBenefit {
  icon: string;
  title: string;
  description: string;
}

export const NX_SAAS_BENEFITS: NxSaasBenefit[] = [
  {
    icon: 'nx-heart',
    title: 'Full health coverage',
    description: 'Medical, dental, and vision premiums covered at 100% for you and your dependents.',
  },
  {
    icon: 'nx-globe',
    title: 'Remote-first',
    description: 'Work from wherever you do your best work - our team spans ten time zones already.',
  },
  {
    icon: 'nx-chart-bar',
    title: 'Real equity',
    description: 'Every full-time hire gets a meaningful equity grant, not a token one.',
  },
  {
    icon: 'nx-book',
    title: '$2,000 learning budget',
    description: 'An annual budget for courses, books, or conferences, no approval chain required.',
  },
  {
    icon: 'nx-sun',
    title: 'Unlimited PTO',
    description: 'A real, enforced minimum of 20 days off a year so unlimited never means none.',
  },
  {
    icon: 'nx-gift',
    title: '16 weeks parental leave',
    description: 'Fully paid parental leave for every new parent on the team, regardless of role or tenure.',
  },
];

// ---- Security -------------------------------------------------------------------

export interface NxSaasCertification {
  icon: string;
  name: string;
  description: string;
}

export const NX_SAAS_CERTIFICATIONS: NxSaasCertification[] = [
  {
    icon: 'nx-check-circle',
    name: 'SOC 2 Type II',
    description: 'Audited annually against the AICPA Trust Services Criteria for security, availability, and confidentiality.',
  },
  {
    icon: 'nx-globe',
    name: 'GDPR Compliant',
    description: 'Data processing agreements, EU data residency, and full data export and deletion on request.',
  },
  {
    icon: 'nx-lock',
    name: 'ISO 27001',
    description: 'Certified information security management system covering access control, encryption, and incident response.',
  },
  {
    icon: 'nx-heart',
    name: 'HIPAA-ready',
    description: 'Signed BAAs available on Enterprise plans for teams handling protected health information.',
  },
];

export interface NxSaasSecurityFaq {
  q: string;
  a: string;
}

export const NX_SAAS_SECURITY_FAQS: NxSaasSecurityFaq[] = [
  {
    q: 'How is my data encrypted?',
    a: 'All data is encrypted in transit with TLS 1.2+ and at rest with AES-256. Encryption keys are rotated on a managed schedule and never shared across customer accounts.',
  },
  {
    q: 'Do you support single sign-on?',
    a: 'Yes - Growth and Enterprise plans support SAML and OIDC SSO, with SCIM provisioning on Enterprise so your identity provider stays the source of truth for access.',
  },
  {
    q: 'Can I see who accessed what, and when?',
    a: 'Every login, export, and permission change is recorded in a searchable audit log, retained for the length of your plan and exportable at any time.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Data is stored in SOC 2 certified data centers in the United States by default, with EU data residency available on Enterprise plans for GDPR compliance.',
  },
  {
    q: 'What happens if there is a security incident?',
    a: 'Our incident response process notifies affected customers within 72 hours of confirmation, with a full root-cause report following within five business days.',
  },
];
