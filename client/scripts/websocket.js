const url = `ws://${location.hostname}`;

const webSocket = new WebSocket(url);
const main = document.querySelector('main');

webSocket.onopen = function (event) {
    console.log(event)
    // requestIntent('weather')
};

webSocket.addEventListener('message', function (event) {
    console.log('Message from server ', event);
    const data = JSON.parse(event.data)

    main.innerHTML = data.el;
    const script = document.createElement('script')
    script.setAttribute('src', data.script);
    script.setAttribute('type', 'module');
    main.appendChild( script );
});

export const requestIntent = (intent) => {
    webSocket.send(intent);
}