import { $fetch } from "../fetch";
import type { SendDocumentPayload } from "../interfaces/document";

export const getDocumentByIdAPI = async (documentId: string) => {
  const companyId = import.meta.env.VITE_COMPANY_ID;

  try {
    const response = await $fetch.get(`/api/company-documents-v2/${documentId}`, {
      company_id: companyId,
    });
    return response;
  } catch (error) {
    console.error("getDocumentByIdAPI error:", error);
    throw error;
  }
};

export const sendDocumentAPI = async (
  documentId: string,
  payload: SendDocumentPayload
) => {
  try {
    const response = await $fetch.post(
      `/api/company-documents-v2/${documentId}/send`,
      payload
    );
    return response;
  } catch (error) {
    console.error("sendDocumentAPI error:", error);
    throw error;
  }
};
