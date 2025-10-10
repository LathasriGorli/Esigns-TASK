import { CheckCircle} from "lucide-react";
import { Button } from "../ui/button";

export function SendDocument() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-green-600">
              Document Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              The document has been sent to all recipients. They will receive an email
              notification shortly.
            </p>
            <Button
              onClick={() => window.location.href = '/auth/callback'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Back to Templates
            </Button>
      </div>
    </div>
  );
}