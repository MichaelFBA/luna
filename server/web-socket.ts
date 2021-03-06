import {
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "./deps.ts";
import { WebSocket } from "https://deno.land/std@0.89.0/ws/mod.ts"; 
import { intents } from './intents.ts';
export let socket: WebSocket;

export const handleWs = async (sock: WebSocket) => {
  socket = sock;
  console.log("socket connected!");
  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // Request Intents
        console.log("ws:Text", ev);
       
        const intent = Object.keys(intents).find(key => ev.includes(key))
        console.log('intent')
        if (intent) await sock.send(JSON.stringify(intents[intent]));


      } else if (ev instanceof Uint8Array) {
        // binary message.
        console.log("ws:Binary", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping.
        console.log("ws:Ping", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close.
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}
