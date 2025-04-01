# Firebase Deployment Instructions

This project is configured to deploy to Firebase Hosting. There are two ways to deploy:

## Option 1: GitHub Actions (Recommended)

1. Push your code to GitHub
2. Add the required secrets to your GitHub repository:
   - `FIREBASE_TOKEN`: Generate this token by running `firebase login:ci` in your terminal
3. Push to the main branch, and GitHub Actions will handle the deployment automatically

## Option 2: Manual Deployment

If you want to deploy manually, follow these steps:

1. Install the Firebase CLI:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Build and deploy:
   ```
   npm run deploy:local
   ```

## Firebase Configuration

The Firebase configuration is stored in the following files:
- `lib/firebase.ts`: Contains the Firebase SDK configuration
- `firebase.json`: Configures Firebase Hosting settings
- `.firebaserc`: Specifies the Firebase project ID

## Troubleshooting

If you encounter permission issues with the Firebase CLI, try using WSL (Windows Subsystem for Linux) as recommended. 