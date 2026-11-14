// Shared content for the "Portfolio / Creative Agency Website" PRO template (brand: Glint Studio).
// Mirrors the shape of projects/demo/src/app/ecommerce-website/ecommerce-website-data.ts - real,
// hand-written copy and real (seeded) photos instead of lorem ipsum, so every page reads like an
// actual agency site rather than a component gallery.

export function portfolioImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function portfolioAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export type NxPortfolioCategory = 'Branding' | 'Web Design' | 'Product Design' | 'Marketing';

export interface NxPortfolioProject {
  slug: string;
  title: string;
  client: string;
  category: NxPortfolioCategory;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  year: string;
  services: string[];
}

export const PORTFOLIO_CATEGORIES: (NxPortfolioCategory | 'All')[] = [
  'All',
  'Branding',
  'Web Design',
  'Product Design',
  'Marketing',
];

export const PORTFOLIO_PROJECTS: NxPortfolioProject[] = [
  {
    slug: 'nimbus-rebrand',
    title: 'Nimbus Rebrand',
    client: 'Nimbus Cloud',
    category: 'Branding',
    summary: 'A full identity overhaul for a cloud-storage startup outgrowing its first logo.',
    challenge:
      'Nimbus had three different logo variants floating around the company and a visual identity that read as generic enterprise software. Investors and new hires consistently said they "couldn\'t tell Nimbus apart" from its competitors.',
    solution:
      'We ran a two-week brand sprint with their founding team, distilled the product down to a single idea - "storage that disappears into your workflow" - and built a mark, type system, and motion language around that idea, rolling it out across the product, site, and pitch deck simultaneously.',
    result:
      'Nimbus closed its Series B four months later, and their investor deck - built entirely on the new system - was cited by two VCs as the clearest they\'d seen that quarter.',
    image: portfolioImage('nx-port-nimbus', 900, 650),
    year: '2026',
    services: ['Brand Identity', 'Art Direction'],
  },
  {
    slug: 'harvestline-ecommerce',
    title: 'Harvestline Storefront',
    client: 'Harvestline Foods',
    category: 'Web Design',
    summary: 'A fast, photography-forward storefront for a direct-to-door organic produce box.',
    challenge:
      'Harvestline\'s existing site took over nine seconds to load on mobile and converted at under 1%. Customers said the checkout felt untrustworthy for a subscription purchase.',
    solution:
      'We rebuilt the front end from scratch with a lightweight component system, replaced stock photography with a day-long shoot of their actual produce boxes, and cut checkout from five steps to two.',
    result:
      'Mobile load time dropped to 1.8 seconds and conversion rate nearly tripled to 2.8% within the first full quarter after launch.',
    image: portfolioImage('nx-port-harvestline', 900, 650),
    year: '2026',
    services: ['Web Design', 'Development'],
  },
  {
    slug: 'altitude-fitness-app',
    title: 'Altitude Companion App',
    client: 'Altitude Gyms',
    category: 'Product Design',
    summary: 'A members-only workout companion app redesigned around weekly habit streaks.',
    challenge:
      'Altitude\'s gym-booking app had a 4.2-star rating but members rarely opened it outside of booking a class, so retention past month three was weak.',
    solution:
      'We prototyped and tested a streak-based home screen that surfaced a member\'s weekly goal progress first, booking second, moving class booking to a single persistent action rather than the whole app\'s purpose.',
    result:
      'Daily active use rose 64% within eight weeks of the redesign shipping, and three-month retention improved by 22 percentage points.',
    image: portfolioImage('nx-port-altitude', 900, 650),
    year: '2025',
    services: ['Product Design', 'User Research'],
  },
  {
    slug: 'fernlight-launch-campaign',
    title: 'Fernlight Launch Campaign',
    client: 'Fernlight Skincare',
    category: 'Marketing',
    summary: 'A launch campaign that took an unknown skincare line to a sold-out first batch.',
    challenge:
      'Fernlight had a strong product but no audience and a four-week runway before their first manufacturing batch needed to be sold to fund the second.',
    solution:
      'We built a pre-launch waitlist funnel paired with a seeded influencer-sampling program, concentrating spend on a narrow set of creators whose audience matched Fernlight\'s ingredient story rather than chasing broad reach.',
    result:
      'The waitlist converted at 38% on launch day and the first batch of 4,000 units sold out in 11 hours.',
    image: portfolioImage('nx-port-fernlight', 900, 650),
    year: '2026',
    services: ['Marketing Strategy', 'Content Creation'],
  },
  {
    slug: 'basecamp-coffee-identity',
    title: 'Basecamp Coffee Identity',
    client: 'Basecamp Roasters',
    category: 'Branding',
    summary: 'Packaging and identity system for a regional roaster expanding into retail shelves.',
    challenge:
      'Basecamp\'s bags looked handmade in a way that worked at farmers markets but undercut their price point the moment they appeared on a grocery shelf next to established brands.',
    solution:
      'We designed a modular bag system using a single bold typographic mark and a rotating color key per roast profile, keeping production costs flat while reading as a shelf-ready, premium brand.',
    result:
      'Basecamp landed placement in two regional grocery chains within six months, with shelf sell-through beating the category average by 30%.',
    image: portfolioImage('nx-port-basecamp', 900, 650),
    year: '2025',
    services: ['Brand Identity', 'Packaging Design'],
  },
  {
    slug: 'driftwood-studio-site',
    title: 'Driftwood Architecture Site',
    client: 'Driftwood Studio',
    category: 'Web Design',
    summary: 'A portfolio site for an architecture studio built to make every project feel like a visit.',
    challenge:
      'An architecture studio with striking project photography was represented online by a generic template that buried the work behind three clicks of navigation.',
    solution:
      'We designed a full-bleed, scroll-driven project viewer that puts photography first, with project data appearing only as a thin overlay that never interrupts the imagery.',
    result:
      'Average session time on project pages increased from 40 seconds to just over 3 minutes, and inbound inquiry quality improved enough that the studio raised their minimum project size.',
    image: portfolioImage('nx-port-driftwood', 900, 650),
    year: '2026',
    services: ['Web Design', 'Art Direction'],
  },
  {
    slug: 'pulseboard-saas-product',
    title: 'Pulseboard Dashboard Redesign',
    client: 'Pulseboard Analytics',
    category: 'Product Design',
    summary: 'A ground-up redesign of a dense analytics dashboard used by non-technical teams.',
    challenge:
      'Pulseboard\'s dashboard was built by engineers for engineers, and customer support tickets showed most churned customers never got past the default view before cancelling.',
    solution:
      'We ran contextual interviews with eleven churned customers, then rebuilt the default view around three plain-language questions those customers actually asked their data, hiding advanced controls behind a single expandable panel.',
    result:
      'Trial-to-paid conversion increased by 19% in the quarter after launch, and support tickets tagged "confusing dashboard" dropped by more than half.',
    image: portfolioImage('nx-port-pulseboard', 900, 650),
    year: '2025',
    services: ['Product Design', 'User Research'],
  },
  {
    slug: 'northbound-brand-campaign',
    title: 'Northbound Rebrand Campaign',
    client: 'Northbound Outdoor',
    category: 'Marketing',
    summary: 'A rebrand and launch campaign for an outdoor apparel company repositioning upmarket.',
    challenge:
      'Northbound wanted to move from budget outdoor gear into a premium tier but their existing customer base and brand perception were squarely mid-market.',
    solution:
      'We paired a brand refresh with a documentary-style campaign following three real long-distance hikers using the gear, deliberately avoiding studio product shots in every launch asset.',
    result:
      'Average order value rose 41% in the two quarters following launch, with the new premium line accounting for over a quarter of total revenue by year end.',
    image: portfolioImage('nx-port-northbound', 900, 650),
    year: '2026',
    services: ['Brand Identity', 'Marketing Strategy', 'Content Creation'],
  },
  {
    slug: 'lumen-finance-webapp',
    title: 'Lumen Finance Web App',
    client: 'Lumen Finance',
    category: 'Web Design',
    summary: 'A marketing site and onboarding flow for a personal-finance app targeting first-time investors.',
    challenge:
      'Lumen\'s existing site used dense financial jargon that tested poorly with their actual target audience - people investing for the first time who found competitor sites intimidating.',
    solution:
      'We rewrote every page in plain language, replaced charts with a single animated "what you could have" projection tool, and simplified onboarding to three screens with no financial literacy quiz up front.',
    result:
      'Sign-up completion rate climbed from 46% to 71%, and the plain-language approach became the template Lumen now uses across all of their customer-facing copy.',
    image: portfolioImage('nx-port-lumen', 900, 650),
    year: '2025',
    services: ['Web Design', 'Development', 'Content Creation'],
  },
];

/** Returns 4 stable gallery image URLs for a project's case-study gallery (same subject, different crops/seeds). */
export function portfolioProjectGallery(project: NxPortfolioProject): string[] {
  const baseSeed = project.image.split('/seed/')[1]?.split('/')[0] ?? project.slug;
  return [0, 1, 2, 3].map((i) => portfolioImage(`${baseSeed}-${i}`, 700, 500));
}

export interface NxPortfolioService {
  icon: string;
  title: string;
  description: string;
}

export const PORTFOLIO_SERVICES: NxPortfolioService[] = [
  {
    icon: 'nx-palette',
    title: 'Brand Identity',
    description: 'Logo systems, type, color, and voice guidelines built around one clear idea your team can actually use.',
  },
  {
    icon: 'nx-layout',
    title: 'Web Design',
    description: 'Marketing sites and web apps designed to load fast, read clearly, and convert, not just look good in a deck.',
  },
  {
    icon: 'nx-grid',
    title: 'Product Design',
    description: 'End-to-end UX for apps and dashboards, from research and flows through pixel-perfect, developer-ready screens.',
  },
  {
    icon: 'nx-chart-bar',
    title: 'Marketing Strategy',
    description: 'Positioning, channel strategy, and campaign planning grounded in your actual customer data, not guesswork.',
  },
  {
    icon: 'nx-image',
    title: 'Content Creation',
    description: 'Photography, video, and copy produced in-house so every launch asset shares one consistent voice.',
  },
  {
    icon: 'nx-monitor',
    title: 'Development',
    description: 'Front-end builds that ship the design as designed, with performance and accessibility built in from day one.',
  },
];

export interface NxPortfolioProcessStep {
  title: string;
  description: string;
}

export const PORTFOLIO_PROCESS_STEPS: NxPortfolioProcessStep[] = [
  {
    title: 'Discover',
    description: 'We spend the first week in your data, your customer calls, and your competitors - no design work starts until we can repeat your problem back to you better than you stated it.',
  },
  {
    title: 'Design',
    description: 'Concepts, critique, and refinement in tight weekly loops with your team in the room, not a single reveal at the end.',
  },
  {
    title: 'Build',
    description: 'Development runs in parallel with final design passes so nothing sits waiting - what you review is what ships.',
  },
  {
    title: 'Launch',
    description: 'We stage a soft launch, watch the real numbers for a week, and fix what the data says needs fixing before the full rollout.',
  },
  {
    title: 'Support',
    description: 'Every engagement includes a 30-day post-launch window for fixes and small iterations, no separate contract required.',
  },
];

export interface NxPortfolioPackage {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const PORTFOLIO_PACKAGES: NxPortfolioPackage[] = [
  {
    name: 'Starter',
    price: '$3,200',
    period: '/mo',
    description: 'For early-stage teams that need senior design help without a full-time hire.',
    features: [
      'One active project at a time',
      'Brand identity or web design track',
      '2 design reviews per week',
      'Shared Slack channel',
      '30-day post-launch support',
    ],
  },
  {
    name: 'Growth',
    price: '$6,800',
    period: '/mo',
    description: 'Our most popular retainer - a dedicated pod covering design, content, and build.',
    features: [
      'Two active projects in parallel',
      'Design + development included',
      'Daily async check-ins',
      'Dedicated project lead',
      'Quarterly brand/strategy review',
      '60-day post-launch support',
    ],
    highlighted: true,
  },
  {
    name: 'Partner',
    price: 'Custom',
    period: '',
    description: 'For companies that want Glint Studio embedded as an extension of their own team.',
    features: [
      'Unlimited active projects',
      'Dedicated design + dev pod',
      'Priority turnaround on requests',
      'Quarterly in-person strategy session',
      'Custom reporting cadence',
      'Ongoing support, no renewal gaps',
    ],
  },
];

export interface NxPortfolioTeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const PORTFOLIO_TEAM: NxPortfolioTeamMember[] = [
  {
    name: 'Simone Castellan',
    role: 'Founder & Creative Director',
    avatar: portfolioAvatar(23),
    bio: 'Started Glint Studio in 2018 after seven years leading brand at two venture-backed startups.',
  },
  {
    name: 'Theo Marchetti',
    role: 'Head of Product Design',
    avatar: portfolioAvatar(15),
    bio: 'Leads every product engagement from first interview to final handoff, with a background in fintech UX.',
  },
  {
    name: 'Nadia Okonkwo',
    role: 'Lead Brand Strategist',
    avatar: portfolioAvatar(48),
    bio: 'Runs the discovery sprint on every branding project and has never once let a client skip it.',
  },
  {
    name: 'Felix Bergman',
    role: 'Senior Front-End Engineer',
    avatar: portfolioAvatar(33),
    bio: 'Turns Figma files into fast, accessible, pixel-accurate sites without the usual back-and-forth.',
  },
  {
    name: 'Ruth Abiola',
    role: 'Marketing Lead',
    avatar: portfolioAvatar(41),
    bio: 'Plans and runs every launch campaign the studio ships, from waitlist to paid media.',
  },
  {
    name: 'Priya Chandran',
    role: 'Senior Motion Designer',
    avatar: portfolioAvatar(65),
    bio: 'Builds the motion language for every brand launch, from logo animations to the case-study reels on this site.',
  },
  {
    name: 'Jonah Whitfield',
    role: 'Account Director',
    avatar: portfolioAvatar(52),
    bio: 'The client\'s first call on every retainer - keeps scope honest and makes sure nothing ships as a surprise.',
  },
];

export interface NxPortfolioJobOpening {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
}

export const PORTFOLIO_JOBS: NxPortfolioJobOpening[] = [
  { title: 'Senior Product Designer', department: 'Design', location: 'New York, NY', type: 'Full-time' },
  { title: 'Front-End Engineer', department: 'Engineering', location: 'Remote', type: 'Remote' },
  { title: 'Brand Strategist', department: 'Strategy', location: 'New York, NY', type: 'Full-time' },
  { title: 'Motion Designer', department: 'Design', location: 'Remote', type: 'Contract' },
  { title: 'Marketing Coordinator', department: 'Marketing', location: 'New York, NY', type: 'Full-time' },
];

export interface NxPortfolioTestimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export const PORTFOLIO_TESTIMONIALS: NxPortfolioTestimonial[] = [
  {
    name: 'Daniel Ruiz',
    role: 'CEO',
    company: 'Nimbus Cloud',
    avatar: portfolioAvatar(11),
    quote: 'Glint Studio gave us a brand our whole team could actually explain in one sentence. Our investor deck has never landed better.',
  },
  {
    name: 'Keiko Tanaka',
    role: 'Head of Growth',
    company: 'Harvestline Foods',
    avatar: portfolioAvatar(36),
    quote: 'They rebuilt our storefront in six weeks and conversion nearly tripled. I wish we had called them a year earlier.',
  },
  {
    name: 'Omar Haddad',
    role: 'Founder',
    company: 'Altitude Gyms',
    avatar: portfolioAvatar(19),
    quote: 'The research they did before touching a single screen is the reason the redesign actually worked. Not just a prettier app.',
  },
  {
    name: 'Lena Fischer',
    role: 'VP Marketing',
    company: 'Fernlight Skincare',
    avatar: portfolioAvatar(27),
    quote: 'We sold out our first batch in 11 hours. The campaign they built got our ingredient story in front of exactly the right people.',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Retail',
    company: 'Basecamp Roasters',
    avatar: portfolioAvatar(52),
    quote: 'They took a bag design that worked at a farmers market and made it look at home on a grocery shelf next to brands ten times our size.',
  },
  {
    name: 'Marcus Webb',
    role: 'Principal Architect',
    company: 'Driftwood Studio',
    avatar: portfolioAvatar(44),
    quote: 'Our photography finally has a site that gets out of its way. Clients tell us they feel like they\'ve already walked the building before they call.',
  },
  {
    name: 'Sasha Lindqvist',
    role: 'VP Product',
    company: 'Pulseboard Analytics',
    avatar: portfolioAvatar(58),
    quote: 'They talked to our churned customers before they touched a single screen. That\'s the reason the redesign actually moved our retention numbers.',
  },
];

export interface NxPortfolioBlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const PORTFOLIO_BLOG_POSTS: NxPortfolioBlogPost[] = [
  {
    slug: 'rebrands-fail-first-90-days',
    title: 'Why Most Rebrands Fail in the First 90 Days',
    category: 'Branding',
    author: 'Simone Castellan',
    authorAvatar: portfolioAvatar(23),
    date: 'March 3, 2026',
    readTime: '6 min read',
    image: portfolioImage('nx-port-blog-rebrand', 900, 550),
    excerpt:
      'A new logo rarely kills a rebrand. What kills it is everything that was supposed to change around the logo and quietly didn\'t.',
    content: [
      'Every rebrand we\'ve shipped has the same vulnerable window: the first ninety days after launch, when the new identity is live on the site and the deck but still fighting old habits everywhere else - the sales team\'s email signature, the internal slide template, the support team\'s canned responses.',
      'The rebrands that stick are the ones where the client treats the identity as a system to roll out, not an asset to drop in. That means a short internal launch plan sits alongside the external one: who owns updating which touchpoint, by when, and who signs off that it actually happened.',
      'The rebrands that fade are the ones where the logo changes but the voice doesn\'t. Customers notice the mismatch faster than anyone expects - a bold new visual identity paired with the same hedging, jargon-heavy copy reads as cosmetic, and cosmetic rebrands get forgotten within a quarter.',
      'Our rule now: we don\'t hand off final files until the client can show us at least three non-design touchpoints - an email, a sales deck slide, a support macro - rewritten in the new voice. If they can\'t do that yet, the rebrand isn\'t finished, it\'s just been drawn.',
    ],
  },
  {
    slug: 'framework-for-critique',
    title: 'A Practical Framework for Design Critique',
    category: 'Process',
    author: 'Theo Marchetti',
    authorAvatar: portfolioAvatar(15),
    date: 'February 17, 2026',
    readTime: '5 min read',
    image: portfolioImage('nx-port-blog-critique', 900, 550),
    excerpt:
      'Most design critiques fail for one reason: nobody agreed in advance on what the work was supposed to do.',
    content: [
      'We used to run critiques the way most studios do - gather the room, put the screens up, and go around for reactions. It felt productive. It also produced a lot of opinions about font weight and almost nothing about whether the design solved the actual problem.',
      'The fix was embarrassingly simple: write the brief\'s success criteria on the wall before anyone opens a single file. Every comment in the critique has to connect back to one of those criteria, or it waits for a different conversation.',
      'This does two things. It stops senior voices from dominating purely on taste, because "I don\'t love it" doesn\'t map to a criterion. And it stops juniors from staying quiet, because a sharp observation tied to the brief carries exactly as much weight as a sharp observation from someone with fifteen years in the chair.',
      'The other habit worth stealing: every critique ends with the designer restating what they heard, not what they\'re going to do about it. Separating "what did you hear" from "what will you change" keeps the designer in control of the solution instead of just collecting a list of fixes to execute.',
    ],
  },
  {
    slug: 'shipping-40-client-sites',
    title: 'What We Learned Shipping 40 Client Sites This Year',
    category: 'Web Design',
    author: 'Felix Bergman',
    authorAvatar: portfolioAvatar(33),
    date: 'January 29, 2026',
    readTime: '7 min read',
    image: portfolioImage('nx-port-blog-40sites', 900, 550),
    excerpt:
      'Forty launches in a year taught us more about what breaks a site than any single project ever could.',
    content: [
      'The biggest predictor of a smooth launch has nothing to do with code. It\'s whether the client has a single person who can say yes to content on time. Every one of our handful of late launches traced back to copy or final images stuck in someone\'s inbox, not to the build.',
      'On the technical side, the single highest-leverage habit we adopted this year was performance budgeting from day one of design, not as a cleanup pass before launch. Every hero image gets a target file size before it\'s shot, not after it\'s art-directed, because by the time a beautiful 4MB photograph exists, nobody wants to be the one who shrinks it.',
      'We also stopped building custom CMS schemas from scratch for every client. Ninety percent of what a marketing site needs fits a handful of reusable content models - page, post, case study, team member - and the time we saved standardizing those went straight into the parts of each site that actually needed to be bespoke.',
      'The thing that surprised us most: accessibility fixes made late in a project take roughly ten times longer than the same fixes made during design review. Every site now gets a contrast and keyboard-navigation pass before a single screen is marked "final," not after.',
      'Forty sites in, the studios we admire most aren\'t the ones with the flashiest individual launches. They\'re the ones whose fifth launch of the year goes just as smoothly as their fortieth did for us - because the process, not the heroics, is what\'s actually being refined.',
    ],
  },
  {
    slug: 'never-skip-discovery-sprint',
    title: 'Why We Never Skip the Discovery Sprint',
    category: 'Strategy',
    author: 'Nadia Okonkwo',
    authorAvatar: portfolioAvatar(48),
    date: 'January 12, 2026',
    readTime: '5 min read',
    image: portfolioImage('nx-port-blog-discovery', 900, 550),
    excerpt:
      'Clients ask to skip discovery more than any other part of the process. It\'s also the part that saves them the most money.',
    content: [
      'A discovery sprint feels like the thing to cut when a client is in a hurry - it produces no visible design, just a week of interviews, competitor teardown, and a positioning document. But almost every expensive revision cycle we\'ve ever run traced back to a decision that discovery would have caught.',
      'The clearest example: a client once wanted to skip straight to logo concepts for a product that, three customer calls in, turned out to have a completely different value proposition than the one the founders described in the kickoff. Discovery didn\'t just inform the brand - it changed what the brand needed to say.',
      'We frame discovery to clients as risk removal, not research for its own sake. Every finding gets tied to a decision it will affect later - a positioning line, a visual direction, a homepage hierarchy - so the sprint produces a document the client can point to when they\'re asked "why did we choose this" eight months later.',
      'The studios that skip discovery aren\'t saving their clients money. They\'re deferring the cost to round three of revisions, when it\'s far more expensive to fix.',
    ],
  },
  {
    slug: 'in-house-vs-agency-launch-partner',
    title: 'In-House vs. Agency: Picking the Right Launch Partner',
    category: 'Marketing',
    author: 'Ruth Abiola',
    authorAvatar: portfolioAvatar(41),
    date: 'December 18, 2025',
    readTime: '6 min read',
    image: portfolioImage('nx-port-blog-launch-partner', 900, 550),
    excerpt:
      'The right answer depends less on budget than on how often you\'ll need to launch something again next quarter.',
    content: [
      'We get asked constantly, usually by founders who already suspect the answer: should a launch be run in-house or handed to an agency? The honest answer is that it depends on whether this launch is a one-off event or the first of many.',
      'A single, high-stakes launch - a funding announcement, a major product release - usually benefits from an outside team purely for bandwidth and objectivity. Internal teams are too close to the product to see what a first-time customer actually needs to hear first.',
      'Recurring launches are a different calculation. If a company is going to ship a campaign every six weeks, the ramp-up cost of briefing an outside team every cycle adds up fast, and an in-house function - even a lean one - usually wins on speed and institutional memory within two or three cycles.',
      'Our honest advice to prospective clients, even when it costs us the engagement: if you\'re launching constantly, build the muscle in-house and bring in outside help for the one or two pushes a year that truly need fresh eyes. We\'d rather be the team you call for those than the team you\'re stuck paying for everything.',
    ],
  },
  {
    slug: 'client-relationship-that-works',
    title: 'What Makes a Client Relationship Actually Work',
    category: 'Culture',
    author: 'Jonah Whitfield',
    authorAvatar: portfolioAvatar(52),
    date: 'November 25, 2025',
    readTime: '4 min read',
    image: portfolioImage('nx-port-blog-client-relationship', 900, 550),
    excerpt:
      'After six years running accounts, the engagements that last have almost nothing to do with the size of the budget.',
    content: [
      'The retainers that run for years and the projects that end in a dispute rarely differ in budget, timeline, or even in how much the client liked the final work. They differ in how early bad news got shared.',
      'Every account I\'ve run that went sideways had the same early warning sign: a status update that said everything was fine right up until it very suddenly wasn\'t. The accounts that have run for three, four, five years all share the opposite habit - small, slightly uncomfortable updates shared the week they happen, not the week before a deadline.',
      'We\'ve started building that expectation into kickoff itself. Every client hears the same line in week one: you will get bad news from us earlier than you\'re used to, and in exchange we expect the same from you about scope, budget, or internal politics that might affect the work.',
      'It sounds small, but it\'s the single biggest predictor we\'ve found of whether a client engagement becomes a long relationship or a one-time transaction.',
    ],
  },
];

export interface NxPortfolioFaq {
  q: string;
  a: string;
}

export const PORTFOLIO_FAQS: NxPortfolioFaq[] = [
  {
    q: 'How does an engagement actually start?',
    a: 'Every engagement opens with a discovery call, followed by a short paid discovery sprint - interviews, competitor teardown, and a positioning document - before any design work begins. That sprint becomes the brief we design against, so you\'re not approving concepts against guesswork.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused brand identity project usually runs 6-8 weeks. A full marketing site, from discovery through launch, typically takes 10-14 weeks. Product design engagements vary more by scope, but we\'ll give you a week-by-week timeline before you sign anything, not just a total.',
  },
  {
    q: 'Should we hire you for a project or a retainer?',
    a: 'Project work fits a single, defined deliverable - a rebrand, a new site. A retainer fits ongoing needs - ongoing campaign work, ongoing product iteration, or a studio that wants senior design capacity without a full-time hire. Most clients start with a project and move to a retainer once the relationship proves out.',
  },
  {
    q: 'Who owns the final files and IP?',
    a: 'You do, in full, once the final invoice is paid. Source files, fonts licensed in your name, and all usage rights transfer to you - we don\'t hold anything back or charge separately for source files the way some studios do.',
  },
  {
    q: 'How many rounds of revisions are included?',
    a: 'Every project includes two structured revision rounds at each major milestone, which covers the vast majority of engagements comfortably. Additional rounds are billed at our standard hourly rate, but we\'ll always flag before you cross that line, never after.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Project work is quoted as a fixed price after discovery, once scope is actually known - never an open-ended hourly estimate. Retainers are a flat monthly rate tied to a defined capacity, outlined on our Pricing page, with no surprise overage billing.',
  },
];
