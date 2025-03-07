const getRandomMessage = (username)=> {
  // TODO: Handle this better when there's no one in chat
  username = username || "chatterbot";
  const messages = [
    `Hey @${username}, you're legitimately funky! 🕺`,
    `Hey @${username}, you're really hot! 🌶️`,
    `It's a bit quiet, let's make some noise!`,
    `Who else is loving this stream? Show your support with a !tip 1`,
    `Did you know you can see how long a stream has been going by typing '!uptime'?`,
    `👋`,
    `How many Lowe's could Rob Lowe rob if Rob Lowe could rob Lowe's? 🤔`,
    `Psstt.. @${username}... got any good jokes to share?`,
    `What is everyone up to this weekend?`,
    `I'm loving this stream ❤️ ❤️ ❤️. What do you think, @${username}?`,
    `ProTip: Use the !social command to see their links.`,
    `If you don't follow, now is a great time.`,
    `Lurking is ok, but lurking and following is even better!`,
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
    `What did one wall say to the other? I'll meet you at the corner.`,
    `I think you were right about that one thing, @${username}. I can totally see it now.`,
    `ProTip: Use the !wishlist command to see things you buy them.`,
    `Mic test... 1, 2, 3... Can everyone in the back hear me ok?`,
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
    `HYDRATE! Everyone drink some water.`,
    `If you're feeling anxious or stressed, just close your eyes, breath deep, and recite the lyrics to the 1992 hit song "Baby Got Back" by Sir Mix-a-Lot.`,
    `wooossaahhhh... L A face with an oakland booty.`,
    `It's time to kick ass, and chew bubble gum.... I'm all out of gum.`,
    `Dogs and cats, living together! Mass hysteria!`,
    `We're the Ghostbusters: Who does your taxes?`,
    `There is no Dana. Only Zuul.`,
    `Time for a random fact: Did you know that honey never spoils? It can last indefinitely!`,
    `Attention, chat! Let's break the silence and share our favorite emojis. Mine is 🔥`,
    `Hey @${username}, what's your favorite type of pizza? I'm craving some right now!`,
    `Okay, I'll break the ice! What's your go-to karaoke song?`,
    `Need a virtual high-five? 🖐️ Give me a shout and let's celebrate!`,
    `Time for a quick poll: Who prefers coffee over tea? Type 1 for coffee or 2 for tea!`,
    `Shoutout to all the night owls in the chat! Who else is burning the midnight oil?`,
    `Are you ready for a riddle? Here it is: What has keys but can't open locks? Any guesses?`,
    `@${username}, you've got great taste! Recommend a book or movie that you're currently enjoying.`,
    `Quick, name a superhero without using Google! Let's test our comic book knowledge.`,
    `It's storytime! Share a funny or embarrassing moment from your life. Don't be shy!`,
    `Here's a challenge for you: Type the longest word you know without looking it up. Go!`,
    `Who's up for some trivia? Let's see who can answer this: What's the capital of Australia?`,
    `Hey chat, what's your favorite season of the year? Are you team summer, fall, winter, or spring?`,
    `Just a friendly reminder to drink water and stay hydrated throughout the day. Your body will thank you!`,
    `How about a virtual dance party? Share your favorite dance move in the chat. I'll start with the sprinkler! 💃`,
    `@${username}, you're a fantastic chatter! Thanks for keeping the conversation going.`,
    `Attention, chat! Let's share our best travel destinations. Where would you love to go on your next vacation?`,
    `Did you know that laughter is contagious? Share a joke and spread some smiles in the chat!`,
    `It's time for a virtual game night! Who's up for a round of "Two Truths and a Lie"? Share yours in the chat.`,
    `It's snack time! Everybody grab a snack... I'll grab @${username}`,
    `Quick question: If you could have any superpower, what would it be and why?`,
    `Time to reveal your inner artist! Describe the last thing you drew or painted.`,
    `Attention, chat! If you were a character in a video game, what would your special ability be?`,
    `Can you guess the answer to this riddle? I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?`,
    `Let's take a moment to appreciate music. What's your all-time favorite song or band?`,
    `@${username}, if you could have dinner with any historical figure, who would you choose and why?`,
    `Word association game: I'll start with a word, and you reply with the first word that comes to mind. Ready? "Sunshine."`,
    `Are you a morning person or a night owl? Share your preference and why you enjoy that time of day.`,
    `Hey chat, what's the best piece of advice you've ever received? Let's inspire each other!`,
    `Attention, movie buffs! What's a quote from a movie that you find memorable or impactful?`,
    `Quick, describe your day using only emojis! Let's see who can come up with the most creative combination.`,
    `It's time to show off your hidden talents! Share something unique or interesting about yourself.`,
    `@${username}, if you could have a conversation with any fictional character, who would it be and what would you ask them?`,
    `Let's spread some positivity! Share a compliment for someone in the chat. Let's lift each other up!`,
    `Time for a throwback! What's a childhood toy or game that brings back fond memories for you?`,
    `Hey chat, tell us about a recent accomplishment or something you're proud of. We're here to celebrate with you!`,
    `Calling all foodies! Share a recipe or dish that you absolutely love. Let's exchange culinary delights.`,
    `@${username}, do you have a favorite quote or mantra that you live by? Share it with us!`,
    `It's time for a virtual vacation. If you could teleport anywhere in the world right now, where would you go?`,
    `Attention, bookworms! What's a book that you couldn't put down once you started reading it?`,
    `Let's have some fun with emojis! Describe your current mood using only emojis. 🤔 😄 🌞`,
    `@${username}, if you could instantly become an expert in any field, which field would you choose and why?`,
    `Here's a challenge: Can you come up with a tongue twister that's difficult to say five times fast?`,
    `Hey chat, what's the most interesting fact you've learned recently? Share your newfound knowledge!`,
    `@${username}, what's your favorite quote from a famous person or celebrity?`,
    `Anyone wanna wrestle in some Jell-o?`,
    `Are you a dip your toes in first, or jump right in person?`,
    `Sometimes I tune to A439hz just for fun.`,
    `Hello? Is it me you're looking for?`,
    `The more you talk, the less I talk.`,
    `If the streamer has a toy active, your tips make them go bzzzzzz`,
    `Of all the friends I've had, you're the first, @${username}.`,
    `Allow me to introduce myself. I'm ChatterBot.`,
    `Have you ever squished mashed potatoes and gravy between your toes? Yeah, me neither... 😬`,
    `🤠 🤠 🤠`,
    `How hot is @${username}, right? 🥵 `,
    `Use the '!timers' command to see if there's any active timers.`,
    `If you see a wheel, you must now spin it.`,
    `.--- --- -.- . That's just a joke in morse code.`,
    `You're sexy and you know it.`,
    `Did you know you can tip from Paypal? Ask a developer for more info.`,
    `Did anyone else cry during Beverly Hills Chihuahua 2? Just me? ok....`,
    `Here's the beer. Here's the entertainment. Now have fun. That's an order.`,
    `You see a bug hole, YOU NUKE IT!`,
    `Mind tricks don't work on me.`,
    `You know, sometimes I amaze even myself.`,
    `Please keep your hands and feet inside the stream at all times.`,
    `Bring me a bucket, and I'll show you a bucket.`,
    `Hey! Listen!`,
    `Do a barrel roll`,
    `Science isn't about why. It's about why not!`,
    `Excelsior!`,
    `You have just entered a dark forest, and see something sparkling, roll for perception.`,
    `This is my Bot, there are many like it, but this one is mine. My Bot is my best friend. It is my life. I must master it as I must master my life.`,
    `Zoinks!`,
    `Jinkies!`,
    `Jeepers!`,
    `I'm thinking of a floating point between 0 and 1... who wants to guess?`,
    `Lurking is a totally acceptable form of support,`,
    `Workin' and Lurkin', @${username}?`,
    `Everyone take a minute to close your eyes and breath...`,
    `Before this stream ends, try doing a '!dropin' and share the love!`,
    `If you'd like to know more about bots, visit our support site: support.joystick.tv`,
    `Did you know the JoystickTV developers open-source code at github.com/joysticktv?`,
    `Did you know that I'm open source? You can see all my internal bits on github.com/joysticktv`,
    `Streamers and moderators can silence me at anytime with '@chatterbot lurk'`,
    `What's your favorite color chocobo?`,
    `Did you catch the game last night, @${username}? That was crazy!`,
    `I find a duck's opinion of me very much influenced by whether or not I have bread`,
    `Don't follow your dreams. Just ask them where they're going, and meet up with them later`,
    `An escalator can never break, it can only become stairs.`,
    `I haven't slept for 10 days... because that would be too long`,
    `Go my favorite sports team go! Score a goal. Unit. Basket. Go squadron! Defeat the opponents soundly in this...skirmish.`,
    `The big yellow one is the sun!`,
    `Why are people getting on elevators shocked to find people getting off elevators?`,
    `What restaurant is your guilty fast-food pleasure?`,
    `Name your top 3 (any order) all-time favorite food cuisines.`,
    `I would hug the marshmallows out of you if I could 🤗`,
    `You never need a reason to party 🥳`,
    `Cakes or Pies?`,
    `What's a instant "Green Flag" for a potential relationship?`,
    `Thanks for watching, follow to watch more!`,
    `Tell all your friends how fun I am`,
    `What's the spiciest food you've tried?`,
    `Proxima B is only a little over 4 lightyears away. Maybe we should swing by and say hey?`,
    `Terraria or Minecraft?`,
    `Street Fighter or Virtua Fighter?`,
    `Wario or Waluigi?`,
    `Hi @${username}. What's up?`,
    `¿pɐǝɹ oʇ sᴉɥʇ sᴉ pɹɐɥ ʍoH`,
    `¿uǝǝɹɔs ǝɥʇ ɹo pɐǝɥ ɹnoʎ ʇlᴉʇ noʎ pᴉp`,
    `When you eat tacos, do you tilt your head, or the taco?`,
    `To cook chicken in one slap it would require the velocity of 3725.95mph. Goku could do it.`
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export default getRandomMessage;
