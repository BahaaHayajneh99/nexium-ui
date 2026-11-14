/**
 * Shared content for the "Real Estate Website" PRO template (brand: Haven Realty).
 * Mirrors the structure of `ecommerce-website-data.ts` - plain exported consts/interfaces
 * consumed by every page under `real-estate-website/`.
 */

export type NxPropertyType = 'House' | 'Apartment' | 'Condo' | 'Townhouse';
export type NxPropertyStatus = 'For Sale' | 'For Rent' | 'Pending';

export interface NxPropertyListing {
  id: number;
  title: string;
  address: string;
  city: string;
  price: number;
  type: NxPropertyType;
  status: NxPropertyStatus;
  beds: number;
  baths: number;
  sqft: number;
  /** A real photo for the listing card/gallery - picsum.photos (seeded, so it's stable per listing). */
  image: string;
  description: string;
  features: string[];
  agentId: number;
}

export const REAL_ESTATE_PROPERTY_TYPES: (NxPropertyType | 'All')[] = ['All', 'House', 'Apartment', 'Condo', 'Townhouse'];

function realEstateImage(seed: string, width = 800, height = 600): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export const REAL_ESTATE_LISTINGS: NxPropertyListing[] = [
  {
    id: 1,
    title: 'Sunlit Craftsman Bungalow',
    address: '482 Maplewood Ave',
    city: 'Austin',
    price: 525000,
    type: 'House',
    status: 'For Sale',
    beds: 4,
    baths: 3,
    sqft: 2400,
    image: realEstateImage('nx-haven-bungalow'),
    description:
      'A lovingly restored 1930s craftsman just minutes from downtown Austin, with original hardwood floors, a wraparound porch, and a chef-ready kitchen added in a recent renovation. The fenced backyard backs onto a greenbelt, giving the whole property a quiet, tucked-away feel despite the central location.',
    features: ['Garage', 'Hardwood Floors', 'Fenced Yard', 'Updated Kitchen'],
    agentId: 1,
  },
  {
    id: 2,
    title: 'The Meridian Loft',
    address: '118 Congress Ave, Unit 14B',
    city: 'Austin',
    price: 389000,
    type: 'Apartment',
    status: 'For Sale',
    beds: 2,
    baths: 2,
    sqft: 1150,
    image: realEstateImage('nx-haven-meridian-loft'),
    description:
      'Floor-to-ceiling windows frame downtown skyline views from the 14th floor of this sought-after high-rise. The open-concept layout flows onto a private balcony, and residents get first access to the rooftop deck, lounge, and co-working space on the top floor.',
    features: ['Rooftop Deck', 'In-Unit Laundry', 'Floor-to-Ceiling Windows', 'Secure Parking'],
    agentId: 2,
  },
  {
    id: 3,
    title: 'Cherry Creek Modern Condo',
    address: '2200 East 3rd Ave, Unit 6',
    city: 'Denver',
    price: 612000,
    type: 'Condo',
    status: 'For Sale',
    beds: 3,
    baths: 2,
    sqft: 1820,
    image: realEstateImage('nx-haven-cherry-creek'),
    description:
      'A sleek, light-filled condo in one of Denver\'s most walkable neighborhoods, with mountain views from the primary suite and a gas fireplace that makes the living room feel like a retreat even in the middle of winter. Steps from Cherry Creek\'s shops and trails.',
    features: ['Mountain Views', 'Gas Fireplace', 'Private Balcony', 'Pool'],
    agentId: 3,
  },
  {
    id: 4,
    title: 'Pine Hollow Townhome',
    address: '7740 Pine Hollow Ln',
    city: 'Denver',
    price: 2800,
    type: 'Townhouse',
    status: 'For Rent',
    beds: 3,
    baths: 2.5,
    sqft: 1680,
    image: realEstateImage('nx-haven-pine-hollow'),
    description:
      'A bright, low-maintenance townhome in a gated community with its own attached garage and a flexible loft space that works as a home office or guest room. The clubhouse and pool are a two-minute walk, and the HOA handles all exterior upkeep.',
    features: ['Attached Garage', 'Community Clubhouse', 'Walk-in Closets'],
    agentId: 4,
  },
  {
    id: 5,
    title: 'Skyline Harbor Apartment',
    address: '900 Alaskan Way, Unit 5C',
    city: 'Seattle',
    price: 2950,
    type: 'Apartment',
    status: 'For Rent',
    beds: 1,
    baths: 1,
    sqft: 720,
    image: realEstateImage('nx-haven-skyline-harbor'),
    description:
      'A compact, perfectly laid-out one-bedroom overlooking the waterfront, with an in-building fitness center and a resident lounge that hosts weekly events. Pets are welcome and the building sits directly on the streetcar line into downtown.',
    features: ['City Views', 'Fitness Center', 'Pet Friendly', 'In-Unit Washer/Dryer'],
    agentId: 2,
  },
  {
    id: 6,
    title: 'Lakeview Craftsman Estate',
    address: '3310 Lake Washington Blvd',
    city: 'Seattle',
    price: 1150000,
    type: 'House',
    status: 'For Sale',
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: realEstateImage('nx-haven-lakeview-estate'),
    description:
      'A grand, fully updated estate with deeded lake access, a chef\'s kitchen built around a six-burner range, and a lower-level home theater wired for the latest projection systems. The three-car garage has room for a boat trailer and then some.',
    features: ['Lake Access', "Chef's Kitchen", 'Home Theater', 'Three-Car Garage'],
    agentId: 1,
  },
  {
    id: 7,
    title: 'Biscayne Bay Condo',
    address: '1750 Brickell Bay Dr, Unit 22A',
    city: 'Miami',
    price: 749000,
    type: 'Condo',
    status: 'Pending',
    beds: 2,
    baths: 2,
    sqft: 1340,
    image: realEstateImage('nx-haven-biscayne-bay'),
    description:
      'Unobstructed bay views from nearly every room in this high-floor residence, with a full-service concierge, a resort-style pool deck, and covered parking included. A rare find in a building that almost never turns over.',
    features: ['Ocean View', 'Concierge', 'Pool & Spa', 'Covered Parking'],
    agentId: 3,
  },
  {
    id: 8,
    title: 'Little Havana Townhouse',
    address: '812 SW 8th St',
    city: 'Miami',
    price: 459000,
    type: 'Townhouse',
    status: 'For Sale',
    beds: 3,
    baths: 3,
    sqft: 1950,
    image: realEstateImage('nx-haven-little-havana'),
    description:
      'A fully renovated townhouse with impact windows throughout, a private courtyard made for entertaining, and a rooftop terrace with downtown skyline views. Walking distance to Calle Ocho\'s restaurants and live music venues.',
    features: ['Private Courtyard', 'Impact Windows', 'Rooftop Terrace'],
    agentId: 4,
  },
  {
    id: 9,
    title: 'Hill Country Ranch House',
    address: '14500 Ranch Road 12',
    city: 'Austin',
    price: 875000,
    type: 'House',
    status: 'For Sale',
    beds: 4,
    baths: 3.5,
    sqft: 3600,
    image: realEstateImage('nx-haven-hill-country-ranch'),
    description:
      'Nearly three acres of Hill Country views come with this single-story ranch, complete with an outdoor kitchen built for year-round entertaining and a solar array that covers most of the home\'s energy use. Horse-ready land with a small barn in back.',
    features: ['Pool', 'Outdoor Kitchen', 'Horse-Ready Acreage', 'Solar Panels'],
    agentId: 1,
  },
  {
    id: 10,
    title: 'Union Station Apartment',
    address: '1700 Wewatta St, Unit 311',
    city: 'Denver',
    price: 2400,
    type: 'Apartment',
    status: 'For Rent',
    beds: 2,
    baths: 1,
    sqft: 980,
    image: realEstateImage('nx-haven-union-station'),
    description:
      'Exposed brick and oversized windows give this loft-style apartment a converted-warehouse feel, just blocks from Union Station and the LoDo restaurant scene. The rooftop lounge and secure bike storage round out the building\'s amenities.',
    features: ['Exposed Brick', 'Rooftop Lounge', 'Bike Storage'],
    agentId: 2,
  },
  {
    id: 11,
    title: 'Fremont Modern Condo',
    address: '3600 Fremont Ave N, Unit 8',
    city: 'Seattle',
    price: 528000,
    type: 'Condo',
    status: 'For Sale',
    beds: 2,
    baths: 2,
    sqft: 1120,
    image: realEstateImage('nx-haven-fremont-modern'),
    description:
      'A smart-home-equipped condo in the heart of Fremont, with an EV charger in its dedicated parking spot and a private balcony that catches evening light over the ship canal. The building\'s gym and rooftop garden are both steps from the elevator.',
    features: ['Smart Home System', 'Balcony', 'EV Charging', 'Gym'],
    agentId: 3,
  },
  {
    id: 12,
    title: 'Wynwood Arts Townhouse',
    address: '250 NW 26th St',
    city: 'Miami',
    price: 695000,
    type: 'Townhouse',
    status: 'Pending',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    image: realEstateImage('nx-haven-wynwood-arts'),
    description:
      'An open-concept townhouse two blocks from the Wynwood Walls, with a rooftop plunge pool and enough natural light to make the ground-floor living space feel twice its size. The neighborhood\'s galleries and cafes are all within an easy walk.',
    features: ['Rooftop Pool', 'Open-Concept Living', 'Walk to Galleries'],
    agentId: 4,
  },
];

/** Returns 4 stable gallery image URLs for a listing's detail-page thumbnail row (same subject, different crops/seeds). */
export function realEstateListingGallery(listing: NxPropertyListing): string[] {
  const seed = listing.image.split('/seed/')[1]?.split('/')[0] ?? `listing-${listing.id}`;
  return [0, 1, 2, 3].map((i) => realEstateImage(`${seed}-${i}`, 900, 650));
}

function realEstateAvatar(id: number): string {
  return `https://i.pravatar.cc/150?img=${id}`;
}

export interface NxRealEstateAgent {
  id: number;
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
  bio: string;
}

export const REAL_ESTATE_AGENTS: NxRealEstateAgent[] = [
  {
    id: 1,
    name: 'Elena Marquez',
    title: 'Listing Specialist',
    avatar: realEstateAvatar(47),
    phone: '+1 (512) 555-0118',
    email: 'elena@havenrealty.com',
    bio: 'Elena has closed over 300 transactions across Austin and the Hill Country, with a focus on single-family homes and first-time sellers who want a steady hand through the process.',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    title: 'Senior Broker',
    avatar: realEstateAvatar(14),
    phone: '+1 (206) 555-0164',
    email: 'marcus@havenrealty.com',
    bio: 'Marcus leads our Seattle and Denver teams and specializes in urban condos and rentals, helping clients move quickly in competitive, fast-turnover markets.',
  },
  {
    id: 3,
    name: 'Priya Chandra',
    title: 'Relocation Specialist',
    avatar: realEstateAvatar(32),
    phone: '+1 (303) 555-0147',
    email: 'priya@havenrealty.com',
    bio: 'Priya works almost exclusively with out-of-state and international buyers, coordinating virtual tours, financing, and closing logistics from a distance.',
  },
  {
    id: 4,
    name: 'Tomas Ibarra',
    title: 'New Construction Specialist',
    avatar: realEstateAvatar(22),
    phone: '+1 (305) 555-0193',
    email: 'tomas@havenrealty.com',
    bio: 'Tomas spent six years in residential development before joining Haven Realty, and now helps buyers navigate new builds, townhomes, and pre-construction purchases in Miami.',
  },
];

export interface NxRealEstateTestimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const REAL_ESTATE_TESTIMONIALS: NxRealEstateTestimonial[] = [
  {
    name: 'Jordan Pierce',
    role: 'First-time Homebuyer',
    avatar: realEstateAvatar(5),
    quote:
      'Elena walked us through every step and never once made us feel rushed. We closed on our first house in six weeks, well under budget.',
    rating: 5,
  },
  {
    name: 'Natalie Osei',
    role: 'Relocated from Chicago',
    avatar: realEstateAvatar(29),
    quote:
      "Priya handled our entire move sight-unseen - virtual tours, inspection calls, all of it. We landed in Denver and the house was exactly as promised.",
    rating: 5,
  },
  {
    name: 'Derek Shaw',
    role: 'Investment Buyer',
    avatar: realEstateAvatar(51),
    quote:
      'Marcus knows the Seattle rental market better than anyone I\'ve worked with. He found us a building with better numbers than we expected.',
    rating: 4,
  },
];

export interface NxRealEstateCity {
  name: string;
  image: string;
  listingCount: number;
  /** URL-friendly city key (lowercase, no state) used by the neighborhood detail route. */
  slug: string;
  description: string;
  avgPrice: number;
  walkScore: number;
}

export const REAL_ESTATE_FEATURED_CITIES: NxRealEstateCity[] = [
  {
    name: 'Austin, TX',
    image: realEstateImage('nx-haven-city-austin', 640, 480),
    listingCount: 3,
    slug: 'austin',
    description:
      'A fast-growing Hill Country market known for live music, tech jobs, and a mix of historic bungalows and new-build high-rises downtown.',
    avgPrice: 548000,
    walkScore: 42,
  },
  {
    name: 'Denver, CO',
    image: realEstateImage('nx-haven-city-denver', 640, 480),
    listingCount: 3,
    slug: 'denver',
    description:
      'Front Range living with easy mountain access, a booming LoDo warehouse district, and some of the most walkable urban condos in our footprint.',
    avgPrice: 575000,
    walkScore: 55,
  },
  {
    name: 'Seattle, WA',
    image: realEstateImage('nx-haven-city-seattle', 640, 480),
    listingCount: 3,
    slug: 'seattle',
    description:
      'Waterfront views, a dense transit-friendly core, and neighborhoods like Fremont and Alaskan Way that reward buyers who want to walk everywhere.',
    avgPrice: 689000,
    walkScore: 73,
  },
  {
    name: 'Miami, FL',
    image: realEstateImage('nx-haven-city-miami', 640, 480),
    listingCount: 3,
    slug: 'miami',
    description:
      'Bay views, year-round sun, and a mix of high-rise condo living with artsy, low-rise neighborhoods like Wynwood and Little Havana.',
    avgPrice: 612000,
    walkScore: 65,
  },
];

export interface NxRealEstateFaq {
  q: string;
  a: string;
}

export const REAL_ESTATE_FAQS: NxRealEstateFaq[] = [
  {
    q: 'How do I schedule a showing?',
    a: 'Reach out through the contact form or call the agent listed on any property, and we will typically have a showing arranged within 24-48 hours, including evenings and weekends.',
  },
  {
    q: 'Do you work with buyers who need financing?',
    a: 'Yes - we work with a network of local lenders and can connect you with a pre-approval contact before you start touring, which strengthens any offer you make.',
  },
  {
    q: 'What are your commission fees for sellers?',
    a: 'Our standard listing commission is competitive with the local market and is always disclosed and discussed up front, with no hidden fees added at closing.',
  },
  {
    q: 'Can you help me sell and buy at the same time?',
    a: 'Absolutely - this is one of our most common transactions. We coordinate timing between your sale and purchase so you are not carrying two mortgages or scrambling for temporary housing.',
  },
  {
    q: 'Do you handle rental properties as well as sales?',
    a: 'Yes - several of our listings are for-rent, and our agents can help with lease negotiations, application screening, and move-in coordination just as they would for a sale.',
  },
  {
    q: 'How accurate is the mortgage calculator on your site?',
    a: 'It gives a solid estimate of principal and interest based on the numbers you enter, but it does not include taxes, insurance, or HOA dues - your lender will confirm exact figures during pre-approval.',
  },
  {
    q: 'What is my home actually worth?',
    a: 'Start with the free valuation on our Sell With Us page - one of our listing specialists will follow up with a market-backed estimate based on recent comparable sales in your neighborhood.',
  },
  {
    q: 'Do you charge buyers anything to work with Haven Realty?',
    a: 'No - buyer representation is free to you. Our fee is paid by the seller at closing as part of the standard commission split, so there is no cost to have an agent in your corner.',
  },
];

export interface NxRealEstateSellingStep {
  title: string;
  description: string;
}

export const REAL_ESTATE_SELLING_STEPS: NxRealEstateSellingStep[] = [
  {
    title: 'Free home valuation',
    description: 'An agent walks your home and pulls recent comparable sales to give you a realistic, market-backed price range.',
  },
  {
    title: 'Staging & photography',
    description: 'Our team handles light staging advice plus professional photos and a floor plan so your listing stands out online.',
  },
  {
    title: 'Listing goes live',
    description: 'Your home is published to our site and major listing networks, with showings scheduled around your availability.',
  },
  {
    title: 'Offers & negotiation',
    description: 'We present every offer, walk you through the trade-offs, and negotiate price, contingencies, and timeline on your behalf.',
  },
  {
    title: 'Closing',
    description: 'We coordinate inspections, appraisal, and paperwork with the title company so closing day holds no surprises.',
  },
];
