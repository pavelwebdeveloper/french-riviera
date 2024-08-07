
# Use the official Node.js image as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /app

COPY package.json /app/package.json

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

ENV PORT 8080

EXPOSE 8080

# Define the entry point for the container
CMD ["npm", "start"]
