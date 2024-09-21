import { API_ADMIN } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useReservationFindReservationsAdmin = ({
  dates,
  userId,
  enabled = true,
}: Readonly<{ dates?: string[]; userId?: string; enabled?: boolean }>) => {
  return useQuery({
    queryKey: ["reservations-admin", dates?.join("-") ?? "-", userId],
    queryFn: async () => API_ADMIN.getReservationsAdmin({ dates, userId }),
    enabled,
  });
};
