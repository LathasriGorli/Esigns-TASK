import { Mail, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { DocumentRecipientFormProps } from "@/http/interfaces/document";

export function DocumentRecipientForm({
  recipients,
  addRecipient,
  removeRecipient,
  updateRecipient,
  emailSubject,
  emailNotes,
  setEmailSubject,
  setEmailNotes,
  currentUserAsSigner,
}: DocumentRecipientFormProps) {
  const INPUT_STYLES = {
    input:
      "w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus-visible:ring-0",
    label: "block text-sm font-medium mb-1",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Mail size={20} />
          Additional Recipients
        </h3>
        <Button
          onClick={addRecipient}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Recipient
        </Button>
      </div>

      <div className="space-y-4">
        {recipients.map((recipient, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 border rounded-lg"
          >
            <div className="flex-1 space-y-3">
              <div className="space-y-4">
                <div>
                  <Label className={INPUT_STYLES.label}>Email Subject</Label>
                  <Input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className={INPUT_STYLES.input}
                  />
                </div>
                <div>
                  <Label className={INPUT_STYLES.label}>Email Notes</Label>
                  <Textarea
                    value={emailNotes}
                    onChange={(e) => setEmailNotes(e.target.value)}
                    placeholder="Add any notes for the recipients"
                    rows={3}
                    className={`resize-none ${INPUT_STYLES.input}`}
                  />
                </div>
              </div>

              <div>
                <Label
                  className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}
                >
                  Email
                </Label>
                <Input
                  type="email"
                  value={recipient.email}
                  onChange={(e) =>
                    updateRecipient(index, "email", e.target.value)
                  }
                  placeholder="recipient@example.com"
                  className={INPUT_STYLES.input}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label
                    className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    value={recipient.first_name}
                    onChange={(e) =>
                      updateRecipient(index, "first_name", e.target.value)
                    }
                    placeholder="recipient first name"
                    className={INPUT_STYLES.input}
                  />
                </div>
                <div>
                  <Label
                    className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    value={recipient.last_name}
                    onChange={(e) =>
                      updateRecipient(index, "last_name", e.target.value)
                    }
                    placeholder="recipient last name"
                    className={INPUT_STYLES.input}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  RECEIVER_{currentUserAsSigner ? index + 1 : index}
                </span>
              </div>
            </div>

            {recipients.length > 1 && (
              <Button
                onClick={() => removeRecipient(index)}
                className="bg-red-50 hover:bg-red-100 text-red-600 border-none mt-8 p-2"
              >
                <Trash2 size={18} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
