# Oikomus App

A real estate platform for property listings, financing, and neighborhood exploration.

## Getting Started

First, create a `.env.local` file based on the `.env.local.example` template with your Firebase configuration.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured to deploy to Firebase Hosting automatically through GitHub Actions.

### Manual Deployment

To deploy manually, run:

```bash
npm run deploy
```

This will build the application and deploy it to Firebase Hosting.

### CI/CD Deployment

When you push to the `main` branch, GitHub Actions will automatically deploy your application to Firebase Hosting. 

For this to work, you need to set up the following secrets in your GitHub repository:
- `FIREBASE_SERVICE_ACCOUNT_OIKOMUS_B0630`: Your Firebase service account credentials

## Project Structure

- `app/`: Next.js 13+ App Router pages and layouts
- `components/`: Reusable UI components
- `lib/`: Utility functions and Firebase configuration
- `public/`: Static files
- `.github/workflows/`: GitHub Actions workflows for CI/CD

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Radix UI](https://radix-ui.com/) - UI primitives
- [Recharts](https://recharts.org/) - Charts and data visualization
