import type { FaqItem } from "@/types";

export interface SeoSection {
  h: string;
  p: string;
}

export interface SeoPage {
  slug: string;
  title: string; // <title>, max ~60 characters
  description: string; // meta description, max ~155 characters
  h1: string;
  keywords: string[];
  intro: string;
  sections: SeoSection[];
  points: string[];
  faqs: FaqItem[];
  boatType?: string; // shows boats of this type (slug of the boat type created in the admin panel)
  cta: string;
}

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "alleppey-houseboat-packages",
    title: "Alleppey Houseboat Packages | Alappuzha Houseboat Booking",
    description:
      "Alleppey houseboat packages on the Kerala backwaters: day cruise, overnight stay and 2 days 1 night. Enquire on WhatsApp for dates and routes.",
    h1: "Alleppey Houseboat Packages",
    keywords: ["alleppey houseboat packages", "alappuzha houseboat booking", "kerala houseboat packages", "houseboat in alleppey", "alleppey houseboat price", "backwater houseboat kerala"],
    intro:
      "A houseboat is the classic way to see the Kerala backwaters. Alleppey, also known as Alappuzha, has quiet canals, coconut-lined banks and the wide Vembanad Lake. Our Alleppey houseboat packages let you choose the length of your trip, from a relaxed day cruise to an overnight stay on the water.",
    sections: [
      {
        h: "Choose your houseboat package in Alappuzha",
        p: "Pick a day cruise of about 4 to 6 hours, an overnight stay of 1 night and 2 days, or a 2 days and 1 night extended backwater experience. Luxury houseboats and both AC and non-AC options are available. Every boat page shows the capacity, the route and photos, so you can compare before you enquire.",
      },
      {
        h: "How to book an Alleppey houseboat",
        p: "Open a boat page and tap Enquire on WhatsApp. Your message already carries the boat name; just add your dates and number of guests. We reply on WhatsApp with availability and the details of your package.",
      },
    ],
    points: ["Day cruise, overnight and 2 days / 1 night options", "AC and non-AC houseboats", "Route shown on every boat page", "Simple enquiry on WhatsApp"],
    faqs: [
      { q: "What is included in an Alleppey houseboat package?", a: "Inclusions depend on the package and the boat. Ask us on WhatsApp and we will confirm meals, cruise timing and facilities for your dates." },
      { q: "How far in advance should I enquire?", a: "Send your enquiry as early as you can, especially for weekends and the cooler months. We will tell you what is available for your dates." },
      { q: "Can I choose the houseboat?", a: "Yes. Browse the boats on this website and tell us which one you prefer, or let us suggest one for your group size." },
    ],
    cta: "Enquire about houseboat packages",
  },
  {
    slug: "luxury-houseboat-alleppey",
    title: "Luxury Houseboat in Alleppey | Premium Kerala Houseboats",
    description:
      "Stay on a luxury houseboat in Alleppey: premium amenities, comfortable AC rooms and Kerala cuisine on the backwaters. Enquire on WhatsApp.",
    h1: "Luxury Houseboat in Alleppey",
    keywords: ["luxury houseboat alleppey", "premium houseboat alappuzha", "deluxe houseboat kerala", "alleppey luxury houseboat stay", "5 star houseboat alleppey"],
    intro:
      "If you want comfort as well as scenery, a luxury houseboat in Alleppey is the way to cruise the Kerala backwaters. Expect a private deck, a crew, freshly prepared Kerala food and slow, quiet cruising past paddy fields and village life.",
    sections: [
      {
        h: "Premium amenities on the water",
        p: "Our luxury houseboats are set up for a relaxed stay, with comfortable rooms, AC options and a lounge area to watch the backwaters go by. Ask us about the facilities of each boat when you enquire.",
      },
      {
        h: "Ideal for special occasions",
        p: "A luxury houseboat suits honeymoons, anniversaries, family reunions and small celebrations. Tell us the occasion on WhatsApp and we will suggest a suitable boat and route.",
      },
    ],
    points: ["Premium and AC rooms", "Kerala cuisine", "Deck for relaxed backwater views", "Suitable for couples and families"],
    faqs: [
      { q: "Are luxury houseboats in Alleppey air-conditioned?", a: "AC options are available. Please say that you prefer AC when you enquire so we can match you with the right boat." },
      { q: "Can a luxury houseboat be booked for an overnight stay?", a: "Yes. Luxury houseboats are available for overnight stays as well as day cruises. Confirm availability for your dates on WhatsApp." },
    ],
    boatType: "houseboat",
    cta: "Enquire about a luxury houseboat",
  },
  {
    slug: "day-cruise-alleppey",
    title: "Alleppey Houseboat Day Cruise | Backwater Day Trip Kerala",
    description:
      "Take an Alleppey houseboat day cruise of about 4 to 6 hours through quiet backwater canals. Ideal for families and groups. Enquire on WhatsApp.",
    h1: "Alleppey Houseboat Day Cruise",
    keywords: ["alleppey day cruise", "alleppey houseboat day trip", "alappuzha backwater day cruise", "day houseboat alleppey", "houseboat day cruise kerala"],
    intro:
      "Short on time? An Alleppey houseboat day cruise gives you the backwater experience in about 4 to 6 hours. Cruise through narrow canals, watch village life from the water and enjoy a Kerala meal on board.",
    sections: [
      {
        h: "What to expect on a backwater day cruise",
        p: "Your day cruise glides through the Alappuzha backwaters at an easy pace, with time to sit back, take photographs and enjoy the green surroundings. The route depends on the boat, so check the boat page or ask us.",
      },
      {
        h: "Good for families and groups",
        p: "Day cruises are popular with families, friends travelling together and visitors with a tight itinerary. Tell us your group size and we will suggest a boat with enough space.",
      },
    ],
    points: ["About 4 to 6 hours on the backwaters", "Ideal for families and groups", "Kerala food on board (confirm when you enquire)", "Easy to add to a Kerala itinerary"],
    faqs: [
      { q: "How long is the Alleppey houseboat day cruise?", a: "A typical day cruise is about 4 to 6 hours. Exact timings depend on the boat and the day, so confirm with us on WhatsApp." },
      { q: "Can I do a day cruise instead of an overnight stay?", a: "Yes. A day cruise is a good option if you cannot stay overnight but want to experience the backwaters." },
    ],
    boatType: "houseboat",
    cta: "Enquire about a day cruise",
  },
  {
    slug: "overnight-houseboat-stay-alleppey",
    title: "Overnight Houseboat Stay in Alleppey | 1 Night 2 Days",
    description:
      "Overnight houseboat stay in Alleppey: 1 night / 2 days on the Kerala backwaters with Kerala cuisine and comfortable rooms. Enquire on WhatsApp.",
    h1: "Overnight Houseboat Stay in Alleppey",
    keywords: ["overnight houseboat alleppey", "alleppey houseboat 1 night 2 days", "houseboat stay alappuzha", "night stay houseboat kerala", "2 days 1 night houseboat alleppey"],
    intro:
      "Sleeping on a houseboat is the highlight of many Kerala trips. An overnight houseboat stay in Alleppey gives you sunset on the water, a quiet night under the stars and a calm morning on the backwaters.",
    sections: [
      {
        h: "1 night and 2 days on the backwaters",
        p: "Our overnight package is planned as 1 night and 2 days, with cruising during the day and the boat moored for the night. A 2 days and 1 night extended backwater experience is also available for guests who want a longer cruise.",
      },
      {
        h: "Rooms, food and comfort",
        p: "Choose AC or non-AC rooms, depending on the boat. Kerala meals are prepared on board. Share your group size and preferences on WhatsApp and we will recommend a suitable houseboat.",
      },
    ],
    points: ["1 night / 2 days overnight package", "AC and non-AC rooms", "Couple and family packages", "Sunset and sunrise on the water"],
    faqs: [
      { q: "Is an overnight houseboat stay in Alleppey safe?", a: "Houseboats are crewed and moored for the night. Ask us about the details of your boat when you enquire." },
      { q: "Can couples and families book an overnight stay?", a: "Yes. Overnight stays are suitable for couples, families and small groups. Tell us who is travelling so we can suggest the right boat." },
    ],
    boatType: "houseboat",
    cta: "Enquire about an overnight stay",
  },
  {
    slug: "alleppey-honeymoon-houseboat",
    title: "Alleppey Honeymoon Houseboat | Romantic Backwater Stay",
    description:
      "Plan a honeymoon on a houseboat in Alleppey. Private, romantic backwater cruises with comfortable AC rooms and Kerala food. Enquire on WhatsApp.",
    h1: "Alleppey Honeymoon Houseboat",
    keywords: ["alleppey honeymoon houseboat", "honeymoon houseboat kerala", "romantic houseboat alleppey", "couple houseboat alappuzha", "kerala honeymoon backwater stay"],
    intro:
      "Few places feel as private and peaceful as a houseboat on the Kerala backwaters. An Alleppey honeymoon houseboat gives couples quiet time together, with gentle cruising, sunset views and a quiet evening on deck.",
    sections: [
      {
        h: "A private backwater stay for couples",
        p: "Choose a houseboat with a comfortable AC room and a deck for the views. Our crew looks after the cruising and the cooking, so you can simply relax.",
      },
      {
        h: "Plan your honeymoon houseboat trip",
        p: "Tell us your dates and that it is a honeymoon trip on WhatsApp. We will suggest a suitable boat, route and package, whether you prefer an overnight stay or an extended 2 days and 1 night cruise.",
      },
    ],
    points: ["Private and peaceful backwater cruising", "AC rooms available", "Overnight and extended packages", "Kerala food prepared on board"],
    faqs: [
      { q: "Which houseboat is best for a honeymoon in Alleppey?", a: "A luxury or premium AC houseboat is a popular choice. Share your budget and dates on WhatsApp and we will recommend a boat." },
      { q: "Can we arrange special touches for a honeymoon?", a: "Tell us what you have in mind when you enquire and we will let you know what we can arrange." },
    ],
    boatType: "houseboat",
    cta: "Enquire about a honeymoon houseboat",
  },
  {
    slug: "family-houseboat-alleppey",
    title: "Family & Group Houseboat in Alleppey | Alappuzha Trips",
    description:
      "Family and group houseboat packages in Alleppey with spacious boats, Kerala food and safe backwater cruising. Enquire on WhatsApp.",
    h1: "Family and Group Houseboat in Alleppey",
    keywords: ["family houseboat alleppey", "group houseboat alappuzha", "houseboat for large group kerala", "kids friendly houseboat alleppey", "alleppey houseboat for family"],
    intro:
      "A houseboat is a comfortable way for families and groups to travel together in Kerala. You share the deck, the meals and the view, while the crew takes care of the cruise.",
    sections: [
      {
        h: "Spacious boats for family and friends",
        p: "Houseboats come with different numbers of rooms and capacities, so there is a boat for a small family or a larger group. Each boat page shows its capacity.",
      },
      {
        h: "Day cruise or overnight for groups",
        p: "Groups can choose a day cruise or an overnight stay. Send us your group size, ages of children and preferred dates on WhatsApp, and we will suggest the right boat and package.",
      },
    ],
    points: ["Family and group packages", "Capacity listed on every boat", "Day cruise or overnight stay", "AC and non-AC options"],
    faqs: [
      { q: "How many people can stay on an Alleppey houseboat?", a: "It depends on the boat. The capacity is shown on each boat page; for large groups, message us and we will advise." },
      { q: "Are houseboat trips suitable for children?", a: "Houseboat cruises are popular with families. Tell us the ages of the children when you enquire so we can plan accordingly." },
    ],
    boatType: "houseboat",
    cta: "Enquire for family or group",
  },
  {
    slug: "ac-houseboat-alleppey",
    title: "AC & Non-AC Houseboats in Alleppey | Alappuzha",
    description:
      "Compare AC and non-AC houseboats in Alleppey for day cruises and overnight stays on the Kerala backwaters. Enquire on WhatsApp for options.",
    h1: "AC and Non-AC Houseboats in Alleppey",
    keywords: ["ac houseboat alleppey", "non ac houseboat alleppey", "deluxe houseboat alappuzha", "budget houseboat alleppey", "houseboat with ac kerala"],
    intro:
      "Houseboats in Alleppey come in AC and non-AC options so that you can pick what suits your comfort and your budget. Both let you enjoy the same backwaters, the same food and the same easy cruising pace.",
    sections: [
      {
        h: "Which is right for you: AC or non-AC?",
        p: "AC houseboats are popular for overnight stays and for travellers who prefer a cool room, especially in the warmer months. Non-AC houseboats are a good choice for day cruises and for guests who like the open air of the backwaters.",
      },
      {
        h: "Ask us for the right option",
        p: "Tell us your dates, group size and whether you prefer AC or non-AC. We will suggest suitable boats and confirm availability on WhatsApp.",
      },
    ],
    points: ["AC and non-AC houseboats", "Options for different budgets", "Day cruise and overnight packages", "Availability confirmed on WhatsApp"],
    faqs: [
      { q: "Is AC available for the whole stay?", a: "AC arrangements differ between boats. Please ask us about the AC details of the boat you choose." },
      { q: "Do non-AC houseboats suit overnight stays?", a: "Many guests choose non-AC boats for day cruises. For overnight stays, AC is popular in warm weather. We can advise on WhatsApp." },
    ],
    boatType: "houseboat",
    cta: "Ask about AC houseboats",
  },
  {
    slug: "kayaking-alleppey",
    title: "Kayaking in Alleppey Backwaters | Guided Paddling",
    description:
      "Go kayaking on the Alleppey backwaters with guided paddling trips through quiet canals and village scenery. Enquire on WhatsApp.",
    h1: "Kayaking in the Alleppey Backwaters",
    keywords: ["alleppey kayaking", "kayaking alappuzha backwaters", "kerala backwater kayaking", "kayak tour alleppey", "canoeing alleppey"],
    intro:
      "Kayaking lets you see the Kerala backwaters up close. Paddle along narrow canals, past coconut palms and village homes, in a quiet that bigger boats cannot reach.",
    sections: [
      {
        h: "Guided kayaking in Alappuzha",
        p: "Our guided paddling trips are suitable for beginners as well as regular paddlers. A guide leads the way and keeps the pace comfortable.",
      },
      {
        h: "Combine kayaking with a houseboat cruise",
        p: "Many guests add a kayaking trip to a houseboat day cruise or overnight stay. Ask us on WhatsApp about timings and how to combine them.",
      },
    ],
    points: ["Guided paddling trips", "Quiet canals and village scenery", "Suitable for beginners", "Easy to combine with a houseboat cruise"],
    faqs: [
      { q: "Do I need kayaking experience?", a: "No. Guided trips are suitable for beginners. Tell us about your experience when you enquire." },
      { q: "How long is a kayaking trip in Alleppey?", a: "Duration depends on the trip. Check the boat page or message us for current timings." },
    ],
    boatType: "kayaking",
    cta: "Enquire about kayaking",
  },
  {
    slug: "shikara-boat-ride-alleppey",
    title: "Shikara Boat Ride in Alleppey | Backwater Shikara Tour",
    description:
      "Enjoy a relaxed shikara boat ride in Alleppey through quiet backwater canals. Ideal for couples, families and small groups. Enquire on WhatsApp.",
    h1: "Shikara Boat Ride in Alleppey",
    keywords: ["shikara boat ride alleppey", "alleppey shikara boat", "shikara ride alappuzha backwaters", "shikara boating kerala", "backwater shikara tour"],
    intro:
      "A shikara is a small, comfortable boat that glides quietly along the Alleppey backwaters. It is a relaxed way to see village life, birds and paddy fields without a long houseboat trip.",
    sections: [
      {
        h: "A relaxed backwater shikara ride",
        p: "Shikara rides suit couples, families and small groups. You sit back while the boatman takes you along calm canals at a gentle pace.",
      },
      {
        h: "Short on time? Choose a shikara",
        p: "A shikara ride is a good option when you want a shorter experience than a houseboat cruise. Message us on WhatsApp with your date and group size.",
      },
    ],
    points: ["Relaxed, quiet backwater ride", "Good for couples, families and small groups", "Shorter than a houseboat trip", "Enquire on WhatsApp"],
    faqs: [
      { q: "What is a shikara boat?", a: "A shikara is a small boat used for gentle sightseeing on the backwaters. It is quieter and smaller than a houseboat." },
      { q: "Can I combine a shikara ride with a houseboat stay?", a: "Yes, ask us on WhatsApp and we will suggest how to combine them." },
    ],
    boatType: "shikara",
    cta: "Enquire about a shikara ride",
  },
  {
    slug: "alleppey-backwater-tour",
    title: "Alleppey Backwater Tour | Kerala Backwaters & Vembanad Lake",
    description:
      "Explore the Alleppey backwaters on a Kerala backwater tour by houseboat, shikara or kayak. Vembanad Lake, Kuttanad and village canals.",
    h1: "Alleppey Backwater Tour",
    keywords: ["alleppey backwater tour", "kerala backwaters tour", "vembanad lake cruise", "kuttanad backwaters", "alappuzha backwaters", "things to do in alleppey"],
    intro:
      "The backwaters of Alleppey (Alappuzha) are a network of lakes, canals and lagoons that wind through Kuttanad, a region of paddy fields that lies below sea level. A backwater tour shows you this unique landscape from the water.",
    sections: [
      {
        h: "Ways to see the Kerala backwaters",
        p: "Choose a houseboat for a day or overnight cruise, a shikara for a quiet ride, or a kayak to paddle the narrow canals. Each gives a different view of the Alappuzha backwaters.",
      },
      {
        h: "Vembanad Lake, Kuttanad and nearby places",
        p: "Cruises around Alleppey can pass through canals and open stretches of Vembanad Lake, the largest lake in Kerala. Kumarakom, Punnamada and Kuttanad are well known backwater areas. Your exact route depends on the boat and package.",
      },
    ],
    points: ["Houseboat, shikara and kayak tours", "Canals, paddy fields and Vembanad Lake", "Route shown on each boat page", "Enquire easily on WhatsApp"],
    faqs: [
      { q: "What is the best way to see the Alleppey backwaters?", a: "A houseboat cruise is the classic choice. Shikara rides and kayaking are good for a shorter or more active experience." },
      { q: "Which is the largest lake in Kerala?", a: "Vembanad Lake is the largest lake in Kerala and is part of the backwater system around Alleppey and Kumarakom." },
    ],
    cta: "Enquire about a backwater tour",
  },
];

export const SEO_PAGE_MAP: Record<string, SeoPage> = Object.fromEntries(SEO_PAGES.map((p) => [p.slug, p]));
