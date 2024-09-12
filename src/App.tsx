import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import { router } from "./router";

function App() {
  return (
    <div className="flex flex-col align-center h-100 justify-center">
      <LayoutProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
