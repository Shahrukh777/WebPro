This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Architecture


WebPro is built as a **multi-tenant SaaS platform** with role-based access and modular feature layers.

### System Layers

**Frontend (Client Layer)**

* Next.js + React for UI and routing
* Role-based dashboards (Agency Owner, Subaccount User)
* Drag-and-drop builders for pages, funnels, and Kanban boards
* Real-time UI updates for tickets, notifications, and automations

**Backend (Application Layer)**

* Node.js API with Prisma ORM
* Handles authentication, permissions, and business logic
* Manages workflows for:

  * Agencies and subaccounts
  * Pipelines, lanes, and tickets
  * Automations and triggers
  * Media, funnels, and contacts

**Database (Data Layer – MySQL)**

* Multi-tenant schema with strict relations between:

  * Agency → SubAccount → Users
  * Pipelines → Lanes → Tickets
  * Automations → Actions → Instances
* Indexed foreign keys for fast filtering and isolation per agency
* Centralized models for Notifications, Invitations, Media, and Subscriptions

---

### Multi-Tenant Design

* **Agency** is the top-level tenant
* Each agency owns multiple **SubAccounts**
* Users are scoped by **agencyId** and **permissions**
* All core resources (pipelines, funnels, media, automations) are scoped to a subaccount
* Data isolation enforced through relational constraints

---

### Permissions & Access Control

* Role-based access via `Role` enum
* Feature-level access using `Permissions` table
* Sidebar and UI modules are dynamically generated from database config
* Protected routes at both API and UI level

---

### Automation Architecture

* **Trigger** defines the event source (e.g., form submission)
* **Automation** links triggers to workflows
* **Action** defines executable steps
* **AutomationInstance** tracks runtime state
* Supports chained actions and ordered execution

---

### Notification Flow

* System events (invites, assignments, automation actions) generate `Notification` records
* Notifications are scoped to:

  * Agency
  * Subaccount (optional)
  * User
* Displayed in real-time within dashboard

---

### Funnel & Page System

* **Funnel** groups multiple pages
* **FunnelPage** stores page content and visit metrics
* Media and class styling are decoupled via `Media` and `ClassName` models
* Supports custom subdomains and publishing

---

### Payment & Subscription Model

* Stripe-based billing system
* `Subscription` and `AddOns` linked directly to Agency
* Plan enforcement applied at feature level
* Supports modular upgrades
