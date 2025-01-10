import { getServerSession } from "next-auth";
import Dashboard from "./dashboard";

// Generate dynamic metadata to get the user's name
export async function generateMetadata() {
  const session = await getServerSession();
  const user = session?.user;
  return {
    title: `${user?.name}'s Dashboard`,
    description: "Welcome to the dashboard",
  };
}

export default function DashboardPage() {
  return <Dashboard />;
}
