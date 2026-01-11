# Services

Purpose:
- Encapsulate HTTP calls and token handling.

`authService.js` responsibilities:
- `register(payload)` -> POST `/api/auth/register`
- `verify(code)` -> POST `/api/auth/verify`
- `login(credentials)` -> POST `/api/auth/login` (store token)
- `setToken()` / `getToken()` helpers

Best practices:
- Use `fetch` or `axios` with a single configured instance.
- Centralize error parsing and refresh token handling (if applicable).
