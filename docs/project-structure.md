# Project Structure

Top-level layout:

- `index.html` — Vite entry
- `src/main.js` — app bootstrap and router/mount
- `src/App.vue` — root layout
- `src/ChatApp.vue` — main chat view
- `src/components/` — UI components
- `src/composables/` — logic hooks (e.g., `UseChat.js`)
- `src/services/` — API wrappers (e.g., `authService.js`)
- `public/` — static assets

Notes:
- Keep UI components presentational and push logic into composables.
- Group related components into subfolders if the set grows.
