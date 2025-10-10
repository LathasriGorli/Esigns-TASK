import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Mail, Plus, Trash2, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export function DocumentRecipient({ documentId }: { documentId: string }) {
  const navigate = useNavigate()
  const companyId = import.meta.env.VITE_COMPANY_ID
  const [recipients, setRecipients] = useState([
    { email: '', first_name: '', last_name: '', role: 'SIGNER' },
  ])
  const [currentUserAsSigner, setCurrentUserAsSigner] = useState(true)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailNotes, setEmailNotes] = useState('')

  const { data: templateData, isLoading } = useQuery({
    queryKey: ['template', documentId],
    queryFn: async () => {
      const token = localStorage.getItem('esigns_access_token')
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/company-documents-v2/${documentId}?company_id=${companyId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) throw new Error('Failed to fetch template')
      return response.json()
    },
    retry: false,
    enabled: !!documentId,
    refetchOnWindowFocus: false,
  })

  const userData = templateData?.data?.user_id

  const createDocumentMutation = useMutation({
    mutationFn: async (payload: any) => {
      const token = localStorage.getItem('esigns_access_token')
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/company-documents-v2/${documentId}/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      )
      if (!response.ok) throw new Error('Failed to create and send document')
      return response.json()
    },
    onSuccess: () => {
      if (documentId) {
        navigate({
          to: `/sent-document`,
        })
      } else {
        alert('Document created but ID not found')
      }
    },
    onError: (error: any) => {
      alert(`Error: ${error.message}`)
    },
  })

  const addRecipient = () => {
    setRecipients([
      ...recipients,
      { email: '', first_name: '', last_name: '', role: 'SIGNER' },
    ])
  }

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, id) => id !== index))
    }
  }

  const updateRecipient = (index: number, field: string, value: string) => {
    const updated = [...recipients]
    updated[index] = { ...updated[index], [field]: value }
    setRecipients(updated)
  }

  const handleSendDocument = async () => {
    const invalidRecipients = recipients.filter(
      (role) => !role.email || !role.email.includes('@'),
    )
    if (invalidRecipients.length > 0) {
      alert('Please enter valid email addresses for all recipients')
      return
    }
    const allRecipients = []
    if (currentUserAsSigner && userData) {
      allRecipients.push({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        value: 'SENDER',
      })
    }

    recipients.forEach((recipient, index) => {
      const receiverNumber = currentUserAsSigner ? index + 1 : index
      allRecipients.push({
        email: recipient.email,
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        value: `RECEIVER_${receiverNumber}`,
      })
    })

    const payload = {
      company_id: companyId,
      email_subject: emailSubject,
      email_notes: emailNotes,
      document_users: allRecipients,
      enforce_signature_order: false,
      title: templateData?.data?.title,
    }

    try {
      await createDocumentMutation.mutateAsync(payload)
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  if (isLoading) return <div className="p-4">Loading...</div>

  const INPUT_STYLES = {
    input: "w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus-visible:ring-0",
    label: "block text-sm font-medium mb-1",
  }

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Send Document</h2>
        <p className="text-gray-600">
          Template: {templateData?.data?.title || 'Unknown'}
        </p>
      </div>

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
                : 'Me (Current User)'}
            </p>
            <p className="text-sm text-gray-600">
              {userData?.email || 'Loading...'}
            </p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            SENDER
          </span>
        </Label>
      </div>

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
                    <Label className={INPUT_STYLES.label}>
                      Email Subject (Optional)
                    </Label>
                    <Input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter email subject"
                      className={INPUT_STYLES.input}
                    />
                  </div>
                  <div>
                    <Label className={INPUT_STYLES.label}>
                      Email Notes (Optional)
                    </Label>
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
                  <Label className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}>
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={recipient.email}
                    onChange={(e) =>
                      updateRecipient(index, 'email', e.target.value)
                    }
                    placeholder="recipient@example.com"
                    className={INPUT_STYLES.input}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}>
                      First Name
                    </Label>
                    <Input
                      type="text"
                      value={recipient.first_name}
                      onChange={(e) =>
                        updateRecipient(index, 'first_name', e.target.value)
                      }
                      placeholder="recipient first name"
                      className={INPUT_STYLES.input}
                    />
                  </div>
                  <div>
                    <Label className={`${INPUT_STYLES.label} after:content-['_*'] after:text-red-500`}>
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      value={recipient.last_name}
                      onChange={(e) =>
                        updateRecipient(index, 'last_name', e.target.value)
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

      <div className="flex gap-3 justify-end">
        <Button
          onClick={() => navigate({ to: '/document-recipient' })}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSendDocument}
          disabled={createDocumentMutation.isPending}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
        >
          {createDocumentMutation.isPending ? 'Sending...' : 'Send Document'}
        </Button>
      </div>
    </div>
  )
}
