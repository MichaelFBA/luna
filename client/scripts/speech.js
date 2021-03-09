import { requestIntent } from './websocket.js';


const footer = document.querySelector('footer')
document.body.addEventListener('click', () => {
    speechRecognition()
});

const synth = window.speechSynthesis;
let voices = [];
export const speechSynthesis = (text) => {
    document.body.removeEventListener('click', speechSynthesis)
    voices = window.speechSynthesis.getVoices()
    if (synth.speaking) {
        synth.cancel();
        return;
    }
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
        recognition.start();
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.voice = voices[49];
    utterThis.lang = 'en-US';
    utterThis.pitch = "1";
    utterThis.rate = "1";
    synth.speak(utterThis);
    recognition.stop();
}

const recognition = new webkitSpeechRecognition();
const speechRecognition = () => {
    recognition.continuous = true;
    recognition.interimResults = false;

    // Recognition start event handler
    recognition.onstart = () => {
        console.log('Voice recognition started. Try speaking into the microphone.');
    }

    recognition.onresult = function (event) {
        var transcript = event.results[event.results.length - 1][0].transcript;
        console.log(transcript);
        requestIntent(transcript)
    };

    // start recognition
    recognition.lang = 'en-AU';
    recognition.start();
}