FROM arm64v8/ubuntu:20.04

RUN apt-get update && apt-get install -y curl gnupg && curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/mode-red

RUN npm install -g --unsafe-perm node-red

EXPOSE 1880

cmd ["node-red"]
