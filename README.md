# Purrfect 🐱

A delightful cat voting application where users can vote on adorable cat images. Built with React, TypeScript, and Vite.

## Features

- 🐱 Browse and vote on cat images
- 📊 Cat voting system with vote tracking
- 🎨 Modern UI with Tailwind CSS
- 🧪 Comprehensive testing with Vitest and React Testing Library
- 🔥 Hot module replacement for fast development

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with React Query
- **Testing**: Vitest, React Testing Library, MSW
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.11.0+)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd purrfect
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview the production build
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button/
│   ├── spinner/
│   └── text/
├── lib/                 # Shared utilities
│   ├── get-api-client/
│   └── get-user-id/
├── modules/             # Feature modules
│   └── cat-voting/      # Cat voting feature
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Custom hooks
│       ├── lib/         # Feature utilities
│       ├── pages/       # Page components
│       └── types.ts     # Type definitions
└── tests/               # Test setup and mocks
    └── mocks/           # MSW mocks for testing
```

## Testing

The project uses Vitest and React Testing Library for testing, with MSW for API mocking. Tests are co-located with their respective components.

Run tests:
```bash
pnpm test
```

Run tests with UI:
```bash
pnpm test:ui
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
