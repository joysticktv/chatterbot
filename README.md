# Joystick.TV ChatterBot

This chat bot will post random messages to your chat when your chat gets quiet.
If no one has said anything in a bit, and there's people lurking, it will try
to encourage more interactions by saying random funny things, calling people out
that are lurking, and sometimes include some helpful tips for using JoystickTV.

Keep the bot quiet by talking in chat.

## Setup

1. Create a `.env` file

```
JOYSTICKTV_HOST="changeme"
JOYSTICKTV_CLIENT_ID="changeme"
JOYSTICKTV_CLIENT_SECRET="changeme"
JOYSTICKTV_API_HOST="changeme"
```

2. Install dependencies

```
bun install
```

3. Run the server

```
bun src/index.js
```

4. Enable logs (optional)

```
NODE_ENV=development bun src/index.js
```

## Bot commands

The streamer and moderators can silence the chatterbot with

`@chatterbot lurk`

Then resume the messages with

`@chatterbot yo`
