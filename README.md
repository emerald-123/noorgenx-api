# NoorGenX API Starter (Cloud Run)

This is a minimal Express.js backend for NoorGenX, designed to be deployed on Google Cloud Run
and mapped to `https://api.noorgenx.com`.

## Endpoints

- `GET /` – basic info/status
- `GET /health` – health check for Cloud Run / uptime monitoring
- `POST /analyze` – stub endpoint that echoes back a `prompt` field

## Local development

```bash
npm install
npm start
```

The server will run on `http://localhost:8080`.

## Deploy to Cloud Run (high level)

1. Push this folder to a GitHub repo or upload as a source in Google Cloud.
2. In Google Cloud Console:
   - Go to **Cloud Run → Create service**.
   - Choose **Deploy one revision from source** and point it to this code.
   - Use **Node 20** runtime or Dockerfile build.
   - Allow **unauthenticated** requests (for public API).
3. Once deployed, test:
   - `GET https://YOUR_SERVICE_URL/health`
   - `POST https://YOUR_SERVICE_URL/analyze`

4. Then map `api.noorgenx.com` to the Cloud Run service via **Cloud Run → Custom domains**
   and create the DNS record in Vercel as instructed in the wizard.
