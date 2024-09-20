import { getFirestore } from "firebase-admin/firestore";
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
  if (!reservation.userId)
    throw new Error("Create Reservation: userId is required");

  const db = getFirestore();

  await db.collection("reservations").doc(reservation.id).set(reservation);
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
}): Promise<STReservation[] | null> => {
  try {
    const db = getFirestore();
    const reservations: STReservation[] = [];

    const query = db.collection("reservations");

    if (userId) {
      query.where("userId", "==", userId);
    }

    if (dates) {
      query.where("date", "in", dates);
    }

    const querySnapshot = await query.get();

    querySnapshot.forEach((doc) => {
      reservations.push(doc.data() as STReservation);
    });

    return reservations;
  } catch (e) {
    console.error(e);
    return null;
  }
};
