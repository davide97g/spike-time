import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import { router } from "./router";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="flex flex-col align-center h-full justify-center w-full">
      <LayoutProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
