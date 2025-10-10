import { createFileRoute } from '@tanstack/react-router'
import { SendDocument } from '@/components/core/SendDocument'

export const Route = createFileRoute('/sent-document')({
  component: SendDocument,
})
