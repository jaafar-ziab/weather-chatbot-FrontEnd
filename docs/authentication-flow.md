# Authentication Flow

High level:

1. Registration: `RegisterForm.vue` -> `authService.register()` -> show `RegistrationSuccess`.
2. Verification: user confirms email/code -> `authService.verify()` -> show `VerificationSuccess`.
3. Login: `LoginForm.vue` -> `authService.login()` -> token stored (localStorage) -> route to app.

Protecting routes:
- Use `AuthWrapper.vue` to check token and redirect to login when missing or expired.

Token handling tips:
- Prefix stored token with metadata (expiry) or decode JWT to inspect expiration.
- Renew or force logout if token expired.
