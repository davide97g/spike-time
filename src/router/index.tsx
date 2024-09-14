import { Header } from "@/components/custom/Header/Header";
import { Page } from "@/components/custom/Page/Page";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Book = lazy(() => import("../pages/Book"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Reservations = lazy(() => import("../pages/Reservations"));
const Shop = lazy(() => import("../pages/Shop"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Page>
            <Header />
            <Book />
          </Page>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/reservations",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Page>
            <Header />
            <Reservations />
          </Page>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Page>
          <Login />
        </Page>
      </Suspense>
    ),
  },
  {
    path: "/me",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Page>
            <Header />
            <PersonalArea />
          </Page>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/shop",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Page>
            <Header />
            <Shop />
          </Page>
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);
