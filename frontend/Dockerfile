FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
# Support both VITE_BACKEND_URL and REACT_APP_API_URL for compatibility
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV REACT_APP_API_URL=$VITE_BACKEND_URL
RUN npm run build

# Production stage
FROM nginx:alpine

# Install wget for health checks
RUN apk add --no-cache wget

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8013

CMD ["nginx", "-g", "daemon off;"]

