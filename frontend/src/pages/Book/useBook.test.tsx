// @vitest-environment jsdom
import { createCustomProviderWrapper } from "@/test/utils";
import { renderHook } from "@testing-library/react-hooks";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import "../../test/mocks";
import { useBook } from "./useBook";
import dayjs from "dayjs";

// mock useReservationFindReservations
vitest.mock(
  "@/hooks/database/reservations/useReservationFindReservations",
  () => ({
    useReservationFindReservations: () => ({
      data: [
        {
          id: "1",
          date: "2022-01-01",
          hourStart: 10,
          hourEnd: 11,
          userId: "1",
        },
        {
          id: "2",
          date: dayjs().add(1, "day").format("YYYY-MM-DD"),
          hourStart: 10,
          hourEnd: 11,
          userId: "1",
        },
        {
          id: "3",
          date: dayjs().add(1, "day").format("YYYY-MM-DD"),
          hourStart: 11,
          hourEnd: 12,
          userId: "2",
        },
        {
          id: "4",
          date: dayjs().add(1, "day").format("YYYY-MM-DD"),
          hourStart: 12,
          hourEnd: 13,
          unavailable: true,
          userId: "1",
        },
      ],
      isFetching: false,
      refetch: vitest.fn(),
    }),
  })
);

vitest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "1", credits: 1 },
    isAdmin: false,
    isLogged: true,
    refetch: vitest.fn(),
  }),
}));

// mock getAuth
describe("useBook", () => {
  describe("getSlotType", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should return 'past' if slot is before now", () => {
      // render a component that uses useBook
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      // test implementation here
      const slotType = result.current.getSlotType("2022-01-01", 10);
      expect(slotType).toBe("past");
    });
    it("should return 'reserved' if there is a reservation overlapping", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(1, "day").format("YYYY-MM-DD"),
        11
      );
      expect(slotType).toBe("reserved");
    });
    it("should return 'available' if there is a no overlapping + no disable + in the future", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(2, "day").format("YYYY-MM-DD"),
        10
      );
      expect(slotType).toBe("available");
    });
    it("should return 'unavailable' if there is a overlapping with a disable slot", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(1, "day").format("YYYY-MM-DD"),
        12
      );
      expect(slotType).toBe("unavailable");
    });
    it("should return 'owned' if the slot is in the future and the user id matches", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(1, "day").format("YYYY-MM-DD"),
        10
      );
      expect(slotType).toBe("owned");
    });
    it("should return 'reserved' if the slot is in the future and the user id not matches", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(1, "day").format("YYYY-MM-DD"),
        11
      );
      expect(slotType).toBe("reserved");
    });
    it("should return 'unavailable' if the slot is in the future and it's a disabled slot", () => {
      // test implementation here
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });
      const slotType = result.current.getSlotType(
        dayjs().add(1, "day").format("YYYY-MM-DD"),
        12
      );
      expect(slotType).toBe("unavailable");
    });
  });
});
