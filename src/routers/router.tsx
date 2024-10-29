// import { Dashboard, Home, Profile } from "@pages";

import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { WelcomePage } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Navigate to="home" replace />,
        index: true,
      },
      {
        element: <WelcomePage />,
        path: "home",
      },
    ],
  },
]);

export default router;
