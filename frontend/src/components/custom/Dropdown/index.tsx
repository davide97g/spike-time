import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dropdown({
  options,
  selectedValue,
  onChange,
  label,
  placeholder,
}: Readonly<{
  options: { key: string; label: string }[];
  selectedValue?: string;
  onChange: (e: string) => void;
  label?: string;
  placeholder?: string;
}>) {
  const handleOnChange = (value: string) => {
    console.log({ value });
    onChange(value);
  };

  console.log({ selectedValue, options });

  return (
    <Select onValueChange={handleOnChange} defaultValue={selectedValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder ?? ""} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem value={option.key} key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
