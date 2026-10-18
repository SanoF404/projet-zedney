# 🚀 Invoicing System - Interns Orientation Guide

Welcome to the Zedney Creative Invoicing System! This document is your comprehensive guide to understanding, navigating, and contributing to our project.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Getting Started](#getting-started)
7. [Development Workflow](#development-workflow)
8. [Directory Deep Dive](#directory-deep-dive)
9. [Important Concepts](#important-concepts)
10. [Common Development Tasks](#common-development-tasks)
11. [Best Practices](#best-practices)
12. [Resources & Support](#resources--support)

---

## 🎯 Project Overview

### What is this project?

The **Invoicing System** is a full-stack web application designed to manage invoices, clients, payments, quotations, and all related business operations. It's a professional, production-ready platform built with modern web technologies.

### Who uses it?

- Business owners and accountants
- Freelancers and consultants
- Companies managing invoicing workflows

### Key Goals

- ✅ Streamline invoice creation and management
- ✅ Track payments and financial records
- ✅ Manage client relationships
- ✅ Support multiple languages (English, French)
- ✅ Provide real-time updates via WebSockets
- ✅ Enable role-based access control
- ✅ Generate professional invoices and quotations

---

## 🛠️ Tech Stack

### Frontend (invoicing-sys)

| Technology                 | Purpose                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| **Next.js 14+**            | React framework with SSR, static generation, and built-in API routes |
| **TypeScript**             | Type-safe JavaScript for fewer bugs and better developer experience  |
| **React 18+**              | UI library for building interactive components                       |
| **Tailwind CSS**           | Utility-first CSS framework for rapid, responsive UI design          |
| **Shadcn UI**              | Pre-built, customizable component library built on Tailwind          |
| **next-i18next**           | Multi-language support (i18n) with easy translations                 |
| **Axios**                  | HTTP client for API communication                                    |
| **Jest & Testing Library** | Unit and integration testing frameworks                              |
| **Lexical**                | Advanced rich-text editor for content creation                       |
| **Socket.IO**              | Real-time bidirectional communication                                |
| **dnd-kit**                | Drag-and-drop functionality for sortable lists                       |

### Backend (invoicing-sys-api)

| Technology     | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| **NestJS**     | Progressive Node.js framework for scalable server applications |
| **TypeScript** | Type-safe server-side code                                     |
| **TypeORM**    | Object-Relational Mapping for database operations              |
| **PostgreSQL** | Relational database (implied from TypeORM setup)               |
| **Swagger**    | API documentation and interactive testing interface            |
| **Socket.IO**  | Real-time updates to connected clients                         |
| **Winston**    | Logging library for debugging and monitoring                   |
| **Nodemailer** | Email sending for notifications and confirmations              |
| **JWT**        | JSON Web Tokens for secure authentication                      |

### DevOps & Deployment

| Technology         | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| **Docker**         | Containerization for consistent development and deployment environments |
| **Docker Compose** | Multi-container orchestration                                           |

---

## 🏗️ Architecture

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│              (Next.js Frontend Application)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/WebSocket
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              API Server (NestJS Backend)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Modules: Auth, Invoice, Payment, User, Firm, etc.  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                           │
│        (Managed by TypeORM with migrations)                  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Action** → User interacts with the Next.js frontend
2. **API Request** → Frontend sends HTTP/WebSocket request to NestJS backend
3. **Business Logic** → Backend processes request, applies rules, and validation
4. **Database Query** → TypeORM executes queries on PostgreSQL
5. **Response** → Backend returns data to frontend
6. **UI Update** → Frontend renders updated data

### Frontend Architecture

- **Component-Based**: Reusable React components organized by feature
- **API Layer**: Centralized Axios instances and API methods in `src/api/`
- **State Management**: React Context for global state, hooks for local state
- **Styling**: Tailwind CSS with responsive design principles
- **Routing**: Next.js file-based routing in `src/pages/`

### Backend Architecture

- **Modular Design**: Each business domain (invoice, payment, user, etc.) is its own module
- **Layered Pattern**: Controller → Service → Repository → Database
- **Middleware**: Authentication, logging, error handling
- **Shared Services**: Reusable logic (auth, database, mail, logging)
- **Configuration**: Environment-specific settings in `src/configs/`

---

## 📁 Project Structure

```
invoicing-base/
├── docs/                          # Documentation
│   ├── INTRODUCTION.md           # Project intro
│   ├── template.md               # Template file
│   └── INTERNS_ORIENTATION.md    # ← YOU ARE HERE
│
├── invoicing-sys/                # FRONTEND (Next.js)
│   ├── src/
│   │   ├── pages/               # Route pages (file-based routing)
│   │   ├── components/          # React components organized by feature
│   │   ├── api/                 # API integration layer (Axios calls)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # React Context for global state
│   │   ├── lib/                 # Utility functions and helpers
│   │   ├── types/               # TypeScript type definitions
│   │   ├── constants/           # Application constants
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets (images, locales)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── next-i18next.config.js   # i18n configuration
│   └── Dockerfile
│
└── invoicing-sys-api/            # BACKEND (NestJS)
    ├── src/
    │   ├── main.ts              # Application entry point
    │   ├── app/                 # Core app module
    │   ├── modules/             # Feature modules (invoice, payment, etc.)
    │   ├── shared/              # Shared services (auth, mail, logging, db)
    │   ├── configs/             # Environment configuration
    │   ├── i18n/                # Localization files
    │   ├── migrations/          # Database migrations
    │   ├── seeders/             # Database seed scripts
    │   ├── utils/               # Utility functions
    │   └── generated/           # Generated code
    ├── test/                    # E2E and unit tests
    ├── package.json
    ├── tsconfig.json
    ├── nest-cli.json
    └── Dockerfile
```

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- **User Registration & Login**: Secure authentication with JWT tokens
- **Role-Based Access Control (RBAC)**: Different users have different permissions
- **Session Management**: React Context stores auth state
- **Password Security**: Encrypted storage and secure transmission

### 📄 Invoice Management

- **Create & Edit Invoices**: Full CRUD operations
- **Multiple Currencies**: Support for different currency types
- **Tax Calculation**: Automatic tax computation based on rules
- **Invoice Templates**: Customizable invoice designs
- **PDF Export**: Generate professional PDF invoices
- **Status Tracking**: Draft → Sent → Paid → Archived

### 💰 Payment Management

- **Payment Recording**: Log and track all payments
- **Payment Conditions**: Define payment terms and schedules
- **Bank Accounts**: Manage multiple bank accounts
- **Tax Withholdings**: Support for tax withholding rules
- **Payment Reconciliation**: Match payments to invoices

### 👥 Contact Management

- **Client Profiles**: Store detailed client information
- **Contacts & Interlocutors**: Manage multiple contacts per client
- **Address Management**: Multiple addresses per client (billing, shipping, etc.)
- **Contact History**: Track interactions and relationships

### 📑 Quotations

- **Quote Generation**: Create professional quotations
- **Quote to Invoice**: Convert approved quotes to invoices
- **Version Control**: Track quote revisions
- **Expiration Dates**: Set quote validity periods

### 🌍 Internationalization (i18n)

- **Multi-Language Support**: English, French (easily extensible)
- **Dynamic Language Switching**: Users can switch languages in real-time
- **Localized Content**: All strings, dates, and numbers are localized

### 📱 Responsive Design

- **Mobile-Friendly**: Works seamlessly on all device sizes
- **Adaptive UI**: Components adjust to screen size
- **Touch-Friendly**: Easy interaction on mobile devices

### ⚡ Real-Time Updates

- **WebSocket Support**: Live updates without page refresh
- **Notification System**: In-app and email notifications
- **Activity Feed**: See changes as they happen

### 🎨 Theme & UI

- **Dark/Light Modes**: User preference for theme
- **Customizable Components**: Shadcn components are fully customizable
- **Consistent Design**: Tailwind CSS ensures design consistency

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (with npm or yarn)
- **Docker & Docker Compose** (for database and services)
- **Git** (version control)
- **VS Code** or your preferred code editor

### Installation Steps

#### 1. Clone and Navigate

```bash
cd /path/to/invoicing-base
```

#### 2. Frontend Setup

```bash
cd invoicing-sys
yarn install                # Install dependencies
yarn dev                    # Start development server
# Frontend runs on http://localhost:3000
```

#### 3. Backend Setup

```bash
cd invoicing-sys-api
yarn install                # Install dependencies
yarn start:dev             # Start development server with hot reload
# Backend API runs on http://localhost:3001
# Swagger docs: http://localhost:3001/api/docs
```

#### 4. Database & Services

```bash
# Using Docker Compose (from root directory)
docker-compose up -d        # Start PostgreSQL and other services
yarn seed:all              # Seed initial data
```

### Verification

- ✅ Frontend loads at `http://localhost:3000`
- ✅ Backend API responds at `http://localhost:3001`
- ✅ Swagger docs available at `http://localhost:3001/api/docs`
- ✅ Can log in with seeded admin credentials

---

## 💻 Development Workflow

### Git Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# (Code, test, commit regularly)

# 3. Keep branch updated
git pull origin main

# 4. Push and create pull request
git push origin feature/your-feature-name
```

### Code Standards

- **TypeScript**: No `any` types without justification
- **Naming Conventions**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions: camelCase (e.g., `fetchUserData()`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
  - Files: kebab-case or camelCase based on content
- **Comments**: Explain "why", not "what"
- **Testing**: Write tests for new features

### Common Commands

**Frontend:**

```bash
yarn dev              # Start dev server
yarn build            # Build for production
yarn start            # Start production server
yarn test             # Run tests
yarn lint             # Check code style
yarn lint:fix         # Fix code style automatically
yarn format           # Format code with Prettier
```

**Backend:**

```bash
yarn start:dev        # Start with hot reload
yarn build            # Build for production
yarn test             # Run tests
yarn test:watch       # Run tests in watch mode
yarn test:cov         # Generate coverage report
yarn seed:all         # Seed all database tables
yarn format           # Format code
yarn lint             # Lint code
```

---

## 📂 Directory Deep Dive

### Frontend: `invoicing-sys/src/`

#### `pages/` - Route Pages

- **File-based routing**: Each file becomes a route
- **Special files**:
  - `_app.tsx` - Global app wrapper
  - `_document.tsx` - HTML document structure
  - `404.tsx` - Not found page
- **Example**: `pages/invoicing/list.tsx` → `/invoicing/list`

#### `components/` - React Components

Organized by feature:

- `auth/` - Login, registration, password reset
- `invoicing/` - Invoice list, create, edit, view
- `contacts/` - Client and contact management
- `selling/` - Quotations and sales
- `settings/` - User preferences
- `layout/` - Page layout, header, footer
- `shared/` - Reusable components (Button, Modal, Table, etc.)
- `ui/` - Low-level UI components

#### `api/` - API Integration Layer

**Purpose**: Centralize all API calls and provide typed interfaces

```
├── agent.ts           # Agent-related API calls
├── auth.ts            # Authentication endpoints
├── invoice.ts         # Invoice CRUD operations
├── payment.ts         # Payment operations
├── cabinet.ts         # Cabinet management
├── permission.ts      # Permission endpoints
└── index.ts           # Barrel export
```

#### `hooks/` - Custom React Hooks

Reusable logic extracted into hooks:

- `useUploadMutation.ts` - File upload handling
- `useFullScreen.ts` - Fullscreen API integration
- `useMediaQuery.ts` - Responsive media queries
- `useMobile.tsx` - Mobile device detection
- `useSocket.ts` - WebSocket connection management
- Custom state management hooks

#### `context/` - React Context

Global state management:

- `AuthContext.tsx` - Authentication state
- `ThemeContext.tsx` - Dark/light mode
- `BreadcrumbContext.tsx` - Navigation breadcrumbs
- `IntroContext.tsx` - Introduction/onboarding

#### `lib/` - Utility Functions

- `user.ts` - User utilities
- `url.lib.ts` - URL manipulation
- `object.ts` - Object utilities
- `utils.ts` - General utilities

#### `types/` - TypeScript Definitions

- API response types
- Domain model types
- Custom utility types

#### `constants/` - Application Constants

- `invoice.filter-attributes.ts` - Filter options
- `payment-filter.attributes.ts` - Payment filters
- `user.filter-attributes.ts` - User filters
- etc.

### Backend: `invoicing-sys-api/src/`

#### `modules/` - Feature Modules

Each module is self-contained and handles one business domain:

- `user/` - User management, authentication, permissions
- `invoice/` - Invoice CRUD, status management
- `payment/` - Payment recording and tracking
- `firm/` - Company/firm management
- `cabinet/` - Cabinet/organization structure
- `sequence/` - Invoice sequence/numbering
- `tax/` - Tax rules and calculations
- `activity/` - Activity logging

Each module typically contains:

- `*.controller.ts` - HTTP endpoints
- `*.service.ts` - Business logic
- `*.repository.ts` - Database queries
- `*.entity.ts` - Database table definition
- `*.dto.ts` - Data Transfer Objects
- `*.module.ts` - Module definition

#### `shared/` - Shared Services

Core, reusable functionality:

- **Auth**: JWT strategy, guards, decorators
- **Database**: TypeORM configuration, connection
- **Mail**: Email sending service
- **Logging**: Winston logger setup
- **Filters**: Global exception filters
- **Decorators**: Custom decorators (e.g., `@Auth()`)

#### `configs/` - Configuration

- `database.config.ts` - Database connection
- `app.config.ts` - Application settings
- `mail.config.ts` - Email configuration
- `jwt.config.ts` - JWT settings
- Environment-specific values

#### `migrations/` - Database Migrations

Schema changes tracked in version control:

- Create tables
- Add columns
- Modify constraints
- Run with: `yarn typeorm migration:run`

#### `seeders/` - Initial Data

Populate database with initial records:

- Admin users
- Roles and permissions
- Countries, currencies
- Payment conditions
- Tax rules
- Run with: `yarn seed:all`

---

## 💡 Important Concepts

### Authentication Flow

```
1. User enters credentials
   ↓
2. Frontend POST to /auth/login
   ↓
3. Backend verifies, generates JWT token
   ↓
4. Frontend stores token (localStorage/sessionStorage)
   ↓
5. Frontend includes token in all API requests
   ↓
6. Backend validates token, executes request if valid
```

### State Management Pattern

**Frontend (React):**

- Global state: React Context + hooks
- Local component state: `useState`
- Side effects: `useEffect`
- No Redux needed (unless complexity increases)

**Backend (NestJS):**

- Module services manage state during request lifecycle
- Database is the source of truth for persistent state

### API Request Pattern

```typescript
// Frontend
const response = await api.post("/invoices", invoiceData);

// Backend handles request in module:
// 1. Controller receives request
// 2. Validates input (DTOs, guards)
// 3. Calls Service
// 4. Service applies business logic
// 5. Repository performs DB operations
// 6. Response sent back to frontend
```

### Real-Time Updates (WebSocket)

```
Frontend connects to WebSocket
   ↓
Backend emits events when data changes
   ↓
Frontend receives event in real-time
   ↓
UI updates without page refresh
```

### Internationalization (i18n)

```
1. Strings stored in JSON files: public/locales/{lang}/{namespace}.json
2. Frontend loads based on user language preference
3. Components use next-i18next `useTranslation()` hook
4. Backend sends translated strings via API
```

### Role-Based Access Control (RBAC)

```
User → Role → Permissions
   ↓       ↓
 Admin   Full Access
 User    Limited Access
 Guest   View Only
```

---

## 🛠️ Common Development Tasks

### Add a New Page

1. Create file: `src/pages/feature/new-page.tsx`
2. Create component: `src/components/feature/NewPage.tsx`
3. Add route if needed
4. Use layout wrappers for consistent styling
5. Test on mobile devices

### Add a New API Endpoint

**Backend:**

1. Create/modify `.controller.ts` - HTTP route
2. Create/modify `.service.ts` - Business logic
3. Create/modify `.dto.ts` - Request/response shape
4. Create/modify `.entity.ts` - Database table (if needed)
5. Test with Swagger docs or Postman

**Frontend:**

1. Add function in `src/api/feature.ts`
2. Use in component via `useEffect` and state
3. Handle loading, error, success states

### Create a New Component

```typescript
// src/components/feature/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button onClick={onClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Click me
      </button>
    </div>
  );
};
```

### Add Multi-Language Support

1. Add string to: `public/locales/en/common.json` and `public/locales/fr/common.json`
2. In component:

```typescript
import { useTranslation } from 'next-i18next';

export const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('common:myKey')}</h1>;
};
```

### Handle Forms & Validation

- Use React Hook Form for form state
- Use Zod or Yup for validation
- Display error messages to users
- Show loading state during submission

### Debug with Browser DevTools

- **React DevTools**: Inspect component state
- **Redux DevTools**: (if using Redux)
- **Network Tab**: Monitor API requests
- **Console**: Check for errors and warnings
- **Application Tab**: View localStorage, cookies

---

## 📚 Best Practices

### Code Quality

- ✅ Use TypeScript strictly (no `any`)
- ✅ Write meaningful variable and function names
- ✅ Keep functions small and focused (Single Responsibility)
- ✅ Add comments for complex logic
- ✅ Use constants for magic numbers/strings
- ✅ Handle errors gracefully

### React/Frontend

- ✅ Use functional components with hooks
- ✅ Memoize expensive computations with `useMemo`
- ✅ Use `useCallback` for event handlers in lists
- ✅ Keep components small and reusable
- ✅ Separate concerns (UI, logic, API calls)
- ✅ Use Tailwind CSS classes instead of custom CSS when possible
- ✅ Make components responsive

### NestJS/Backend

- ✅ Use dependency injection for services
- ✅ Write services with single responsibility
- ✅ Use DTOs for request/response validation
- ✅ Implement proper error handling
- ✅ Use guards for authentication/authorization
- ✅ Write meaningful database queries
- ✅ Add logging for debugging

### Database

- ✅ Create migrations for schema changes
- ✅ Use meaningful names for tables and columns
- ✅ Add proper indexes for performance
- ✅ Use transactions for multi-step operations
- ✅ Write seed scripts for initial data

### Testing

- ✅ Write unit tests for business logic
- ✅ Write integration tests for API endpoints
- ✅ Aim for high code coverage
- ✅ Test error cases, not just happy paths
- ✅ Use descriptive test names

### Performance

- ✅ Optimize database queries (eager loading, indexes)
- ✅ Cache frequently accessed data
- ✅ Lazy load components in React
- ✅ Minimize bundle size
- ✅ Use pagination for large lists
- ✅ Monitor API response times

### Security

- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Store sensitive data securely
- ✅ Implement CSRF protection
- ✅ Use JWT tokens properly
- ✅ Never commit secrets to git
- ✅ Sanitize user-generated content

---

## 📖 Resources & Support

### Documentation

- **NestJS Docs**: https://docs.nestjs.com/
- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Shadcn UI Components**: https://ui.shadcn.com/

### Tools & Services

- **Swagger API Docs**: `http://localhost:3001/api/docs` (when backend running)
- **VS Code Extensions**: ESLint, Prettier, Thunder Client (API testing)
- **Browser DevTools**: Inspect, debug, and test

### Getting Help

1. **Check Documentation**: Most answers are in official docs
2. **Search GitHub Issues**: Others may have had same problem
3. **Ask in Team Chat**: Slack, Discord, or team communication channel
4. **Code Review**: Learn from others' code and feedback
5. **Pair Programming**: Work together on complex features

### Learning Resources

- **TypeScript Advanced Types**: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
- **React Patterns**: https://react.dev/learn
- **NestJS Best Practices**: https://docs.nestjs.com/techniques
- **Database Design**: Learn normalization, relationships, and indexes
- **Web Security**: OWASP Top 10, secure coding practices

### Project-Specific Notes

- Always run tests before submitting PR
- Follow the code style (ESLint + Prettier enforced)
- Database migrations are mandatory for schema changes
- Keep components focused and reusable
- API endpoints must be documented
- All features should be responsive

---

## 🎓 Quick Reference

### Frontend Quick Start

```bash
cd invoicing-sys
yarn dev              # Start dev server
# Edit src/pages/* to add routes
# Edit src/components/* to add components
# Use yarn test to verify changes
```

### Backend Quick Start

```bash
cd invoicing-sys-api
yarn start:dev        # Start with hot reload
# Edit src/modules/* to add features
# Access Swagger at http://localhost:3001/api/docs
# Use yarn test to verify changes
```

### Common Issues & Solutions

| Issue                      | Solution                                              |
| -------------------------- | ----------------------------------------------------- |
| Port already in use        | Change port in config or kill process using port      |
| Database connection failed | Ensure Docker services running, check credentials     |
| TypeScript errors          | Run `yarn build` to see full error, check imports     |
| Styling not applied        | Rebuild Tailwind, clear cache, check class names      |
| API returns 401            | Check JWT token, ensure logged in, verify permissions |
| Import errors              | Check file paths, ensure exports are correct          |

---

## 📞 Contact & Next Steps

### Your Next Steps as an Intern

1. ✅ Set up development environment
2. ✅ Read this orientation guide thoroughly
3. ✅ Explore the codebase structure
4. ✅ Run the project locally
5. ✅ Complete your first small task
6. ✅ Submit a pull request
7. ✅ Get code review feedback
8. ✅ Start working on assigned features

### Questions to Ask

- What's the main goal for this sprint?
- Which feature should I work on first?
- Who's my go-to person for questions?
- What's the code review process?
- How often do we deploy?

---

**Welcome to the team! Happy coding! 🎉**

Last updated: 2026-07-03
