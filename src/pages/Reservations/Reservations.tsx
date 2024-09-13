import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import {
  CalendarIcon,
  Edit,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Mock data for reservations
const reservations = [
  {
    id: 1,
    date: "2023-06-15",
    startTime: "09:00",
    endTime: "11:00",
    slotsOccupied: 3,
  },
  {
    id: 2,
    date: "2023-06-16",
    startTime: "14:00",
    endTime: "16:00",
    slotsOccupied: 2,
  },
  {
    id: 3,
    date: "2023-07-17",
    startTime: "10:00",
    endTime: "12:00",
    slotsOccupied: 4,
  },
];

export function Reservations() {
  const [startDate, setStartDate] = useState("");
  const [showActive, setShowActive] = useState(true);

  const isReservationExpired = (date: string) => {
    const reservationDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return reservationDate < currentDate;
  };

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <h1 className="text-3xl font-bold mb-6">Reservations</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-[300px]">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <Input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-10"
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-end">
          <Toggle
            pressed={showActive}
            onPressedChange={setShowActive}
            aria-label="Toggle active reservations"
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
        {reservations.map((reservation) => {
          const isExpired = isReservationExpired(reservation.date);
          return (
            <Card
              key={reservation.id}
              className={`flex ${
                isExpired ? "border-orange-200" : "border-green-200"
              }`}
            >
              <div className="flex-shrink-0 w-16 bg-gray-100 flex items-center justify-center rounded-l-lg">
                <img src="logo.png" alt="Company logo" className="w-12 h-12" />
              </div>
              <CardContent className="flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{reservation.date}</p>
                    <p className="text-sm text-gray-600">
                      {reservation.startTime} - {reservation.endTime}
                    </p>
                  </div>
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
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">
                  Slots occupied: {reservation.slotsOccupied}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
