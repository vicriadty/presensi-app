import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qeiojbzkyutwsqrcpnfm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaW9qYnpreXV0d3NxcmNwbmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODExMDYsImV4cCI6MjA2NzI1NzEwNn0.QNZl992Em0ju8beUuEDF1NGNvODdHRFGO0epn4aDjxg"
);
