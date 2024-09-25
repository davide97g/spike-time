import { describe, it, expect } from "vitest";
import { generateTimeSlots } from "./generateTimeSlots";
import { STReservation } from "types/reservation.types";
import dayjs from "dayjs";

describe("generateTimeSlots", () => {
  it("should generate all time slots when there are no reservations", () => {
    const reservations: STReservation[] = [];
    const expectedTimeSlots = Array.from({ length: 16 }, (_, i) => {
      const hour = (i + 8).toString().padStart(2, "0");
      return { key: `${hour}:00`, label: `${hour}:00` };
    });

    const result = generateTimeSlots({ reservations });

    expect(result).toEqual(expectedTimeSlots);
  });

  it("should exclude time slots that have reservations", () => {
    const reservations: STReservation[] = [
      {
        id: "1",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        hourStart: 10,
        hourEnd: 11,
        userId: "1",
      },
      {
        id: "2",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        hourStart: 14,
        hourEnd: 15,
        userId: "2",
      },

      {
        id: "3",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        hourStart: 18,
        hourEnd: 19,
        userId: "3",
      },
    ];
    const expectedTimeSlots = Array.from({ length: 16 }, (_, i) => {
      const hour = (i + 8).toString().padStart(2, "0");
      return { key: `${hour}:00`, label: `${hour}:00` };
    }).filter(
      (slot) => ![10, 14, 18].includes(parseInt(slot.key.split(":")[0]))
    );

    const result = generateTimeSlots({ reservations });

    expect(result).toEqual(expectedTimeSlots);
  });

  it("should handle edge cases correctly", () => {
    const reservations: STReservation[] = [
      {
        id: "1",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        hourStart: 8,
        hourEnd: 9,
        userId: "1",
      },
      {
        id: "2",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        hourStart: 22,
        hourEnd: 23,
        userId: "2",
      },
    ];
    const expectedTimeSlots = Array.from({ length: 16 }, (_, i) => {
      const hour = (i + 8).toString().padStart(2, "0");
      return { key: `${hour}:00`, label: `${hour}:00` };
    }).filter((slot) => ![8, 22].includes(parseInt(slot.key.split(":")[0])));

    const result = generateTimeSlots({ reservations });

    expect(result).toEqual(expectedTimeSlots);
  });
});
