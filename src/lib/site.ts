export const site = {
  name: "O'Dara Trade Group",
  phone: '+1 678-832-8593',
  email: 'odaratradegroup@gmail.com',
  address: 'North Georgia and surrounding communities',
  socials: { instagram: 'https://www.instagram.com/odaratradegroup', facebook: 'https://www.facebook.com/yuimaginewemake' }
};

export const services = [
  { slug: 'kitchens', title: 'Kitchen Remodeling', image: '/images/kitchen/kitchen2.webp', description: 'Custom cabinetry, countertops, islands, lighting and complete layout upgrades.' },
  { slug: 'bathrooms', title: 'Bathroom Remodeling', image: '/images/bath/bath1.webp', description: 'Elegant tile, showers, vanities, flooring and modern fixture installation.' },
  { slug: 'full-renovations', title: 'Full Home Renovation', image: '/images/home/fullhome.webp', description: 'Room-by-room transformations with planning, demolition, buildout and finish work.' },
  { slug: 'flooring', title: 'Flooring & More', image: '/images/floor/floor.webp', description: 'Hardwood, tile, laminate, trim, painting, repairs and finishing details.' }
];

export type Review = {
  rating: number;
  comment: string;
  name: string;
  date: string;
};

export type FeaturedProject = {
  id: number;
  category: string;
  title: string;
  image: string;
  images: string[];
  summary: string;
  highlights: string[];
  reviews: Review[];
};

export const clientReviews: Review[] = [
  {
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: 'Homeowner Client',
    date: 'Mar 14, 2026'
  },
  {
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: 'Kitchen Remodel Client',
    date: 'Feb 27, 2026'
  },
  {
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: 'Bathroom Remodel Client',
    date: 'Jan 31, 2026'
  },
  {
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: 'Flooring Client',
    date: 'Dec 12, 2025'
  },
  {
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: 'Renovation Client',
    date: 'Nov 18, 2025'
  }
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    category: 'Kitchen',
    title: 'Modern Open Concept Kitchen',
    image: '/images/portafolio/kitchen.webp',
    images: [
      '/images/portafolio/kitchen.webp',
      '/images/kitchen/kitchen2.webp',
      '/images/portafolio/project-02-cabinet-refresh.webp',
      '/images/portafolio/project-03-small-kitchen.webp',
      '/images/portafolio/kitchen.jpg'
    ],
    summary: 'Full kitchen renovation with dark shaker cabinets, quartz counters, backsplash, lighting, and island upgrade.',
    highlights: ['Custom cabinets', 'Quartz countertop', 'Large island', 'LED lighting'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Kitchen Client',
        date: 'Jan 12, 2026'
      },
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Kitchen Client 2',
        date: 'Jan 26, 2026'
      },
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Kitchen Client 3',
        date: 'Feb 9, 2026'
      },
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Kitchen Client 4',
        date: 'Feb 23, 2026'
      }
    ]
  },
  {
    id: 2,
    category: 'Kitchen',
    title: 'Luxury Cabinet & Countertop Refresh',
    image: '/images/portafolio/project-02-cabinet-refresh.webp',
    images: [
      '/images/portafolio/project-02-cabinet-refresh.webp',
      '/images/portafolio/kitchen.webp',
      '/images/kitchen/kitchen2.webp',
      '/images/portafolio/project-03-small-kitchen.webp'
    ],
    summary: 'High-end refresh focused on cabinetry, countertops, hardware, and a clean modern finish.',
    highlights: ['Cabinet replacement', 'Countertop install', 'Hardware upgrade', 'Clean layout'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Cabinet Refresh Client',
        date: 'Dec 18, 2025'
      }
    ]
  },
  {
    id: 3,
    category: 'Kitchen',
    title: 'Small Kitchen Space Optimization',
    image: '/images/portafolio/project-03-small-kitchen.webp',
    images: [
      '/images/portafolio/project-03-small-kitchen.webp',
      '/images/portafolio/kitchen.webp',
      '/images/portafolio/project-02-cabinet-refresh.webp',
      '/images/kitchen/kitchen2.webp'
    ],
    summary: 'A compact kitchen redesigned to improve storage, workflow, and natural light.',
    highlights: ['Storage planning', 'Backsplash', 'Paint', 'Lighting'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Kitchen Remodel Client',
        date: 'Nov 7, 2025'
      }
    ]
  },
  {
    id: 4,
    category: 'Bathroom',
    title: 'Spa Style Primary Bathroom',
    image: '/images/portafolio/baths.webp',
    images: [
      '/images/portafolio/baths.webp',
      '/images/bath/bath1.webp',
      '/images/portafolio/baths2.webp',
      '/images/portafolio/baths3.webp',
      '/images/portafolio/project-05-guest-bath.webp'
    ],
    summary: 'Premium bathroom remodel with tile shower, glass enclosure, vanity, mirrors, and fixtures.',
    highlights: ['Walk-in shower', 'Glass door', 'Tile work', 'Double vanity'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Primary Bath Client',
        date: 'Oct 21, 2025'
      }
    ]
  },
  {
    id: 5,
    category: 'Bathroom',
    title: 'Guest Bathroom Makeover',
    image: '/images/portafolio/project-05-guest-bath.webp',
    images: [
      '/images/portafolio/project-05-guest-bath.webp',
      '/images/portafolio/baths2.webp',
      '/images/portafolio/baths.webp',
      '/images/bath/bath1.webp'
    ],
    summary: 'Complete guest bath transformation with new flooring, vanity, paint, lighting, and trim details.',
    highlights: ['New vanity', 'Floor tile', 'Wall finish', 'Modern fixtures'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Guest Bath Client',
        date: 'Sep 15, 2025'
      }
    ]
  },
  {
    id: 6,
    category: 'Bathroom',
    title: 'Tub to Shower Conversion',
    image: '/images/portafolio/baths3.webp',
    images: [
      '/images/portafolio/baths3.webp',
      '/images/portafolio/baths.webp',
      '/images/portafolio/baths2.webp',
      '/images/bath/bath1.webp',
      '/images/portafolio/project-05-guest-bath.webp'
    ],
    summary: 'Conversion from outdated tub to accessible shower with durable tile and modern plumbing fixtures.',
    highlights: ['Demolition', 'Plumbing', 'Waterproofing', 'Tile installation'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Shower Conversion Client',
        date: 'Aug 28, 2025'
      }
    ]
  },
  {
    id: 7,
    category: 'Flooring',
    title: 'Whole Home Flooring Upgrade',
    image: '/images/portafolio/flooring.webp',
    images: [
      '/images/portafolio/flooring.webp',
      '/images/floor/floor.webp',
      '/images/portafolio/project-08-lvp-flooring.webp',
      '/images/portafolio/homefull.webp'
    ],
    summary: 'Consistent flooring installation across living spaces to create a more elegant and cohesive home.',
    highlights: ['Floor removal', 'Leveling', 'Installation', 'Baseboards'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Flooring Client',
        date: 'Jul 30, 2025'
      }
    ]
  },
  {
    id: 8,
    category: 'Flooring',
    title: 'Luxury Vinyl Plank Installation',
    image: '/images/portafolio/project-08-lvp-flooring.webp',
    images: [
      '/images/portafolio/project-08-lvp-flooring.webp',
      '/images/portafolio/flooring.webp',
      '/images/floor/floor.webp',
      '/images/portafolio/homefull.webp'
    ],
    summary: 'Durable LVP flooring installation for high-traffic areas with precise cuts and finish trim.',
    highlights: ['LVP install', 'Trim detail', 'Clean transitions', 'Durable finish'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'LVP Flooring Client',
        date: 'Jun 19, 2025'
      }
    ]
  },
  {
    id: 9,
    category: 'Full Renovation',
    title: 'Living Room & Common Area Remodel',
    image: '/images/portafolio/homefull.webp',
    images: [
      '/images/portafolio/homefull.webp',
      '/images/home/fullhome.webp',
      '/images/portafolio/fullhome2.webp',
      '/images/portafolio/flooring.webp',
      '/images/portafolio/project-08-lvp-flooring.webp'
    ],
    summary: 'Interior renovation focused on walls, flooring, lighting, paint, and modern room flow.',
    highlights: ['Interior upgrades', 'Lighting', 'Paint', 'Open space feel'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Living Area Client',
        date: 'May 11, 2025'
      }
    ]
  },
  {
    id: 10,
    category: 'Exterior & More',
    title: 'Repair, Paint & Finishing Details',
    image: '/images/portafolio/fullhome2.webp',
    images: [
      '/images/portafolio/fullhome2.webp',
      '/images/home/fullhome.webp',
      '/images/portafolio/homefull.webp',
      '/images/portafolio/flooring.webp'
    ],
    summary: 'Finishing project with repairs, paint, trim, and detail work to improve the final presentation.',
    highlights: ['Drywall repair', 'Painting', 'Trim work', 'Final details'],
    reviews: [
      {
        rating: 5,
        comment: 'Review ready to be replaced with this client feedback after approval.',
        name: 'Finishing Details Client',
        date: 'Apr 24, 2025'
      }
    ]
  }
];

export function getProjectFallbackReviews(project: FeaturedProject, minimum = 5): Review[] {
  if (project.reviews.length >= minimum) {
    return project.reviews;
  }

  const fallbackDates = ['Mar 14, 2026', 'Feb 27, 2026', 'Jan 31, 2026', 'Dec 12, 2025', 'Nov 18, 2025'];
  const fallbackReviews = Array.from({ length: minimum - project.reviews.length }, (_, index) => ({
    rating: 5,
    comment: 'Review ready to be replaced with this client feedback after approval.',
    name: `${project.category} Client ${project.reviews.length + index + 1}`,
    date: fallbackDates[(project.reviews.length + index) % fallbackDates.length],
  }));

  return [...project.reviews, ...fallbackReviews];
}
