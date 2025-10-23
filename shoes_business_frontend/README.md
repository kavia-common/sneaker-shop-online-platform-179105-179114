# OceanKicks Sneakers Shop Frontend

Modern, lightweight React app for browsing sneakers, managing a cart, and placing orders.

## Quick Start

1) Install dependencies
- npm install

2) Create environment file
- Copy .env.example to .env and adjust values:
  - REACT_APP_API_BASE_URL=
  - REACT_APP_USE_MOCKS=true

3) Start the app
- npm start
- Open http://localhost:3000

4) Build for production
- npm run build

## Routes

- / (Catalog)
- /product/:id (Product Detail)
- /cart (Cart)
- /checkout (Checkout)
- /order-confirmation (Order Confirmation)
- Catch-all → Not Found

## Environment Configuration

This app uses Create React App and reads env variables prefixed with REACT_APP_ at build time.

Required variables (see .env.example):
- REACT_APP_API_BASE_URL
  Description: Base URL of the backend API (no trailing slash).
  Example: http://localhost:4000 or https://api.example.com

- REACT_APP_USE_MOCKS
  Description: "true" or "false" to force using local mock data.
  Defaults: If not explicitly "true" or "false", the app automatically uses mocks when REACT_APP_API_BASE_URL is empty.

How it works:
- src/config.js provides getApiBaseUrl() and getUseMocks()
- src/services/api.js switches between real backend calls and local mocks in src/services/mockData.js

Common setups:
- Local with mocks (no backend):
  REACT_APP_API_BASE_URL=
  REACT_APP_USE_MOCKS=true

- Local with real backend:
  REACT_APP_API_BASE_URL=http://localhost:4000
  REACT_APP_USE_MOCKS=false

- Production (real backend):
  REACT_APP_API_BASE_URL=https://api.example.com
  REACT_APP_USE_MOCKS=false

Note: Changing .env requires restarting the dev server to take effect.

## Switching Between Mocks and Real API

- Mocks on:
  - Set REACT_APP_USE_MOCKS=true, or leave REACT_APP_API_BASE_URL empty.
  - Data served from src/services/mockData.js with simulated latency.
- Real API on:
  - Set REACT_APP_API_BASE_URL to your backend base URL and REACT_APP_USE_MOCKS=false.
  - The app will call your backend via fetch using endpoints below.

## Expected Backend Endpoints

The app expects a REST API with JSON responses:

- GET /products
  Query params: q, category, size, sort (price-asc | price-desc)
  Example: GET /products?q=Wave&category=Running&size=42&sort=price-asc
  Response: Array of products
- GET /products/:id
  Path params: id (product identifier)
  Response: Full product with sizes, colors, images, etc.
- GET /products/:id/related?limit=4
  Query params: limit (optional)
  Response: Array of related products
- POST /orders
  Body: {
    name, phone, address, delivery,
    items: [{ id, name, price, size?, color?, qty }]
  }
  Response: { orderId, status, ... }

See src/services/api.js for how requests are constructed.

## CORS Guidance

When running the frontend at http://localhost:3000 and backend at another origin (e.g., http://localhost:4000), configure CORS on the backend:
- Allow Origin: http://localhost:3000 (or your deployed site URL)
- Allow Methods: GET, POST, OPTIONS
- Allow Headers: Content-Type, Authorization (if applicable)
- Credentials: false (unless you specifically need cookies or auth)

Typical issues:
- CORS preflight fails: Ensure backend responds to OPTIONS with 204/200 and appropriate headers.
- Mixed content in production: Use HTTPS for both frontend and backend, and ensure REACT_APP_API_BASE_URL uses https://.

## Scripts

- npm start
  Runs the app in development mode on http://localhost:3000

- npm test
  Launches jest in watch mode. The CRA placeholder test has been replaced with a simple smoke test to avoid failures.

- npm run build
  Builds the app for production in the build folder

## Repository Structure (frontend)

- src/
  - config.js: Reads env and decides API base + mocks
  - services/api.js: API accessors (real or mocked)
  - services/mockData.js: Mock data + simulated endpoints
  - state/: Cart context and reducer
  - pages/: Catalog, Product detail, Cart, Checkout, Order confirmation
  - components/: Reusable UI components
  - styles/: Theme and layout CSS
