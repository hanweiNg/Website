import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DatabaseZap, Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseZap className="h-6 w-6 text-primary" />
              Firebase Configuration
            </CardTitle>
            <CardDescription>
              Connect your VR Performance Dashboard to your Firebase project to load real user data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Developer Note</AlertTitle>
              <AlertDescription>
                To connect to your Firebase project:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Locate the file <code className="font-mono bg-muted px-1 py-0.5 rounded">src/config/firebase.example.ts</code>.</li>
                  <li>Rename it to <code className="font-mono bg-muted px-1 py-0.5 rounded">src/config/firebase.ts</code>.</li>
                  <li>Open <code className="font-mono bg-muted px-1 py-0.5 rounded">src/config/firebase.ts</code> and fill in your Firebase project's configuration details. You can find these in your Firebase project settings under "Project settings" &gt; "General" &gt; "Your apps" &gt; "SDK setup and configuration".</li>
                  <li>Ensure your Firebase security rules (Firestore or Realtime Database) are set up to allow read access from your application's domain.</li>
                </ol>
                <p className="mt-3">
                  Once configured, the application will attempt to connect to Firebase and fetch data.
                  The current dashboard uses mock data until Firebase is successfully connected and data fetching logic in <code className="font-mono bg-muted px-1 py-0.5 rounded">src/services/performanceService.ts</code> is updated.
                </p>
              </AlertDescription>
            </Alert>

            <div>
              <h3 className="text-lg font-semibold mb-2">Required Firebase Config Values:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><code className="font-mono text-foreground">apiKey</code></li>
                <li><code className="font-mono text-foreground">authDomain</code></li>
                <li><code className="font-mono text-foreground">projectId</code></li>
                <li><code className="font-mono text-foreground">storageBucket</code></li>
                <li><code className="font-mono text-foreground">messagingSenderId</code></li>
                <li><code className="font-mono text-foreground">appId</code></li>
                <li><code className="font-mono text-foreground">measurementId</code> (Optional, for Analytics)</li>
                <li><code className="font-mono text-foreground">databaseURL</code> (Optional, if using Realtime Database)</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              This page is a placeholder. In a production application, Firebase configuration would be handled more securely, potentially through environment variables and server-side setup.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
