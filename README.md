# NOVA — Professional AI Workspace

NOVA is a polished, responsive frontend starter for a professional AI assistant. It provides a focused workspace for:

- **Chat** — conversational assistance with prompt cards and a responsive composer.
- **Create** — image, video, and audio generation entry points.
- **Code** — engineering copilot flows for building, reviewing, and debugging.
- **Library** — a home for saved projects and generated content.

## Run locally

This is a dependency-free static app. Open `index.html` directly in a browser, or serve it with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Connect AI providers

The interface currently uses a small local response simulator so it works immediately without secrets. To make it production-ready:

1. Add a secure backend endpoint such as `POST /api/chat`.
2. Keep provider API keys on the server, never in `app.js` or browser code.
3. Replace `respond()` in `app.js` with a `fetch()` request to your backend.
4. Add authenticated upload endpoints for images, video, and audio generation.
5. Persist conversations and library items in a database.

Suggested provider adapters include a text model, an image model, a video generation service, and an object store for generated assets. Keep each adapter behind your own backend API so providers can be changed without rewriting the UI.

## Project structure

- `index.html` — semantic application layout and views.
- `styles.css` — responsive dark workspace design system.
- `app.js` — navigation, prompt actions, local chat simulation, and UI interactions.
