# Stage 1: Build
FROM node:21-alpine as build

WORKDIR /app

# Copy necessary files
COPY package*.json .
COPY tsconfig*.json .

# Install dependencies securely
RUN npm ci

# Copy remaining files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD envsubst '\$API_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'
