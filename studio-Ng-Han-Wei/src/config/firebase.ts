// src/config/firebase.example.ts
// 1. Rename this file to firebase.ts
// 2. Fill in your Firebase project's configuration details below.
// You can find this information in your Firebase project settings.

import type { FirebaseConfig } from "@/types";

export const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDmyMCT--Luul2Ij4OCT0vrxZxUELcRG-Y",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "testing-bbe39",
  storageBucket: "testing-bbe39.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID", // Optional
  databaseURL: "https://testing-bbe39-default-rtdb.asia-southeast1.firebasedatabase.app/", // Optional, for Realtime Database
};

// Note: For security reasons, sensitive information like API keys should ideally
// be stored in environment variables, especially for production builds.
// This file is provided for ease of setup in a development environment.
// Ensure you have appropriate security rules set up in your Firebase console.
