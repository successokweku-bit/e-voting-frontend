# 🗳️ VoteHub - Secure Electronic Voting System

> **MSc Thesis Project**: A Modern, Secure, and Transparent Electronic Voting Platform

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Security Features](#-security-features)
- [API Integration](#-api-integration)
- [Screenshots](#-screenshots)
- [Presentation Script](#-presentation-script)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🎯 Project Overview

**VoteHub** is a modern electronic voting system designed to address the challenges of traditional voting methods. This web application provides a secure, transparent, and user-friendly platform for conducting elections digitally.

### Problem Statement

Traditional voting systems face several challenges:

- **Accessibility**: Voters must physically travel to polling stations
- **Transparency**: Manual counting is prone to human error
- **Efficiency**: Paper-based systems are slow and resource-intensive
- **Security**: Physical ballots can be tampered with or lost

### Solution

VoteHub provides a digital solution that:

- Enables remote voting from any device with internet access
- Provides real-time vote tracking and statistics
- Implements secure authentication and vote verification
- Offers cryptographic vote receipts for independent verification

---

## ✨ Key Features

### For Voters

| Feature                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| 🏠 **Election Dashboard** | View all active, upcoming, and past elections  |
| 🗳️ **Secure Voting**      | Cast votes with multi-layer security           |
| 📜 **Vote Receipt**       | Receive cryptographic receipt for verification |
| 📊 **View Results**       | Access election results and statistics         |
| 📝 **Voting History**     | Track personal voting history                  |
| ✅ **Vote Verification**  | Independently verify vote was recorded         |

### For Administrators

| Feature                     | Description                     |
| --------------------------- | ------------------------------- |
| 📈 **Live Tracking**        | Real-time election monitoring   |
| 👥 **Voter Management**     | Register and manage voters      |
| 🏛️ **Election Management**  | Create and configure elections  |
| 👤 **Candidate Management** | Add candidates with manifestos  |
| 🏢 **Position Management**  | Define electable positions      |
| 🎌 **Party Management**     | Manage political parties        |
| 📊 **Analytics Dashboard**  | Comprehensive voting statistics |

---

## 🛠️ Technology Stack

### Frontend (This Repository)

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND TECHNOLOGIES                     │
├─────────────────────────────────────────────────────────────┤
│  Framework:     React 18 (with Vite build tool)             │
│  Language:      TypeScript (Type-safe JavaScript)           │
│  Styling:       TailwindCSS + Shadcn/UI Components          │
│  State:         TanStack Query (React Query) for API data   │
│  Forms:         Formik + Yup for validation                 │
│  Routing:       React Router v6                             │
│  Notifications: Sonner (Toast notifications)                │
│  Icons:         Lucide React                                │
└─────────────────────────────────────────────────────────────┘
```

### Backend (Separate Repository)

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND TECHNOLOGIES                      │
├─────────────────────────────────────────────────────────────┤
│  API:           RESTful API                                 │
│  Authentication: JWT (JSON Web Tokens)                      │
│  Database:      PostgreSQL / MySQL                          │
│  Security:      Encrypted vote storage                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │    Voter     │  │    Admin     │  │   Public     │               │
│  │   Portal     │  │  Dashboard   │  │   Results    │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND (This App)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Context   │  │    Hooks    │  │ Components  │  │   Pages     │ │
│  │   (Auth)    │  │  (Queries)  │  │    (UI)     │  │  (Routes)   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼ HTTPS API Calls
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND API SERVER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │    Auth     │  │  Elections  │  │   Voting    │  │   Admin     │ │
│  │   Service   │  │   Service   │  │   Service   │  │   Service   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATABASE                                    │
│                    (Encrypted Vote Storage)                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

### Installation Steps

1. **Clone the repository** (or download and extract ZIP)

   ```bash
   git clone <repository-url>
   cd voting-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://your-backend-api-url
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

---

## 📁 Project Structure

```
voting-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (buttons, cards, etc.)
│   │   ├── candidate/       # Candidate-related dialogs
│   │   ├── election/        # Election-related dialogs
│   │   ├── party/           # Party-related dialogs
│   │   ├── position/        # Position-related dialogs
│   │   ├── voter/           # Voter-related dialogs
│   │   └── auth/            # Authentication components
│   │
│   ├── contexts/            # React Context providers
│   │   └── AuthContext.tsx  # Authentication state management
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── election/        # Election-related hooks
│   │   ├── candidates/      # Candidate-related hooks
│   │   ├── party/           # Party-related hooks
│   │   ├── position/        # Position-related hooks
│   │   └── voter/           # Voter-related hooks
│   │
│   ├── pages/               # Application pages
│   │   ├── Dashboard/       # Admin dashboard pages
│   │   └── Landing/         # Public/voter pages
│   │
│   ├── services/            # API service functions
│   │   ├── electionService.ts
│   │   ├── candidateService.ts
│   │   └── ...
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── types.ts
│   │
│   ├── schemas/             # Form validation schemas
│   │   └── schemas.ts
│   │
│   ├── layouts/             # Page layout components
│   │   └── DashboardLayout.tsx
│   │
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
│
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.ts           # Vite build configuration
```

---

## 👥 User Roles

### 1. Voter (Regular User)

- Can view available elections
- Can cast votes in active elections
- Receives vote receipts
- Can verify their votes
- Can view their voting history

### 2. Administrator

- All voter capabilities, plus:
- Create and manage elections
- Register and manage voters
- Create positions and candidates
- Manage political parties
- View real-time election tracking
- Access comprehensive analytics

### 3. Super Administrator

- All admin capabilities, plus:
- Manage other administrators
- System-wide settings

---

## 🔐 Security Features

| Security Layer         | Implementation                                     |
| ---------------------- | -------------------------------------------------- |
| **Authentication**     | JWT-based authentication with secure token storage |
| **Authorization**      | Role-based access control (RBAC)                   |
| **Vote Encryption**    | Votes are encrypted before storage                 |
| **Vote Receipts**      | Cryptographic receipts for vote verification       |
| **Protected Routes**   | Frontend route protection based on user roles      |
| **Session Management** | Automatic token refresh and logout                 |
| **Input Validation**   | Client-side and server-side validation             |

### Vote Verification Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Voter     │ →  │  Cast Vote  │ →  │  Receive    │
│   Login     │    │             │    │  Receipt    │
└─────────────┘    └─────────────┘    └─────────────┘
                                             │
                                             ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Vote      │ ←  │   Server    │ ←  │   Enter     │
│  Verified   │    │  Validates  │    │  Receipt    │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## 🔌 API Integration

The frontend communicates with the backend through RESTful API endpoints:

### Key Endpoints

| Category         | Endpoint                                            | Description          |
| ---------------- | --------------------------------------------------- | -------------------- |
| **Auth**         | `POST /api/login`                                   | User authentication  |
| **Elections**    | `GET /api/elections/active`                         | Get active elections |
| **Voting**       | `POST /api/elections/:id/positions/:id/vote-secure` | Cast a vote          |
| **Verification** | `POST /api/verify-receipt`                          | Verify vote receipt  |
| **Tracking**     | `GET /admin/elections/:id/tracking`                 | Live election stats  |

---

## 📸 Screenshots

### Voter Landing Page

- Hero section with election statistics
- Grid of active, upcoming, and past elections
- Clean, modern UI with smooth animations

### Admin Dashboard

- Sidebar navigation
- Data tables with sorting and filtering
- CRUD operations for all entities

### Election Tracking

- Real-time vote counts
- Position-wise breakdown
- Winner indicators
- Timeline visualization

### Voting Flow

- Candidate selection with photos
- Confirmation dialog
- Receipt display with copy functionality

---

## 🎤 Presentation Script

### Opening (1 minute)

> "Good morning/afternoon, esteemed panel members. My name is [Your Name], and today I'm presenting my MSc thesis project titled 'VoteHub: A Secure Electronic Voting System.'
>
> The inspiration for this project came from observing the challenges of traditional voting systems - from accessibility issues to transparency concerns. My goal was to create a solution that makes voting more accessible, secure, and transparent."

### Problem Statement (2 minutes)

> "Traditional voting faces several key challenges:
>
> 1. **Accessibility** - Voters must travel to polling stations, which can be difficult for the elderly, disabled, or those living far away.
> 2. **Efficiency** - Paper-based counting is slow and labor-intensive.
> 3. **Transparency** - Manual processes are prone to human error and difficult to audit.
> 4. **Security** - Physical ballots can be tampered with, lost, or destroyed.
>
> Electronic voting addresses these issues while introducing new considerations around cybersecurity and trust."

### Solution Overview (2 minutes)

> "VoteHub is a web-based electronic voting platform with two main interfaces:
>
> 1. **Voter Portal** - Where registered voters can:
>
>    - View available elections
>    - Cast their votes securely
>    - Receive cryptographic vote receipts
>    - Verify their votes independently
>
> 2. **Admin Dashboard** - Where administrators can:
>    - Create and manage elections
>    - Register voters
>    - Track voting in real-time
>    - View comprehensive analytics"

### Technical Demo (5 minutes)

> "Let me demonstrate the system...
>
> **[Show Voter Flow]**
>
> - This is the landing page where voters see active elections
> - Notice the clean UI showing election details and voting period
> - When I click 'Vote Now', I see the available positions
> - I can select a candidate and confirm my vote
> - After voting, I receive this unique receipt code
> - I can use this code on the verification page to confirm my vote was recorded
>
> **[Show Admin Flow]**
>
> - Here's the admin dashboard with analytics overview
> - Administrators can manage elections, candidates, positions, and parties
> - The election tracking page shows real-time statistics
> - Each position shows vote counts and the leading candidate"

### Technology Stack (2 minutes)

> "The frontend is built using:
>
> - **React** - A JavaScript library for building user interfaces
> - **TypeScript** - Adds type safety to prevent bugs
> - **TailwindCSS** - For responsive, modern styling
> - **TanStack Query** - For efficient data fetching and caching
>
> The backend (separate repository) provides:
>
> - RESTful API endpoints
> - JWT authentication
> - Encrypted vote storage
> - Cryptographic receipt generation"

### Security Features (2 minutes)

> "Security was a primary concern. The system implements:
>
> 1. **Authentication** - JWT-based secure login
> 2. **Authorization** - Role-based access control
> 3. **Vote Privacy** - Encrypted vote storage
> 4. **Verifiability** - Cryptographic receipts allow voters to verify their votes
> 5. **Integrity** - Each vote is tamper-evident
>
> The vote verification feature is crucial - it allows voters to independently confirm their vote was recorded correctly without revealing how they voted to anyone else."

### Challenges & Solutions (1 minute)

> "Key challenges included:
>
> - Ensuring security while maintaining usability - solved with intuitive UI and clear feedback
> - Real-time updates for vote tracking - implemented with automatic data refreshing
> - Mobile responsiveness - achieved with responsive design principles"

### Future Enhancements (1 minute)

> "Future improvements could include:
>
> - Biometric authentication
> - Blockchain integration for immutable vote records
> - Offline voting capabilities
> - Multi-language support"

### Conclusion (1 minute)

> "In conclusion, VoteHub demonstrates that electronic voting can be:
>
> - **Secure** - Through encryption and cryptographic verification
> - **Transparent** - With real-time tracking and auditable results
> - **Accessible** - Available from any device with internet
> - **User-friendly** - With intuitive interfaces for all user types
>
> Thank you for your attention. I'm happy to take any questions."

---

## 🔮 Future Enhancements

- [ ] Biometric authentication support
- [ ] Blockchain integration for vote immutability
- [ ] Offline voting with sync
- [ ] Multi-language internationalization
- [ ] Mobile application (React Native)
- [ ] Email/SMS notifications
- [ ] Advanced analytics and reporting
- [ ] Accessibility improvements (WCAG compliance)

---

## 👨‍💻 Author

**[Your Name]**

- MSc Thesis Project
- [Your University]
- [Your Email]

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Thesis Supervisor: [Supervisor Name]
- [University Name]
- All open-source libraries and tools used in this project

---

_Developed as part of MSc requirements - 2024/2025_
