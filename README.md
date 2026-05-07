# Sorria AI

A modern, scalable dental clinic management application built with a **Turborepo** monorepo architecture. It features a React Native (Expo) mobile application for clinic staff and a robust GraphQL backend using Apollo Server, Pothos, and Prisma ORM connected to a PostgreSQL database.

## Architecture

This repository uses [Turborepo](https://turbo.build/) to manage multiple applications and shared packages.

### `apps/mobile`
- **Framework**: React Native (Expo)
- **State/Data**: Apollo Client (`useQuery`, `useMutation`) with real-time `pollInterval`.
- **UI/Styling**: Custom Theme Context, responsive layouts, glassmorphism UI elements.
- **Routing**: React Navigation (Bottom Tabs + Native Stack).
- **Features**: Dashboard, Schedule Management, Patient Profiles, and Activity Feed.

### `apps/api`
- **Framework**: Node.js, Express, Apollo Server 4.
- **GraphQL**: Code-first schema generation using [Pothos](https://pothos-graphql.dev/).
- **Database**: PostgreSQL with Prisma ORM.
- **Real-time**: GraphQL Subscriptions via WebSockets (`graphql-ws`).
- **AI Integration**: Endpoint prepared for OpenAI to parse natural language messages from WhatsApp.

### `packages/shared`
- Contains TypeScript types, enums (e.g., `AppointmentStatus`), and business logic constants shared across the mobile app and the API to guarantee 100% type safety from the database to the UI.

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- PostgreSQL (running locally or via Docker)

## Setup & Running Locally

1. **Install dependencies** (from the root folder):
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   In `apps/api/.env`, ensure your Postgres connection string is correct:
   ```env
   DATABASE_URL="postgresql://YOUR_USER@localhost:5432/sorria_ai?schema=public"
   OPENAI_API_KEY="your-openai-api-key"
   PORT=4000
   ```

3. **Database Migration & Seed**:
   Run the Prisma migration to create the tables, and seed it with initial data:
   ```bash
   cd apps/api
   npm run db:migrate
   npm run db:seed
   cd ../..
   ```

4. **Start the Development Servers**:
   Run the Turborepo `dev` pipeline from the root directory. This will start the GraphQL API and the Expo Metro Bundler simultaneously.
   ```bash
   npm run dev
   ```
   - API Playground: `http://localhost:4000/graphql`
   - Mobile: Press `i` in the terminal to open the iOS simulator.

## System Workflow & "Prompt de Funcionamento" (How it Works)

The core workflow for the Sorria AI assistant revolves around an n8n webhook and the GraphQL `chat` mutation:

1. **Patient Input**: Patient "José" sends a WhatsApp message: *"Quero fazer uma gengivoplastia hoje de tarde."*
2. **n8n Gateway**: The n8n webhook receives the WhatsApp message and routes it to the Sorria API.
3. **GraphQL Mutation**: n8n calls `mutation { chat(input: { phone: "...", message: "...", patientName: "José" }) { reply action } }`.
4. **API Processing**:
   - The API upserts the patient based on the phone number.
   - Registers an `Activity` (which instantly updates the clinic's mobile dashboard).
   - Sends the message context to OpenAI (LLM).
5. **AI Parsing**: The LLM parses the intent (gengivoplastia), checks `packages/shared` rules (requires prior evaluation), and formulates a response scheduling the evaluation.
6. **Response**: The API returns the formatted reply to n8n, which sends it back to José via WhatsApp.

## Next Steps

- [ ] **n8n Integration**: Connect the Twilio/WhatsApp sandbox to the `/graphql` endpoint.
- [ ] **Web Dashboard**: Create `apps/web` (Next.js) for desktop usage in the clinic.
- [ ] **Authentication**: Add JWT-based auth to secure the API.
