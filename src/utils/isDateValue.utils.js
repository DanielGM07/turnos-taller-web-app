export function isDateValue(value) {
  const date = new Date(value);
  return !isNaN(date.getTime());
}
