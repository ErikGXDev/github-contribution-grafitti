// place files you want to import through the `$lib` alias in this folder.

export function getFormattedDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-us", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function generateDateWithWeekday(weekday: string) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Validate the input weekday
  if (!daysOfWeek.includes(weekday)) {
    throw new Error('Invalid weekday input. Please provide a valid weekday name (e.g., "Monday").');
  }

  const targetWeekdayIndex = daysOfWeek.indexOf(weekday);

  // Create a date for January 1, 1901
  const date = new Date(1901, 0, 1);

  // Calculate the difference in days between the target weekday and the actual weekday of January 1, 1901
  const currentWeekdayIndex = date.getDay();
  const dayDifference = (targetWeekdayIndex + 7 - currentWeekdayIndex) % 7;

  // Add the calculated number of days to the date to match the target weekday
  date.setDate(date.getDate() + dayDifference);

  return date;
}
