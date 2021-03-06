import { speechSynthesis } from '../scripts/speech.js';
if (!customElements.get('day-intent')) {
  class DayIntent extends HTMLElement {

    styles() {
      return `font-size: 10vw;`
    }

    constructor() {
      super();
      this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
  
    connectedCallback() {
      const day = this.days[new Date().getDay()]
      this.innerHTML = `<h1 style="${this.styles()}">${day}</h1>`;
      speechSynthesis(`Today is ${day}`)
    }
  }
  
  customElements.define('day-intent', DayIntent);
}
