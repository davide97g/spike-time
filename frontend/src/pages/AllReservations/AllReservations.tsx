import { DatePicker } from "@/components/custom/DatePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import dayjs from "dayjs";
import { Share, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderReservations } from "../Reservations/LoaderReservations";
import { useAllReservations } from "./useAllReservations";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export function AllReservations() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [showActive, setShowActive] = useState(true);

  const { reservations, isLoading, getReservationStatus } = useAllReservations({
    startDate,
  });

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <h1 className="text-xl font-bold mb-6">Search Reservations</h1>

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

                      <div className="flex items-center space-x-2">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={reservation.user.photoURL}
                          alt="User"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-600">
                            {reservation.user.displayName}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(`mailto:${reservation.user.email}`)
                            }
                          >
                            <EnvelopeClosedIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {status === "active" && (
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Edit reservation"
                            onClick={() =>
                              navigate(`/share-reservation/${reservation.id}`)
                            }
                          >
                            <Share className="h-4 w-4" />
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
