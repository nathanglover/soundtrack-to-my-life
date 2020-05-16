export const isToday = (date) => {
  const today = new Date();
  return (
    today.getFullYear === date.getFullYear &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const getDateURLString = (date, offset = 0) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset)
    .toISOString()
    .split("T")[0];
};
