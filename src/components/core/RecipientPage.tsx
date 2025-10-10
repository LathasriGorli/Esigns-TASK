import { useLocation } from "@tanstack/react-router";
import { DocumentRecipient } from "./DocumentRecipient";

export function DocumentRecipientsPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('document_id');
    if (!id) return <div>Invalid document ID</div>;

  return (
    <div className="p-4">
      <DocumentRecipient
        documentId={id}
      />
    </div>
  );
}
