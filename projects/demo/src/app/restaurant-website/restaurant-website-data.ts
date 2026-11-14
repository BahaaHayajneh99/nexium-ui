/**
 * Shared content for the "Restaurant Website" PRO template (Olive & Oak) - a modern bistro
 * with online ordering and table reservations. Mirrors the shape of ecommerce-website-data.ts
 * so every page can pull from one source of truth instead of inventing copy inline.
 */

export type NxMenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Drinks';

export const RESTAURANT_CATEGORIES: (NxMenuCategory | 'All')[] = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export interface NxMenuItem {
  id: number;
  name: string;
  category: NxMenuCategory;
  price: number;
  description: string;
  image: string;
  tags?: string[];
  rating: number;
  reviewCount: number;
}

function restaurantImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

function restaurantAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export const MENU_ITEMS: NxMenuItem[] = [
  {
    id: 1,
    name: 'Charred Octopus',
    category: 'Starters',
    price: 19,
    description: 'Spanish octopus charred over oak, finished with smoked paprika oil, crispy potato, and pickled fresno chilies.',
    image: restaurantImage('resto-charred-octopus'),
    tags: ["Chef's Pick", 'Gluten-Free', 'Spicy'],
    rating: 5,
    reviewCount: 142,
  },
  {
    id: 2,
    name: 'Burrata & Heirloom Tomato',
    category: 'Starters',
    price: 16,
    description: 'Creamy burrata over heirloom tomatoes, basil oil, aged balsamic, and sourdough crisps from our in-house bakery.',
    image: restaurantImage('resto-burrata-tomato'),
    tags: ['Vegetarian'],
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 3,
    name: 'Crispy Brussels Sprouts',
    category: 'Starters',
    price: 13,
    description: 'Flash-fried brussels sprouts tossed in calabrian chili honey, shaved pecorino, and toasted hazelnuts.',
    image: restaurantImage('resto-brussels-sprouts'),
    tags: ['Vegetarian', 'Spicy'],
    rating: 4.5,
    reviewCount: 176,
  },
  {
    id: 4,
    name: 'Wild Mushroom Arancini',
    category: 'Starters',
    price: 15,
    description: 'Hand-rolled risotto fritters stuffed with wild mushrooms and taleggio, served over a roasted garlic aioli.',
    image: restaurantImage('resto-mushroom-arancini'),
    tags: ['Vegetarian'],
    rating: 4,
    reviewCount: 64,
  },
  {
    id: 5,
    name: 'Herb-Crusted Rack of Lamb',
    category: 'Mains',
    price: 42,
    description: 'New Zealand lamb rack crusted in rosemary and dijon, roasted to a rosy medium, with a red wine jus and fingerling potatoes.',
    image: restaurantImage('resto-rack-of-lamb'),
    tags: ["Chef's Pick", 'Gluten-Free'],
    rating: 5,
    reviewCount: 203,
  },
  {
    id: 6,
    name: 'Pan-Seared Scallops',
    category: 'Mains',
    price: 38,
    description: 'Diver scallops seared to a golden crust over a sweet corn puree, with brown butter, chives, and crispy pancetta.',
    image: restaurantImage('resto-seared-scallops'),
    tags: ["Chef's Pick", 'Gluten-Free'],
    rating: 5,
    reviewCount: 187,
  },
  {
    id: 7,
    name: 'Braised Short Rib',
    category: 'Mains',
    price: 34,
    description: 'Red-wine braised short rib falling off the bone, set over creamy parmesan polenta with charred broccolini.',
    image: restaurantImage('resto-short-rib'),
    tags: ['Gluten-Free'],
    rating: 4.5,
    reviewCount: 221,
  },
  {
    id: 8,
    name: 'Butternut Squash Risotto',
    category: 'Mains',
    price: 26,
    description: 'Slow-stirred arborio rice with roasted butternut squash, sage brown butter, toasted pepitas, and aged parmesan.',
    image: restaurantImage('resto-squash-risotto'),
    tags: ['Vegetarian', 'Gluten-Free'],
    rating: 4,
    reviewCount: 89,
  },
  {
    id: 9,
    name: 'Basque Cheesecake',
    category: 'Desserts',
    price: 11,
    description: 'Burnt-top Basque cheesecake with a custardy center, served warm with a macerated berry compote.',
    image: restaurantImage('resto-basque-cheesecake'),
    tags: ["Chef's Pick", 'Vegetarian'],
    rating: 5,
    reviewCount: 154,
  },
  {
    id: 10,
    name: 'Dark Chocolate Tart',
    category: 'Desserts',
    price: 12,
    description: '70% dark chocolate ganache in a sablé crust, finished with sea salt and a scoop of vanilla bean ice cream.',
    image: restaurantImage('resto-chocolate-tart'),
    tags: ['Vegetarian'],
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: 11,
    name: 'Olive Oil Cake',
    category: 'Desserts',
    price: 10,
    description: 'A delicate citrus-scented olive oil cake with mascarpone cream and candied orange peel.',
    image: restaurantImage('resto-olive-oil-cake'),
    tags: ['Vegetarian'],
    rating: 4,
    reviewCount: 57,
  },
  {
    id: 12,
    name: 'Barrel-Aged Negroni',
    category: 'Drinks',
    price: 15,
    description: 'Our house negroni, barrel-aged six weeks for a rounder, oakier finish. Served over a single large cube.',
    image: restaurantImage('resto-barrel-negroni'),
    rating: 5,
    reviewCount: 131,
  },
  {
    id: 13,
    name: 'Rosemary Lemonade',
    category: 'Drinks',
    price: 7,
    description: 'Fresh-squeezed lemonade infused with garden rosemary and a touch of honey - non-alcoholic and refreshing.',
    image: restaurantImage('resto-rosemary-lemonade'),
    tags: ['Vegetarian', 'Gluten-Free'],
    rating: 4.5,
    reviewCount: 76,
  },
  {
    id: 14,
    name: 'House Red Blend',
    category: 'Drinks',
    price: 13,
    description: 'A medium-bodied blend from a local vineyard partner - notes of blackberry, clove, and soft tannins. By the glass.',
    image: restaurantImage('resto-house-red'),
    rating: 4,
    reviewCount: 94,
  },
];

export interface NxRestaurantTestimonial {
  name: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const RESTAURANT_TESTIMONIALS: NxRestaurantTestimonial[] = [
  {
    name: 'Harper Collins',
    avatar: restaurantAvatar(15),
    rating: 5,
    quote: 'Every dish felt intentional. The short rib alone is worth a reservation, but the service made the night.',
  },
  {
    name: 'Mateo Silva',
    avatar: restaurantAvatar(22),
    rating: 5,
    quote: "We've celebrated three anniversaries here. The tasting menu changes with the seasons and it never misses.",
  },
  {
    name: 'Freya Lindgren',
    avatar: restaurantAvatar(36),
    rating: 4.5,
    quote: 'Online ordering was seamless and the food traveled perfectly. The burrata might be the best in the city.',
  },
  {
    name: 'Jonas Abara',
    avatar: restaurantAvatar(41),
    rating: 5,
    quote: 'Olive & Oak is our go-to for client dinners. Consistent, warm, and the wine list is thoughtfully curated.',
  },
  {
    name: 'Priya Nathan',
    avatar: restaurantAvatar(5),
    rating: 5,
    quote: "The scallops were the best I've had outside of the coast. Our server knew the menu inside and out.",
  },
  {
    name: 'Derek Oyelaran',
    avatar: restaurantAvatar(33),
    rating: 4.5,
    quote: 'Booked the private dining room for a work dinner and the team handled every detail without us asking twice.',
  },
  {
    name: 'Lucia Fernandez',
    avatar: restaurantAvatar(44),
    rating: 5,
    quote: 'The Basque cheesecake is reason enough to come back, but the whole tasting menu was a genuine surprise.',
  },
  {
    name: 'Sam Whitfield',
    avatar: restaurantAvatar(52),
    rating: 4,
    quote: 'Lovely patio for a warm evening. Cocktail list is small but every one of them is well made.',
  },
];

export interface NxRestaurantChef {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const RESTAURANT_TEAM: NxRestaurantChef[] = [
  {
    name: 'Elena Marchetti',
    role: 'Executive Chef & Co-Founder',
    avatar: restaurantAvatar(47),
    bio: 'Trained in Bologna and Lyon, Elena built the Olive & Oak menu around seasonal, farm-direct produce.',
  },
  {
    name: 'Theo Bianchi',
    role: 'Head Chef',
    avatar: restaurantAvatar(53),
    bio: 'Theo runs the line nightly and sources every piece of seafood personally from the morning market.',
  },
  {
    name: 'Nadia Okonkwo',
    role: 'Pastry Chef',
    avatar: restaurantAvatar(28),
    bio: 'Nadia designs every dessert to use the same seasonal produce as the savory menu - nothing goes to waste.',
  },
  {
    name: 'Marcus Webb',
    role: 'General Manager',
    avatar: restaurantAvatar(60),
    bio: 'Marcus has run the floor since opening night and built the wine and cocktail program from scratch.',
  },
];

export const RESTAURANT_GALLERY: string[] = [
  restaurantImage('resto-gallery-dining-room', 700, 500),
  restaurantImage('resto-gallery-open-kitchen', 700, 500),
  restaurantImage('resto-gallery-plated-dish', 700, 500),
  restaurantImage('resto-gallery-bar', 700, 500),
  restaurantImage('resto-gallery-patio', 700, 500),
  restaurantImage('resto-gallery-dessert', 700, 500),
];

export interface NxRestaurantHours {
  day: string;
  hours: string;
}

export const RESTAURANT_HOURS: NxRestaurantHours[] = [
  { day: 'Monday - Thursday', hours: '5:00 PM - 10:00 PM' },
  { day: 'Friday - Saturday', hours: '5:00 PM - 11:30 PM' },
  { day: 'Sunday', hours: '4:00 PM - 9:00 PM' },
];

export const RESTAURANT_ADDRESS = '118 Thistle Lane, Portland, OR 97209';
export const RESTAURANT_PHONE = '+1 (503) 555-0118';
export const RESTAURANT_EMAIL = 'hello@oliveandoak.com';

export interface NxRestaurantEventPackage {
  name: string;
  price: string;
  guestRange: string;
  description: string;
  features: string[];
}

export const RESTAURANT_EVENT_PACKAGES: NxRestaurantEventPackage[] = [
  {
    name: 'Private Dining Room',
    price: 'From $1,200',
    guestRange: '10 - 24 guests',
    description: 'Our glass-walled private room overlooking the open kitchen, perfect for a birthday, anniversary, or small work dinner.',
    features: ['Dedicated server & sommelier', 'Custom 3-course set menu', 'Private bar tab option', 'Flowers & table signage included'],
  },
  {
    name: 'Full Restaurant Buyout',
    price: 'From $6,500',
    guestRange: '60 - 110 guests',
    description: 'Close the doors and make Olive & Oak entirely yours - the dining room, patio, and bar for the night.',
    features: ['Full culinary & service team', 'Custom menu tasting beforehand', 'AV setup for toasts or presentations', 'Valet parking coordination'],
  },
  {
    name: 'Off-site Catering',
    price: 'From $45 / guest',
    guestRange: '20 - 300 guests',
    description: "Bring Olive & Oak's kitchen to your venue, from a plated dinner to a passed-appetizer reception.",
    features: ['Mobile wood-fired grill setup', 'Staffed buffet or plated service', 'Rental & bar package add-ons', 'Dietary & allergy menu options'],
  },
];

export interface NxRestaurantLocation {
  name: string;
  address: string;
  phone: string;
  hours: NxRestaurantHours[];
  image: string;
}

export const RESTAURANT_LOCATIONS: NxRestaurantLocation[] = [
  {
    name: 'Olive & Oak - Thistle Lane',
    address: RESTAURANT_ADDRESS,
    phone: RESTAURANT_PHONE,
    hours: RESTAURANT_HOURS,
    image: restaurantImage('resto-location-thistle', 700, 500),
  },
  {
    name: 'Olive & Oak - Riverside',
    address: '42 Harbor Row, Portland, OR 97201',
    phone: '+1 (503) 555-0142',
    hours: [
      { day: 'Tuesday - Thursday', hours: '5:00 PM - 9:30 PM' },
      { day: 'Friday - Saturday', hours: '5:00 PM - 11:00 PM' },
      { day: 'Sunday - Monday', hours: 'Closed' },
    ],
    image: restaurantImage('resto-location-riverside', 700, 500),
  },
];

export interface NxRestaurantGiftCardAmount {
  value: number;
  popular?: boolean;
}

export const RESTAURANT_GIFT_CARD_AMOUNTS: NxRestaurantGiftCardAmount[] = [
  { value: 25 },
  { value: 50, popular: true },
  { value: 100 },
  { value: 200 },
];

export interface NxRestaurantMilestone {
  title: string;
  time: string;
  description: string;
}

export const RESTAURANT_MILESTONES: NxRestaurantMilestone[] = [
  {
    title: 'Olive & Oak opens on Thistle Lane',
    time: '2012',
    description: 'Elena Marchetti and Marcus Webb open a 12-table bistro with a wood-fired grill and a menu that changes with the farmers market.',
  },
  {
    title: 'Named "Best New Bistro" by Portland Eats',
    time: '2014',
    description: 'A glowing review of the Herb-Crusted Rack of Lamb put the restaurant on the map, and reservations started booking weeks out.',
  },
  {
    title: 'Dining room & patio expansion',
    time: '2017',
    description: 'We doubled our seating and added the garden patio to keep up with demand, without changing a single thing about the kitchen.',
  },
  {
    title: 'Nadia Okonkwo joins as Pastry Chef',
    time: '2020',
    description: "Nadia's seasonal dessert program - including the now-famous Basque Cheesecake - became a reason to visit on its own.",
  },
  {
    title: 'Celebrating 14 years',
    time: '2026',
    description: 'Still family-run, still sourcing from the same farm partners we started with, and still cooking over the same wood-fired grill.',
  },
];
