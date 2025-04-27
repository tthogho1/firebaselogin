# Firebase Google Authentication in React

This project demonstrates how to implement Google authentication in a React application using Firebase. It provides a simple login page that allows users to sign in with their Google accounts.

## Project Overview

This is a sample React application that showcases Firebase authentication with Google as the identity provider. The application displays a login page where users can authenticate using their Google accounts. Once authenticated, the application displays a welcome message with the user's name and a logout button.

## Features

- Google authentication using Firebase
- TypeScript support
- React hooks for state management
- Authentication state persistence
- Login and logout functionality

## Project Structure

```
src/
├── component/
│   └── LoginPage.tsx     # Component handling Google authentication
├── config/
│   └── firebaseConfig.tsx # Firebase configuration
├── App.tsx               # Main application component
├── index.tsx             # Entry point
└── .env                  # Environment variables for Firebase configuration
```

## Key Components

### App.tsx

The main application component that:
- Monitors the authentication state using Firebase's `onAuthStateChanged`
- Renders the LoginPage component

### LoginPage.tsx

Handles the authentication flow:
- Provides a "Login with Google" button
- Implements Google sign-in using Firebase's `signInWithPopup`
- Displays different content based on whether the user is logged in or not
- Provides a logout button for authenticated users

### firebaseConfig.tsx

Sets up the Firebase configuration:
- Initializes the Firebase app with configuration from environment variables
- Exports the auth object for use in other components

## Setup and Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google authentication in the Firebase Authentication section
3. Create a `.env` file in the root directory with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY="your-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"
REACT_APP_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Open the application in your browser
2. Click the "Login with Google" button
3. Select your Google account in the popup
4. After successful authentication, you'll see a welcome message with your name
5. Click the "Logout" button to sign out

## Dependencies

- React 19.1.0
- Firebase 11.6.1
- TypeScript 4.9.5
- React Scripts 5.0.1

## License

This project is open-source and available under the MIT License.
