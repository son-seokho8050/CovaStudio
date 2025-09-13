# COVA Art Academy Website

## Overview

COVA is a comprehensive art education platform for a Korean art academy (코코미술학원) that focuses on developing students who "think while drawing" rather than just technical proficiency. The system provides structured educational methodologies for Grade 10 (탐구 중심 훈련 - inquiry-focused training) and Grade 11 (실기력 강화 - practical skill enhancement) students, featuring systematic learning loops, visual journaling, and process-oriented assessment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system featuring dual theme support (light/dark)
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with /api prefix routing
- **Development**: Hot reload with Vite middleware integration
- **Build System**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Session Storage**: PostgreSQL-based sessions via connect-pg-simple

### Styling and Design System
- **Theme Architecture**: CSS custom properties with automatic dark/light mode switching
- **Color System**: HSL-based color tokens with semantic naming (primary, secondary, accent, etc.)
- **Typography**: Inter for body text, Space Grotesk for display elements
- **Component Variants**: Class Variance Authority (CVA) for systematic component styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Development and Tooling
- **Type Safety**: Strict TypeScript configuration with shared types between client/server
- **Code Quality**: ESLint and Prettier integration
- **Path Mapping**: Absolute imports with @ prefix for client code, @shared for shared utilities
- **Asset Management**: Vite-based asset pipeline with optimized imports

### Educational Content Management
- **Content Structure**: Static JavaScript data objects (COVA_DATA) containing curriculum information
- **Curriculum Organization**: Structured data for Grade 1/2 programs, kickoff sessions, and assessment metrics
- **Localization**: Korean language support with proper UTF-8 encoding

## External Dependencies

### UI and Component Libraries
- **Radix UI**: Comprehensive suite of accessible React primitives (accordion, dialog, dropdown-menu, etc.)
- **Lucide React**: Icon system for consistent visual elements
- **Embla Carousel**: Touch-friendly carousel component for image galleries

### Database and ORM
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Drizzle Zod**: Schema validation integration

### Development Tools
- **Vite**: Frontend build tool and development server
- **TanStack Query**: Server state management and caching
- **Class Variance Authority**: Type-safe component variant system
- **Date-fns**: Date manipulation and formatting utilities

### Form and Validation
- **React Hook Form**: Performant form state management
- **Zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: Integration bridge for form validation

### Styling Dependencies
- **Tailwind CSS**: Utility-first CSS framework
- **clsx**: Conditional className utility
- **tailwind-merge**: Intelligent Tailwind class merging

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express

### Fonts and Typography
- **Google Fonts**: Inter, Space Grotesk, Playfair Display, and additional Korean-supporting fonts via CDN