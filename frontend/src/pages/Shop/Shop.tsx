import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export function Shop() {
  const { user } = useAuth();

  const handlePurchase = () => {
    if (!user) return;
    window.open(
      `https://buy.stripe.com/test_4gw1460C88AXeSk002?client_reference_id=${user?.id}`,
      "_blank"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Credit Shop</h1>
      <p className="text-md mb-2">
        Purchase credits to reserve slots for volleyball court. 1 credit = 1
        hour of reservation. You can purchase credits in packs of 1 / 5 / 10 or
        more.
      </p>
      <p className="text-md mb-8">
        Credits are non-refundable and do not expire. You can use them at any
        time. You can gain back credits by canceling reservations.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Current Credits</CardTitle>
          <CardDescription>Use these reserve slots.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p className="text-3xl font-bold">{user?.credits ?? 0} Credits</p>
            <Button size="lg" onClick={handlePurchase}>
              Buy Credits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
