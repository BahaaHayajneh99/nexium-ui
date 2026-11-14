// Shared data for the "Pathwise Academy" Online Course / LMS PRO template. Mirrors the
// conventions of ../ecommerce-website/ecommerce-website-data.ts - every page under
// course-website/ imports from here instead of inlining its own mock data.

export interface NxCourseLesson {
  title: string;
  duration: string;
}

export interface NxCourseModule {
  title: string;
  lessons: NxCourseLesson[];
}

export type NxCourseCategory = 'Design' | 'Development' | 'Business' | 'Marketing';
export type NxCourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface NxCourse {
  slug: string;
  title: string;
  category: NxCourseCategory;
  level: NxCourseLevel;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  image: string;
  description: string;
  instructorId: number;
  modules: NxCourseModule[];
}

export function courseImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function courseAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export const COURSE_CATEGORIES: ('All' | NxCourseCategory)[] = ['All', 'Design', 'Development', 'Business', 'Marketing'];

export const COURSES: NxCourse[] = [
  {
    slug: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    level: 'Beginner',
    price: 55,
    compareAtPrice: 95,
    rating: 4.8,
    reviewCount: 342,
    studentCount: 8450,
    image: courseImage('nx-course-uiux-fundamentals'),
    description:
      'Learn the core principles behind interfaces people love to use - visual hierarchy, color theory, typography, and usability heuristics - then apply them in hands-on exercises using real app screens.',
    instructorId: 1,
    modules: [
      {
        title: 'Design Foundations',
        lessons: [
          { title: 'What makes a good user interface', duration: '11 min' },
          { title: 'Visual hierarchy and layout grids', duration: '16 min' },
          { title: 'Color theory for digital products', duration: '14 min' },
          { title: 'Typography that reads at a glance', duration: '13 min' },
        ],
      },
      {
        title: 'Usability Principles',
        lessons: [
          { title: "Nielsen's 10 usability heuristics", duration: '18 min' },
          { title: 'Designing for accessibility', duration: '15 min' },
          { title: 'Common UX anti-patterns to avoid', duration: '12 min' },
        ],
      },
      {
        title: 'From Wireframe to Mockup',
        lessons: [
          { title: 'Low-fidelity wireframing', duration: '14 min' },
          { title: 'Building a component library', duration: '19 min' },
          { title: 'High-fidelity mockups in Figma', duration: '21 min' },
          { title: 'Preparing files for handoff', duration: '10 min' },
        ],
      },
    ],
  },
  {
    slug: 'advanced-figma-prototyping',
    title: 'Advanced Figma Prototyping',
    category: 'Design',
    level: 'Intermediate',
    price: 55,
    compareAtPrice: 95,
    rating: 4.7,
    reviewCount: 198,
    studentCount: 5120,
    image: courseImage('nx-course-figma-prototyping'),
    description:
      'Go beyond static mockups and build fully interactive prototypes with variables, conditional logic, and smart animate - the exact workflow used by product teams to test ideas before a line of code is written.',
    instructorId: 1,
    modules: [
      {
        title: 'Prototyping Essentials',
        lessons: [
          { title: 'Interactive components and variants', duration: '17 min' },
          { title: 'Smart animate and micro-interactions', duration: '20 min' },
          { title: 'Overlays, drawers, and modals', duration: '15 min' },
        ],
      },
      {
        title: 'Advanced Logic',
        lessons: [
          { title: 'Figma variables and conditional logic', duration: '22 min' },
          { title: 'Building a multi-step onboarding flow', duration: '24 min' },
          { title: 'Simulating real data with content variables', duration: '16 min' },
        ],
      },
      {
        title: 'Testing & Handoff',
        lessons: [
          { title: 'Running a usability test on a prototype', duration: '18 min' },
          { title: 'Dev-ready annotations and specs', duration: '13 min' },
        ],
      },
    ],
  },
  {
    slug: 'full-stack-javascript-bootcamp',
    title: 'Full-Stack JavaScript Bootcamp',
    category: 'Development',
    level: 'Intermediate',
    price: 55,
    compareAtPrice: 95,
    rating: 4.9,
    reviewCount: 512,
    studentCount: 12300,
    image: courseImage('nx-course-fullstack-js'),
    description:
      'Build and ship a complete web application from scratch - a Node/Express API backed by PostgreSQL, a React front end, authentication, and deployment - with every line explained, not just copy-pasted.',
    instructorId: 2,
    modules: [
      {
        title: 'Backend Foundations',
        lessons: [
          { title: 'Setting up an Express API', duration: '19 min' },
          { title: 'Modeling data with PostgreSQL', duration: '23 min' },
          { title: 'Authentication with JWTs', duration: '21 min' },
          { title: 'Writing your first integration tests', duration: '16 min' },
        ],
      },
      {
        title: 'Frontend with React',
        lessons: [
          { title: 'Component architecture that scales', duration: '20 min' },
          { title: 'Managing server state with queries', duration: '18 min' },
          { title: 'Forms, validation, and error states', duration: '17 min' },
        ],
      },
      {
        title: 'Shipping to Production',
        lessons: [
          { title: 'Environment configuration', duration: '12 min' },
          { title: 'CI/CD with GitHub Actions', duration: '19 min' },
          { title: 'Deploying to a cloud provider', duration: '15 min' },
        ],
      },
    ],
  },
  {
    slug: 'python-for-data-analysis',
    title: 'Python for Data Analysis',
    category: 'Development',
    level: 'Beginner',
    price: 55,
    compareAtPrice: 95,
    rating: 4.6,
    reviewCount: 287,
    studentCount: 9870,
    image: courseImage('nx-course-python-data'),
    description:
      'A practical, no-fluff introduction to Python for anyone who works with data - pandas, NumPy, and matplotlib, taught through real datasets instead of toy examples.',
    instructorId: 2,
    modules: [
      {
        title: 'Python Basics for Data Work',
        lessons: [
          { title: 'Python syntax refresher', duration: '14 min' },
          { title: 'Working with lists, dicts, and loops', duration: '16 min' },
          { title: 'Reading and writing CSV files', duration: '11 min' },
        ],
      },
      {
        title: 'Pandas & NumPy',
        lessons: [
          { title: 'DataFrames and Series basics', duration: '18 min' },
          { title: 'Cleaning messy real-world data', duration: '22 min' },
          { title: 'Grouping, pivoting, and aggregating', duration: '20 min' },
          { title: 'Vectorized operations with NumPy', duration: '15 min' },
        ],
      },
      {
        title: 'Visualizing Results',
        lessons: [
          { title: 'Charting with matplotlib', duration: '17 min' },
          { title: 'Telling a story with your data', duration: '13 min' },
        ],
      },
    ],
  },
  {
    slug: 'advanced-react-patterns',
    title: 'Advanced React Patterns',
    category: 'Development',
    level: 'Advanced',
    price: 55,
    compareAtPrice: 95,
    rating: 4.8,
    reviewCount: 164,
    studentCount: 4310,
    image: courseImage('nx-course-react-patterns'),
    description:
      'Level up from "React works" to "React scales" - compound components, render props, performance profiling, and the architectural decisions that keep a large codebase maintainable.',
    instructorId: 2,
    modules: [
      {
        title: 'Composition Patterns',
        lessons: [
          { title: 'Compound components', duration: '19 min' },
          { title: 'Render props vs. hooks', duration: '17 min' },
          { title: 'Polymorphic components', duration: '15 min' },
        ],
      },
      {
        title: 'Performance',
        lessons: [
          { title: 'Profiling with React DevTools', duration: '18 min' },
          { title: 'Memoization done right', duration: '16 min' },
          { title: 'Avoiding unnecessary re-renders', duration: '14 min' },
          { title: 'Code-splitting large route trees', duration: '13 min' },
        ],
      },
      {
        title: 'State Architecture',
        lessons: [
          { title: 'When to reach for a state library', duration: '15 min' },
          { title: 'Colocating state vs. lifting it up', duration: '12 min' },
        ],
      },
    ],
  },
  {
    slug: 'startup-financial-modeling',
    title: 'Startup Financial Modeling',
    category: 'Business',
    level: 'Intermediate',
    price: 55,
    compareAtPrice: 95,
    rating: 4.7,
    reviewCount: 143,
    studentCount: 3680,
    image: courseImage('nx-course-financial-modeling'),
    description:
      'Build an investor-ready financial model from a blank spreadsheet - revenue projections, unit economics, burn rate, and the assumptions that actually hold up in a board meeting.',
    instructorId: 3,
    modules: [
      {
        title: 'Modeling Fundamentals',
        lessons: [
          { title: 'Revenue model structures', duration: '16 min' },
          { title: 'Unit economics: CAC, LTV, and payback', duration: '19 min' },
          { title: 'Building a three-statement model', duration: '24 min' },
        ],
      },
      {
        title: 'Planning for Growth',
        lessons: [
          { title: 'Headcount and hiring plans', duration: '14 min' },
          { title: 'Burn rate and runway scenarios', duration: '17 min' },
          { title: 'Sensitivity analysis and scenarios', duration: '18 min' },
        ],
      },
      {
        title: 'Presenting to Investors',
        lessons: [
          { title: 'What investors actually check first', duration: '13 min' },
          { title: 'Turning your model into a data room', duration: '11 min' },
        ],
      },
    ],
  },
  {
    slug: 'negotiation-mastery',
    title: 'Negotiation Mastery',
    category: 'Business',
    level: 'Beginner',
    price: 55,
    compareAtPrice: 95,
    rating: 4.9,
    reviewCount: 221,
    studentCount: 6740,
    image: courseImage('nx-course-negotiation'),
    description:
      'Practical negotiation tactics for salary talks, vendor contracts, and everyday workplace disagreements - grounded in real scripts you can use the next day, not abstract theory.',
    instructorId: 3,
    modules: [
      {
        title: 'Core Principles',
        lessons: [
          { title: 'Why most people under-negotiate', duration: '12 min' },
          { title: 'Anchoring and framing', duration: '15 min' },
          { title: 'Reading the other side', duration: '13 min' },
        ],
      },
      {
        title: 'Real-World Scripts',
        lessons: [
          { title: 'Negotiating a salary offer', duration: '17 min' },
          { title: 'Pushing back on a vendor contract', duration: '14 min' },
          { title: 'Resolving a workplace disagreement', duration: '12 min' },
        ],
      },
      {
        title: 'Closing the Deal',
        lessons: [
          { title: 'Getting to yes without losing value', duration: '11 min' },
          { title: 'Walking away gracefully', duration: '9 min' },
        ],
      },
    ],
  },
  {
    slug: 'seo-growth-strategy',
    title: 'SEO & Organic Growth Strategy',
    category: 'Marketing',
    level: 'Intermediate',
    price: 55,
    compareAtPrice: 95,
    rating: 4.6,
    reviewCount: 176,
    studentCount: 5290,
    image: courseImage('nx-course-seo-growth'),
    description:
      'A complete, up-to-date SEO playbook - keyword research, technical audits, content clusters, and link building - built around the strategies that are actually working today.',
    instructorId: 4,
    modules: [
      {
        title: 'SEO Fundamentals',
        lessons: [
          { title: 'How search engines rank pages', duration: '14 min' },
          { title: 'Keyword research that finds demand', duration: '18 min' },
          { title: 'On-page optimization checklist', duration: '16 min' },
        ],
      },
      {
        title: 'Technical SEO',
        lessons: [
          { title: 'Site speed and Core Web Vitals', duration: '17 min' },
          { title: 'Crawlability and indexation audits', duration: '19 min' },
          { title: 'Structured data and rich results', duration: '13 min' },
        ],
      },
      {
        title: 'Content & Authority',
        lessons: [
          { title: 'Building topic clusters', duration: '15 min' },
          { title: 'Earning links that actually matter', duration: '16 min' },
        ],
      },
    ],
  },
  {
    slug: 'social-media-ads-masterclass',
    title: 'Social Media Ads Masterclass',
    category: 'Marketing',
    level: 'Beginner',
    price: 55,
    compareAtPrice: 95,
    rating: 4.5,
    reviewCount: 203,
    studentCount: 7420,
    image: courseImage('nx-course-social-ads'),
    description:
      'Plan, launch, and optimize paid social campaigns across Meta and TikTok - audience targeting, creative testing, and budget allocation that turns ad spend into measurable revenue.',
    instructorId: 4,
    modules: [
      {
        title: 'Campaign Setup',
        lessons: [
          { title: 'Choosing the right campaign objective', duration: '11 min' },
          { title: 'Audience targeting that converts', duration: '15 min' },
          { title: 'Budgeting and bid strategies', duration: '13 min' },
        ],
      },
      {
        title: 'Creative That Performs',
        lessons: [
          { title: 'Writing ad copy that stops the scroll', duration: '14 min' },
          { title: 'Video ad formats that work on TikTok', duration: '17 min' },
          { title: 'Running a creative testing matrix', duration: '16 min' },
        ],
      },
      {
        title: 'Optimization',
        lessons: [
          { title: 'Reading campaign metrics correctly', duration: '15 min' },
          { title: 'Scaling a winning ad without killing it', duration: '12 min' },
        ],
      },
    ],
  },
  {
    slug: 'brand-storytelling-content',
    title: 'Brand Storytelling & Content Strategy',
    category: 'Marketing',
    level: 'Advanced',
    price: 55,
    compareAtPrice: 95,
    rating: 4.8,
    reviewCount: 131,
    studentCount: 2980,
    image: courseImage('nx-course-brand-storytelling'),
    description:
      'Move beyond content calendars and learn to build a brand narrative that holds together across every channel - voice, positioning, and the editorial systems used by teams that publish daily.',
    instructorId: 4,
    modules: [
      {
        title: 'Finding Your Narrative',
        lessons: [
          { title: 'Positioning before messaging', duration: '16 min' },
          { title: 'Defining a distinct brand voice', duration: '14 min' },
          { title: 'Building a messaging hierarchy', duration: '15 min' },
        ],
      },
      {
        title: 'Editorial Systems',
        lessons: [
          { title: 'Running a content calendar at scale', duration: '13 min' },
          { title: 'Repurposing one idea across channels', duration: '12 min' },
          { title: 'Briefing writers and designers consistently', duration: '11 min' },
        ],
      },
      {
        title: 'Measuring Impact',
        lessons: [
          { title: 'Brand metrics that are not vanity metrics', duration: '14 min' },
          { title: 'Tying content to pipeline', duration: '15 min' },
        ],
      },
    ],
  },
];

export interface NxCourseInstructor {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  courseCount: number;
}

export const COURSE_INSTRUCTORS: NxCourseInstructor[] = [
  {
    id: 1,
    name: 'Elena Marchetti',
    title: 'Senior Product Designer',
    avatar: courseAvatar(23),
    bio: 'Elena spent nine years designing products at two Y Combinator startups before turning to teaching full-time. She focuses on practical, portfolio-ready design skills over trend-chasing.',
    courseCount: 6,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Staff Software Engineer',
    avatar: courseAvatar(14),
    bio: 'Marcus has shipped backend and frontend systems at scale for over a decade, most recently leading a platform team of twelve engineers. He believes the best way to learn to code is to build something real.',
    courseCount: 8,
  },
  {
    id: 3,
    name: 'Priya Anand',
    title: 'Startup Advisor & CFO Coach',
    avatar: courseAvatar(47),
    bio: 'Priya has advised over 60 early-stage founders on fundraising and financial planning, and previously served as CFO at a Series B logistics startup. She teaches the numbers side of business without the jargon.',
    courseCount: 4,
  },
  {
    id: 4,
    name: 'Jordan Hale',
    title: 'Growth Marketing Lead',
    avatar: courseAvatar(33),
    bio: 'Jordan has run growth and performance marketing for consumer apps with millions of users, and writes a widely-read newsletter on what is actually working in digital marketing right now.',
    courseCount: 5,
  },
];

export interface NxCourseReview {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export const COURSE_REVIEWS: NxCourseReview[] = [
  {
    name: 'Hannah Osei',
    avatar: courseAvatar(5),
    rating: 5,
    date: '2026-09-18',
    text: 'This course finally made design principles click for me. The exercises felt like real work, not busywork, and I used what I learned the very next week at my job.',
  },
  {
    name: 'Diego Fernandez',
    avatar: courseAvatar(18),
    rating: 5,
    date: '2026-08-27',
    text: 'Clear explanations, well-paced, and the instructor actually answers questions in the community. Worth every penny of the one-time price.',
  },
  {
    name: 'Yuki Tanaka',
    avatar: courseAvatar(36),
    rating: 4,
    date: '2026-08-02',
    text: 'Great content overall. A couple of the later modules move fast if you are totally new to the topic, but the lesson recordings make it easy to rewatch.',
  },
  {
    name: 'Olivia Bennett',
    avatar: courseAvatar(41),
    rating: 5,
    date: '2026-07-14',
    text: 'I have taken a lot of online courses and this is one of the few that felt genuinely structured, with a clear path from beginner to confident practitioner.',
  },
  {
    name: 'Marcus Webb',
    avatar: courseAvatar(27),
    rating: 5,
    date: '2026-06-30',
    text: 'The instructor clearly cares about teaching, not just recording slides. I came back for a second course the week I finished the first one.',
  },
  {
    name: 'Aisha Rahman',
    avatar: courseAvatar(60),
    rating: 4,
    date: '2026-06-11',
    text: 'Solid curriculum with real projects to show for it. Would have liked a bit more depth in the final module, but overall very happy with what I learned.',
  },
  {
    name: 'Tomás Herrera',
    avatar: courseAvatar(22),
    rating: 5,
    date: '2026-05-22',
    text: 'Exactly the kind of practical, no-nonsense teaching I was looking for. I finished the course and immediately applied it to a project at work.',
  },
  {
    name: 'Grace Lindqvist',
    avatar: courseAvatar(50),
    rating: 5,
    date: '2026-05-03',
    text: 'The pacing is excellent and the community forum is genuinely active - I got a helpful answer to a question within an hour of posting it.',
  },
];

export interface NxCourseTestimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export const COURSE_TESTIMONIALS: NxCourseTestimonial[] = [
  {
    name: 'Samuel Okoye',
    role: 'Career Switcher, now Junior Developer',
    avatar: courseAvatar(9),
    quote:
      'I went from knowing nothing about code to landing a junior developer role in five months. Pathwise Academy was the only platform that actually built up to real projects.',
  },
  {
    name: 'Mei Lin',
    role: 'Freelance Product Designer',
    avatar: courseAvatar(31),
    quote:
      'The Figma prototyping course alone paid for itself with my first new client project. I wish I had found this platform years earlier.',
  },
  {
    name: 'Carlos Dominguez',
    role: 'Marketing Manager',
    avatar: courseAvatar(52),
    quote:
      'Short, focused lessons that respect my time. I finish a module on my commute and actually retain it, which is more than I can say for most courses I have tried.',
  },
];

export interface NxEnrolledCourse {
  course: NxCourse;
  progress: number;
  lastLesson: string;
}

export interface NxCoursePlan {
  name: string;
  price: number | 'Custom';
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const COURSE_PLANS: NxCoursePlan[] = [
  {
    name: 'Single Course',
    price: 55,
    period: 'one-time',
    description: 'Buy any one course outright and keep it forever, including every future update.',
    features: [
      'Lifetime access to the course you choose',
      'Downloadable project files',
      'Certificate of completion',
      'Access on web and mobile',
    ],
  },
  {
    name: 'All-Access',
    price: 29,
    period: '/ month',
    description: 'Unlimited access to every course on Pathwise Academy, with new releases included.',
    features: [
      'Every course in the catalog',
      'New courses added every month',
      'Certificates for every course you finish',
      'Priority instructor Q&A support',
      'Cancel anytime',
    ],
    highlighted: true,
  },
  {
    name: 'Teams',
    price: 'Custom',
    period: '',
    description: 'Train your whole team with shared seats, progress tracking, and centralized billing.',
    features: [
      'Everything in All-Access, per seat',
      'Manager dashboard with team progress',
      'Centralized invoicing',
      'Dedicated account manager',
    ],
  },
];

export interface NxCourseBlogPost {
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

export const COURSE_BLOG_POSTS: NxCourseBlogPost[] = [
  {
    slug: 'how-to-actually-finish-an-online-course',
    title: 'How to Actually Finish an Online Course',
    category: 'Learning Tips',
    author: 'Elena Marchetti',
    authorAvatar: courseAvatar(23),
    date: '2026-10-02',
    readTime: '6 min read',
    image: courseImage('nx-blog-finish-course'),
    excerpt:
      'Most online courses are never finished. Here is the structure that actually gets students from lesson one to a completed certificate.',
    content: [
      'The completion rate for the average online course hovers somewhere around 10 to 15 percent. That is not because the content is bad - it is because most courses are designed to be started, not finished. Nobody tells you how to actually build the habit of showing up.',
      'The first fix is embarrassingly simple: schedule the course like a real commitment, not a someday task. Put a recurring block on your calendar, even if it is only twenty minutes, three times a week. Treat it the same way you would treat a gym session or a standing meeting - something you show up to whether or not you feel like it that day.',
      'The second fix is to stop watching passively. Pause after every lesson and do something with what you just learned, even if it is a five-minute exercise that has nothing to do with the official assignment. Passive video consumption feels like progress but builds almost no retention.',
      'Finally, lower the bar for what counts as a session. A five-minute review of your notes counts. Rewatching one lesson at 1.5x speed counts. The goal is to never let more than a few days pass without touching the material, because restarting a cold course is far harder than continuing a warm one.',
      'Students who finish are not smarter or more disciplined than everyone else - they just made showing up the easy part and let momentum do the rest.',
    ],
  },
  {
    slug: 'skills-employers-are-asking-for-2026',
    title: 'The Skills Employers Are Actually Asking For in 2026',
    category: 'Career Growth',
    author: 'Jordan Hale',
    authorAvatar: courseAvatar(33),
    date: '2026-09-21',
    readTime: '7 min read',
    image: courseImage('nx-blog-employer-skills'),
    excerpt:
      'We looked at hundreds of job listings across design, development, and marketing. A few skills show up again and again - and most of them are learnable in weeks, not years.',
    content: [
      'Job descriptions are a strange genre of writing - half wish list, half genuine requirement. But when you look at hundreds of them side by side, patterns emerge that are a lot more specific than "team player" and "self-starter."',
      'In development roles, the single most repeated phrase this year was not a framework name but "can ship independently" - the ability to take a vague requirement and turn it into working, deployed software without heavy supervision. That means comfort with the full path from idea to production, not just writing functions in isolation.',
      'In design, employers are asking for designers who can justify a decision with reasoning, not just taste. Portfolios that show a process - constraints, alternatives considered, why one direction won - are outperforming portfolios that only show polished final shots.',
      'In marketing, the standout skill is comfort with data. Not deep statistics, just the willingness to look at a dashboard, draw a conclusion, and act on it instead of waiting for someone else to interpret the numbers.',
      'None of these are five-year skills. Every one of them is something you can meaningfully build in a focused month of deliberate practice, which is exactly why they show up in job posts more than any specific tool or language.',
    ],
  },
  {
    slug: 'from-tutorial-hell-to-first-real-project',
    title: 'From Tutorial Hell to Your First Real Project',
    category: 'Learning Tips',
    author: 'Marcus Chen',
    authorAvatar: courseAvatar(14),
    date: '2026-09-05',
    readTime: '8 min read',
    image: courseImage('nx-blog-tutorial-hell'),
    excerpt:
      'You have followed along with a dozen tutorials and still freeze in front of a blank project. Here is the exact bridge that gets you across.',
    content: [
      '"Tutorial hell" is the feeling of being able to follow along with any tutorial, line by line, but freezing the moment you open a blank file with no instructions. It is one of the most common plateaus in learning to build anything, and it is completely normal.',
      'The reason it happens is that tutorials remove the hardest part of building - deciding what to do next. Following instructions and making decisions are different skills, and only one of them gets exercised when you copy along with a video.',
      'The bridge out is what we call a "constrained project": pick something you want to build, but deliberately leave out one piece of the instructions. Follow a tutorial for the setup, then build the next feature entirely on your own, using the documentation instead of a walkthrough. It will be slower and more frustrating than following along - that friction is the actual learning.',
      'Repeat that pattern, increasing the unguided portion each time, and within a handful of small projects the blank file stops being scary. You will have accumulated the one thing tutorials cannot give you directly: the experience of being stuck and getting yourself unstuck.',
      'Your first real project does not need to be original or impressive. It just needs to be yours, built with fewer instructions than the one before it.',
    ],
  },
  {
    slug: 'building-a-portfolio-that-gets-interviews',
    title: 'Building a Portfolio That Actually Gets Interviews',
    category: 'Career Growth',
    author: 'Elena Marchetti',
    authorAvatar: courseAvatar(23),
    date: '2026-08-14',
    readTime: '6 min read',
    image: courseImage('nx-blog-portfolio'),
    excerpt:
      'A portfolio with ten mediocre projects loses to a portfolio with three strong ones, every time. Here is how to pick which three.',
    content: [
      'Hiring managers spend, on average, well under a minute on a first pass through a portfolio. That means the job of your portfolio is not to show everything you have ever made - it is to make a strong first impression fast and reward anyone who keeps reading.',
      'Pick projects that show range across the skills the role actually needs, not range across every skill you happen to have. A frontend role wants to see interface work and interaction detail, not a half-finished mobile app you made once out of curiosity.',
      'For each project, lead with the problem, not the output. "Users were abandoning checkout at 40 percent" is a stronger opening line than "Here is an e-commerce site I built," because it immediately tells the reader why the project existed.',
      'Cut ruthlessly. Three projects you can talk about in depth, with real decisions and real tradeoffs, will always beat ten projects you can only describe in a sentence each.',
    ],
  },
  {
    slug: 'learning-in-short-bursts-vs-deep-work',
    title: 'Learning in Short Bursts vs. Deep Work Sessions',
    category: 'Learning Tips',
    author: 'Priya Anand',
    authorAvatar: courseAvatar(47),
    date: '2026-07-29',
    readTime: '5 min read',
    image: courseImage('nx-blog-short-bursts'),
    excerpt:
      'Fifteen minutes on your commute or a focused two-hour block on a weekend - which actually moves the needle more for learning a new skill?',
    content: [
      'This comes up in almost every course community: is it better to study in short, frequent bursts or in long, uninterrupted sessions? The honest answer is that they are good for different things, and most learners need both.',
      'Short bursts are excellent for review and retention. Fifteen minutes spent rewatching a tricky lesson or flipping through your own notes keeps material fresh in a way that spacing it out over a week does not. This is where consistency compounds.',
      'Deep work sessions are where real skill-building happens, especially for anything hands-on - writing code, designing a layout, building a financial model. These tasks have a ramp-up cost; the first twenty minutes are often just reloading context, so a session shorter than that rarely produces real progress.',
      'The practical answer is to use short bursts for the lecture and review portions of a course, and protect at least one longer block a week for the project work. Trying to build something complex in five-minute fragments is close to the worst way to spend the time.',
    ],
  },
  {
    slug: 'why-certificates-still-matter-in-2026',
    title: 'Do Online Certificates Still Matter in 2026?',
    category: 'Career Growth',
    author: 'Jordan Hale',
    authorAvatar: courseAvatar(33),
    date: '2026-07-08',
    readTime: '5 min read',
    image: courseImage('nx-blog-certificates'),
    excerpt:
      'A certificate alone will not get you hired. But dismissing them entirely misses what they are actually good for.',
    content: [
      'There is a common take that certificates from online courses are worthless, usually from people pointing out - correctly - that nobody gets hired purely because of a line on a resume. That is true, but it skips over what certificates are actually useful for.',
      'A certificate is weak as a credential and strong as a forcing function. The structure of working toward a finishing point is what gets most learners through material they would otherwise abandon halfway. The piece of paper at the end is almost beside the point.',
      'Certificates also do real work in specific, narrower situations: internal promotions where a manager needs a simple way to confirm a skill was learned, freelance proposals where a client wants quick reassurance, and career-switch resumes where a recruiter is scanning for any evidence of initiative.',
      'The mistake is treating a certificate as the goal instead of a side effect. Finish the course for the skill and the project you can show. Let the certificate be the receipt, not the reason.',
    ],
  },
];

export interface NxCourseFaq {
  q: string;
  a: string;
}

export const COURSE_FAQS: NxCourseFaq[] = [
  {
    q: 'How long do I have access to a course after purchasing?',
    a: 'Once you buy a course on the Single Course plan, you have lifetime access, including all future updates to that course. All-Access subscribers keep access to every course for as long as their subscription is active.',
  },
  {
    q: 'Do I get a certificate when I finish a course?',
    a: 'Yes. Every course on Pathwise Academy issues a certificate of completion once you finish all modules, which you can download as a PDF or share directly to LinkedIn.',
  },
  {
    q: 'What is your refund policy?',
    a: 'If a course is not what you expected, you can request a full refund within 14 days of purchase, no questions asked, as long as you have completed less than 30 percent of the material.',
  },
  {
    q: 'Can I pay in installments instead of all at once?',
    a: 'Individual courses can be split into three monthly installments at checkout. The All-Access plan is already billed monthly, so there is no separate installment option needed for it.',
  },
  {
    q: 'Can I access my courses from a phone or tablet?',
    a: 'Yes. Pathwise Academy works in any modern mobile browser, and all video lessons support offline downloads so you can keep learning without a connection.',
  },
  {
    q: 'Will I be able to ask the instructor questions?',
    a: 'Every course includes a community Q&A thread where instructors answer student questions directly, typically within 24 to 48 hours. All-Access subscribers get priority responses.',
  },
];

export const ENROLLED_COURSES: NxEnrolledCourse[] = [
  {
    course: COURSES[0],
    progress: 68,
    lastLesson: 'Nielsen’s 10 usability heuristics',
  },
  {
    course: COURSES[2],
    progress: 34,
    lastLesson: 'Modeling data with PostgreSQL',
  },
  {
    course: COURSES[7],
    progress: 92,
    lastLesson: 'Building topic clusters',
  },
  {
    course: COURSES[5],
    progress: 12,
    lastLesson: 'Revenue model structures',
  },
];
