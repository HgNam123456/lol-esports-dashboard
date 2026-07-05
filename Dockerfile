# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ENV VITE_API_BASE_URL=/api
RUN npm run build

# Stage 2: Final Run Image (Python + Nginx)
FROM python:3.11-slim
WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy Backend app
COPY backend/ ./
RUN mkdir -p data/processed

# Copy frontend static build files
COPY --from=frontend-builder /app/dist /var/www/frontend

# Copy configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
