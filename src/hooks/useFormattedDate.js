import { parseISO, format } from "date-fns";

const useFormattedDate = (isoDate) => {
  if (!isoDate) {
    return { formattedDate: "", formattedTime: "" };
  }

  try {
    const date = parseISO(isoDate);
    const formattedDate = format(date, "dd.MM.yyyy");
    const formattedTime = format(date, "HH:mm");
    return { formattedDate, formattedTime };
  } catch (error) {
    return { formattedDate: "", formattedTime: "" };
  }
};

export default useFormattedDate;
