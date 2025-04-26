# Frontend Dockerfile

# 1. Basis-Image
FROM node:18 as build

# 2. Arbeitsverzeichnis
WORKDIR /app

# 3. Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# 4. Projektdateien kopieren und Build erstellen
COPY . .
RUN npm run build

# 5. Nginx für das fertige Build benutzen
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# 6. Expose Port 80
EXPOSE 80

# 7. Start Nginx
CMD ["nginx", "-g", "daemon off;"]
