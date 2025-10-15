import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { columns } from './TemplateColumns'
import { TemplateTable } from './TemplateTable'
import { TemplatePagination } from './TablePagination'
import { getTemplatesAPI } from '@/http/services/template'

export function GetAllTemplates() {
  const [page, setPage] = useState(1)
  const limit = 15
  const navigate = useNavigate()

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['templates', page],
    queryFn: () => getTemplatesAPI(page, limit),
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <div>Loading templates...</div>
  if (isError) return toast.error(error.message)

  const templates = data?.data ?? []
  const pagination = data?.pagination

  const actions = [
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: `/template/${row.original._id}` })}
            className="cursor-pointer"
          >
            <Eye className="text-black" strokeWidth={1.5} />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-lg font-medium mb-2">Templates</h2>
      <TemplateTable data={templates} columns={[...columns, ...actions]} />

      {pagination && (
        <TemplatePagination
          page={pagination.page}
          totalPages={pagination.total_pages}
          total_records={pagination.total}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
