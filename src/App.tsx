import { Header } from "./components/Header/Header";
import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import WeeklyAgendaCard from "./pages/Book/Agenda";

function App() {
  return (
    <div className="flex flex-col align-center h-100 justify-center">
      <LayoutProvider>
        <AuthProvider>
          <Header />
          <WeeklyAgendaCard />
        </AuthProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
