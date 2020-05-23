import { isToday, getDateURLString } from "../utils";

test("isToday === true", () => {
  expect(isToday(new Date())).toBe(true);
});

test("isToday === false", () => {
  expect(isToday(new Date(0))).toBe(false);
});

test("getUrlDateString offset = 0", () => {
  const dateString = getDateURLString(new Date(2020, 0, 2));
  expect(dateString).toBe('2020-01-02');
});

test("getUrlDateString offset = -1", () => {
  const dateString = getDateURLString(new Date(2020, 0, 2), -1);
  expect(dateString).toBe('2020-01-01');
});