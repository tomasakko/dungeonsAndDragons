'use client' // (if using app dir)

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    setError(error.message)
  } else {
    router.push('/home') // redirect to home page after login
  }
}

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Click here to login</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p>
      Don't have an account?{' '}
      <Link href="/register">Register here</Link>
    </p>
    </div>
  )
}
