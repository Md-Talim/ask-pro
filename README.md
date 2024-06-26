# Ask Pro

AskPro is a dynamic Q&A platform designed to foster knowledge sharing and community interaction, similar to Stack Overflow. Users can post questions, provide answers, and engage with the community through voting and saving their favorite content.

## Features

- **Ask Questions:** Users can post questions on various topics to seek answers from the community.
- **Provide Answers:** Share your knowledge by answering questions posted by other users.
- **Upvote/Downvote:** Engage with content by upvoting or downvoting questions and answers based on their quality and relevance.
- **Save to Collection:** Save interesting questions to your personal collection for easy access and reference.
- **Real-Time Updates:** Experience seamless and real-time updates for a dynamic user interaction.

## Tech Stack

- **Next.js 14:** A powerful React framework for server-side rendering and static site generation.
- **TypeScript:** A statically typed superset of JavaScript for robust and maintainable code.
- **Tailwind CSS:** A utility-first CSS framework for creating responsive and modern user interfaces.
- **ShadCN UI:** A collection of customizable UI components for building an elegant and intuitive design.
- **MongoDB:** A flexible, scalable NoSQL database for efficient data storage and retrieval.

## Installation

1. **Clone the repository:**

```bash filename="Terminal"
git clone https://github.com/md-talim/ask-pro.git
cd ask-pro
```

2. **Install dependencies:**

```bash filename="Terminal"
yarn
```

3. **Set up environment variables:** Create a .env.local file in the root directory and add your MongoDB connection string and other necessary environment variables.

To run this project, you will need to add the following environment variables to your `.env.local` file:

```plaintext filename=".env.local"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=XXX
CLERK_SECRET_KEY=XXX

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_CLERK_WEBHOOK_SECRET=XXX

NEXT_PUBLIC_TINI_API_KEY=XXX

MONGODB_URL=XXX
```

4. **Run the development server:**

```bash filename="Terminal"
yarn run dev
```

5. **Build for production:**

```bash filename="Terminal"
yarn run build
```

## Contributions

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Live link

Go to [askpro.vercel.app](https://askpro.vercel.app) to see the live version.
