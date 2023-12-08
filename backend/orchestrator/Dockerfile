# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /orchestrator

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Expose a port for the app to listen on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "run", "start:dev" ]
