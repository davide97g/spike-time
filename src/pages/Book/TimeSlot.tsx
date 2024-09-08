import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export function TimeSlot({
  hour,
  disabled = false,
  busy = false,
  booked = false,
  onClick,
}: {
  hour: number;
  disabled?: boolean;
  busy?: boolean;
  booked?: boolean;
  onClick: () => void;
}) {
  const color = useMemo(() => {
    if (disabled) {
      return "default";
    } else if (busy) {
      return "default";
    } else if (booked) {
      return "primary";
    } else {
      return "default";
    }
  }, [booked, busy, disabled]);

  return (
    <Button
      disabled={disabled}
      style={{
        cursor: disabled || busy ? "default" : "pointer",
      }}
      color={color}
      onClick={onClick}
    >
      {String(hour).padStart(2, "0")}:00
    </Button>
  );
}
