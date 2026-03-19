# Multi-stage build for production-ready deployment on Render
# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend files
COPY frontend/package*.json ./
RUN npm install

# Copy source code
COPY frontend/src ./src
COPY frontend/vite.config.js ./
COPY frontend/index.html ./

# Build React app
RUN npm run build

# Stage 2: Build backend with frontend assets
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source code
COPY backend/ .

# Copy built frontend to backend public directory
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/dist ./public

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api', (r) => {if (r.statusCode !== 404) throw new Error(r.statusCode)})"

# Start backend server
CMD ["npm", "start"]
