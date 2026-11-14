export type NxHotelRoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';

export interface NxHotelRoom {
  id: number;
  name: string;
  type: NxHotelRoomType;
  pricePerNight: number;
  /** Max guests. */
  capacity: number;
  bedType: string;
  sizeSqft: number;
  /** A real photo for the room card/gallery - picsum.photos (seeded, so it's stable per room). */
  image: string;
  description: string;
  amenities: string[];
}

export const HOTEL_ROOM_TYPES: NxHotelRoomType[] = ['Standard', 'Deluxe', 'Suite', 'Penthouse'];

export function hotelImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export const HOTEL_ROOMS: NxHotelRoom[] = [
  {
    id: 1,
    name: 'Harbor Standard Room',
    type: 'Standard',
    pricePerNight: 139,
    capacity: 2,
    bedType: '1 Queen Bed',
    sizeSqft: 280,
    image: hotelImage('nx-marlow-harbor-standard'),
    description:
      'A cozy, light-filled room with a partial harbor view, perfect for a short stay in the heart of the city. Finished in warm oak and brushed brass.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Work Desk', 'Mini Bar'],
  },
  {
    id: 2,
    name: 'Garden Standard Room',
    type: 'Standard',
    pricePerNight: 149,
    capacity: 2,
    bedType: '2 Twin Beds',
    sizeSqft: 290,
    image: hotelImage('nx-marlow-garden-standard'),
    description:
      'Overlooking the courtyard garden, this quiet twin room is a favorite with guests traveling together who still want their own space.',
    amenities: ['Free WiFi', 'Garden View', 'Air Conditioning', 'Mini Bar'],
  },
  {
    id: 3,
    name: 'City View Standard',
    type: 'Standard',
    pricePerNight: 159,
    capacity: 2,
    bedType: '1 King Bed',
    sizeSqft: 300,
    image: hotelImage('nx-marlow-city-standard'),
    description:
      'A bright king room on the upper floors, framing the skyline through a floor-to-ceiling window. Simple, comfortable, and quiet.',
    amenities: ['Free WiFi', 'City View', 'Air Conditioning', 'Work Desk'],
  },
  {
    id: 4,
    name: 'Deluxe Ocean View',
    type: 'Deluxe',
    pricePerNight: 219,
    capacity: 3,
    bedType: '1 King Bed',
    sizeSqft: 380,
    image: hotelImage('nx-marlow-deluxe-ocean'),
    description:
      'Wake up to open water from a private sitting area and a deep soaking tub positioned to catch the morning light.',
    amenities: ['Ocean View', 'Free WiFi', 'Mini Bar', 'Soaking Tub', 'Rain Shower'],
  },
  {
    id: 5,
    name: 'Deluxe Balcony Room',
    type: 'Deluxe',
    pricePerNight: 229,
    capacity: 3,
    bedType: '1 King Bed + Daybed',
    sizeSqft: 400,
    image: hotelImage('nx-marlow-deluxe-balcony'),
    description:
      'Step out onto your own private balcony for coffee at sunrise. The daybed makes this a comfortable fit for a small family.',
    amenities: ['Balcony', 'Free WiFi', 'Mini Bar', 'Air Conditioning', 'Rain Shower'],
  },
  {
    id: 6,
    name: 'Deluxe Family Room',
    type: 'Deluxe',
    pricePerNight: 249,
    capacity: 4,
    bedType: '2 Queen Beds',
    sizeSqft: 420,
    image: hotelImage('nx-marlow-deluxe-family'),
    description:
      'Two queen beds and extra floor space make this the room our front desk recommends most often for families of four.',
    amenities: ['Free WiFi', 'City View', 'Mini Bar', 'Work Desk', 'Air Conditioning'],
  },
  {
    id: 7,
    name: 'Junior Suite',
    type: 'Suite',
    pricePerNight: 329,
    capacity: 3,
    bedType: '1 King Bed',
    sizeSqft: 550,
    image: hotelImage('nx-marlow-junior-suite'),
    description:
      'A separate living nook, an oversized marble bathroom, and a corner view make this suite feel like a true retreat.',
    amenities: ['Ocean View', 'Living Area', 'Free WiFi', 'Mini Bar', 'Soaking Tub', 'Butler Service'],
  },
  {
    id: 8,
    name: 'Executive Suite',
    type: 'Suite',
    pricePerNight: 389,
    capacity: 4,
    bedType: '1 King Bed + Sofa Bed',
    sizeSqft: 620,
    image: hotelImage('nx-marlow-executive-suite'),
    description:
      'Our most requested suite for business travelers extending into the weekend - a full living area, dining nook, and private terrace.',
    amenities: ['Private Terrace', 'Living Area', 'Free WiFi', 'Mini Bar', 'Work Desk', 'Butler Service'],
  },
  {
    id: 9,
    name: 'Harbor Suite',
    type: 'Suite',
    pricePerNight: 359,
    capacity: 4,
    bedType: '2 Queen Beds',
    sizeSqft: 600,
    image: hotelImage('nx-marlow-harbor-suite'),
    description:
      'Two queen beds and a sweeping harbor-facing living room make this the top pick for groups who want to stay together without feeling cramped.',
    amenities: ['Ocean View', 'Living Area', 'Kitchenette', 'Free WiFi', 'Mini Bar'],
  },
  {
    id: 10,
    name: 'The Marlow Penthouse',
    type: 'Penthouse',
    pricePerNight: 699,
    capacity: 6,
    bedType: '2 King Beds',
    sizeSqft: 1100,
    image: hotelImage('nx-marlow-penthouse'),
    description:
      'The entire top floor - a wraparound terrace, a private plunge pool, and a dedicated butler for the length of your stay. Our signature stay.',
    amenities: [
      'Ocean View',
      'Private Terrace',
      'Living Area',
      'Kitchenette',
      'Butler Service',
      'Soaking Tub',
      'Free WiFi',
    ],
  },
];

/** Returns 4 stable gallery image URLs for a room's detail-page thumbnail row (same subject, different crops/seeds). */
export function hotelRoomGallery(room: NxHotelRoom): string[] {
  return [0, 1, 2, 3].map((i) => hotelImage(`${room.image.split('/seed/')[1]?.split('/')[0]}-${i}`, 700, 500));
}

export interface NxHotelAmenity {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export const HOTEL_AMENITIES: NxHotelAmenity[] = [
  {
    icon: 'nx-heart',
    title: 'Spa & Wellness',
    description:
      'A full-service spa with six treatment rooms, a eucalyptus steam room, and a signature hot-stone massage guests fly back for.',
    image: hotelImage('nx-marlow-spa', 900, 600),
  },
  {
    icon: 'nx-sun',
    title: 'Infinity Pool',
    description:
      'A heated rooftop infinity pool overlooking the harbor, open from sunrise to midnight with a poolside bar in summer.',
    image: hotelImage('nx-marlow-pool', 900, 600),
  },
  {
    icon: 'nx-fire',
    title: 'The Marlow Restaurant',
    description:
      'Seasonal coastal cuisine from an open kitchen, plus a raw bar and a wine list built around small independent producers.',
    image: hotelImage('nx-marlow-restaurant', 900, 600),
  },
  {
    icon: 'nx-chart-bar',
    title: 'Fitness Center',
    description:
      'A 24-hour fitness center with free weights, cardio machines overlooking the skyline, and daily sunrise yoga on the terrace.',
    image: hotelImage('nx-marlow-gym', 900, 600),
  },
  {
    icon: 'nx-bell',
    title: '24/7 Concierge',
    description:
      'Our concierge team can arrange a dinner reservation, a sunset sail, or a last-minute spa slot - any hour, any day.',
    image: hotelImage('nx-marlow-concierge', 900, 600),
  },
  {
    icon: 'nx-compass',
    title: 'Valet Parking',
    description:
      'Complimentary valet parking for all guests, with electric-vehicle charging and a direct elevator to the lobby.',
    image: hotelImage('nx-marlow-parking', 900, 600),
  },
];

function hotelAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export interface NxHotelTestimonial {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const HOTEL_TESTIMONIALS: NxHotelTestimonial[] = [
  {
    name: 'Eleanor Voss',
    location: 'London, UK',
    avatar: hotelAvatar(31),
    rating: 5,
    quote:
      'The Marlow is the rare hotel that gets quiet luxury right. Our room was immaculate and the staff remembered our names after one conversation.',
  },
  {
    name: 'Marcus Webb',
    location: 'Toronto, Canada',
    avatar: hotelAvatar(15),
    rating: 5,
    quote:
      'Booked the Harbor Suite for an anniversary and it exceeded every expectation. The concierge arranged a sunset sail without us even asking twice.',
  },
  {
    name: 'Priyanka Raman',
    location: 'Singapore',
    avatar: hotelAvatar(48),
    rating: 4,
    quote:
      'Spa treatment was the best I have had at any hotel this year. Only note is the restaurant gets busy on weekends, so reserve ahead.',
  },
  {
    name: 'Diego Fernandez',
    location: 'Madrid, Spain',
    avatar: hotelAvatar(22),
    rating: 5,
    quote:
      'Stayed in the Penthouse for a work trip that turned into a vacation. The private terrace alone is worth the trip back.',
  },
  {
    name: 'Sofia Alvarez',
    location: 'Mexico City, Mexico',
    avatar: hotelAvatar(44),
    rating: 5,
    quote:
      'From the moment the valet greeted us, every detail felt considered. The Garden Standard Room was quiet and immaculate.',
  },
  {
    name: 'James Okafor',
    location: 'Lagos, Nigeria',
    avatar: hotelAvatar(12),
    rating: 4,
    quote:
      'Attended a conference nearby and stayed three nights. The fitness center and rooftop pool made it easy to unwind after long days.',
  },
  {
    name: 'Hannah Chen',
    location: 'Melbourne, Australia',
    avatar: hotelAvatar(29),
    rating: 5,
    quote:
      'We got married on the Garden Terrace and the events team handled every detail flawlessly. Our guests are still talking about it.',
  },
  {
    name: 'Lukas Berg',
    location: 'Berlin, Germany',
    avatar: hotelAvatar(8),
    rating: 5,
    quote:
      'The restaurant alone is worth the trip - the lobster tagliatelle was the best meal we had all year.',
  },
];

export interface NxHotelFaq {
  q: string;
  a: string;
}

export const HOTEL_FAQS: NxHotelFaq[] = [
  {
    q: 'What time is check-in and check-out?',
    a: 'Check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged with the front desk, subject to availability.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Reservations can be cancelled free of charge up to 48 hours before arrival. Cancellations within 48 hours are charged for one night\'s stay.',
  },
  {
    q: 'Are pets allowed?',
    a: 'We welcome dogs under 40 lbs in select rooms for a small nightly fee. Please let us know when booking so we can prepare the room.',
  },
  {
    q: 'Is parking available on-site?',
    a: 'Yes - complimentary valet parking is included for all overnight guests, with electric-vehicle charging available on request.',
  },
  {
    q: 'Is breakfast included in the room rate?',
    a: 'A continental breakfast is included with Suite and Penthouse bookings. Standard and Deluxe guests can add breakfast at The Marlow Restaurant for $24 per person.',
  },
];

// ---- Dining -----------------------------------------------------------

export interface NxHotelMenuHighlight {
  name: string;
  price: number;
  description: string;
  course: 'Starters' | 'Mains' | 'Desserts';
}

export const HOTEL_DINING_MENU: NxHotelMenuHighlight[] = [
  {
    name: 'Chilled Harbor Oysters',
    price: 22,
    description: 'Half dozen local oysters, mignonette, lemon.',
    course: 'Starters',
  },
  {
    name: 'Charred Octopus',
    price: 19,
    description: 'Smoked paprika, fingerling potato, salsa verde.',
    course: 'Starters',
  },
  {
    name: 'Heirloom Tomato Burrata',
    price: 16,
    description: 'Basil oil, aged balsamic, sourdough crisp.',
    course: 'Starters',
  },
  {
    name: 'Pan-Seared Scallops',
    price: 38,
    description: 'Sweet corn puree, crisp pancetta, brown butter.',
    course: 'Mains',
  },
  {
    name: 'Dry-Aged Ribeye',
    price: 54,
    description: '14oz, roasted bone marrow, red wine jus.',
    course: 'Mains',
  },
  {
    name: 'Lobster Tagliatelle',
    price: 42,
    description: 'Fresh pasta, brandy cream, tarragon.',
    course: 'Mains',
  },
  {
    name: 'Dark Chocolate Tart',
    price: 14,
    description: 'Sea salt caramel, espresso ice cream.',
    course: 'Desserts',
  },
  {
    name: 'Lemon Olive Oil Cake',
    price: 13,
    description: 'Whipped mascarpone, candied citrus.',
    course: 'Desserts',
  },
];

// ---- Spa & wellness -----------------------------------------------------

export interface NxHotelSpaTreatment {
  name: string;
  duration: string;
  price: number;
  description: string;
}

export const HOTEL_SPA_TREATMENTS: NxHotelSpaTreatment[] = [
  {
    name: 'Signature Hot Stone Massage',
    duration: '75 min',
    price: 185,
    description: 'Heated basalt stones ease tension through a full-body massage.',
  },
  {
    name: 'Deep Tissue Massage',
    duration: '60 min',
    price: 160,
    description: 'Firm, focused pressure targets chronic muscle tightness.',
  },
  {
    name: 'Harbor Glow Facial',
    duration: '50 min',
    price: 150,
    description: 'Brightening facial with marine collagen and a cold-stone finish.',
  },
  {
    name: 'Couples Retreat',
    duration: '90 min',
    price: 340,
    description: 'Side-by-side massages in our private couples suite, with champagne.',
  },
  {
    name: 'Sea Salt Body Scrub',
    duration: '45 min',
    price: 120,
    description: 'Full-body exfoliation followed by a hydrating wrap.',
  },
  {
    name: 'Steam & Sauna Package',
    duration: '60 min',
    price: 75,
    description: 'Private eucalyptus steam room and sauna session with herbal tea service.',
  },
];

// ---- Events & weddings ----------------------------------------------------

export interface NxHotelEventSpace {
  name: string;
  capacity: number;
  description: string;
  image: string;
}

export const HOTEL_EVENT_SPACES: NxHotelEventSpace[] = [
  {
    name: 'The Harbor Ballroom',
    capacity: 220,
    description:
      'Our grandest room, with floor-to-ceiling harbor views and a private terrace entrance - built for black-tie weddings and galas.',
    image: hotelImage('nx-marlow-ballroom', 900, 600),
  },
  {
    name: 'The Garden Terrace',
    capacity: 90,
    description:
      'An open-air courtyard framed by string lights and climbing jasmine, ideal for ceremonies and cocktail hours.',
    image: hotelImage('nx-marlow-garden-terrace', 900, 600),
  },
  {
    name: 'The Penthouse Lounge',
    capacity: 45,
    description:
      'An intimate top-floor space with skyline views, perfect for rehearsal dinners and small private celebrations.',
    image: hotelImage('nx-marlow-penthouse-lounge', 900, 600),
  },
];

// ---- Local area -----------------------------------------------------------

export interface NxHotelAttraction {
  icon: string;
  name: string;
  distance: string;
  description: string;
}

export const HOTEL_LOCAL_ATTRACTIONS: NxHotelAttraction[] = [
  {
    icon: 'nx-sun',
    name: 'Harborview Promenade',
    distance: '2 min walk',
    description: 'A waterfront boardwalk lined with cafes, right outside our front doors - best at sunset.',
  },
  {
    icon: 'nx-palette',
    name: 'Seabrook Art Museum',
    distance: '10 min walk',
    description: 'Rotating contemporary exhibits alongside a permanent collection of coastal New England painters.',
  },
  {
    icon: 'nx-book',
    name: 'Old Town Historic District',
    distance: '15 min walk',
    description: 'Cobblestone streets and 18th-century architecture, with free guided walking tours on weekends.',
  },
  {
    icon: 'nx-shopping-cart',
    name: 'Seabrook Farmers Market',
    distance: '8 min walk',
    description: 'Local produce, flowers, and artisan goods every Saturday morning in Founders Square.',
  },
  {
    icon: 'nx-compass',
    name: 'Cliffside Hiking Trail',
    distance: '15 min drive',
    description: 'A 4-mile coastal trail with panoramic lookout points - our concierge can arrange a shuttle.',
  },
  {
    icon: 'nx-globe',
    name: 'Harbor Ferry Terminal',
    distance: '5 min walk',
    description: 'Scenic ferry rides to the outer islands, departing hourly during the summer season.',
  },
];
