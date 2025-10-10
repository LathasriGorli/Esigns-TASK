import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/components/oAuth/Login'

export const Route = createFileRoute('/')({
  component: Login,
})
