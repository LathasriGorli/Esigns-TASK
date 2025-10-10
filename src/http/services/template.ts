import { $fetch } from "../fetch";
import type { TemplateResponse, TemplatesResponse } from "../interfaces/template";

export const getTemplatesAPI = async (
  page: number,
  pageSize: number
): Promise<TemplatesResponse> => {
  try {
    const queryParams = {
      company_id: import.meta.env.VITE_COMPANY_ID,
      page,
      page_size: pageSize,
    };
    const response = await $fetch.get("/api/templates-v2", queryParams);
    const templatesResponse: TemplatesResponse = {
      data: (response as any).data?.data ?? [],
      pagination: (response as any).data?.pagination ?? {
        page: 1,
        total_pages: 1,
      },
    };
    return templatesResponse;
  } catch (error) {
    console.error("getTemplatesAPI error:", error);
    throw error;
  }
};

export const getTemplateByIdAPI = async (
  id: string
): Promise<TemplateResponse> => {
  try {
    const companyId = import.meta.env.VITE_COMPANY_ID;
    const response = await $fetch.get(`/api/company-documents-v2/${id}`, {
      company_id: companyId,
    });
    const templateResponse: TemplateResponse = {
      data: (response as any).data?.data ?? {},
    }
    return templateResponse;
  } catch (error) {
    console.error("getTemplateByIdAPI error:", error);
    throw error;
  }
};
