import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Book = lazy(() => import("../pages/Book"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Book />
      </Suspense>
    ),
  },
  {
    path: "/me",
    element: (
      <Suspense>
        <PersonalArea />
      </Suspense>
    ),
  },
]);
