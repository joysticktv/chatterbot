// return a random time length. This is number of minutes
export function waiverTime() {
  const times = [2.5, 3.0, 3.25, 3.5, 3.75, 4, 4.5, 5, 7, 10];
  return times[Math.floor(Math.random() * times.length)];
}
