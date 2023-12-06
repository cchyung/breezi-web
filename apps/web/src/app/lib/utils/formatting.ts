const timeDifference = (start: Date, end: Date) => {
  if (!(start && end) || start > end) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let diff = Math.abs(end.getTime() - start.getTime()) / 1000;

  const secondsPerDay = 60 * 60 * 24;
  const days = Math.floor(diff / secondsPerDay);
  diff -= days * secondsPerDay;

  const secondsPerHour = 60 * 60;
  const hours = Math.floor(diff / secondsPerHour) % 24;
  diff -= hours * secondsPerHour;

  const secondsPerMinute = 60;
  const minutes = Math.floor(diff / secondsPerMinute) % 60;
  diff -= minutes * secondsPerMinute;

  const seconds = Math.floor(diff % 60);

  return { days, hours, minutes, seconds };
};

export const formatTime = (start: Date, end: Date, shorten = false) => {
  const remainingTime = timeDifference(start, end);

  if (remainingTime.days > 0) {
    const label = remainingTime.days === 1 ? "day" : "days";
    return `${remainingTime.days} ${label}`;
  }
  if (remainingTime.hours > 0) {
    const label = remainingTime.hours === 1 ? "hour" : "hours";
    return `${remainingTime.hours} ${label}`;
  }
  if (remainingTime.minutes > 0) {
    let label = shorten ? "min" : "minute";
    if (remainingTime.minutes > 1) label = `${label}s`;
    return `${remainingTime.minutes} ${label}`;
  }
  if (remainingTime.seconds > 0) {
    let label = shorten ? "s" : " second";
    if (remainingTime.seconds > 1 && !shorten) label = `${label}s`;
    return `${remainingTime.seconds}${label}`;
  }
  return null;
};
