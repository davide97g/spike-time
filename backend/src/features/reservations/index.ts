import {
  STReservation,
  STReservationAdmin,
} from "../../../../types/reservation.types";

export const createReservationAdmin = async (
  reservationAdmin: STReservationAdmin
): Promise<STReservationAdmin | null> => {
  return reservationAdmin;
};

export const deleteReservationAdmin = async (reservationId: string) => {
  console.log({ reservationId });
};

export const createReservation = async (
  reservation: STReservation
): Promise<STReservation | null> => {
  console.log({ reservation });
  return reservation;
};

export const deleteReservation = async (reservationId: string) => {
  console.log({ reservationId });
};

export const getReservationById = async (
  reservationId: string
): Promise<STReservation | null> => {
  return {
    id: "1",
    date: "2021-10-10",
    hourStart: 10,
    hourEnd: 11,
    userId: "1",
    unavailable: false,
  } as STReservation;
};

export const getReservations = async ({
  userId,
  dates,
}: {
  userId?: string;
  dates?: string[];
}): Promise<STReservation[]> => {
  return [
    {
      id: "1",
      date: "2021-10-10",
      hourStart: 10,
      hourEnd: 11,
      userId: "1",
      unavailable: false,
    },
  ] as STReservation[];
};
