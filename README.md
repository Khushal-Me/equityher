# EquityHer

**AI-Powered Investment Mentor**

EquityHer is a platform designed to help women build financial confidence. It allows users to learn investing without financial risk. The application combines personalized AI mentorship with interactive learning modules. Users can also access a virtual trading simulator. This creates an environment suitable for financial growth and education.

## Live Demo

The application is deployed at **[www.equityher.tech](https://www.equityher.tech)**.

## Features

- **AI Mentorship**: Users receive answers to investing questions at any time. The AI guide is powered by Google Gemini and provides knowledgeable responses.
- **Risk-Free Practice**: The platform provides $10,000 in virtual cash. This allows for experimentation with stock trading strategies without the risk of losing real money.
- **Personalized Learning**: Lessons are tailored to the user's knowledge level. Content ranges from basic concepts to advanced strategies.
- **Portfolio Dashboard**: Users can track virtual holdings and monitor performance. The system provides AI-driven feedback on portfolio diversity and risk factors.
- **Interactive Chat**: The interface supports natural conversations with the AI mentor. This helps clarify doubts and obtain market insights.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Khushal-Me/equityher.git
    cd equityher
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory. Add your API keys as shown below.

    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  **Open the app:**

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
equityher/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── chat/         # AI Chat interface
│   │   ├── dashboard/    # User dashboard
│   │   ├── learn/        # Learning modules
│   │   └── portfolio/    # Portfolio management
│   ├── components/       # Reusable UI components
│   │   ├── chat/         # Chat-specific components
│   │   ├── layout/       # Layout components (Navbar, etc.)
│   │   ├── learning/     # Learning-specific components
│   │   ├── portfolio/    # Portfolio-specific components
│   │   └── ui/           # Shadcn UI primitives
│   ├── lib/              # Utility functions and API configurations
│   ├── store/            # Zustand state stores
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── ...config files
```

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## License

This project has all rights reserved.
