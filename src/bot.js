import getRandomMessage from "./messages.js";
const gatewayIdentifier = JSON.stringify({channel: "GatewayChannel"});

// return a random time length. This is number of minutes
const waiverTime = ()=> {
  const times = [1.5, 2.0, 2.25, 2.5, 2.75, 3, 3.5, 4];
  return times[Math.floor(Math.random() * times.length)];
}

class Channel {
  id;
  usernames;
  timer;
  cb;
  constructor(id, cb) {
    this.id = id;
    this.usernames = [];
    this.timer = null;
    this.cb = cb;
    this.startTimer();
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

  resetTimer() {
    this.clearTimer();
    this.startTimer();
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

      const response = {
        command: "message",
        identifier: gatewayIdentifier,
        data: JSON.stringify({
          action: "send_message",
          text: randomMessage,
          channelId: this.id,
        })
      };
      this.cb(response);
    }, runtime);
  }

  clearTimer() {
    console.log("Clearing timer")
    clearInterval(this.timer);
    this.timer = null;
  }
}

const Bot = {
  channels: [],
  handleMessage: (ws, receivedMessage)=> {
    if (receivedMessage.type === "ping") { return; }

    if (receivedMessage.message) {
      const message = receivedMessage.message;
      const channelId = message.channelId;
      let channel = Bot.channels.find((c)=> c.id === channelId);
      let user;

      switch(message.type) {
        case "started":
          if (!channel) {
            channel = new Channel(channelId, (response)=> {
              ws.send(JSON.stringify(response));
            });
            Bot.channels.push(channel);
          }
          break;
        case "ended":
          Bot.channels = Bot.channels.filter((c)=> c.id !== channelId);
          break;
        case "new_message":
          if (channel) {
            channel.resetTimer();
          }
          break;
        case "enter_stream":
          if (channel) {
            user = {name: message.text, id: channelId};
            if (!channel.hasUser(user)) {
              channel.addUser(user);
            }
          }

          break;
        case "leave_stream":
          if (channel) {
            user = {name: message.text, id: channelId};
            if (channel.hasUser(user)) {
              channel.removeUser(user);
            }
          }

          break;
      }
    }
  }
};

export default Bot;
