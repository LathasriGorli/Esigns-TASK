import { $fetch } from "../fetch";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export async function getAuthUrl(): Promise<{ url: string }> {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "create delete read update",
    state: "OAuth",
  }).toString();

  const response = await $fetch.get(`/oauth/client-authorize?${queryParams}`);
  if (!response.success) {
    throw new Error("Failed to get authorization URL");
  }

  return response.data;
}

export async function getAccessToken(code: string): Promise<TokenResponse> {
  try{
    const response = await $fetch.postUrlEncoded("/oauth/token", {
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
    });
    return response.data;
  }
  catch (error) {
    console.error("getAccessToken error:", error);
    throw error;
  }
}
