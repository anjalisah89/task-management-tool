import { Timestamp } from "@/components/ui/types";
const formatTimestamp = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return "N/A";
  // Convert Firebase Timestamp to JavaScript Date object
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  // Format the date
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};
export default formatTimestamp;
