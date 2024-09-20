import { STUserRecap } from "./user.types";

export interface STReservation {
  id: string; // UUID
  date: string; // YYYY-MM-DD
  hourStart: number; // 24h
  hourEnd: number; // 24h
  userId?: string;
  unavailable?: boolean;
}

export interface STReservationAdmin {
  id: string; // UUID
  user: STUserRecap; // User object only for admin
  date: string; // YYYY-MM-DD
  hourStart: number; // 24h
  hourEnd: number; // 24h
  unavailable?: boolean;
}
