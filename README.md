# Leegality - FrontEnd Engineer Exercise (Product Catalogue)

A responsive product listing and detail app built with React, TypeScript, and Tailwind CSS, consuming the [DummyJSON](https://dummyjson.com) public API.

**GitHub Repository:** https://github.com/sxhil296/Leegality-FrontEnd-Engineer-Exercise

**Live Demo:** https://leegality-front-end-engineer-exerci.vercel.app/

---

## Features

- Product listing with a responsive grid (2 → 3 → 4 columns)
- Filter by category, brand (multi-select), and price range
- Client-side pagination (8 products per page)
- Product detail page with image gallery, dot pagination, and reviews
- Skeleton loading states and error handling
- All filters and page state persisted in URL query params (shareable / back-button safe)

---

## Setup Instructions

**Prerequisites:** Node.js ≥ 18

```bash
# 1. Clone the repository
git clone git@github.com:sxhil296/Leegality-FrontEnd-Engineer-Exercise.git
cd Leegality-FrontEnd-Engineer-Exercise

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── ErrorMessage.tsx
│   ├── FilterSidebar.tsx
│   ├── Header.tsx
│   ├── ImageGallery.tsx
│   ├── NoProductsFound.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── ProductCardSkeleton.tsx
│   ├── ProductDetailSkeleton.tsx
│   ├── ReviewCard.tsx
│   └── StarRow.tsx
├── hooks/
│   ├── useCategories.ts
│   └── useProducts.ts
├── pages/
│   ├── NotFoundPage.tsx
│   ├── ProductDetailPage.tsx
│   └── ProductListingPage.tsx
└── types/
    └── product.ts
```

---

## Assumptions Made

- **DummyJSON as the data source.** The API does not support server-side filtering by brand or price, so all products in a category are fetched once (`limit=0`) and filtered client-side.
- **No authentication required.** The app is fully public with no login flow.
- **8 products per page** was chosen as a reasonable grid size that balances load time and density across breakpoints.
- **URL as the single source of truth** for all filter and pagination state, no external state manager was considered necessary given the scope.
- **No cart or checkout functionality** was in scope; the detail page is read-only.

---
