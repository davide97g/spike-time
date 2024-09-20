import { getFirestore } from "firebase-admin/firestore";
import {
  STReservation,
  STReservationAdmin,
} from "../../../../types/reservation.types";

export const createReservationAdmin = async (
  reservationAdmin: STReservationAdmin
): Promise<STReservationAdmin | null> => {
  if (!reservationAdmin.unavailable)
    throw new Error(
      "Create reservation [admin]: reservation should be unavaiable=true"
    );

  const db = getFirestore();

  await db
    .collection("reservations")
    .doc(reservationAdmin.id)
    .set(reservationAdmin);
  return reservationAdmin;
};

export const deleteReservationAdmin = async (reservationId: string) => {
  if (!reservationId)
    throw new Error("Delete Reservation: reservationId is required");

  const db = getFirestore();
  await db.collection("reservations").doc(reservationId).delete();
};

export const createReservation = async (
  reservation: STReservation,
  userId: string
): Promise<STReservation | null> => {
  if (!reservation.userId)
    throw new Error("Create Reservation: userId is required");
  if (reservation.userId !== userId)
    throw new Error("Create Reservation: reservation does not belong to user");

  const db = getFirestore();

  await db.collection("reservations").doc(reservation.id).set(reservation);
  return reservation;
};

export const deleteReservation = async (
  reservationId: string,
  userId: string
) => {
  if (!reservationId)
    throw new Error("Delete Reservation: reservationId is required");

  const reservation = await getReservationById(reservationId);

  if (!reservation)
    throw new Error("Delete Reservation: reservation not found");
  if (reservation.userId !== userId)
    throw new Error("Delete Reservation: reservation does not belong to user");

  const db = getFirestore();
  await db.collection("reservations").doc(reservationId).delete();
};

export const getReservationById = async (
  reservationId: string
): Promise<STReservation | null> => {
  if (!reservationId)
    throw new Error("Get Reservation: reservationId is required");

  try {
    const db = getFirestore();
    const reservation = await db
      .collection("reservations")
      .doc(reservationId)
      .get();

    return reservation.data() as STReservation;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const generateQuery = (
  query: FirebaseFirestore.CollectionReference,
  { userId, dates }: { userId?: string; dates?: string[] }
) => {
  if (userId && dates)
    return query.where("userId", "==", userId).where("date", "in", dates);
  else if (dates) return query.where("date", "in", dates);
  else if (userId) return query.where("userId", "==", userId);
  else return query;
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

    const baseQuery = db.collection("reservations");

    const query = generateQuery(baseQuery, { userId, dates });

    const querySnapshot = await query.limit(20).get();

    querySnapshot.forEach((doc) => {
      reservations.push(doc.data() as STReservation);
    });

    return reservations;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateReservation = async (
  newReservation: STReservation,
  userId: string
): Promise<STReservation | null> => {
  if (!newReservation.userId)
    throw new Error("Create Reservation: userId is required");

  const reservation = await getReservationById(newReservation.id);

  if (!reservation)
    throw new Error("Create Reservation: reservation not found");
  if (newReservation.id !== reservation.id)
    throw new Error("Create Reservation: reservation id does not match");
  if (newReservation.userId !== reservation.userId)
    throw new Error("Create Reservation: reservation userId does not match");
  if (reservation.userId !== userId || newReservation.userId !== userId)
    throw new Error("Create Reservation: reservation does not belong to user");

  const db = getFirestore();

  await db.collection("reservations").doc(reservation.id).set(newReservation);
  return reservation;
};
