export interface STReservation {
  id: string; // UUID
  date: string; // YYYY-MM-DD
  hourStart: number; // 24h
  hourEnd: number; // 24h
  userId?: string;
  unavailable?: boolean;
}
