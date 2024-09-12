import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Book = lazy(() => import("../pages/Book"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Book />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/me",
    element: (
      <Suspense>
        <ProtectedRoute>
          <PersonalArea />
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);
