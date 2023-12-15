# Use an official Node.js runtime as the base image
FROM node:18 as base
WORKDIR /orchestrator
COPY package*.json ./
COPY yarn*.json ./

FROM base as build
RUN npm ci
COPY . .
RUN npm run build

FROM base as debug
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as prod   
ENV NODE_ENV=production
RUN npm ci --production
COPY --from=build /orchestrator/dist ./
CMD ["npm", "run", "start"]