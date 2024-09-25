import { STReservation } from "types/reservation.types";

interface TimeOption {
  key: string;
  label: string;
}

export const generateTimeSlots = ({
  reservations,
}: {
  reservations: STReservation[];
}): TimeOption[] => {
  const options: TimeOption[] = [];
  for (let hour = 8; hour <= 23; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    if (reservations.every((r) => r.hourStart !== hour))
      options.push({
        key: time,
        label: time,
      });
  }
  return options;
};
