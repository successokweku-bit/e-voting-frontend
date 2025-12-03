# E-Voting Application

A modern, secure, and user-friendly electronic voting application built with React, TypeScript, and Vite. This application allows users to register, view elections, and cast their votes, while providing administrators with tools to manage elections, candidates, and parties.

## 🚀 Features

-   **User Authentication**: Secure registration and login system.
-   **Dashboard**:
    -   **Voter Dashboard**: View upcoming elections, active polls, and voting history.
    -   **Admin Dashboard**: Manage elections, candidates, parties, and positions.
-   **Election Management**: Create, update, and monitor elections.
-   **Candidate & Party Management**: Manage political parties and candidates for various positions.
-   **Voting System**: Secure and intuitive interface for casting votes.
-   **Real-time Updates**: (If applicable, or mention React Query for efficient data fetching).
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Icons)
-   **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Form Handling**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) (Validation)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Date Handling**: [date-fns](https://date-fns.org/)
-   **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📂 Project Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── constants/      # App constants
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── lib/            # Utility libraries (e.g., utils.ts)
├── pages/          # Application pages (Dashboard, Landing, etc.)
├── schemas/        # Validation schemas (Yup)
├── services/       # API service calls
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/successokweku-bit/e-voting-frontend.git
    cd voting-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the application for production:

```bash
npm run build
```

### Linting

To run the linter:

```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
