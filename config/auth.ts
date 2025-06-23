// config/auth.ts
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types' // Ensure this import is here

const authConfig = defineConfig({
  default: 'web', // <-- Ensure 'web' is the default
  guards: {
    web: sessionGuard({ // <-- Crucial: Must be sessionGuard
      useRememberMeTokens: false, // Or true, depends on your preference, but it must be here
      provider: sessionUserProvider({ // <-- Must be sessionUserProvider
        model: () => import('#models/user')
      }),
    }),
    api: tokensGuard({ // Your API guard setup
      provider: tokensUserProvider({
        model: () => import('#models/user'),
        tokens: 'accessTokens',
      }),
    }),
  },
})

export default authConfig

// --- CRITICAL TYPE AUGMENTATIONS ---
// Ensure these are at the very bottom of your config/auth.ts file
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}