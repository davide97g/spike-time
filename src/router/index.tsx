import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Header } from "@/components/custom/Header/Header";

const Login = lazy(() => import("../pages/Login"));
const Book = lazy(() => import("../pages/Book"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Reservations = lazy(() => import("../pages/Reservations"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Header />
          <Book />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/reservations",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Header />
          <Reservations />
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
          <Header />
          <PersonalArea />
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);
