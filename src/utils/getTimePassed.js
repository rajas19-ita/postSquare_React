export default function getTimePassed(createdAt) {
  const from = new Date(createdAt);
  const now = Date.now();
  const diff = now - from;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "just now";
  } else if (diff < hour) {
    const minutesPassed = Math.floor(diff / minute);
    return `${minutesPassed}m`;
  } else if (diff < day) {
    const hoursPassed = Math.floor(diff / hour);
    return `${hoursPassed}h`;
  } else {
    const daysPassed = Math.floor(diff / day);
    return `${daysPassed}d`;
  }
}
