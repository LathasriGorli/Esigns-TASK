import { useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import { DocumentRecipient } from "./DocumentRecipient";

export function DocumentRecipientsPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('document_id');
    if (!id) return toast.error("Missing document id");

  return (
    <div className="p-4">
      <DocumentRecipient
        documentId={id}
      />
    </div>
  );
}
