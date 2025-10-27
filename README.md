# PhoneAuth App

A React Native app with phone number authentication using Firebase.

## Quick Start - iOS

### Prerequisites
- Xcode (latest version)
- Node.js (v18 or higher)
- CocoaPods (`sudo gem install cocoapods`)

### Clone and Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/developerDesinger/PhoneAuth.git
   cd PhoneAuth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup iOS:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Run on iOS:**
   ```bash
   npx react-native run-ios
   ```
   
   Or open `ios/PhoneAuth.xcworkspace` in Xcode and run from there.

### Important Notes
- Always use `PhoneAuth.xcworkspace` (not `.xcodeproj`) when opening in Xcode
- If you get CocoaPods errors, run `pod install` in the `ios` directory
- The project has been properly configured with "PhoneAuth" naming (fixed from previous "ScoreHub" issues)

## Features
- Phone number authentication with Firebase
- OTP verification  
- User data storage in Firestore
- Persistent login state

## Tech Stack
- React Native
- Firebase Authentication & Firestore
- Redux Toolkit
