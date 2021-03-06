import { serve, serveFile, acceptWebSocket } from './deps.ts';
import { handleWs } from './web-socket.ts';


const server = serve({ hostname: "0.0.0.0", port: 3333 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:3333/`);

for await (const request of server) {
  const { conn, r: bufReader, w: bufWriter, headers, url } = request;
  
  // Websocket
  if (request.headers.has('upgrade')) {

    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await request.respond({ status: 400 });
      });
    
  } else {
    // Static Files
    switch (url) {
      case '/':
        request.respond(await serveFile(request, `${Deno.cwd()}/client/index.html`));
        break;
  
      default:
        try {
          request.respond(await serveFile(request, `${Deno.cwd()}/client${url}`));
        } catch (error) {
          console.error(error)
        }
        break;
    }
  }

}