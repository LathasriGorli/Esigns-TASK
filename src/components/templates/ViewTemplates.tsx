import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { getTemplateByIdAPI } from "@/http/services/template";

export function ViewTemplate() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: () => getTemplateByIdAPI(id!),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading template...</div>;
  if (isError) return toast.error(error.message);

  const template = data?.data;

  const STYLES = {
    span: "text-neutral-400 text-xs",
    div: "flex flex-col",
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-medium mb-4">Template Details</h2>

      <div className="border flex flex-col gap-2 w-250 mx-auto p-3 rounded-sm bg-white">
        <div className="flex items-center justify-between">
          <p className="capitalize">{template?.title}</p>
          <div className="flex items-center gap-6">
            <p>{template?.status}</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-600 rounded font-normal p-2 cursor-pointer"
              onClick={() =>
                navigate({
                  to: `/document-recipient?document_id=${template?._id}`,
                })
              }
            >
              Document Create
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={STYLES.div}>
            <span className={STYLES.span}>Created by</span>
            <p className="text-sm">
              {template?.user_id.first_name} {template?.user_id.last_name}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className={STYLES.div}>
              <span className={STYLES.span}>Created at</span>
              <p className="text-sm">
                {dayjs(template?.created_at).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
            <div className={STYLES.div}>
              <span className={STYLES.span}>Last modified</span>
              <p className="text-sm">
                {dayjs(template?.updated_at).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
