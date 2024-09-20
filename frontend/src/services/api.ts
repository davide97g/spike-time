import { getToken } from "firebase/app-check";
import { appCheck, auth } from "../config/firebase";
import { STReservation, STReservationAdmin } from "types/reservation.types";

const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:3000";

export const API = {
  getReservation: async ({ reservationId }: { reservationId: string }) => {
    return fetch(`${BACKEND_URL}/reservation/${reservationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (res as { reservation: STReservation }).reservation)
      .catch((err) => {
        console.info(err);
        return undefined;
      });
  },
  //   getPokemons: async ({ gen, name }: { gen: GENERATION; name: string }) => {
  //     const cleanName = name.trim();
  //     const nameQuery = cleanName ? `?name=${cleanName}` : "";
  //     return fetch(`${BACKEND_URL}/pokemon/${gen}${nameQuery}`)
  //       .then((res) => res.json())
  //       .then((res) => res as PokemonSummary[])
  //       .catch((err) => {
  //         console.info(err);
  //         return [] as PokemonSummary[];
  //       });
  //   },
  //   sendGuessPokemonId: async (
  //     pokemonId: number,
  //     gen: GENERATION,
  //     guessValidationHistory: PokemonValidationGuess[]
  //   ) => {
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     return fetch(`${BACKEND_URL}/guess-pokemon/${pokemonId}/${gen}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(idToken && { Authorization: `Bearer ${idToken}` }),
  //       },
  //       body: JSON.stringify(guessValidationHistory),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (res) =>
  //           res as {
  //             validation: PokemonValidationGuess;
  //             remainingPokemon: number;
  //           }
  //       );
  //   },
};

export const API_AUTH = {
  getReservations: async ({
    userId,
    dates,
  }: {
    userId?: string;
    dates?: string[];
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse || !idToken) return null;
    const query = new URL(`${BACKEND_URL}/reservations`);
    if (userId) query.searchParams.append("userId", userId);
    if (dates)
      dates.forEach((date) => query.searchParams.append("dates", date));

    return fetch(query.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.reservations as STReservation[])
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  createReservation: async ({
    reservation,
  }: {
    reservation: STReservation;
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(reservation),
    })
      .then((res) => res.json())
      .then((res) => res.reservation as STReservation)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  updateReservation: async ({
    reservation,
  }: {
    reservation: STReservation;
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/reservation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(reservation),
    })
      .then((res) => res.json())
      .then((res) => res.reservation as STReservation)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  deleteReservation: async ({ reservationId }: { reservationId: string }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/reservation/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.message as string)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
};

export const API_ADMIN = {
  createReservationAdmin: async ({
    reservationAdmin,
  }: {
    reservationAdmin: STReservationAdmin;
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/reservation/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(reservationAdmin),
    })
      .then((res) => res.json())
      .then((res) => res.reservationAdmin as STReservationAdmin)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
  deleteReservationAdmin: async ({
    reservationId,
  }: {
    reservationId: string;
  }) => {
    const appCheckTokenResponse = await getToken(appCheck, true).catch(
      (err) => {
        console.info(err);
        return null;
      }
    );
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });
    if (!appCheckTokenResponse?.token || !idToken) return null;
    return fetch(`${BACKEND_URL}/reservation/admin/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": appCheckTokenResponse.token,
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.message as string)
      .catch((err) => {
        console.info(err);
        return null;
      });
  },
};
