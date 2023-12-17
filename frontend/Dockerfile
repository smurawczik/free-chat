# Use an official Node.js runtime as the base image
FROM node:18 as base
WORKDIR /app
COPY package*.json ./

FROM base as build
RUN npm ci
COPY . .
RUN npm run build

FROM base as debug
COPY . .
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base as prod   
ENV NODE_ENV=production
RUN npm ci --production
COPY --from=build /app/dist ./
CMD ["npm", "run", "build"]