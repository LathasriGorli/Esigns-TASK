import { createFileRoute } from '@tanstack/react-router'
import { AuthCallback } from '@/components/oAuth/AuthCallback'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
})
