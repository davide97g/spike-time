import { useReservationFindReservationsAdmin } from "@/hooks/database/reservations/useReservationFindReservationsAdmin";
import dayjs from "dayjs";

export default function Admin() {
  const { data: reservations } = useReservationFindReservationsAdmin({
    dates: [dayjs().add(1, "day").format("YYYY-MM-DD")],
  });

  console.log(reservations);
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}
