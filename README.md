# parallele-verteilte-systeme

**Name:** Sinan XYZ  
**Matrikelnummer:** 768498

---

## Projektübersicht
...

## Projektübersicht

Dieses Projekt besteht aus:
- einem **Backend** (Node.js + Express)
- einem **Frontend** (React)
- beide containerisiert mit **Docker** und orchestriert über **Docker Compose**

Ziel ist es, eine einfache verteilte Applikation zu bauen, die die 12-Factor App Prinzipien umsetzt.

---

## Technologien

- Node.js
- Express
- React
- Docker
- Docker Compose
- Swagger (für API Dokumentation)

---

## Anwendung starten

1. Repository klonen:

```bash
git clone <dein-github-repo-link>
cd parallele-verteilte-systeme
```

2. Docker Compose starten:

```bash
docker-compose up --build
```

3. Applikationen im Browser öffnen:
- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:3000/api/items](http://localhost:3000/api/items)
- Swagger API-Dokumentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Projektstruktur

```plaintext
/parallele-verteilte-systeme/
├── client/ (React App)
│   └── Dockerfile
├── server/ (Node.js API)
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 12-Factor App Prinzipien angewendet

| Prinzip | Umsetzung |
|:---|:---|
| **1. Codebase** | Eine einzige Codebase in Git |
| **2. Dependencies** | Definiert in `package.json`, installiert mit `npm install` |
| **3. Config** | Nutzung von `.env` Dateien für Konfiguration |
| **4. Backing Services** | API ist unabhängig von Services wie DB |
| **5. Build, Release, Run** | Dockerfiles für saubere Trennung |
| **6. Processes** | Applikation läuft als stateless Prozesse |
| **7. Port binding** | Ports werden dynamisch über Docker gemappt |
| **8. Concurrency** | Mehrere Container möglich |
| **9. Disposability** | Container sind schnell start-/stoppbar |
| **10. Dev/Prod Parity** | Lokal und Deployment sind fast identisch (Dockerized) |
| **11. Logs** | Logs über Standard Output |
| **12. Admin processes** | Keine benötigt |

---

## Hinweise

- Die Daten werden nur im Arbeitsspeicher gehalten (kein Persistieren nach Neustart).
- CORS ist aktuell für alle Origins freigeschaltet (für Testzwecke).
- Swagger API-Dokumentation verfügbar unter `/api-docs`.

---

## Kubernetes Deployment (optional)

Das Projekt kann auch mit Kubernetes deployed werden:

### Backend Deployment

**`k8s/backend-deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: backend-image
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: NodePort
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
```

---

### Frontend Deployment

**`k8s/frontend-deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: frontend-image
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 80
```

---

## Wichtig für Kubernetes

- Docker Images müssen gebaut und auf eine Registry (z.B. Docker Hub) gepusht werden.
- Anwendung der Kubernetes Dateien erfolgt mit:

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

---

