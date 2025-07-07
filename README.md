# Welcome to your Chatro project

This is a [Next.js](https://nextjs.org/) + [React](https://react.dev/) +
[TypeScript](https://www.typescriptlang.org/) project.

**URL**: https://chatro.dev/projects/62037255-cbed-47ca-8dbf-dfee9ca82cf3

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

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit
the file.

## Learn More

To learn more about the technologies used in this project:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [React](https://react.dev/) - The library for web and native user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components built with Radix UI and
  Tailwind CSS

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=nextjs&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
information.

# ChatroAI

A modern React TypeScript application with comprehensive linting and formatting setup.

## Development Setup

### Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality before commits:

- **ESLint**: Lints TypeScript/JavaScript files for code quality and consistency
- **Prettier**: Formats code automatically
- **Pre-commit**: Runs automatically before each commit to format and lint staged files

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run type-check` - Run TypeScript type checking

### Commit Process

1. Make your changes
2. Stage files: `git add .`
3. Commit: `git commit -m "your message"`
4. Pre-commit hooks will automatically:
   - Format staged files with Prettier
   - Lint staged files with ESLint
   - Only allow commit if all checks pass

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- Husky + lint-staged
