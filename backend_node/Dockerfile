FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port 8012
EXPOSE 8012

# Start the server
# dotenv.config() in server.js will load .env file automatically
CMD ["node", "src/server.js"]

