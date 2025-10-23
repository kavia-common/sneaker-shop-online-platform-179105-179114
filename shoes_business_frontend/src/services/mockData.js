//
// Mock data and mock API utilities for the sneakers shop.
// Provides product catalog, single product, related products, and order submission.
// Simulates network latency with setTimeout.
//

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A realistic set of sneakers with variants and inventory.
// Each product exposes:
// - id, name, brand, description, category
// - price, currency
// - sizes (array), colors (array)
// - stockByVariant: { "<size>-<color>": number }
// - images: array of image URLs (placeholders here)
// - tags: optional labels (e.g., 'New', 'Hot')
const PRODUCTS = [
  {
    id: 1,
    name: "Wave Runner X",
    brand: "OceanKicks",
    description:
      "Breathable mesh upper and cushioned midsole inspired by ocean flow. Ideal for everyday runs.",
    category: "Running",
    price: 129.0,
    currency: "USD",
    sizes: [40, 41, 42, 43, 44],
    colors: ["Navy", "White", "Black"],
    stockByVariant: {
      "40-Navy": 6,
      "41-Navy": 10,
      "42-Navy": 8,
      "43-Navy": 5,
      "44-Navy": 4,
      "40-White": 7,
      "41-White": 5,
      "42-White": 0,
      "43-White": 2,
      "44-White": 1,
      "40-Black": 9,
      "41-Black": 3,
      "42-Black": 2,
      "43-Black": 0,
      "44-Black": 4,
    },
    images: ["/assets/placeholder-1.png", "/assets/placeholder-2.png", "/assets/placeholder-3.png"],
    tags: ["New"],
  },
  {
    id: 2,
    name: "Harbor Court",
    brand: "OceanKicks",
    description:
      "Clean court silhouette with coastal tones. Casual comfort for daily wear.",
    category: "Casual",
    price: 89.0,
    currency: "USD",
    sizes: [39, 41, 42],
    colors: ["White", "Tan"],
    stockByVariant: {
      "39-White": 12,
      "41-White": 0,
      "42-White": 4,
      "39-Tan": 6,
      "41-Tan": 2,
      "42-Tan": 3,
    },
    images: ["/assets/placeholder-2.png", "/assets/placeholder-3.png"],
    tags: ["Hot"],
  },
  {
    id: 3,
    name: "Aqua Sprint",
    brand: "OceanKicks",
    description:
      "Lightweight sprint shoe with responsive cushioning and water-themed overlays.",
    category: "Running",
    price: 149.0,
    currency: "USD",
    sizes: [42, 44, 45],
    colors: ["Teal", "Gray"],
    stockByVariant: {
      "42-Teal": 5,
      "44-Teal": 4,
      "45-Teal": 2,
      "42-Gray": 0,
      "44-Gray": 6,
      "45-Gray": 3,
    },
    images: ["/assets/placeholder-1.png", "/assets/placeholder-4.png", "/assets/placeholder-2.png", "/assets/placeholder-3.png"],
    tags: [],
  },
  {
    id: 4,
    name: "Coastline Pro",
    brand: "OceanKicks",
    description:
      "Performance basketball shoe with pro-level grip and ankle support.",
    category: "Basketball",
    price: 199.0,
    currency: "USD",
    sizes: [44, 45, 46],
    colors: ["Black", "Gold"],
    stockByVariant: {
      "44-Black": 3,
      "45-Black": 0,
      "46-Black": 2,
      "44-Gold": 2,
      "45-Gold": 1,
      "46-Gold": 0,
    },
    images: ["/assets/placeholder-2.png"],
    tags: ["Pro"],
  },
  {
    id: 5,
    name: "Breeze Lite",
    brand: "OceanKicks",
    description:
      "Ultra-light casual sneaker with airy knit upper and flexible sole.",
    category: "Casual",
    price: 79.0,
    currency: "USD",
    sizes: [40, 41],
    colors: ["White", "Blue"],
    stockByVariant: {
      "40-White": 9,
      "41-White": 1,
      "40-Blue": 5,
      "41-Blue": 2,
    },
    images: ["/assets/placeholder-3.png", "/assets/placeholder-1.png"],
    tags: [],
  },
  {
    id: 6,
    name: "Marina Glide",
    brand: "OceanKicks",
    description:
      "Training shoe built for stability and support with smooth transitions.",
    category: "Training",
    price: 159.0,
    currency: "USD",
    sizes: [41, 42, 43],
    colors: ["Blue", "Gray"],
    stockByVariant: {
      "41-Blue": 4,
      "42-Blue": 7,
      "43-Blue": 0,
      "41-Gray": 3,
      "42-Gray": 5,
      "43-Gray": 2,
    },
    images: ["/assets/placeholder-4.png", "/assets/placeholder-2.png", "/assets/placeholder-1.png"],
    tags: [],
  },
  {
    id: 7,
    name: "Tide High",
    brand: "OceanKicks",
    description:
      "High-top court design for lateral support and bold street look.",
    category: "Basketball",
    price: 119.0,
    currency: "USD",
    sizes: [43, 44],
    colors: ["Black", "White"],
    stockByVariant: {
      "43-Black": 5,
      "44-Black": 5,
      "43-White": 0,
      "44-White": 2,
    },
    images: ["/assets/placeholder-1.png", "/assets/placeholder-3.png"],
    tags: [],
  },
  {
    id: 8,
    name: "Pier Street",
    brand: "OceanKicks",
    description:
      "Casual low with coastal palette, perfect for weekend strolls.",
    category: "Casual",
    price: 99.0,
    currency: "USD",
    sizes: [42, 43],
    colors: ["White", "Green"],
    stockByVariant: {
      "42-White": 7,
      "43-White": 3,
      "42-Green": 4,
      "43-Green": 1,
    },
    images: ["/assets/placeholder-2.png", "/assets/placeholder-4.png", "/assets/placeholder-3.png"],
    tags: [],
  },
];

// PUBLIC_INTERFACE
export async function mockFetchProducts({ q = "", category = "", size = "", sort = "price-asc" } = {}) {
  /** Returns a filtered and sorted list of products, simulating network latency. */
  await delay(300);

  let list = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    size: (p.sizes && p.sizes.length ? p.sizes[0] : undefined),
    tag: p.tags?.[0],
    image: p.images?.[0],
  }));

  const query = String(q || "").trim().toLowerCase();
  if (query) {
    list = list.filter((p) => p.name.toLowerCase().includes(query));
  }
  if (category && category !== "All") {
    list = list.filter((p) => p.category === category);
  }
  if (size && size !== "All") {
    list = list.filter((p) => String(p.size) === String(size));
  }
  list.sort((a, b) => {
    if (sort === "price-desc") return b.price - a.price;
    return a.price - b.price;
  });

  return list;
}

// PUBLIC_INTERFACE
export async function mockFetchProductById(id) {
  /** Returns a full product by id with variants, or throws if not found. */
  await delay(250);
  const prod = PRODUCTS.find((p) => String(p.id) === String(id));
  if (!prod) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return prod;
}

// PUBLIC_INTERFACE
export async function mockFetchRelatedProducts(id, limit = 4) {
  /** Returns related products by same category or fallback to others, limited. */
  await delay(220);
  const prod = PRODUCTS.find((p) => String(p.id) === String(id));
  if (!prod) return [];
  const sameCategory = PRODUCTS.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, limit);
  if (sameCategory.length >= Math.min(limit, 3)) return sameCategory;
  const filler = PRODUCTS.filter((p) => p.id !== prod.id).slice(0, Math.max(0, limit - sameCategory.length));
  return [...sameCategory, ...filler].slice(0, limit);
}

// PUBLIC_INTERFACE
export async function mockSubmitOrder(payload) {
  /**
   * Accepts an order payload (customer info + items) and returns an order confirmation.
   * Simulates latency and basic validation.
   */
  await delay(400);
  // Basic validation
  const { name, phone, address, delivery, items } = payload || {};
  if (!name || !phone || !address || !delivery || !Array.isArray(items) || items.length === 0) {
    const err = new Error("Invalid order payload");
    err.status = 400;
    throw err;
  }
  const orderId = "OK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return {
    orderId,
    status: "confirmed",
    estimatedDeliveryDays: delivery === "express" ? 2 : delivery === "standard" ? 5 : 0,
    placedAt: new Date().toISOString(),
  };
}
