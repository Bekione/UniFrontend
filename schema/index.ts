import * as z from 'zod'

export const RegistrationSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    username: z.string().min(1, {
        message: "Please enter a username"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})



export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter a username"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})