import { speechSynthesis } from '../scripts/speech.js';

if (!customElements.get('weather-intent')) {
  class WeatherIntent extends HTMLElement {

    constructor() {
      super();
    }

    styles() {
      return `font-size: 10vw;margin: 0`
    }

    render(data){
      const { weather, main } = data;
      this.innerHTML = `
        <img style="${this.styles()}" src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />
        <h1 style="${this.styles()}">${main.temp}°C</h1>
        
      `;
      speechSynthesis(`The weather today is ${main.temp} °C, ${weather[0].description}`)
    }
  
    connectedCallback() {
      fetch('/weather')
        .then(response => response.json())
        .then(data => this.render(data));
    }

  }

  customElements.define('weather-intent', WeatherIntent);
}
