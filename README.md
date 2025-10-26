# PhoneAuth App

## Features

- **Phone Number Authentication:**
  - Users sign up and log in using their phone number and OTP verification via Firebase Authentication.
- **Persistent Login State:**
  - After successful login, the phone number is stored in both Redux and AsyncStorage. The app checks for this on launch and navigates directly to the Home screen if found.
- **Firestore User Storage:**
  - On sign up/login, user data (ID, phone number, createdAt) is saved in Firestore under the `users` collection.
- **Centralized State Management:**
  - Redux Toolkit manages authentication state. Redux Persist and AsyncStorage ensure state is saved across app restarts.
- **Navigation Logic:**
  - AuthStack and AppStack navigation is controlled by Redux state. If logged in, users see Home; otherwise, they see Login/SignUp.
- **Logout:**
  - Logging out clears the phone number from AsyncStorage and Redux, returning the user to the Login screen.

## How It Works

1. **Sign Up:**
   - Enter your phone number, receive OTP, verify, and create a user in Firestore.
2. **Login:**
   - Enter your phone number. If found in Firestore, log in and store the phone number in Redux and AsyncStorage.
3. **App Launch:**
   - On app start, checks AsyncStorage for a stored phone number. If present, sets Redux state and navigates to Home.
4. **Logout:**
   - Clears phone number from AsyncStorage and Redux, navigates to Login.

## Tech Stack
- React Native
- Firebase Authentication & Firestore
- Redux Toolkit & Redux Persist
- AsyncStorage
- React Navigation

## Setup
1. Clone the repo
2. Install dependencies: `npm install`
3. Add your Firebase config files
4. Run the app: `npx react-native run-android` or `npx react-native run-ios`
