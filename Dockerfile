# Use Node.js 20 as the base image
FROM node:20.11.1-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the entire application code to the container
COPY . .

# Build the application for production
RUN yarn build

# Expose the default Next.js port
EXPOSE 50000

# Start the application
CMD ["yarn", "start"]
