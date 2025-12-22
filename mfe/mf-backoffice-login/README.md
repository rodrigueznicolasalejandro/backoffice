# mf-backoffice-login

Single-SPA React TypeScript microfrontend for authentication with hexagonal architecture.

## Architecture

This project follows hexagonal (ports and adapters) architecture:

```
src/
├── domain/              # Business logic
│   ├── entities/       # Domain entities (User)
│   └── ports/          # Interface definitions
├── application/        # Use cases
│   └── usecases/       # Business operations (LoginUseCase)
├── infrastructure/     # External adapters
│   ├── config/         # HTTP client configuration
│   └── http/           # API adapters
└── ui/                 # Presentation layer
    └── pages/          # React components
```

## Getting Started

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm start
```
The microfrontend will be available at http://localhost:8088

### Build for production
```bash
npm run build
```

## Integration

Add to your root config's importmap:
```json
{
  "@link/backoffice-login": "http://localhost:8088/link-backoffice-login.js"
}
```

## Features

- Login form with username/password
- Authentication via BFF API (http://localhost:3000/api/auth/login)
- Token storage in localStorage
- Error handling
- Loading states
- Test user credentials displayed on page
