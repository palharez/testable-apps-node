import { setYear, parseISO } from "date-fns";

/**
 * Receives "2022-08-10" and returns "2021-08-10"
 */
export function getPastDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() - 1);
}
