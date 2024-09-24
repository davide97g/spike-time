// @vitest-environment jsdom
import { createCustomProviderWrapper } from "@/test/utils";
import { renderHook } from "@testing-library/react-hooks";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import "../../test/mocks";
import { useBook } from "./useBook";

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
      ],
      isFetching: false,
      refetch: vitest.fn(),
    }),
  })
);

// mock getAuth
describe("useBook", () => {
  describe("getSlotType", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should return 'past' if date+hour is before now ", () => {
      // render a component that uses useBook
      const { result } = renderHook(() => useBook(), {
        wrapper: createCustomProviderWrapper(),
      });

      // test implementation here
      const slotType = result.current.getSlotType("2022-01-01", 10);
      expect(slotType).toBe("past");
    });
    it("should return 'reserved' if there is a reservation", () => {
      // test implementation here
    });
  });
});
