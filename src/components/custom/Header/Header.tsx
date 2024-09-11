import { useAuth } from "@/hooks/useAuth";
import { Button } from "../../ui/button";
import { AUTH } from "@/services/auth";

export function Header() {
  const { isLogged, user } = useAuth();
  return (
    <div className="flex flex-col align-center h-100 justify-center p-2">
      <h1 className="text-3xl font-bold underline m-4">Spike Time</h1>
      <div className="flex flex-row justify-center items-center gap-2 p-2">
        {isLogged && <p>Welcome, {user?.displayName}</p>}
        {!isLogged && <Button onClick={() => AUTH.login()}>Sign In</Button>}
        {isLogged && <Button onClick={() => AUTH.logout()}>Sign Out</Button>}
      </div>
    </div>
  );
}
