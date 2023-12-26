import { Link, Outlet } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Helmet } from 'react-helmet';

const PUBLISHABLE_KEY =
  process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY || "";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Helmet>
        <title>Notion Clone</title>
      </Helmet>
      <header className="relative p-5 min-h-[75px] bg-slate-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          AI <span className="text-green-600 font-bold">note taking</span>{" "}
          assistant.
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">Sign In</Link>
        </SignedOut>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
