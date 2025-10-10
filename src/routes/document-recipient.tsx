import { createFileRoute } from '@tanstack/react-router'
import { DocumentRecipientsPage } from '@/components/core/RecipientPage'

export const Route = createFileRoute('/document-recipient')({
  component: DocumentRecipientsPage,
})

