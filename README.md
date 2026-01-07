# Express FAQ Web Frontend

A light-weight React + TypeScript + TanStack Query web frontend for RESTful API access.

## Quick Start

```bash
# Install dependencies
yarn [install]

# Start development server (port 3000)
yarn dev

# Build for production
yarn build
```

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

The template is pre-configured to proxy API requests to a FastAPI backend:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Proxy: `/api/*` -> `http://localhost:8000/*`

## Future Plan

Let's join hands together!

The AI agent application doesn't have to simulate a chatbot. It could be a more illustrative, visualization concept graph or knowledge map, like the guidance you may see on a touch screen in a museum or a shopping mall.
