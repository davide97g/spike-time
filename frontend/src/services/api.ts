import { getToken } from "firebase/app-check";
import { appCheck, auth } from "../config/firebase";
import { STReservation } from "types/reservation.types";

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
  //   getCheckoutSession: async (id: string) => {
  //     const appCheckTokenResponse = await getToken(appCheck, true).catch(
  //       (err) => {
  //         console.info(err);
  //         return null;
  //       }
  //     );
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     if (!appCheckTokenResponse || !idToken) return null;
  //     return fetch(`${BACKEND_URL}/checkout-session/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Firebase-AppCheck": appCheckTokenResponse.token,
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (res) =>
  //           res as {
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //             lineItems: any;
  //           }
  //       )
  //       .catch((err) => {
  //         console.info(err);
  //         return null;
  //       });
  //   },
  //   getOrderHistory: async ({
  //     checkoutSessionIdList,
  //   }: {
  //     checkoutSessionIdList: string[];
  //   }) => {
  //     const appCheckTokenResponse = await getToken(appCheck, true).catch(
  //       (err) => {
  //         console.info(err);
  //         return null;
  //       }
  //     );
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     if (!appCheckTokenResponse || !idToken) return null;
  //     return fetch(`${BACKEND_URL}/order/history`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Firebase-AppCheck": appCheckTokenResponse.token,
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //       body: JSON.stringify(checkoutSessionIdList),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (res) =>
  //           res as {
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //             history: any[];
  //           }
  //       )
  //       .catch((err) => {
  //         console.info(err);
  //         return null;
  //       });
  //   },
  //   newPokemon: async () => {
  //     const appCheckTokenResponse = await getToken(appCheck, true).catch(
  //       (err) => {
  //         console.info(err);
  //         return null;
  //       }
  //     );
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     if (!appCheckTokenResponse?.token || !idToken) return null;
  //     return fetch(`${BACKEND_URL}/new-pokemon/personal`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Firebase-AppCheck": appCheckTokenResponse.token,
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (res) =>
  //           res as {
  //             message: string;
  //           }
  //       )
  //       .catch((err) => {
  //         console.info(err);
  //         return null;
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
  //     if (!auth.currentUser?.uid) return null;
  //     return fetch(
  //       `${BACKEND_URL}/guess-pokemon/${auth.currentUser.uid}/${pokemonId}/${gen}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           ...(idToken && { Authorization: `Bearer ${idToken}` }),
  //         },
  //         body: JSON.stringify(guessValidationHistory),
  //       }
  //     )
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

export const API_ADMIN = {
  //   getDayStats: async () => {
  //     const appCheckTokenResponse = await getToken(appCheck, true).catch(
  //       (err) => {
  //         console.info(err);
  //         return null;
  //       }
  //     );
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     if (!appCheckTokenResponse?.token || !idToken) return null;
  //     return fetch(`${BACKEND_URL}/day-stats`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Firebase-AppCheck": appCheckTokenResponse.token,
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (res) =>
  //           res as {
  //             pokemonDayStats: PokedleDayStats;
  //           }
  //       )
  //       .catch((err) => {
  //         console.info(err);
  //         return null;
  //       });
  //   },
  //   newPokemon: async () => {
  //     const appCheckTokenResponse = await getToken(appCheck, true).catch(
  //       (err) => {
  //         console.info(err);
  //         return null;
  //       }
  //     );
  //     const idToken = await auth.currentUser?.getIdToken().catch((err) => {
  //       console.info(err);
  //       return null;
  //     });
  //     if (!appCheckTokenResponse?.token || !idToken) return null;
  //     return fetch(`${BACKEND_URL}/new-pokemon`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Firebase-AppCheck": appCheckTokenResponse.token,
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => res.pokemonDayStats as PokedleDayStats)
  //       .catch((err) => {
  //         console.info(err);
  //         return null;
  //       });
  //   },
};
