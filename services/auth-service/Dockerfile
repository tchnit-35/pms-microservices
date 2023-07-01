# Use an official Node.js runtime as a parent image
FROM node:14.16.1-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install nodemon express mongoose jsonwebtoken amqplib

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4000 for the application
EXPOSE 4000

# Define the command to run the application
CMD [ "npm","run","devStart" ]