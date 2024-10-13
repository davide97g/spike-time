import { getFirestore } from "firebase-admin/firestore";
import {
  STReservation,
  STReservationAdmin,
} from "../../../../types/reservation.types";
import { ApiError, createApiError } from "../../types/error";
import { decrementCredit, incrementCredits } from "../credits";
import { STUserRecap } from "../../../../types/user.types";

export const createReservationAdmin = async (
  reservationAdmin: STReservation
): Promise<STReservation | null> => {
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
  await incrementCredits({ userId });
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

const getReservationByDateTime = async (
  date: string,
  hourStart: number
): Promise<STReservation | null> => {
  try {
    const db = getFirestore();
    const reservations: STReservation[] = [];

    const querySnapshot = await db
      .collection("reservations")
      .where("date", "==", date)
      .where("hourStart", "==", hourStart)
      .limit(1)
      .get();

    querySnapshot.forEach((doc) => {
      reservations.push(doc.data() as STReservation);
    });

    return reservations[0];
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

export const getReservationsAdmin = async ({
  userId,
  dates,
}: {
  userId?: string;
  dates?: string[];
}): Promise<STReservationAdmin[] | ApiError> => {
  try {
    const db = getFirestore();
    const reservations: STReservation[] = [];

    const baseQuery = db.collection("reservations");

    const query = generateQuery(baseQuery, { userId, dates });

    const querySnapshot = await query.limit(20).get();

    querySnapshot.forEach((doc) => {
      reservations.push(doc.data() as STReservation);
    });

    const userIdList = reservations
      .filter((res) => !!res.userId)
      .map((reservation) => reservation.userId!);

    const usersSnapshot = await db.getAll(
      ...userIdList.map((uId) => db.collection("users").doc(uId))
    );

    const users = usersSnapshot.map((user) => user.data() as STUserRecap);

    const reservationsAdmin: STReservationAdmin[] = reservations
      .map((reservation) => {
        const userFound = users.find((user) => user.id === reservation.userId);
        if (!userFound) return null;
        return {
          ...reservation,
          user: {
            id: userFound?.id,
            displayName: userFound?.displayName,
            photoURL: userFound?.photoURL,
            email: userFound?.email,
          },
        };
      })
      .filter((reservation) => reservation !== null) as STReservationAdmin[];

    return reservationsAdmin;
  } catch (e) {
    console.error(e);
    return createApiError(
      "Get Reservation: error fetching reservations",
      "get-reservations-admin",
      500
    );
  }
};

export const createReservation = async (
  reservation: STReservation,
  userId: string
): Promise<STReservation | ApiError> => {
  if (!reservation.userId)
    return createApiError(
      "Create Reservation: userId is required",
      "create-reservation",
      400
    );
  if (reservation.userId !== userId)
    return createApiError(
      "Create Reservation: reservation does not belong to user",
      "create-reservation",
      403
    );

  const reservationExists = await getReservationByDateTime(
    reservation.date,
    reservation.hourStart
  );

  if (reservationExists && reservationExists.unavailable)
    return createApiError(
      "Create Reservation: slot unavailable",
      "create-reservation",
      400
    );
  if (reservationExists && !reservationExists.unavailable)
    return createApiError(
      "Create Reservation: slot already reserved",
      "create-reservation",
      400
    );

  const db = getFirestore();

  await db.collection("reservations").doc(reservation.id).set(reservation);

  await decrementCredit({ userId });
  return reservation;
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

  const reservationExists = await getReservationByDateTime(
    newReservation.date,
    newReservation.hourStart
  );

  if (reservationExists && reservationExists.unavailable)
    throw new Error("Create Reservation: slot unavailable");
  if (reservationExists && reservationExists.id !== newReservation.id)
    throw new Error("Create Reservation: slot already reserved");

  const db = getFirestore();

  await db.collection("reservations").doc(reservation.id).set(newReservation);
  return reservation;
};
