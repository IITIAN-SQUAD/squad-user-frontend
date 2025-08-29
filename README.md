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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **Brand Identity**: Consistent use of IITian Squad's gold brand color (#FFD700) throughout the interface
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Typography**: Uses Inter font family for optimal readability
- **Authentication**: User login and signup flows
- **Responsive Layout**: Mobile-friendly design that works on all device sizes

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, our brand font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles with brand colors
│   ├── layout.tsx        # Root layout with Inter font
│   ├── page.tsx          # Home page
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/           # React components
│   ├── layout/           # Layout components
│   │   └── MainLayout.tsx # Main layout wrapper
│   └── ui/               # UI components
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
