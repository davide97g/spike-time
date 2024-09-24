import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

type SlotType = "available" | "owned" | "reserved" | "unavailable" | "past";

interface AdaptiveButtonProps {
  day: string;
  hour: string;
  slotType: SlotType;
}

export function Slot({ day, hour, slotType }: Readonly<AdaptiveButtonProps>) {
  const isPast = dayjs(day).isBefore(dayjs(), "day");

  const buttonStyles: Record<SlotType, string> = {
    available: "bg-green-500 hover:bg-green-600 text-white",
    owned: "bg-blue-500 hover:bg-blue-600 text-white cursor-default",
    reserved: "bg-yellow-500 hover:bg-yellow-600 text-black",
    unavailable:
      "bg-gray-300 hover:bg-gray-400 text-gray-600 cursor-not-allowed",
    past: "bg-gray-200 text-gray-400 cursor-not-allowed",
  };

  const getButtonStyle = () => {
    if (isPast) return buttonStyles.past;
    return buttonStyles[slotType];
  };

  return (
    <Button
      disabled={isPast || slotType === "unavailable"}
      className={cn("h-10 w-full text-xs", getButtonStyle())}
      onClick={(e) => {
        if (slotType === "reserved" || slotType === "owned") e.preventDefault();
      }}
    >
      {hour}
    </Button>
  );
}
