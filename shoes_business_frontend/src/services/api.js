//
// API service for sneakers shop.
// Provides functions to fetch products, product detail, related products, and submit orders.
// Switches between real backend and local mocks depending on environment configuration.
//
import { getApiBaseUrl, getUseMocks } from "../config";
import {
  mockFetchProducts,
  mockFetchProductById,
  mockFetchRelatedProducts,
  mockSubmitOrder,
} from "./mockData";

/**
 * Internal helper to perform fetch with JSON handling and error mapping.
 */
async function httpJson(path, { method = "GET", body, headers = {} } = {}) {
  const base = getApiBaseUrl();
  const url = `${base.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    err.status = res.status;
    throw err;
  }
  // Attempt to parse JSON, fallback to empty
  const data = await res.json().catch(() => ({}));
  return data;
}

// PUBLIC_INTERFACE
export async function fetchProducts(params = {}) {
  /**
   * Fetches list of products. Params can include:
   * - q: search query
   * - category: string
   * - size: string|number
   * - sort: 'price-asc' | 'price-desc'
   *
   * Returns an array of brief product entries suitable for catalog grid.
   */
  const useMocks = getUseMocks();
  if (useMocks) return mockFetchProducts(params);
  // Example real endpoint: GET /products?q=&category=&size=&sort=
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.size) qs.set("size", params.size);
  if (params.sort) qs.set("sort", params.sort);
  return httpJson(`/products?${qs.toString()}`);
}

// PUBLIC_INTERFACE
export async function fetchProductById(id) {
  /**
   * Fetches a full product by id with variants and images.
   */
  const useMocks = getUseMocks();
  if (useMocks) return mockFetchProductById(id);
  // Example real endpoint: GET /products/:id
  return httpJson(`/products/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function fetchRelatedProducts(id, limit = 4) {
  /**
   * Fetches related products for a given product id.
   */
  const useMocks = getUseMocks();
  if (useMocks) return mockFetchRelatedProducts(id, limit);
  // Example real endpoint: GET /products/:id/related?limit=4
  const qs = new URLSearchParams();
  if (limit) qs.set("limit", String(limit));
  return httpJson(`/products/${encodeURIComponent(id)}/related?${qs.toString()}`);
}

// PUBLIC_INTERFACE
export async function submitOrder(payload) {
  /**
   * Submits an order to the backend.
   * Payload example:
   * {
   *   name, phone, address, delivery,
   *   items: [{ id, name, price, size?, color?, qty }]
   * }
   *
   * Returns: { orderId, status, ... }
   */
  const useMocks = getUseMocks();
  if (useMocks) return mockSubmitOrder(payload);
  // Example real endpoint: POST /orders
  return httpJson("/orders", { method: "POST", body: payload });
}
