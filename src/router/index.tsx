import App from "@/App";
import NotFound from "@/pages/NotFound";
import UnexpectedError from "@/pages/UnexpectedError";
import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
const TestPage = lazy(() => import("@/pages/TestPage"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <UnexpectedError />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      //404 Page
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
