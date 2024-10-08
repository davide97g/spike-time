export const getDayLabel = (day: string): string | undefined => {
  const infoDay = day.split(" ");

  switch (infoDay[0]) {
    case "Mon":
      return `Lunedì ${infoDay[1]}`;
    case "Tue":
      return `Martedi ${infoDay[1]}`;
    case "Wed":
      return `Mercoledi ${infoDay[1]}`;
    case "Thu":
      return `Giovedi ${infoDay[1]}`;
    case "Fri":
      return `Venerdi ${infoDay[1]}`;
    case "Sat":
      return `Sabato ${infoDay[1]}`;
    case "Sun":
      return `Domenica ${infoDay[1]}`;
    default:
      return undefined;
  }
};

export const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export const SIZE_SCROLLING_DAYS = 1;
