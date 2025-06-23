// app/controllers/auth_controller.ts

import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { loginValidator } from '#validators/login'

export default class AuthController {

  /**
   * Display the login form.
   */
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Handle user login via form submission (session-based authentication).
   */
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      // --- NEW APPROACH: Manually verify credentials, then log in ---
      // This will throw an error if credentials are invalid (handled by the catch block)
      const user = await User.verifyCredentials(email, password)

      // Get the session guard instance
      const webGuard: any = auth.use('web') // Keep 'any' for now, as types are problematic

      // Log the user in using the session guard's login method
      await webGuard.login(user) // <-- Using .login() instead of .attempt()

      return response.redirect().toPath('/')
    } catch (error) {
      // This catch block will handle errors from User.verifyCredentials (e.g., invalid credentials)
      // or any other part of the login process.
      if ((error as any).status === 400 || (error as any).status === 401) {
        return response.badRequest({ message: 'Invalid credentials' })
      }
      throw error
    }
  }

  /**
   * Handle user logout (for web sessions).
   */
  async destroy({ response, auth }: HttpContext) {
    const webGuard: any = auth.use('web')
    await webGuard.logout()
    return response.redirect().toPath('/login')
  }

  /**
   * Handle API token-based user login.
   */
  async apiLogin({ request, response }: HttpContext) {
    console.log('--- API Login Endpoint HIT ---');
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(
        user,
        ['api_token'],
        { expiresIn: '7 days' }
      )

      return response.ok({
        message: 'Login successful',
        user: user.serialize(),
        token: token.value,
        expiresAt: token.expiresAt,
      })
    } catch (error) {
      if ((error as any).status === 400 || (error as any).status === 401) {
        return response.badRequest({ message: 'Invalid credentials' })
      }
      throw error
    }
  }
}