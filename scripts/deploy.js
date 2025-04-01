// This script is intended to be run by GitHub Actions
const { execSync } = require('child_process');
const path = require('path');

// Function to run shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Build the Next.js app
console.log('Building Next.js app...');
runCommand('npm run build');

// Deploy to Firebase
console.log('Deploying to Firebase...');
runCommand('firebase deploy --only hosting --token "$FIREBASE_TOKEN"');

console.log('Deployment completed successfully!'); 