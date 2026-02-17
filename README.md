# "FomoSpace" Website Frontend

Upload or fetch some contexts as you wish, for different scopes respectively with flexibility, which is powered by a light-weight React + TypeScript + TanStack Query web frontend via RESTful API access.

## Quick Start

```bash
# Install dependencies
yarn [install]

# Start development server (port 3000)
yarn dev

# Build for production
yarn build
```

## Tech Stack

- **Vite** - Fast dev server
- **TypeScript** - Type safety language compared to pure JS
- **TanStack Query** - Data fetching, caching, mutations
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors

## Project Structure

```
src/
├── components/
├── types/
│   └── index.ts       # TypeScript interfaces
├── utils/
│   └── index.ts       # Helper functions
├── App.tsx            # Main app with providers
└── main.tsx           # Entry point
```

## Backend Integration

`vite.config.ts` is pre-configured to proxy API requests to a FastAPI backend:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Proxy: `/api/*` -> `http://localhost:8000/*`

## Advanced Patterns Included

1. **Debounced Scroll** - Display a floating chat box without flickering
2. **Adaptive Layout** - Readable pages across various desktop/mobile device sizes of screen views rather than improper stretching or condensing.

## Future Plan

Let's join hands together!

The AI agent application doesn't have to simulate a chatbot. It could be a more illustrative, visualization concept graph or knowledge map, like the guidance you may see on a touch screen in a museum or a shopping mall.

Custom option of memoization or forget (global or local to the conversation, ephemeral or persistent) can be chosen at context level (not at LLM level).
