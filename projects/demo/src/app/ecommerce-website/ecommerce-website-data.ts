export interface NxEcomProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  swatch: string;
  icon: string;
  /** A real photo for the product card/gallery - picsum.photos (seeded, so it's stable per product). */
  image: string;
  badge?: 'New' | 'Sale' | 'Best Seller';
  description: string;
  colors?: string[];
  sizes?: string[];
}

export const ECOM_CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];

function ecomImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export const ECOM_PRODUCTS: NxEcomProduct[] = [
  {
    id: 1,
    name: 'Aero Wireless Headphones',
    category: 'Electronics',
    price: 129,
    compareAtPrice: 159,
    rating: 4.5,
    reviewCount: 212,
    swatch: '#3d5a80',
    icon: 'nx-music',
    image: ecomImage('nx-aero-headphones'),
    badge: 'New',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and a plush memory-foam fit. Pairs instantly over Bluetooth 5.3.',
    colors: ['#1a1a1a', '#e5e7eb', '#3d5a80'],
    sizes: ['One Size'],
  },
  {
    id: 2,
    name: 'Pulse Smartwatch',
    category: 'Electronics',
    price: 199,
    rating: 4,
    reviewCount: 98,
    swatch: '#293241',
    icon: 'nx-smartphone',
    image: ecomImage('nx-pulse-smartwatch'),
    description: 'Track workouts, sleep, and heart rate with a bright always-on display and 5-day battery life.',
    colors: ['#293241', '#9c6644'],
    sizes: ['S/M', 'M/L'],
  },
  {
    id: 3,
    name: 'Orbit Bluetooth Speaker',
    category: 'Electronics',
    price: 79,
    compareAtPrice: 99,
    rating: 4.5,
    reviewCount: 156,
    swatch: '#577590',
    icon: 'nx-music',
    image: ecomImage('nx-orbit-speaker'),
    badge: 'Sale',
    description: '360-degree sound with deep bass, IPX7 waterproofing, and 18 hours of playtime on a single charge.',
    colors: ['#1a1a1a', '#577590'],
  },
  {
    id: 4,
    name: 'Horizon Denim Jacket',
    category: 'Clothing',
    price: 89,
    rating: 4.5,
    reviewCount: 64,
    swatch: '#9c6644',
    icon: 'nx-tag',
    image: ecomImage('nx-denim-jacket'),
    badge: 'Sale',
    compareAtPrice: 119,
    description: 'A timeless denim jacket cut from heavyweight cotton twill with a relaxed, everyday fit.',
    colors: ['#3d5a80', '#1a1a1a'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'Everyday Cotton Tee',
    category: 'Clothing',
    price: 24,
    rating: 4,
    reviewCount: 340,
    swatch: '#606c38',
    icon: 'nx-tag',
    image: ecomImage('nx-cotton-tee'),
    description: 'Soft, breathable 100% combed cotton in a modern regular fit. Pre-shrunk and built to last.',
    colors: ['#ffffff', '#1a1a1a', '#606c38'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    name: 'Summit Wool Sweater',
    category: 'Clothing',
    price: 68,
    rating: 5,
    reviewCount: 41,
    swatch: '#6d6875',
    icon: 'nx-tag',
    image: ecomImage('nx-wool-sweater'),
    badge: 'Best Seller',
    description: 'A merino-wool blend crewneck that keeps you warm without the bulk. Machine washable.',
    colors: ['#6d6875', '#9c6644'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 7,
    name: 'Ember Table Lamp',
    category: 'Home',
    price: 59,
    rating: 5,
    reviewCount: 88,
    swatch: '#bc6c25',
    icon: 'nx-sun',
    image: ecomImage('nx-table-lamp'),
    description: 'A warm-glow ceramic table lamp with a linen shade - dimmable and built for bedside reading.',
  },
  {
    id: 8,
    name: 'Driftwood Wall Shelf',
    category: 'Home',
    price: 44,
    rating: 4,
    reviewCount: 52,
    swatch: '#6d6855',
    icon: 'nx-home',
    image: ecomImage('nx-wall-shelf'),
    badge: 'New',
    description: 'Solid oak floating shelf with hidden brackets - mounts in minutes, holds up to 20 lbs.',
  },
  {
    id: 9,
    name: 'Hearth Ceramic Mug Set',
    category: 'Home',
    price: 32,
    rating: 4.5,
    reviewCount: 127,
    swatch: '#a4133c',
    icon: 'nx-gift',
    image: ecomImage('nx-mug-set'),
    description: 'A set of four hand-glazed stoneware mugs, dishwasher and microwave safe.',
  },
  {
    id: 10,
    name: 'Velvet Matte Lipstick',
    category: 'Beauty',
    price: 18,
    rating: 4.5,
    reviewCount: 403,
    swatch: '#a4133c',
    icon: 'nx-heart',
    image: ecomImage('nx-matte-lipstick'),
    badge: 'Sale',
    compareAtPrice: 24,
    description: 'Long-wear matte lipstick in a rich pigment that glides on smooth and never feathers.',
    colors: ['#a4133c', '#9c6644', '#1a1a1a'],
  },
  {
    id: 11,
    name: 'Citrus Bloom Candle',
    category: 'Beauty',
    price: 22,
    rating: 5,
    reviewCount: 211,
    swatch: '#e09f3e',
    icon: 'nx-fire',
    image: ecomImage('nx-bloom-candle'),
    description: 'Hand-poured soy candle with notes of citrus, neroli, and cedarwood - 45 hour burn time.',
  },
  {
    id: 12,
    name: 'Glow Facial Serum',
    category: 'Beauty',
    price: 36,
    rating: 4,
    reviewCount: 76,
    swatch: '#e09f3e',
    icon: 'nx-heart',
    image: ecomImage('nx-facial-serum'),
    description: 'A lightweight vitamin-C serum that brightens and evens skin tone with daily use.',
  },
  {
    id: 13,
    name: 'Trailblazer Running Shoes',
    category: 'Sports',
    price: 112,
    compareAtPrice: 140,
    rating: 4.5,
    reviewCount: 189,
    swatch: '#264653',
    icon: 'nx-tag',
    image: ecomImage('nx-running-shoes'),
    badge: 'Sale',
    description: 'Responsive foam cushioning and a breathable knit upper built for long-distance comfort.',
    colors: ['#264653', '#e5e7eb'],
    sizes: ['8', '9', '10', '11', '12'],
  },
  {
    id: 14,
    name: 'Flex Yoga Mat',
    category: 'Sports',
    price: 48,
    rating: 5,
    reviewCount: 97,
    swatch: '#2a9d8f',
    icon: 'nx-heart',
    image: ecomImage('nx-yoga-mat'),
    badge: 'Best Seller',
    description: 'Extra-thick non-slip mat with alignment lines - includes a carry strap.',
  },
];

/** Returns 4 stable gallery image URLs for a product's detail-page thumbnail row (same subject, different crops/seeds). */
export function ecomProductGallery(product: NxEcomProduct): string[] {
  return [0, 1, 2, 3].map((i) => ecomImage(`${product.image.split('/seed/')[1]?.split('/')[0]}-${i}`, 600, 450));
}

function ecomAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export interface NxEcomTestimonial {
  name: string;
  role: string;
  swatch: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const ECOM_TESTIMONIALS: NxEcomTestimonial[] = [
  {
    name: 'Ada Lovelace',
    role: 'Verified Buyer',
    swatch: '#3d5a80',
    avatar: ecomAvatar(1),
    rating: 5,
    quote: 'The quality blew me away. Shipping was fast and the packaging felt premium from the moment it arrived.',
  },
  {
    name: 'Grace Hopper',
    role: 'Verified Buyer',
    swatch: '#9c6644',
    avatar: ecomAvatar(5),
    rating: 5,
    quote: "I've reordered three times already. Customer support answered my sizing question in minutes.",
  },
  {
    name: 'Alan Turing',
    role: 'Verified Buyer',
    swatch: '#606c38',
    avatar: ecomAvatar(8),
    rating: 4,
    quote: 'Great value for the price. Only wish they had a few more colorways to choose from.',
  },
];

export interface NxEcomFaq {
  q: string;
  a: string;
}

export const ECOM_FAQS: NxEcomFaq[] = [
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of delivery for a full refund, as long as the item is unused and in its original packaging.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3-5 business days. Orders over $50 ship free; expedited options are available at checkout.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes - we ship to over 40 countries. International orders typically arrive within 7-14 business days.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be changed or cancelled within 1 hour of being placed. After that, our fulfillment team will already be packing it up.',
  },
  {
    q: 'How do I track my order?',
    a: 'You will receive a tracking link by email as soon as your order ships - you can also find it under Account > Orders.',
  },
];

export interface NxEcomReview {
  name: string;
  swatch: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface NxEcomOrderItem {
  product: NxEcomProduct;
  qty: number;
}

export interface NxEcomTrackingStep {
  label: string;
  time?: string;
  done: boolean;
}

export type NxEcomOrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface NxEcomOrder {
  id: string;
  date: string;
  status: NxEcomOrderStatus;
  total: number;
  items: NxEcomOrderItem[];
  trackingSteps: NxEcomTrackingStep[];
  shippingAddress: string;
  carrier: string;
  trackingNumber: string;
}

export const ECOM_ORDERS: NxEcomOrder[] = [
  {
    id: 'NX-20493',
    date: 'Oct 28, 2026',
    status: 'Delivered',
    total: 304.97,
    items: [
      { product: ECOM_PRODUCTS[0], qty: 1 },
      { product: ECOM_PRODUCTS[4], qty: 2 },
    ],
    trackingSteps: [
      { label: 'Order Placed', time: 'Oct 24', done: true },
      { label: 'Processing', time: 'Oct 25', done: true },
      { label: 'Shipped', time: 'Oct 26', done: true },
      { label: 'Out for Delivery', time: 'Oct 28', done: true },
      { label: 'Delivered', time: 'Oct 28', done: true },
    ],
    shippingAddress: '124 Harbor View Dr, Austin, TX 78701',
    carrier: 'FedEx',
    trackingNumber: '884019204822',
  },
  {
    id: 'NX-20488',
    date: 'Oct 22, 2026',
    status: 'Out for Delivery',
    total: 199,
    items: [{ product: ECOM_PRODUCTS[1], qty: 1 }],
    trackingSteps: [
      { label: 'Order Placed', time: 'Oct 19', done: true },
      { label: 'Processing', time: 'Oct 20', done: true },
      { label: 'Shipped', time: 'Oct 21', done: true },
      { label: 'Out for Delivery', time: 'Today', done: true },
      { label: 'Delivered', done: false },
    ],
    shippingAddress: '124 Harbor View Dr, Austin, TX 78701',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'NX-20471',
    date: 'Oct 15, 2026',
    status: 'Shipped',
    total: 112,
    items: [{ product: ECOM_PRODUCTS[12], qty: 1 }],
    trackingSteps: [
      { label: 'Order Placed', time: 'Oct 15', done: true },
      { label: 'Processing', time: 'Oct 16', done: true },
      { label: 'Shipped', time: 'Oct 17', done: true },
      { label: 'Out for Delivery', done: false },
      { label: 'Delivered', done: false },
    ],
    shippingAddress: '124 Harbor View Dr, Austin, TX 78701',
    carrier: 'USPS',
    trackingNumber: '9400111899223344556677',
  },
  {
    id: 'NX-20455',
    date: 'Oct 9, 2026',
    status: 'Processing',
    total: 54,
    items: [
      { product: ECOM_PRODUCTS[9], qty: 1 },
      { product: ECOM_PRODUCTS[11], qty: 1 },
    ],
    trackingSteps: [
      { label: 'Order Placed', time: 'Oct 9', done: true },
      { label: 'Processing', time: 'Oct 9', done: true },
      { label: 'Shipped', done: false },
      { label: 'Out for Delivery', done: false },
      { label: 'Delivered', done: false },
    ],
    shippingAddress: '124 Harbor View Dr, Austin, TX 78701',
    carrier: 'FedEx',
    trackingNumber: 'Pending pickup',
  },
  {
    id: 'NX-20412',
    date: 'Sep 30, 2026',
    status: 'Cancelled',
    total: 89,
    items: [{ product: ECOM_PRODUCTS[3], qty: 1 }],
    trackingSteps: [
      { label: 'Order Placed', time: 'Sep 30', done: true },
      { label: 'Cancelled', time: 'Oct 1', done: true },
    ],
    shippingAddress: '124 Harbor View Dr, Austin, TX 78701',
    carrier: '-',
    trackingNumber: '-',
  },
];

export interface NxEcomBlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface NxEcomBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: NxEcomBlogAuthor;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const ecomAuthors: Record<string, NxEcomBlogAuthor> = {
  mara: {
    name: 'Mara Lindqvist',
    role: 'Content Lead',
    avatar: ecomAvatar(44),
    bio: 'Mara writes about sustainable materials and the stories behind every Fernway product.',
  },
  dev: {
    name: 'Dev Okafor',
    role: 'Product Specialist',
    avatar: ecomAvatar(12),
    bio: 'Dev spends his days testing gear in the field before it ever reaches the shop.',
  },
  priya: {
    name: 'Priya Nair',
    role: 'Stylist',
    avatar: ecomAvatar(29),
    bio: 'Priya curates seasonal edits and styling guides for the Fernway journal.',
  },
};

export const ECOM_BLOG_POSTS: NxEcomBlogPost[] = [
  {
    slug: 'how-we-choose-every-material',
    title: 'How We Choose Every Material We Sell',
    excerpt: 'A behind-the-scenes look at the sourcing checklist every product has to pass before it reaches the shop.',
    content: [
      'Every product on Fernway goes through the same five-point sourcing checklist before it is ever listed - durability, origin, repairability, packaging footprint, and fair-labor certification.',
      'We reject roughly two out of every three samples we test. The ones that make it through get a second round of real-world testing with our team for at least four weeks.',
      'This is slower than most retailers are willing to go, but it is the only way we can stand behind a 30-day no-questions return policy without losing money on returns.',
    ],
    category: 'Sustainability',
    author: ecomAuthors['mara'],
    date: 'Oct 20, 2026',
    readTime: '5 min read',
    image: ecomImage('nx-blog-materials', 900, 560),
    tags: ['Sourcing', 'Sustainability', 'Behind the Scenes'],
    featured: true,
  },
  {
    slug: 'packing-the-perfect-carry-on',
    title: 'Packing the Perfect Carry-On, According to Our Team',
    excerpt: 'Five Fernway staffers share exactly what lives in their bag for a long weekend away.',
    content: [
      'We asked five people on our team to lay out their actual carry-on contents for a three-day trip. The results were more similar than we expected.',
      'Every single person packed a charging cable organizer, a compression packing cube, and one "just in case" layer they almost never use but refuse to leave behind.',
      "The biggest disagreement: shoes. Half the team swears by packing them first, the other half last. We'll let you pick a side.",
    ],
    category: 'Guides',
    author: ecomAuthors['dev'],
    date: 'Oct 11, 2026',
    readTime: '4 min read',
    image: ecomImage('nx-blog-carryon', 900, 560),
    tags: ['Travel', 'Guides'],
  },
  {
    slug: 'autumn-edit-2026',
    title: 'The Autumn Edit: 8 Pieces Worth Layering',
    excerpt: 'Our stylist walks through the eight pieces she is reaching for as the weather turns.',
    content: [
      "Layering season means the same five pieces get worn on repeat, so it's worth choosing ones that actually mix and match.",
      'This edit leans on texture over color - a wool knit, a brushed cotton shirt, and a denim jacket that goes over both without looking bulky.',
      'Everything in this edit is also shown in the lookbook on our Shop page, filtered under New Arrivals.',
    ],
    category: 'Style',
    author: ecomAuthors['priya'],
    date: 'Oct 3, 2026',
    readTime: '3 min read',
    image: ecomImage('nx-blog-autumn', 900, 560),
    tags: ['Style', 'Seasonal'],
  },
  {
    slug: 'inside-our-returns-process',
    title: 'What Actually Happens to a Returned Item',
    excerpt: 'We opened up our warehouse to show exactly where a returned product goes next.',
    content: [
      'Roughly 40% of returns are restocked as-is. Another 35% go through a light refurbishment pass - a reprinted box, a cleaned surface - before heading back to the shelf.',
      'The remaining items are donated to one of three regional partners rather than sent to a landfill, something we report on every year in our sustainability note.',
      'None of this changes how fast your refund lands - that still happens the moment the item is scanned at our dock.',
    ],
    category: 'Sustainability',
    author: ecomAuthors['mara'],
    date: 'Sep 22, 2026',
    readTime: '6 min read',
    image: ecomImage('nx-blog-returns', 900, 560),
    tags: ['Sustainability', 'Returns'],
  },
  {
    slug: 'care-guide-wool-knitwear',
    title: 'The Only Care Guide Your Wool Knitwear Needs',
    excerpt: 'Washing, drying, and storing wool without the pilling, shrinking, or moth holes.',
    content: [
      'Cold hand-wash or a wool cycle, always. Heat is the single biggest cause of shrinkage, not agitation.',
      'Dry flat, never on a hanger - wool holds water weight and will stretch out of shape hanging wet.',
      'For storage, cedar blocks beat mothballs on smell alone, and work just as well.',
    ],
    category: 'Guides',
    author: ecomAuthors['dev'],
    date: 'Sep 12, 2026',
    readTime: '4 min read',
    image: ecomImage('nx-blog-wool-care', 900, 560),
    tags: ['Guides', 'Care Instructions'],
  },
  {
    slug: 'meet-the-makers-ember-lamp',
    title: 'Meet the Makers Behind the Ember Table Lamp',
    excerpt: 'A small ceramics studio in Oaxaca hand-throws every shade that ships under this name.',
    content: [
      'The Ember Table Lamp is made by a six-person ceramics studio that has worked with Fernway since our second year in business.',
      'Every shade is thrown by hand, which means no two lamps are perfectly identical - a seam line, a slightly different glaze pool, a thumbprint in the clay.',
      'We think that is the point. It is also why this is one of the few products we have never been able to restock within 48 hours.',
    ],
    category: 'Behind the Scenes',
    author: ecomAuthors['priya'],
    date: 'Aug 30, 2026',
    readTime: '5 min read',
    image: ecomImage('nx-blog-makers', 900, 560),
    tags: ['Behind the Scenes', 'Home'],
  },
];

export interface NxEcomTeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const ECOM_TEAM: NxEcomTeamMember[] = [
  { name: 'Jordan Blake', role: 'Founder & CEO', avatar: ecomAvatar(52), bio: 'Started Fernway out of a storage unit in 2019 after a decade in retail buying.' },
  { name: 'Mara Lindqvist', role: 'Content Lead', avatar: ecomAvatar(44), bio: 'Runs the Fernway Journal and the sourcing checklist every product has to pass.' },
  { name: 'Dev Okafor', role: 'Product Specialist', avatar: ecomAvatar(12), bio: 'Field-tests every piece of gear for at least four weeks before it gets listed.' },
  { name: 'Priya Nair', role: 'Stylist', avatar: ecomAvatar(29), bio: 'Builds the seasonal edits and keeps the lookbook honest about what actually sells.' },
];

export interface NxEcomMilestone {
  year: string;
  title: string;
  description: string;
}

export const ECOM_MILESTONES: NxEcomMilestone[] = [
  { year: '2019', title: 'Founded in a storage unit', description: 'Fernway launched with 12 products and a single spreadsheet tracking inventory.' },
  { year: '2021', title: 'First retail pop-up', description: 'Opened a six-week pop-up in Austin that sold through its entire stock in 11 days.' },
  { year: '2023', title: '100,000 orders shipped', description: 'Crossed six figures in orders while holding a return rate under 4%.' },
  { year: '2025', title: 'Launched the sourcing checklist', description: 'Formalized the five-point material checklist every product now has to pass.' },
  { year: '2026', title: '40 countries served', description: 'International shipping expanded to 40 countries with local duties calculated at checkout.' },
];

export interface NxEcomFaqCategory {
  category: string;
  icon: string;
  items: NxEcomFaq[];
}

export const ECOM_FAQ_CATEGORIES: NxEcomFaqCategory[] = [
  {
    category: 'Orders & Shipping',
    icon: 'nx-shopping-cart',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Orders over $50 ship free; expedited options are available at checkout.' },
      { q: 'Do you ship internationally?', a: 'Yes - we ship to over 40 countries. International orders typically arrive within 7-14 business days, with duties calculated at checkout.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be changed or cancelled within 1 hour of being placed. After that, our fulfillment team will already be packing it up.' },
      { q: 'How do I track my order?', a: 'You will receive a tracking link by email as soon as your order ships - you can also find it under Account > Order History.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: 'nx-refresh',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for a full refund, as long as the item is unused and in its original packaging.' },
      { q: 'How long do refunds take?', a: 'Refunds are issued the moment your return is scanned at our dock, and typically post to your card within 3-5 business days after that.' },
      { q: 'Do I have to pay for return shipping?', a: 'Returns within the US ship free using the prepaid label included in every order. International returns are the customer\'s responsibility.' },
    ],
  },
  {
    category: 'Payments',
    icon: 'nx-credit-card',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay / Google Pay at checkout.' },
      { q: 'Is it safe to save my card for next time?', a: 'Yes - card details are tokenized by our payment processor and never stored on our own servers.' },
    ],
  },
  {
    category: 'Account',
    icon: 'nx-user',
    items: [
      { q: 'Do I need an account to place an order?', a: 'No - guest checkout is available, but creating an account lets you track orders and save addresses for next time.' },
      { q: 'How do I reset my password?', a: 'Use the "Forgot password" link on the login page - a reset link will arrive within a few minutes.' },
    ],
  },
];

export const ECOM_REVIEWS: NxEcomReview[] = [
  {
    name: 'Mia Chen',
    swatch: '#3d5a80',
    avatar: ecomAvatar(25),
    rating: 5,
    date: '2026-09-14',
    text: 'Exactly as described and the comfort is unreal - wore these for an 8 hour flight with zero complaints.',
  },
  {
    name: 'Leo Martinez',
    swatch: '#bc6c25',
    avatar: ecomAvatar(14),
    rating: 4,
    date: '2026-08-02',
    text: 'Great sound quality for the price. Battery life is a bit shorter than advertised but still solid.',
  },
  {
    name: 'Sofia Rossi',
    swatch: '#a4133c',
    avatar: ecomAvatar(47),
    rating: 5,
    date: '2026-07-21',
    text: 'Bought this as a gift and ended up ordering one for myself too. Packaging alone feels worth the price.',
  },
  {
    name: 'Noah Williams',
    swatch: '#606c38',
    avatar: ecomAvatar(33),
    rating: 4.5,
    date: '2026-06-30',
    text: 'Shipped faster than expected and support was quick to answer my questions before I ordered.',
  },
];
