import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

export default function Dropdown({
  children,
  selectedValue,
  onChange,
}: {
  children: ReactNode;
  selectedValue?: string;
  onChange: (e: string) => void;
}) {
  console.log({ selectedValue });

  // const generateTimeOptions = () => {
  //   const options = [];
  //   for (let hour = 8; hour <= 23; hour++) {
  //     const time = `${hour.toString().padStart(2, "0")}:00`;
  //     options.push(
  //       <SelectItem key={time} value={time}>
  //         {time}
  //       </SelectItem>
  //     );
  //   }
  //   return options;
  // };

  const handleOnChange = (value: string) => {
    console.log({ value });
    onChange(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleOnChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleziona un orario">
          {selectedValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
        {/* <SelectGroup>{generateTimeOptions()}</SelectGroup> */}
      </SelectContent>
    </Select>
  );
}
