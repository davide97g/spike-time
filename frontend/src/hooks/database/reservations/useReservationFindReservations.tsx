import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useReservationFindReservations = ({
  dates,
  userId,
}: Readonly<{ dates?: string[]; userId?: string }>) => {
  return useQuery({
    queryKey: ["reservations", dates?.join("-") ?? "-", userId],
    queryFn: async () => API_AUTH.getReservations({ dates, userId }),
  });
};
