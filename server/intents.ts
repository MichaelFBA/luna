export const intents : Record<string,Object> = {
    'time': { el: '<time-intent></time-intent>', script: './intents/time.js' },
    'day': { el: '<day-intent></day-intent>', script: './intents/day.js' },
    'selfie': { el: '<selfie-intent></selfie-intent>', script: './intents/selfie.js' },
}