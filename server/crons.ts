import { cron, config } from './deps.ts';
import { socket } from './web-socket.ts';
import { randomItemFromArray } from './utils.ts';
const env = config();

// Say Good Morning
cron(env.WAKE_TIME, () => {
    const goodMorning = [
        "You are my sunshine, my only sunshine. You make me happy when skies are grey. You’ll never know, dear, how much I love you. Please don’t take my sunshine away!",
        "Good morning, Sleeping Beauty! I thought you’d never wake up!",
        `Good morning, ${env.NAME}!`,
        "Rise n’ shine!",
        "Good morning! And if I don't see you, good afternoon, good evening, and good night!",
        "Wakey, wakey, eggs and bakey!",
        "You are as sweet as the morning dew drops on a honeysuckle flower!",
        "Good morning, my sweet!",
        "Any morning seeing your sweet face is a good morning, indeed!",
        "One, two, good morning to you! Three, four, I love you more!",
        "Every morning seeing your smile is considered sunny side up!",
        "Bad morning, it is not!",
        "Mornin' mi amigo!",
        "Top o' the mornin’ to ya!",
        `Guten Morgen, ${env.NAME}`,
        "It's a lovely day today and what have you got to do?"
      ]
    socket && socket.send(JSON.stringify({ el: `<speak-intent icon="👋" speak="${randomItemFromArray(goodMorning)}"></speak-intent>`, script: './intents/speak.js' }))
});

// Say Good Evening
cron(env.WAKE_TIME, () => {
    const goodEvening = [
        `Guten Nacht, ${env.NAME}`,
        `Nighty night, ${env.NAME}`
      ]
    socket && socket.send(JSON.stringify({ el: `<speak-intent icon="😴" speak="${randomItemFromArray(goodEvening)}"></speak-intent>`, script: './intents/speak.js' }))
});

// Selfie
cron('5 7 * * *', () => {
    socket && socket.send(JSON.stringify({ el: `<selfie-intent"></selfie-intent>`, script: './intents/selfie.js' }))
});