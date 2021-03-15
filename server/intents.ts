export const intents : Record<string,Object> = {
    'time': { el: '<time-intent></time-intent>', script: './intents/time.js' },
    'day': { el: '<day-intent></day-intent>', script: './intents/day.js' },
    'weather': { el: '<weather-intent></weather-intent>', script: './intents/weather.js' },
    'selfie': { el: '<selfie-intent></selfie-intent>', script: './intents/selfie.js' },
    'hello': { el: '<speak-intent icon="💖💜" speak="Hello Luna"></speak-intent>', script: './intents/speak.js' },
}