import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { AUTH } from "@/services/auth";
import { LogOut } from "lucide-react";
import packageJson from "../../../package.json";
import { Footer } from "@/components/custom/Footer/Footer";

export function PersonalArea() {
  const { user, isAdmin } = useAuth();
  const handleSignOut = () => AUTH.logout();

  return (
    <>
      <Card className="w-[350px] my-12 mx-auto text-left">
        <CardHeader>
          <CardTitle>Personal Area</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Username
              </p>
              <p className="text-lg font-semibold">{user?.displayName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                User Type
              </p>
              <Badge
                variant={isAdmin ? "default" : "secondary"}
                className="mt-1"
              >
                {" "}
                {isAdmin ? "Admin" : "Normal"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Credits
              </p>
              <p className="text-lg font-semibold">{user?.credits ?? 0}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            App Version: {packageJson.version}
          </p>
        </CardFooter>
      </Card>
      <Footer />
    </>
  );
}
