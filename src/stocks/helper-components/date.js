import { parse, format } from "date-fns";

export function RFtoDateFormatter(rfDate) {
  // to convert timestamp date format to extended date format
  const parsed = parse(rfDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z", new Date());
  return parsed;
}

export function DateFormatter(dateObject) {
  //used to display dates in dd/MM/YYYY format
  const result = format(dateObject, "dd/MM/YYY");
  return result;
}
