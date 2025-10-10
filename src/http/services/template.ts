import { $fetch } from "../fetch";

export const getAllTemplatesAPI = async ({ queryParams }: { queryParams: any}) => {
    return await $fetch.get(`/api/templates-v2?${new URLSearchParams(queryParams)}`);
};