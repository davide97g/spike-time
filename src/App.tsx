import { LayoutProvider } from "./context/LayoutProvider";
import { Book } from "./pages/Book/Book";

function App() {
  return (
    <div className="flex flex-col align-center h-100 justify-center">
      <LayoutProvider>
        <h1 className="text-3xl font-bold underline">Spike Time</h1>
        <Book />
      </LayoutProvider>
    </div>
  );
}

export default App;
