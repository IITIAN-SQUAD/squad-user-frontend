# IITian Squad User Portal

This is the user portal for IITian Squad, built with [Next.js](https://nextjs.org) and styled with Tailwind CSS.

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


## Features

### 🎯 **Practice Section**
- **Performance Analytics**: Comprehensive graphs showing overall performance, subject-wise accuracy, weekly progress, and topic coverage
- **Advanced Filtering System**: Hierarchical filters (Subject → Chapter → Topic) with year, difficulty, and question type selection
- **Filter Management**: Save up to 5 custom filter combinations for quick access
- **Question Management**: Bookmark questions, create custom lists, and track your progress
- **Detailed Question View**: Each question includes unique hash, difficulty level, attempt statistics, and comprehensive tagging

### 🔐 **Authentication**
- **Google OAuth Only**: Streamlined signup process using only Google authentication (no Facebook)
- **Secure Session Management**: JWT-based authentication with NextAuth.js

### 📊 **Dashboard**
- **Performance Tracking**: Visual representation of your learning journey
- **Responsive Design**: Optimized for all devices and screen sizes

### 🎨 **Modern UI/UX**
- **shadcn/ui Components**: Beautiful, accessible, and responsive design system
- **Tailwind CSS**: Modern styling with consistent design patterns
- **Interactive Charts**: Powered by Recharts for data visualization

## Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn package manager
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd squad-user-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Set up Google OAuth**
   
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Copy Client ID and Client Secret to your `.env.local`

5. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```
   Add the generated secret to `NEXTAUTH_SECRET` in `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── signup/           
│   └── api/auth/         # NextAuth.js API routes
├── components/           
│   ├── dashboard/        # Dashboard-specific components
│   ├── practice/         # Practice section components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components (shadcn/ui)
├── lib/                 # Utility functions and configurations
└── public/              # Static assets
│       ├── Header.tsx    # Site header with navigation
│       └── Footer.tsx    # Site footer
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration with brand colors
```

## Styling Guidelines

### Brand Colors
- Primary Brand Color: Gold (#FFD700)
- Use the `text-brand`, `bg-brand`, and `border-brand` utility classes for consistent branding

### Typography
- Use Inter font for all text
- Font weights range from 100-900 for various UI needs

## Deploy on Vercel

The easiest way to deploy the IITian Squad user portal is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
