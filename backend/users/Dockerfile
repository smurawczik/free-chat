# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /users

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3001

# Start the app
CMD [ "npm", "run", "start:dev" ]
