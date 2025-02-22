import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "@/styles/globals.scss";
import AuthProvider from "@/src/utils/provider";
import { getServerSession } from "next-auth";

export default async function RootLayout({ children }) {
  // Gets the current session from the server which contains the user authentication, status and data during server rendering
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        {/* the provider wraps the whole page making the session accessible all throughout the application */}
        <AuthProvider session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
