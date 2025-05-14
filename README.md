# Firebase and Auth.js Authentication in Next.js

This project demonstrates how to implement Google authentication in a Next.js application using both Firebase and Auth.js. It provides a login page that allows users to sign in with their Google accounts using either authentication provider.

## Project Overview

This is a Next.js application that showcases authentication with Google as the identity provider using two different authentication libraries: Firebase and Auth.js (formerly NextAuth.js). The application displays a login page where users can choose their preferred authentication method. Once authenticated, the application displays a welcome message with the user's name and a logout button.

## Features

- Google authentication using Firebase
- Google authentication using Auth.js
- TypeScript support
- Next.js API routes for Auth.js
- React hooks for state management
- Authentication state persistence
- Login and logout functionality
- Unified authentication context

## Project Structure

```
├── pages/                      # Next.js pages directory
│   ├── api/                    # API routes
│   │   └── auth/               # Auth.js API routes
│   │       └── [...nextauth].ts # Auth.js configuration
│   ├── _app.tsx                # Main application wrapper
│   ├── index.tsx               # Home page
│   └── login.tsx               # Login page
├── src/
│   ├── component/
│   │   └── LoginPage.tsx       # Component handling authentication
│   ├── config/
│   │   ├── firebaseConfig.tsx  # Firebase configuration
│   │   └── authConfig.tsx      # Auth.js configuration
│   ├── context/
│   │   └── AuthContext.tsx     # Unified authentication context
│   └── styles/
│       └── LoginPage.css       # Styles for the login page
├── types/
│   └── next-auth.d.ts          # Type definitions for Auth.js
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── .env.local                  # Environment variables for configuration
```

## Key Components

### pages/_app.tsx

The main application wrapper that:
- Wraps the application with SessionProvider for Auth.js
- Wraps the application with AuthProvider for unified authentication
- Provides global styles and configuration

### pages/api/auth/[...nextauth].ts

The Auth.js API route that:
- Configures Google provider for Auth.js
- Sets up callbacks for token and session handling
- Handles authentication requests

### src/component/LoginPage.tsx

Handles the authentication flow:
- Provides buttons for both Firebase and Auth.js authentication
- Implements Google sign-in using both authentication providers
- Displays different content based on whether the user is logged in or not
- Provides a logout button for authenticated users
- Shows which authentication provider was used

### src/context/AuthContext.tsx

Provides a unified authentication context:
- Combines Firebase and Auth.js authentication states
- Provides methods for authentication with both providers
- Exposes a consistent interface for authentication operations

## Setup and Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google authentication in the Firebase Authentication section
3. Set up a Google OAuth client ID at [Google Cloud Console](https://console.cloud.google.com/)
4. Create a `.env.local` file in the root directory with your configuration:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-firebase-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open the application in your browser at http://localhost:3000
2. Choose your preferred authentication method:
   - Click "Login with Google (Firebase)" to authenticate using Firebase
   - Click "Login with Google (Auth.js)" to authenticate using Auth.js
3. Select your Google account in the popup
4. After successful authentication, you'll see a welcome message with your name and which provider was used
5. Click the "Logout" button to sign out

## Dependencies

- Next.js 14.0.4
- React 19.1.0
- Firebase 11.6.1
- Auth.js (next-auth) 4.24.5
- TypeScript 4.9.5

## License

This project is open-source and available under the MIT License.
