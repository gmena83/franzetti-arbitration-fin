# Next Phases

## 🔐 URGENT — Move Admin Credentials to Secure Storage

**Priority: HIGH**
**Added: April 27, 2026**

The `/admin` login credentials are currently hardcoded in `client/src/components/ProtectedRoute.tsx` (client-side). This means:
- Credentials are visible in the browser's JavaScript source code
- Anyone can inspect the bundle and extract email/password pairs
- No session management, rate limiting, or account lockout

### Recommended approach:
1. Move authentication to a **Netlify serverless function** (e.g., `netlify/functions/auth.ts`)
2. Store credentials as **Netlify environment variables** (hashed passwords preferred)
3. Use **JWT tokens** or **session cookies** for authenticated state instead of localStorage
4. Add **rate limiting** on the auth endpoint to prevent brute force
5. Consider integrating **Netlify Identity** or a third-party auth provider (Auth0, Supabase Auth) for production-grade security

### Current accounts (to be migrated):
- `gonzalo@menatech.cloud`
- `erica@franzettiarbitration.com`
- `contact@franzettiarbitration.com`
