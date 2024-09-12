import { useAuth } from "@/hooks/useAuth";
import { Button } from "../../ui/button";
import { AUTH } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { isLogged, user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col align-center h-100 justify-center p-2">
      <h1 className="text-3xl font-bold underline m-4">Spike Time</h1>
      <div className="flex flex-row justify-center items-center gap-2 p-2">
        {isLogged && <p>Welcome, {user?.displayName}</p>}
        {!isLogged && (
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        )}
        {isLogged && <Button onClick={() => AUTH.logout()}>Sign Out</Button>}
      </div>
    </div>
  );
}
