import getRandomMessage from "./messages.js";
import { waiverTime } from "./utils.js";

export default class Channel {
  id;
  usernames;
  timer;
  cb;
  silent;
  constructor(id, cb) {
    this.id = id;
    this.usernames = [];
    this.timer = null;
    this.cb = cb;
    this.silent = false;
    this.startTimer();
  }

  get disconnected() {
    return this.id === null;
  }

  // Ensure everything is reset
  disconnect() {
    this.clearTimer();
    this.id = null;
    this.usernames = [];
    this.timer = null;
    this.cb = (_n, _a)=> {};
    this.silent = true;
  }

  addUser(user) {
    this.usernames.push(user);
  }

  removeUser(user) {
    this.usernames = this.usernames.filter((u)=> u.name !== user.name);
  }

  hasUser(user) {
    return this.usernames.map((u) => u.name).includes(user.name);
  }

  silence() {
    this.clearTimer();
    this.silent = true;
  }

  resume() {
    this.silent = false;
    this.resetTimer();
  }

  resetTimer() {
    if (!this.silent) {
      this.clearTimer();
      this.startTimer();
    }
  }

  startTimer() {
    const runtime = 1000 * 60 * waiverTime();
    console.log("Starting timer", runtime)
    this.timer = setInterval(()=> {
      const user = this.usernames[Math.floor(Math.random() * this.usernames.length)];
      let randomMessage;
      if (user) {
        randomMessage = getRandomMessage(user.name);
      } else {
        randomMessage = getRandomMessage();
      }

      this.cb(randomMessage, this.id);
    }, runtime);
  }

  clearTimer() {
    console.log("Clearing timer")
    clearInterval(this.timer);
    this.timer = null;
  }
}
