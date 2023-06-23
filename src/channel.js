import getRandomMessage from "./messages.js";
import { waiverTime, log } from "./utils.js";

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
  }

  get disconnected() {
    return this.id === null;
  }

  // Ensure everything is reset
  disconnect() {
    log("Disconnecting Channel");
    this.clearTimer();
    this.id = null;
    this.usernames = [];
    this.timer = null;
    this.cb = (_n, _a)=> {};
    this.silent = true;
  }

  // If there's no timer, and the channel isn't silent
  // then start up a new timer now that a user is here
  addUser(user) {
    log(`Adding user ${user.name}`);
    this.usernames.push(user);
    log(`TOTAL USERS ${this.usernames.length}`)
    if (!this.timer && !this.silent) {
      this.startTimer();
    }
  }

  // When there's no one left in the channel, turn off the timer
  removeUser(user) {
    log(`Removing user ${user.name}`);
    this.usernames = this.usernames.filter((u)=> u.name !== user.name);

    if (this.usernames.length === 0) {
      this.clearTimer();
    }
  }

  // Returns `true` if the user is already in the channel
  hasUser(user) {
    return this.usernames.map((u) => u.name).includes(user.name);
  }

  silence() {
    log(`Silence channel`);
    this.clearTimer();
    this.silent = true;
  }

  resume() {
    log(`Resume channel`);
    this.silent = false;
    this.resetTimer();
  }

  // Clear the current timer and start a new one unless the channel is silent
  resetTimer() {
    log(`Resetting timer`);
    if (!this.silent) {
      this.clearTimer();
      this.startTimer();
    }
  }

  startTimer() {
    const runtime = 1000 * 60 * waiverTime();
    log(`Starting timer ${runtime}`);
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

  // clears the timer
  clearTimer() {
    log(`Clearing timer`);
    clearInterval(this.timer);
    this.timer = null;
  }
}
