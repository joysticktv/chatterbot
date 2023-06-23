import * as dotenv from "dotenv";
dotenv.config();

// return a random time length. This is number of minutes
export function waiverTime() {
  let times;
  if (process.env.NODE_ENV === "development") {
    times = [1, 2, 3];
  } else {
    times = [5, 5.5, 6, 7, 8, 10, 12.5, 15];
  }

  return times[Math.floor(Math.random() * times.length)];
}

export function log(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}
