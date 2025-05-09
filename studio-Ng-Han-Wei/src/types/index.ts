export interface PerformanceEntry {
  id: string;
  userId: string;
  userName: string;
  sessionId: string;
  timestamp: Date;
  taskName: string;
  score: number; // 0-100
  durationSeconds: number; // duration in seconds
  completionStatus: "completed" | "failed" | "quit";
  errors: number;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  databaseURL?: string;
}

export interface FilterState {
  searchTerm?: string;
  dateRange?: { from?: Date; to?: Date };
  status?: PerformanceEntry["completionStatus"] | "all";
  taskName?: string | "all";
}
