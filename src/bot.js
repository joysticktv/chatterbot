import Channel from "./channel.js";
const gatewayIdentifier = JSON.stringify({channel: "GatewayChannel"});

const buildResponse = (text, channelId) => {
  const response = {
    command: "message",
    identifier: gatewayIdentifier,
    data: JSON.stringify({
      action: "send_message",
      text: text,
      channelId: channelId,
    })
  };
  return JSON.stringify(response);
}

const Bot = {
  commands: {
    silence: '@chatterbot lurk',
    resume: '@chatterbot yo',
  },
  allowedCommands: (author)=> {
    return author.isStreamer || author.isModerator;
  },
  channels: [],
  handleMessage: (ws, receivedMessage)=> {
    if (receivedMessage.type === "ping") { return; }
    console.log("RECEIVED MESSAGE", receivedMessage)

    if (receivedMessage.message) {
      const message = receivedMessage.message;
      const channelId = message.channelId;
      let channel = Bot.channels.find((c)=> c.id === channelId);
      let user;

      switch(message.type.toLowerCase()) {
        case "started":
          if (!channel) {
            channel = new Channel(channelId, (randomMessage, id)=> {
              const response = buildResponse(randomMessage, id)
              ws.send(response);
            });
            if (!Bot.channels.map((c)=> c.id).includes(channelId)) {
              Bot.channels.push(channel);
            }
          }
          break;
        case "ended":
          Bot.channels = Bot.channels.filter((c)=> c.id !== channelId);
          break;
        case "new_message":
          const author = message.author;
          if (channel) {
            if ((message.text === Bot.commands.silence) && Bot.allowedCommands(author)) {
              channel.silence();
              const text = `Sure thing! Just say '${Bot.commands.resume}' when you want some more chats.`;
              const response = buildResponse(text, channelId);
              ws.send(response);
            } else if ((message.text === Bot.commands.resume) && Bot.allowedCommands(author)) {
              channel.resume();
              const text = `Yo yo! If I get to noisy, just say '${Bot.commands.silence}', and I'll take a break.`;
              const response = buildResponse(text, channelId);
              ws.send(response);
            } else {
              channel.resetTimer();
            }
          }
          break;
        case "enter_stream":
          if (channel) {
            console.log(message.text, "has entered the stream")
            user = {name: message.text, id: channelId};
            if (!channel.hasUser(user)) {
              channel.addUser(user);
            }
          }

          break;
        case "leave_stream":
          if (channel) {
            console.log(message.text, "has left the stream")
            user = {name: message.text, id: channelId};
            if (channel.hasUser(user)) {
              channel.removeUser(user);
            }
          }

          break;
        case "viewercountupdated":
          if (!channel) {
            channel = new Channel(channelId, (randomMessage, id)=> {
              const response = buildResponse(randomMessage, id)
              ws.send(response);
            });
            if (!Bot.channels.map((c)=> c.id).includes(channelId)) {
              Bot.channels.push(channel);
            }
          }

          break;
        default:
          // ignore for now
          break;
      }
    }
  }
};

export default Bot;
