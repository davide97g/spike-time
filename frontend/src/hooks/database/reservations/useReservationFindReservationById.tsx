import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useReservationFindReservationById = ({
  id,
}: Readonly<{ id?: string }>) => {
  return useQuery({
    queryKey: ["reservations", id],
    queryFn: async () => API.getReservation({ reservationId: id! }),
    enabled: !!id,
  });
};
