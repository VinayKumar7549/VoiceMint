<div align="center">

# 🎙️ VoiceMint

### Professional AI Voice Generation & Zero-Shot Voice Cloning Platform

[![Website](https://img.shields.io/badge/Live_Demo-voicemint--production.up.railway.app-6C47FF?style=for-the-badge&logo=vercel&logoColor=white)](https://voicemint-production.up.railway.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/products/r2/)
[![Polar.sh](https://img.shields.io/badge/Polar.sh_Billing-black?style=for-the-badge&logo=polar&logoColor=white)](https://polar.sh/)
[![Modal AI](https://img.shields.io/badge/Modal_Serverless-000000?style=for-the-badge&logo=python&logoColor=white)](https://modal.com/)
[![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)](https://sentry.io/)

</div>

---

**VoiceMint** is a production-grade AI speech synthesis and zero-shot voice cloning application. By combining the power of serverless GPU execution (via **Modal**), custom voice synthesis (**Chatterbox TTS**), robust client authentication (**Clerk**), type-safe network interactions (**tRPC & OpenAPI**), and developer-centric metered subscriptions (**Polar.sh**), VoiceMint offers a fast, scalable, and beautifully designed user experience for audio content creators.

---

## 🏗️ System Architecture

The following diagram illustrates how the frontend app, storage layers, authentication providers, billing endpoints, and AI compute nodes interact to execute zero-shot cloning and streaming speech generation.

```mermaid
flowchart TD
    subgraph Client ["Client Browser"]
        A["Next.js Frontend (React 19)"]
        W["WaveSurfer.js Playback"]
    end

    subgraph Auth ["Authentication"]
        Clerk["Clerk Auth & Orgs"]
    end

    subgraph Backend ["Next.js App Server (Railway)"]
        TRPC["tRPC API Layer"]
        Prisma["Prisma ORM"]
        R2U["S3/R2 Presigned Uploader"]
    end

    subgraph Data ["Storage & Database"]
        DB[("PostgreSQL")]
        R2[("Cloudflare R2 Bucket")]
    end

    subgraph Billing ["Monetization"]
        Polar["Polar.sh Sandbox"]
    end

    subgraph AI ["AI Speech Synthesis (Modal)"]
        FastAPI["FastAPI Entrypoint"]
        GPU["A10G GPU Inference"]
        Chatterbox["Chatterbox Turbo TTS"]
    end

    %% Interactions
    A -- Authenticates --> Clerk
    A -- Query / Mutate --> TRPC
    TRPC -- Read/Write Metadata --> Prisma
    Prisma -- Persist --> DB
    TRPC -- Check Subs / Meter Events --> Polar
    A -- Upload audio prompts --> R2U
    R2U -- Store raw & generated audio --> R2
    TRPC -- Generate Speech Request --> FastAPI
    FastAPI -- Mount Read-Only Bucket --> R2
    FastAPI -- GPU Inference --> Chatterbox
    Chatterbox -- Generate wav --> FastAPI
    FastAPI -- Stream audio --> TRPC
    TRPC -- Return audio url/bytes --> A
```

---

## ✨ Core Features

*   🎙️ **Zero-Shot Voice Cloning**: Instantly clone any custom voice by uploading or recording a brief audio sample (minimum 10 seconds).
*   ⚡ **Serverless GPU Orchestration**: Runs cost-effective, cold-start optimized TTS pipelines on NVIDIA A10G GPUs via serverless Modal deployments.
*   📂 **Smart Voice Classification**: Catalog and organize custom or system voices into curated categories (e.g., *Audiobooks, Podcasts, Corporate, Narratives, Meditation, Characters*).
*   🎚️ **Fine-Tuned Hyperparameters**: Fine-tune inference params including **Temperature**, **Top-P**, **Top-K**, and **Repetition Penalty** to produce perfect expressions.
*   💳 **Usage-Based Ingestion**: Full integration with the Polar SDK. Ingests metered customer usage events (`tts_generation` and `voice_creation`) to drive automatic billing tiers.
*   🏢 **Organization Scopes**: Secure workspace isolation. Users can generate and clone voices inside organizational scopes provided by Clerk.
*   🔊 **Real-time Waveforms**: Live, interactive audio waveform visualizer built on top of **WaveSurfer.js** for immediate previews.
*   🛡️ **End-To-End Observability**: Custom instrumentation setup with **Sentry** captures server, edge, and browser telemetry.

---

## 🛠️ Tech Stack & Integrations

| Layer | Technologies & Services |
| :--- | :--- |
| **Frontend UI** | React 19, Next.js 16 (App Router), Tailwind CSS v4, Base UI, Lucide icons |
| **Data Fetching** | tRPC, TanStack React Query, OpenAPI-Fetch (type-safe REST clients) |
| **Authentication** | Clerk (JWT sessions, Organization workspace context) |
| **Billing & Payments** | Polar.sh (Subscriptions, Metered usage event tracking) |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **AI Inference** | Python 3.10, Modal Labs, FastAPI, Chatterbox-TTS, PyTorch/Torchaudio |
| **Object Storage** | Cloudflare R2 (S3-compatible bucket mounts) |
| **Observability** | Sentry (Edge/Server/Client tracing) |

---

## 📁 Project Structure

```bash
voicemint/
├── chatterbox_tts.py     # Modal serverless GPU backend script (FastAPI application)
├── prisma/               # Database schemas and generated clients
│   └── schema.prisma
├── scripts/              # Build & API sync utilities
│   └── sync-api.ts       # Utility to convert FastAPI OpenAPI to TypeScript type definitions
├── src/
│   ├── app/              # Next.js App Router (Layouts, pages, route handlers)
│   ├── components/       # Global UI primitives (Shadcn + Base UI)
│   ├── features/         # Modular business logic units
│   │   ├── billing/      # Polar subscription widgets & usage containers
│   │   ├── dashboad/     # Main control workspace sidebar, headers, and grids
│   │   ├── text-to-speech/# Waveform playbacks, TTS parameters, and prompts
│   │   └── voices/       # Voice cloning forms, category filters, and previews
│   ├── lib/              # Instantiated clients (Prisma, Cloudflare R2, Polar, tRPC)
│   ├── trpc/             # E2E type-safe API router declarations
│   └── types/            # Compiled static type mappings (Chatterbox OpenAPI schemas)
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in the root directory. VoiceMint uses **T3 Env** to validate required variables at build time:

```env
# NextJS General
APP_URL="http://localhost:3000"
DATABASE_URL="postgresql://user:password@localhost:5432/voicemint"

# Clerk Authentication (Get these from your Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Cloudflare R2 Storage (S3 Compatible)
R2_ACCOUNT_ID="your_cloudflare_account_id"
R2_ACCESS_KEY_ID="your_r2_access_key"
R2_SECRET_ACCESS_KEY="your_r2_secret_key"
R2_BUCKET_NAME="voicemint-audio"

# Polar Subscription Billing (Sandbox or Production)
POLAR_ACCESS_TOKEN="polar_at_..."
POLAR_SERVER="sandbox" # or "production"
POLAR_PRODUCT_ID="prod_..."

# Serverless Python GPU (Modal)
CHATTERBOX_API_URL="https://modal-app-subdomain.modal.run"
CHATTERBOX_API_KEY="your_chatterbox_api_secret_key"
```

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18 or higher)
*   Python 3.10+ & `pip` (Required to deploy the Modal serverless backend)
*   A running PostgreSQL database instance
*   Accounts with Clerk, Cloudflare R2, Polar.sh, and Modal Labs.

---

### 2. Deploying the AI Speech Engine (Modal Backend)

VoiceMint uses serverless GPUs on Modal. Initialize your backend using:

```bash
# Install the Modal client
pip install modal

# Authenticate with Modal
modal setup

# Set up the secrets on Modal Dashboard or via CLI:
# 1. hf-token (HuggingFace token containing rights to chatterbox-tts dependencies)
# 2. cloudflare-r2 (containing R2 account & secret credentials)
# 3. chatterbox-api-key (API key matching the CHATTERBOX_API_KEY frontend variable)

# Deploy the app to production
modal deploy chatterbox_tts.py
```
*Note: Modal will return your production URL. Keep note of it and assign it to the `CHATTERBOX_API_URL` variable in your `.env` file.*

---

### 3. Setting Up the Next.js Frontend

1.  **Clone and Install Dependencies**:
    ```bash
    git clone https://github.com/VinayKumar7549/VoiceMint.git
    cd voicemint
    npm install
    ```

2.  **Generate Database Client**:
    Push the Prisma schema to your PostgreSQL database:
    ```bash
    npx prisma db push
    ```

3.  **Synchronize API Type Declarations**:
    Since the backend engine is running on FastAPI, you can synchronize and generate absolute TypeScript bindings for the OpenAPI contract:
    ```bash
    npm run sync-api
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to interact with VoiceMint locally!

---

## 📊 Billing Event Ingestion (Polar.sh Integration)

VoiceMint runs metered subscription controls. The API endpoints check subscription validation and post-inference metrics.
*   **Active Access**: Checks `polar.customers.getStateExternal({ externalId: orgId })`. If no active subscription is returned, queries block further synthesis.
*   **Event Ingestion**: Succeeding audio generations dispatch fire-and-forget payload signals to Polar:
    ```typescript
    polar.events.create({
      name: "tts_generation", // or "voice_creation"
      customerId: customer.id,
      metadata: {
        voiceName: voice.name,
        charCount: text.length
      }
    });
    ```
    This enables you to configure granular pay-as-you-go billing plans inside the Polar developer console.

---

## 🔒 License
Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
Created with ❤️ by the VoiceMint Team. If you like the project, feel free to give it a ⭐!
</div>
