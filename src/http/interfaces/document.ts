export interface DocumentUser {
    email: string;
    first_name: string;
    last_name: string;
    value: string;
  }
  
  export interface SendDocumentPayload {
    company_id: string;
    email_subject?: string;
    email_notes?: string;
    document_users: Array<DocumentUser>;
    enforce_signature_order: boolean;
    title: string;
  }

  export interface Recipient {
    email: string;
    first_name: string;
    last_name: string;
  }
  
  export interface DocumentRecipientFormProps {
    recipients: Array<Recipient>;
    addRecipient: () => void;
    removeRecipient: (index: number) => void;
    updateRecipient: (index: number, field: string, value: string) => void;
    emailSubject: string;
    emailNotes: string;
    setEmailSubject: (val: string) => void;
    setEmailNotes: (val: string) => void;
    currentUserAsSigner: boolean;
  }