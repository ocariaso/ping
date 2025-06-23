import type { HttpContext } from '@adonisjs/core/http'
import { RegisterValidator } from '#validators/register'
import User from '#models/user' 

export default class RegisterController {

    create({view}: HttpContext) {
        return view.render('pages/auth/register')
    }

    async store({request, auth, session, response}: HttpContext) {
        const payload = await request.validateUsing(RegisterValidator)

        
        const user = await User.create(payload)

        await auth.use('web').login(user)

        session.flash({
            notification: {
                type: 'success',
                message: 'Registration successful! Welcome to our platform.',
            }
        })
        return response.redirect().toRoute('/') 
    }
}