type HouseHours = {
  zone: string;
  days: number[];
  opens: string;
  closes: string;
};

const WEEKDAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function minutes(value: string) {
  const [hours, mins] = value.split(":").map(Number);
  return hours * 60 + mins;
}

export function zonedNow(zone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = read("weekday");
  return {
    day: WEEKDAYS[weekday] ?? 0,
    clock: `${read("hour")}:${read("minute")}`,
    weekday,
    minutes: minutes(`${read("hour")}:${read("minute")}`),
  };
}

export function boutiqueOpen(house: HouseHours, date = new Date()) {
  const now = zonedNow(house.zone, date);
  if (!house.days.includes(now.day)) return false;
  return now.minutes >= minutes(house.opens) && now.minutes < minutes(house.closes);
}
