# Luna
This is a little experiement that I made for my daughter Luna. The aim is to provide a way to interact with the internet in a safe, fun and informative manner. 
The premise of the application is for the child to interact with the app using speech recognition, which in turn load small learning applications. There is also the ability to run cron jobs to say good morning and good evening. 

# Server
The server is based on Deno. It sets up a web socket connection to listen to voice commands, it uses a crude implementation of NLP (Natural language processing) i.e Finding a word in a string. But this could be expanded upon later.

When an `intent` is matched a small web component application is sent down the the browser and loaded.

### To run the application locally
`deno run --allow-net --allow-read --allow-write ./server/main.ts`

### To run the application in docker
See dockerfile.

# Client
Simple html app that sets up a websocket connection.

# Docker
To build the image `docker build . -t deno/luna`
This tags the image as `deno/luna:latest`

# Environment Variables
Rename `.env.eg` to `.env`, these will be read available in the application