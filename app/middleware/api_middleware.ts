import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * API middleware to ensure stateless behavior for API requests.
 */
export default class ApiMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Disable session because API clients are stateless.
     * This is crucial if you have global session middleware enabled (which you do).
     */
    if (ctx.session) { // Check if session exists before trying to clear/commit
      ctx.session.clear()
      await ctx.session.commit()
    }

    // Proceed to the next middleware/route handler
    return next()
  }
}