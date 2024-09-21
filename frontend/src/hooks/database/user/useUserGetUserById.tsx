import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useUserGetUserById = (id?: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => API_AUTH.getUser({ userId: id! }),
    enabled: !!id,
  });
};
