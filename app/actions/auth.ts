'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const apiKey = formData.get('apiKey') as string
  const cookieStore = await cookies()

  cookieStore.set('newsletter_api_key', apiKey, {
    httpOnly: true, // Prevents browser JS from seeing the key
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('newsletter_api_key')
  redirect('/')
}