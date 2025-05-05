# Step 1: Build the React application
FROM node:18-alpine AS build

# Accept build-time environment variables
ARG VITE_API_BASE_URL
ARG VITE_AUTH_SERVICE_URL

# Set env vars for Vite to pick up
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_AUTH_SERVICE_URL=$VITE_AUTH_SERVICE_URL

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . ./

# # Copy the .env file explicitly
# COPY .env .env

# Build the React app
RUN npm run build

# Step 2: Serve the app with a production server (nginx)
FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the build folder from the previous step to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
