import { speechSynthesis } from '../scripts/speech.js';

if (!customElements.get('speak-intent')) {
  class SpeakIntent extends HTMLElement {

    static get observedAttributes() { return ['speak', 'icon']; }
    
    constructor() {
      super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(name, oldValue, newValue);
    }

    styles() {
      return `
        .wave{
          font-size: 20vw;
          animation-name: wave-animation;  /* Refers to the name of your @keyframes element below */
          animation-duration: 2.5s;        /* Change to speed up or slow down */
          animation-iteration-count: infinite;  /* Never stop waving :) */
          transform-origin: 70% 70%;
        }

        @keyframes wave-animation {
          0% { transform: rotate( 0.0deg) }
         10% { transform: rotate(14.0deg) }  /* The following five values can be played with to make the waving more or less extreme */
         20% { transform: rotate(-8.0deg) }
         30% { transform: rotate(14.0deg) }
         40% { transform: rotate(-4.0deg) }
         50% { transform: rotate(10.0deg) }
         60% { transform: rotate( 0.0deg) }  /* Reset for the last half to pause */
        100% { transform: rotate( 0.0deg) }
      }
      `
    }
  
    connectedCallback() {
      this.innerHTML = `
        <style>${this.styles()}</style>
        <h1 class="wave">${this.getAttribute('icon')}</h1>
      `
      speechSynthesis(this.getAttribute('speak'))
    }

  }

  customElements.define('speak-intent', SpeakIntent);
}
