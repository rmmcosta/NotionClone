import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import IndexPage from "./routes";
import ContactPage from "./routes/contact";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import DashboardPage from "./routes/dashboard";
import UserInfoPage from "./routes/user-info";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/user-info", element: <UserInfoPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [{ path: "/dashboard", element: <DashboardPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
