import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Eye, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { getTemplatesAPI } from "@/http/services/template";

export function GetAllTemplates() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["templates", page],
    queryFn: () => getTemplatesAPI(page, pageSize),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading templates...</div>;
  if (isError) return toast.error(error.message);

  const templates = data?.data ?? [];
  const pagination = data?.pagination;

  const TABLE_STYLES = {
    th: "p-2 text-left",
    button: "border-none bg-transparent hover:bg-transparent cursor-pointer",
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-lg font-medium mb-2">Templates</h2>

      <div className="overflow-auto max-h-[calc(100vh-200px)] border bg-white">
        <table className="border-collapse">
          <thead>
            <tr className="sticky top-0 bg-white text-sm">
              <th className={TABLE_STYLES.th}>Title</th>
              <th className={TABLE_STYLES.th}>Status</th>
              <th className={TABLE_STYLES.th}>Created by</th>
              <th className={TABLE_STYLES.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template._id} className="border-t text-sm">
                <td className={`${TABLE_STYLES.th} w-50`}>{template.title}</td>
                <td
                  className={`${TABLE_STYLES.th} w-30 ${
                    template.status === "ACTIVE"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {template.status
                    .charAt(0)
                    .toUpperCase() + template.status.slice(1).toLowerCase()}
                </td>
                <td className={`${TABLE_STYLES.th} w-40`}>
                  {template.user_id.first_name} {template.user_id.last_name}
                </td>
                <td className="p-2 flex items-center gap-2 w-20">
                  <Button
                    className={`${TABLE_STYLES.button} px-1`}
                    onClick={() => navigate({ to: `/template/${template._id}` })}
                  >
                    <Eye className="text-black" strokeWidth={1.5} />
                  </Button>
                  <Button className={`${TABLE_STYLES.button} !p-0`}>
                    <Send className="text-black" strokeWidth={1.5} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex gap-2 bg-white p-2 w-[37%] justify-end">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`${TABLE_STYLES.button} !p-0`}
          >
            <ChevronLeft className="text-black" />
          </Button>
          <span className="flex items-center px-2">
            Page {pagination.page} of {pagination.total_pages}
          </span>
          <Button
            disabled={page === pagination.total_pages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.total_pages))
            }
            className={`${TABLE_STYLES.button} !p-0`}
          >
            <ChevronRight className="text-black" />
          </Button>
        </div>
      )}
    </div>
  );
}
