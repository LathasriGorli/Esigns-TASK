import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DocumentRecipientForm } from "./DocumentRecipientForm";
import { getDocumentByIdAPI, sendDocumentAPI } from "@/http/services/document";

export function DocumentRecipient({ documentId }: { documentId: string }) {
  const navigate = useNavigate();
  const companyId = import.meta.env.VITE_COMPANY_ID;
  const [recipients, setRecipients] = useState([
    { email: "", first_name: "", last_name: ""},
  ]);
  const [currentUserAsSigner, setCurrentUserAsSigner] = useState(true);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailNotes, setEmailNotes] = useState("");

  const { data: templateData, isLoading } = useQuery({
    queryKey: ["template", documentId],
    queryFn: () => getDocumentByIdAPI(documentId),
    enabled: !!documentId,
    retry:false,
    refetchOnWindowFocus: false
  });

  const userData = templateData?.data?.user_id;

  const createDocumentMutation = useMutation({
    mutationFn: (payload: any) => sendDocumentAPI(documentId, payload),
    onSuccess: () => navigate({ to: `/sent-document` }),
    onError: (error: any) => toast.error(error.data.message),
  });

  const addRecipient = () =>
    setRecipients([
      ...recipients,
      { email: "", first_name: "", last_name: "" },
    ]);

  const removeRecipient = (index: number) =>
    setRecipients(recipients.filter((_, id) => id !== index));

  const updateRecipient = (index: number, field: string, value: string) => {
    const updated = [...recipients];
    updated[index] = { ...updated[index], [field]: value };
    setRecipients(updated);
  };

  const handleSendDocument = async () => {
    const allRecipients: any = [];

    if (currentUserAsSigner && userData) {
      allRecipients.push({
        email: userData?.email,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        value: "SENDER",
      });
    }

    recipients.forEach((recipient, index) => {
      const receiverNumber = currentUserAsSigner ? index + 1 : index;
      allRecipients.push({
        ...recipient,
        value: `RECEIVER_${receiverNumber}`,
      });
    });

    const payload = {
      company_id: companyId,
      email_subject: emailSubject,
      email_notes: emailNotes,
      document_users: allRecipients,
      enforce_signature_order: false,
      title: templateData?.data?.data.title,
    };

    await createDocumentMutation.mutateAsync(payload);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
console.log(userData, 'sjdsh')
  return (
    <div className="p-2 max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Send Document</h2>
        <p className="text-gray-600">
          Template: {templateData?.data?.title || "Unknown"}
        </p>
      </div>

      {/* Primary signer section */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <User size={20} />
          Primary Signer
        </h3>
        <Label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <Input
            type="checkbox"
            checked={currentUserAsSigner}
            onChange={(e) => setCurrentUserAsSigner(e.target.checked)}
            className="w-4 h-4"
          />
          <div className="flex-1">
            <p className="font-medium">
              {userData
                ? `${userData.first_name} ${userData.last_name}`
                : "Me (Current User)"}
            </p>
            <p className="text-sm text-gray-600">
              {userData?.email || "Loading..."}
            </p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            SENDER
          </span>
        </Label>
      </div>

      <DocumentRecipientForm
        recipients={recipients}
        addRecipient={addRecipient}
        removeRecipient={removeRecipient}
        updateRecipient={updateRecipient}
        emailSubject={emailSubject}
        emailNotes={emailNotes}
        setEmailSubject={setEmailSubject}
        setEmailNotes={setEmailNotes}
        currentUserAsSigner={currentUserAsSigner}
      />

      <div className="flex gap-3 justify-end">
        <Button
          onClick={() => navigate({ to: "/document-recipient" })}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSendDocument}
          disabled={createDocumentMutation.isPending}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
        >
          {createDocumentMutation.isPending ? "Sending..." : "Send Document"}
        </Button>
      </div>
    </div>
  );
}
