const gatewayIdentifier = JSON.stringify({channel: "GatewayChannel"});

// return a random time length. This is number of minutes
const waiverTime = ()=> {
  const times = [1.5, 2.0, 2.25, 2.5, 2.75, 3, 3.5, 4];
  return times[Math.floor(Math.random() * times.length)];
}

const getRandomMessage = (username)=> {
  // TODO: Handle this better when there's no one in chat
  username = username || "chatterbot";
  const messages = [
    `Hey @${username}, you're legitimately funky! 🕺`,
    `Hey @${username}, you're really hot! 🌶️`,
    `It's quiet... too quiet...`,
    `Don't mind me, just listening to "The Sound of Silence". Both Simon & Garfunkel, and Distrubed versions.`,
    `Who else is loving this stream? Show your support with a !tip 1`,
    `Did you know you can see how long a stream has been going by typing '!uptime'?`,
    `💀`,
    `How many Lowe's could Rob Lowe rob if Rob Lowe could rob Lowe's? 🤔`,
    `Psstt.. @${username}... got any good jokes to share?`,
    `What is everyone up to this weekend?`,
    `I'm loving this stream ❤️ ❤️ ❤️. What do you think, @${username}?`,
    `ProTip: Use the !social command to see their links.`,
    `If you don't follow, now is a great time.`,
    `Did you know spit backwards is tips? Speaking of tips, they're a great way to show your support.`,
    `I talk more when it's quiet.`,
    `What's the weather like where you live?`,
    `Anyone watch any good movies or shows lately?`,
    `I think @${username} is cute, but don't tell them I said so 🤫, I'm shy 🫣`,
    `Subscribers get to use the !giphy command. Someone give it a shot and see what funny gifs come up.`,
    `Did you know you can gift subscriptions to others? It makes a great birthday gift!`,
    `Toy boat toy boat toy boat... it's harder than it looks`,
    `What's your favorite prime number?`,
    `I'm afraid for the calendar. Its days are numbered.`,
    `Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.`,
    `I only know 25 letters of the alphabet. I don't know y.`,
    `What did one wall say to the other?" "I'll meet you at the corner.`,
    `I think you were right about that one thing, @${username}. I can totally see it now.`,
    `ProTip: Use the !wishlist command to see things you buy them.`,
    `Mic test... 1, 2, 3? Is this thing on?`,
    `Help your streamers out. Audio is hard to test. Let them know how the stream looks and sounds`,
    `When was the last time you complimented someone? I'll start; @${username}, you're doing a great job.`,
    `Did you know you can change the chat fontsize from the wrench icon at the top? (desktop only)`,
    `Initializing ChatGPT 6.0.... Connecting to Skynet... (just kidding) 😂`,
    `Reticulating Splines`,
    `Discombobulate all the things`,
    `01101010 01101111 01101011 01100101 ... That's just a joke in binary.`,
    `@${username} is sporting the Winnie the Pooh fashion, I see 😏`,
    `90s eurodance is the best music genre. Technotronic gets an honorable mention. Let's hear some Pump up the jam!`,
    `Posture check: @${username}. Be sure to stand and stretch.`,
    `HAIL HYDRATE! Everyone drink some water.`,
    `If you're feeling anxious or stressed, just close your eyes, breath deep, and recite the lyrics to the 1992 hit song "Baby Got Back" by Sir Mix-a-Lot.`,
    `wooossaahhhh... L A face with an oakland booty.`,
    `It's time to kick ass, and chew bubble gum.... I'm all out of gum.`,
    `Dogs and cats, living together! Mass hysteria!`,
    `Who does your taxes?`,
    `There is no Dana. Only Zuul.`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
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

      if (!channel) {
        channel = new Channel(channelId, (response)=> {
          ws.send(JSON.stringify(response));
        });
        Bot.channels.push(channel);
      }

      switch(message.type) {
        case "new_message":
          channel.resetTimer();
          break;
        case "enter_stream":
          user = {name: message.text, id: channelId};
          if (!channel.hasUser(user)) {
            channel.addUser(user);
          }

          break;
        case "leave_stream":
          user = {name: message.text, id: channelId};
          if (channel.hasUser(user)) {
            channel.removeUser(user);
          }

          break;
      }
    }
  }
};

export default Bot;
