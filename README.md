# Firebase and Auth.js Authentication in React

This project demonstrates how to implement Google authentication in a React application using both Firebase and Auth.js. It provides a login page that allows users to sign in with their Google accounts using either authentication provider.

## Project Overview

This is a sample React application that showcases authentication with Google as the identity provider using two different authentication libraries: Firebase and Auth.js (NextAuth.js). The application displays a login page where users can choose their preferred authentication method. Once authenticated, the application displays a welcome message with the user's name and a logout button.

## Features

- Google authentication using Firebase
- Google authentication using Auth.js (NextAuth.js)
- TypeScript support
- React hooks for state management
- Authentication state persistence
- Login and logout functionality
- Unified authentication context

## Project Structure

```
src/
├── component/
│   ├── LoginPage.tsx        # Component handling authentication
│   └── LoginPage.test.tsx   # Tests for LoginPage component
├── config/
│   ├── firebaseConfig.tsx   # Firebase configuration
│   └── authConfig.tsx       # Auth.js configuration
├── context/
│   └── AuthContext.tsx      # Unified authentication context
├── styles/
│   └── LoginPage.css        # Styles for the login page
├── App.tsx                  # Main application component
├── App.css                  # Application styles
├── index.tsx                # Entry point
└── .env                     # Environment variables for configuration
```

## Key Components

### App.tsx

The main application component that:
- Wraps the application with SessionProvider for Auth.js
- Wraps the application with AuthProvider for unified authentication
- Renders the LoginPage component

### LoginPage.tsx

Handles the authentication flow:
- Provides buttons for both Firebase and Auth.js authentication
- Implements Google sign-in using both authentication providers
- Displays different content based on whether the user is logged in or not
- Provides a logout button for authenticated users
- Shows which authentication provider was used

### AuthContext.tsx

Provides a unified authentication context:
- Combines Firebase and Auth.js authentication states
- Provides methods for authentication with both providers
- Exposes a consistent interface for authentication operations

### firebaseConfig.tsx

Sets up the Firebase configuration:
- Initializes the Firebase app with configuration from environment variables
- Exports the auth object for use in other components

### authConfig.tsx

Sets up the Auth.js configuration:
- Configures Google provider for Auth.js
- Sets up callbacks for token and session handling

## Setup and Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google authentication in the Firebase Authentication section
3. Set up a Google OAuth client ID at [Google Cloud Console](https://console.cloud.google.com/)
4. Create a `.env` file in the root directory with your configuration:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY="your-firebase-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
REACT_APP_FIREBASE_APP_ID="your-firebase-app-id"
REACT_APP_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Auth.js Configuration
REACT_APP_GOOGLE_CLIENT_ID="your-google-client-id"
REACT_APP_GOOGLE_CLIENT_SECRET="your-google-client-secret"
REACT_APP_NEXTAUTH_URL="http://localhost:3000"
REACT_APP_NEXTAUTH_SECRET="your-nextauth-secret"
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
2. Choose your preferred authentication method:
   - Click "Login with Google (Firebase)" to authenticate using Firebase
   - Click "Login with Google (Auth.js)" to authenticate using Auth.js
3. Select your Google account in the popup
4. After successful authentication, you'll see a welcome message with your name and which provider was used
5. Click the "Logout" button to sign out

## Dependencies

- React 19.1.0
- Firebase 11.6.1
- NextAuth.js 4.24.5
- React Router DOM 6.20.1
- TypeScript 4.9.5
- React Scripts 5.0.1

## License

This project is open-source and available under the MIT License.
