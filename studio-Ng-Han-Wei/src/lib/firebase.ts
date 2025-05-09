import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; // Example: if you need auth
// import { getFirestore } from "firebase/firestore"; // Example: if you need Firestore
// import { getDatabase } from "firebase/database"; // Example: if you need Realtime Database

let firebaseApp: FirebaseApp | undefined;

try {
  // Dynamically import firebaseConfig. This will fail gracefully if file doesn't exist.
  const firebaseConfigModule = await import("@/config/firebase");
  const firebaseConfig = firebaseConfigModule.firebaseConfig;

  if (firebaseConfig && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApps()[0];
    }
  } else {
    console.warn(
      "Firebase configuration is missing or using placeholder values. " +
      "Please create/update src/config/firebase.ts with your project credentials. " +
      "Firebase services will not be available."
    );
  }
} catch (error) {
  console.warn(
    "Could not load Firebase configuration from src/config/firebase.ts. " +
    "Did you rename firebase.example.ts to firebase.ts and fill in your credentials? " +
    "Firebase services will not be available. Error:", error
  );
}

// const auth = firebaseApp ? getAuth(firebaseApp) : undefined;
// const firestore = firebaseApp ? getFirestore(firebaseApp) : undefined;
// const database = firebaseApp ? getDatabase(firebaseApp) : undefined;

// export { firebaseApp, auth, firestore, database };
export { firebaseApp };

// IMPORTANT: This setup is for client-side Firebase.
// For server-side operations or more secure handling of credentials,
// consider Firebase Admin SDK and Next.js API routes or Server Actions.
