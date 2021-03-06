import { speechSynthesis } from '../scripts/speech.js';

if (!customElements.get('time-intent')) {
  class TimeIntent extends HTMLElement {

    constructor() {
      super();
      this.time = '00:00';    
    }

    styles() {
      return `font-size: 10vw;`
    }
  
    connectedCallback() {
      setInterval(() => {
        this.clock();
        this.innerHTML = `<h1 style="${this.styles()}">${this.time}</h1>`;
      }, 1000);
      setTimeout(() => {
        speechSynthesis(`The time is ${this.time}`)
      },1001)
    }
  
    clock() {
      let date = new Date();
      let hrs = date.getHours();
      let mins = date.getMinutes();
      // let secs = date.getSeconds();
      let period = "AM";
      if (hrs == 0) {
        hrs = 12;
      } else if (hrs >= 12) {
        hrs = hrs - 12;
        period = "PM";
      }
      hrs = hrs < 10 ? hrs : hrs;
      mins = mins < 10 ? "0" + mins : mins;
      // secs = secs < 10 ? "0" + secs : secs;
  
      this.time = `${hrs}:${mins}:${period}`;  
    }
  }

  customElements.define('time-intent', TimeIntent);
}
