import { mockPerformanceData } from "@/data/mockData";
import type { PerformanceEntry, FilterState } from "@/types";
// import { firestore } from "@/lib/firebase"; // Uncomment when using Firebase
// import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore"; // Uncomment for Firebase

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPerformanceData(filters?: FilterState): Promise<PerformanceEntry[]> {
  console.log("Fetching performance data with filters:", filters);

  // Simulate API call
  await delay(500);

  // ** MOCK DATA IMPLEMENTATION **
  let filteredData = [...mockPerformanceData].map(entry => ({
    ...entry,
    timestamp: new Date(entry.timestamp) // Ensure timestamp is a Date object
  }));

  if (filters) {
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (entry) =>
          entry.userName.toLowerCase().includes(term) ||
          entry.userId.toLowerCase().includes(term) ||
          entry.taskName.toLowerCase().includes(term)
      );
    }
    if (filters.dateRange?.from) {
      filteredData = filteredData.filter(
        (entry) => entry.timestamp >= filters.dateRange!.from!
      );
    }
    if (filters.dateRange?.to) {
      // Adjust 'to' date to include the whole day
      const toDate = new Date(filters.dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      filteredData = filteredData.filter(
        (entry) => entry.timestamp <= toDate
      );
    }
    if (filters.status && filters.status !== "all") {
      filteredData = filteredData.filter(
        (entry) => entry.completionStatus === filters.status
      );
    }
    if (filters.taskName && filters.taskName !== "all") {
      filteredData = filteredData.filter(
        (entry) => entry.taskName === filters.taskName
      );
    }
  }
  
  // Sort by timestamp descending by default
  filteredData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return filteredData;

  // ** FIREBASE FIRESTORE EXAMPLE (replace mock implementation above) **
  /*
  if (!firestore) {
    console.error("Firestore is not initialized. Returning mock data.");
    return mockPerformanceData; // Fallback or throw error
  }

  try {
    const performanceCollectionRef = collection(firestore, "performanceEntries"); // Ensure "performanceEntries" matches your collection name
    let q = query(performanceCollectionRef, orderBy("timestamp", "desc"));

    // Example of applying filters:
    // if (filters?.userId) {
    //   q = query(q, where("userId", "==", filters.userId));
    // }
    // if (filters?.dateRange?.from) {
    //   q = query(q, where("timestamp", ">=", Timestamp.fromDate(filters.dateRange.from)));
    // }
    // ... add other filters similarly

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        timestamp: (docData.timestamp as Timestamp).toDate(), // Convert Firestore Timestamp to JS Date
      } as PerformanceEntry;
    });
    return data;
  } catch (error) {
    console.error("Error fetching performance data from Firebase:", error);
    throw error; // Or return mock data / empty array as fallback
  }
  */
}

export async function getUniqueTaskNames(): Promise<string[]> {
  await delay(100);
  const taskNames = new Set(mockPerformanceData.map(entry => entry.taskName));
  return Array.from(taskNames);
}
