import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useReservationFindReservations = ({
  dates,
  userId,
  enabled = true,
}: Readonly<{ dates?: string[]; userId?: string; enabled?: boolean }>) => {
  return useQuery({
    queryKey: ["reservations", dates?.join("-") ?? "-", userId],
    queryFn: async () => API_AUTH.getReservations({ dates, userId }),
    enabled,
  });
};
