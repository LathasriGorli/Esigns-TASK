import { useEffect } from 'react'
import querystring from 'query-string'
import { useNavigate } from '@tanstack/react-router'
import { GetAllTemplates } from '../templates/GetAllTemplates'

const API_BASE = import.meta.env.VITE_PUBLIC_API_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

export function AuthCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      getToken(code)
    }
  }, [])

  const getToken = async (code: string) => {
    try {
      const response = await fetch(`${API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          code: code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'authorization_code',
        }),
      })

      if (!response.ok) throw new Error('Failed to get access token')
      const data = await response.json()
      localStorage.setItem('esigns_access_token', data.accessToken)
      navigate({ to: '/auth/callback' })
    } catch (error) {
      console.error('Token exchange error:', error)
    }
  }

  return (
    <div className="text-center mt-4">
      <GetAllTemplates />
    </div>
  )
}
