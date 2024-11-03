// import { Dashboard, Home, Profile } from "@pages";

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { WelcomePage } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <WelcomePage />,
        path: "/",
      },
    ],
  },
]);

export default router;
