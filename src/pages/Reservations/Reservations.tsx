import { DatePicker } from "@/components/custom/DatePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import dayjs from "dayjs";
import { Edit, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { LoaderReservations } from "./LoaderReservations";
import { useReservations } from "./useReservations";
import { useAuth } from "@/hooks/useAuth";

export function Reservations() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [showActive, setShowActive] = useState(true);
  const { user, refetch: refetchUser } = useAuth();

  const {
    reservations,
    getReservationStatus,
    isLoading,
    deleteReservation,
    refetch,
    updateUser,
  } = useReservations({
    startDate,
  });

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <h1 className="text-xl font-bold mb-6">Reservations</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-[300px]">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <DatePicker selectedDate={startDate} onSelect={setStartDate} />
          </div>
        </div>
        <div className="flex items-end">
          <Toggle
            pressed={showActive}
            onPressedChange={setShowActive}
            aria-label="Toggle active reservations"
            disabled
          >
            {showActive ? (
              <>
                <ToggleRight className="h-4 w-4 mr-2" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4 mr-2" />
                Expired
              </>
            )}
          </Toggle>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <LoaderReservations />
        ) : (
          reservations
            ?.sort((rA, rB) => {
              return dayjs(rA.date)
                .hour(rA.hourStart)
                .isBefore(dayjs(rB.date).hour(rB.hourStart))
                ? 1
                : -1;
            })
            ?.map((reservation) => {
              const status = getReservationStatus(reservation);

              return (
                <Card
                  key={reservation.id}
                  className={`flex ${
                    status === "expired" ? "border-red-200" : ""
                  } ${status === "locked" ? "border-orange-200" : ""}
                  ${status === "active" ? "border-green-200" : ""}
                  `}
                >
                  <div className="flex-shrink-0 w-16 bg-gray-100 flex items-center justify-center rounded-l-xl">
                    <img
                      src="logo.png"
                      alt="Company logo"
                      className="w-12 h-12"
                    />
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">
                          {dayjs(reservation.date).format("DD/MM/YYYY")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {`${reservation.hourStart}:00`} -{" "}
                          {`${reservation.hourEnd}:00`}
                        </p>
                      </div>
                      {status === "active" && (
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Edit reservation"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete reservation"
                            onClick={() =>
                              deleteReservation(reservation)
                                .then(() =>
                                  updateUser({
                                    id: reservation.userId,
                                    credits: (user?.credits ?? 0) + 1,
                                  }).finally(() => refetchUser())
                                )
                                .finally(() => refetch())
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {status !== "active" && (
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              status === "expired" ? "destructive" : "secondary"
                            }
                          >
                            {status === "expired" ? "Expired" : "Locked"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
}
