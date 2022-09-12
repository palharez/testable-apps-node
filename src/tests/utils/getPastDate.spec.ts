import { expect, test } from "vitest";
import { getPastDate } from "./getPastDate";

test("decreases date with one year", () => {
  const year = new Date().getFullYear();

  expect(getPastDate(`${year}-08-10`).getFullYear()).toEqual(year - 1);
});
