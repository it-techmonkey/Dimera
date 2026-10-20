/** A bookable line on the price menu. `price` is live; `comparePrice` is the
 * post-launch price, shown struck through until it replaces `price`. */
export type MenuItem = {
  id: string;
  name: string;
  price: string;
  comparePrice?: string;
};

export type MenuGroup = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const priceMenu: MenuGroup[] = [
  {
    id: "pedicure",
    title: "Pedicure",
    items: [
      { id: "pedicure-basic", name: "Basic Pedicure", price: "70" },
      { id: "pedicure-spa", name: "Spa / Jacuzzi Pedicure", price: "100" },
      {
        id: "pedicure-gel",
        name: "Pedicure + Gel",
        price: "120",
        comparePrice: "150",
      },
      { id: "pedicure-jacuzzi-gel", name: "Jacuzzi Pedicure + Gel", price: "170" },
    ],
  },
  {
    id: "nails",
    title: "Nails",
    items: [
      {
        id: "manicure-hard-gel",
        name: "Manicure + Hard Gel",
        price: "120",
        comparePrice: "150",
      },
      {
        id: "manicure-extension-gel",
        name: "Manicure + Extension + Gel",
        price: "150",
        comparePrice: "170",
      },
      {
        id: "gel-removal",
        name: "Gel Removal",
        price: "40–50",
        comparePrice: "45–50",
      },
      { id: "nail-design", name: "Nail Design", price: "From 20" },
    ],
  },
  {
    id: "lashes-brows",
    title: "Lashes & Brows",
    items: [
      {
        id: "lash-extensions",
        name: "Lash Extensions",
        price: "From 130–200",
        comparePrice: "From 130–250",
      },
      {
        id: "lash-lamination",
        name: "Lash Lamination",
        price: "120",
        comparePrice: "150",
      },
      {
        id: "brow-lamination",
        name: "Brow Lamination",
        price: "120",
        comparePrice: "150",
      },
      { id: "lash-removal", name: "Lash Removal", price: "40" },
      { id: "lash-brow-lamination", name: "Lash + Brow Lamination", price: "270" },
    ],
  },
  {
    id: "threading",
    title: "Threading",
    items: [
      { id: "threading-eyebrow", name: "Eyebrow Threading", price: "25" },
      { id: "threading-upper-lip", name: "Upper Lip Threading", price: "15" },
      { id: "threading-full-face", name: "Full Face Threading", price: "50" },
    ],
  },
  {
    id: "hair",
    title: "Hair",
    items: [
      {
        id: "hair-cut-blow-dry",
        name: "Hair Cut / Blow Dry",
        price: "120",
        comparePrice: "150",
      },
      { id: "hair-style", name: "Hair Style", price: "150" },
      { id: "hair-color", name: "Hair Color", price: "Price on consultation" },
      {
        id: "hair-keratin",
        name: "Hair Keratin",
        price: "From 250",
        comparePrice: "From 300",
      },
      {
        id: "wash-blow-dry",
        name: "Wash / Blow Dry",
        price: "From 120",
        comparePrice: "150",
      },
      { id: "wash-blow-haircut", name: "Wash + Blow Dry + Haircut", price: "180" },
      { id: "wash-blow-style", name: "Wash + Blow Dry + Hairstyle", price: "220" },
      {
        id: "haircut-blow-style",
        name: "Haircut + Blow Dry + Hairstyle",
        price: "280",
      },
    ],
  },
];

export const menuItems: MenuItem[] = priceMenu.flatMap((g) => g.items);

/** Prices are free text ("120", "From 20", "40–50", "Price on consultation");
 * anything with a number gets the currency appended. */
export function formatPrice(price: string) {
  return /\d/.test(price) ? `${price} AED` : price;
}

/** A showcase card on the page. Quick Book opens the drawer on `bookId`. */
export type Service = {
  id: string;
  name: string;
  collection: string;
  description: string;
  price: string;
  comparePrice?: string;
  duration: string;
  image: string;
  bookId: string;
};

export const services: Service[] = [
  {
    id: "manicure",
    name: "Manicure",
    collection: "Nails & Hands",
    description:
      "Sculpted, buffed, and lacquered — the foundational ritual for hands that speak before you do.",
    price: "from 120",
    comparePrice: "from 150",
    duration: "45 min",
    image: "/images/manicure.jpg",
    bookId: "manicure-hard-gel",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    collection: "Nails & Hands",
    description:
      "A restorative soak and meticulous finish for feet that carry you through the world.",
    price: "from 70",
    duration: "60 min",
    image: "/images/pedicure.jpg",
    bookId: "pedicure-basic",
  },
  {
    id: "nails",
    name: "Nail Art",
    collection: "Nails & Hands",
    description:
      "Sculptural extensions and hand-painted detail — nails as wearable architecture.",
    price: "from 20",
    duration: "75 min",
    image: "/images/nail-art.jpg",
    bookId: "nail-design",
  },
  {
    id: "lashes",
    name: "Lash Suite",
    collection: "The Lash Suite",
    description:
      "Ethereal extensions, individually placed — a flutter that transforms the entire gaze.",
    price: "from 130",
    duration: "90 min",
    image: "/images/lash-suite.jpg",
    bookId: "lash-extensions",
  },
  {
    id: "hair-color",
    name: "Hair Color",
    collection: "Hair Architecture",
    description:
      "Fluid gradients of copper and rose-gold, painted by hand for dimension that moves with you.",
    price: "Price on consultation",
    duration: "120 min",
    image: "/images/hair-color.jpg",
    bookId: "hair-color",
  },
  {
    id: "haircut",
    name: "Haircut",
    collection: "Hair Architecture",
    description:
      "Precision cuts shaped to your bone structure — the architecture of a silhouette.",
    price: "120",
    comparePrice: "150",
    duration: "60 min",
    image: "/images/haircut.jpg",
    bookId: "hair-cut-blow-dry",
  },
  {
    id: "hair-wash",
    name: "Wash & Blow",
    collection: "Hair Architecture",
    description:
      "A meditative cleanse at the basin, finished with a sculpted blow-dry that lasts.",
    price: "from 120",
    comparePrice: "150",
    duration: "45 min",
    image: "/images/wash-blow.jpg",
    bookId: "wash-blow-dry",
  },
];

export const navLinks = [
  { label: "The Collection", href: "#collection" },
  { label: "The Ritual", href: "#about" },
  { label: "First Visit", href: "#experience" },
  { label: "Visit", href: "#visit" },
];

export const galleryItems = [
  {
    src: "/images/gallery-lashes.jpg",
    span: "row-span-2",
    technique: "Soft natural lashes",
    speed: 50,
  },
  {
    src: "/images/gallery-manicure.jpg",
    span: "",
    technique: "Sculpted nude manicure",
    speed: -30,
  },
  {
    src: "/images/gallery-balayage.jpg",
    span: "row-span-2",
    technique: "Caramel balayage",
    speed: 40,
  },
  {
    src: "/images/gallery-beige.jpg",
    span: "",
    technique: "Beige serenity",
    speed: -40,
  },
];

export const testimonials = [
  {
    quote:
      "I have never felt more held. The lash suite is not a treatment — it is a meditation. I left a different woman.",
    name: "Rania M.",
    detail: "Lash Suite · monthly ritual",
  },
  {
    quote:
      "Leila read my hair like a canvas. The copper she painted moves like liquid light. I have never received so many quiet glances.",
    name: "Sophia D.",
    detail: "Hair Color · first visit",
  },
  {
    quote:
      "The nails are sculpture. Six weeks later, still flawless. Dimera is the only place my hands trust.",
    name: "Hala K.",
    detail: "Nail Art · devotee",
  },
];

export const stylists = [
  { id: "any", name: "No Preference", role: "First available artisan" },
  { id: "amira", name: "Amira", role: "Master Lash & Nail Artist" },
  { id: "leila", name: "Leila", role: "Hair Color Specialist" },
  { id: "yasmin", name: "Yasmin", role: "Precision Cut & Stylist" },
  { id: "noor", name: "Noor", role: "Spa & Pedicure Ritualist" },
];

export const timeSlots = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
];

export const contact = {
  address: ["Al Abeir, Shop No. 6, JVC", "Dubai, United Arab Emirates"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al+Abeir+Shop+6+Jumeirah+Village+Circle+Dubai",
  hours: ["Mon — Sat · 10:00 — 20:00", "Sunday · By appointment"],
  // Placeholders — replace with the salon's real number and handle before launch.
  phone: "+971 4 000 0000",
  phoneHref: "tel:+97140000000",
  instagram: "@dimera.atelier",
  instagramUrl: "https://www.instagram.com/dimera.atelier",
};

export const ease = [0.16, 1, 0.3, 1] as const;
