import { Header } from "@/components/custom/Header/Header";
import { Page } from "@/components/custom/Page/Page";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const Login = lazy(() => import("../pages/Login"));
const Book = lazy(() => import("../pages/Book"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Reservations = lazy(() => import("../pages/Reservations"));
const Reservation = lazy(() => import("../pages/Reservation"));
const Shop = lazy(() => import("../pages/Shop"));
const Admin = lazy(() => import("../pages/Admin"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
    path: "/share-reservation/:reservationId",
    element: (
      <Suspense>
        <Reservation />
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
  {
    path: "/admin",
    element: (
      <Suspense>
        <AdminRoute>
          <Page>
            <Header />
            <Admin />
          </Page>
        </AdminRoute>
      </Suspense>
    ),
  },
  {
    path: "/forbidden",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Page>
            <Header />
            <Forbidden />
          </Page>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense>
        <Page>
          <Header />
          <NotFound />
        </Page>
      </Suspense>
    ),
  },
]);
