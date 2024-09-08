import { Button } from "@nextui-org/react";
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

  const variant = useMemo(() => {
    if (booked || busy) return "solid";
    else return "ghost";
  }, [booked, busy]);

  return (
    <Button
      disabled={disabled}
      isDisabled={disabled}
      style={{
        cursor: disabled || busy ? "default" : "pointer",
      }}
      color={color}
      variant={variant}
      onClick={onClick}
    >
      {String(hour).padStart(2, "0")}:00
    </Button>
  );
}
