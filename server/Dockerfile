# Backend Dockerfile

# 1. Basis-Image
FROM node:18

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY package.json package-lock.json ./
RUN npm install

# 4. Restliche Dateien kopieren
COPY . .

# 5. Umgebungsvariable
ENV PORT=3000

# 6. App starten
CMD ["npm", "start"]
