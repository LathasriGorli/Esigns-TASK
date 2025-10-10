import { createFileRoute } from '@tanstack/react-router'
import { ViewTemplate } from '@/components/templates/ViewTemplates'

export const Route = createFileRoute('/_template/template/$id')({
  component: ViewTemplate,
})
