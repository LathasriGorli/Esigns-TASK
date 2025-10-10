import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Button } from "../ui/button";

export function ViewTemplate() {
  const { id } = useParams({ strict: false });
  const companyId = import.meta.env.VITE_COMPANY_ID;
  const navigate = useNavigate();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const token = localStorage.getItem("esigns_access_token");
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/company-documents-v2/${id}?company_id=${companyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch template");
      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading template...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const STYLES = {
    span: "text-neutral-400 text-xs",
    div: "flex flex-col",
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-medium mb-4">Template Details</h2>

      <div className="border flex flex-col gap-2 w-250 mx-auto p-3 rounded-sm bg-white">
        <div className="flex items-center justify-between">
          <p>{data.data.title}</p>
          <div className="flex items-center gap-6">
            <p>{data.data.status}</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-600 rounded font-normal p-2 cursor-pointer"
              onClick={() => navigate({to: `/document-recipient?document_id=${id}`})}
            >
              Document Create
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={STYLES.div}>
            <span className={STYLES.span}>Created by</span>
            <p className="text-sm">
              {data.data.user_id.first_name} {data.data.user_id.last_name}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className={STYLES.div}>
              <span className={STYLES.span}>Created at</span>
              <p className="text-sm">
                {dayjs(data.data.created_at).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
            <div className={STYLES.div}>
              <span className={STYLES.span}>Last modified</span>
              <p className="text-sm">
                {dayjs(data.data.updated_at).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
