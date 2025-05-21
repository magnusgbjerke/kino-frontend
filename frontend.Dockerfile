ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "start"]
