# Luna

# Server

Deno + websockets
`deno run --allow-net --allow-read ./server/main.ts`

# Client
Simple app that sets up a websocket connection.
There are also `intents` that are small apps that can be activated by luna

# Docker
To build the image `docker build . -t deno/luna`
This tags the image as `deno/luna:latest`