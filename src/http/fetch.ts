import Cookies from "js-cookie";
import { prepareURLEncodedParams } from "./prepareURLEncodedParams";

interface IAPIResponse {
  success: boolean;
  status: number;
  data: any;
}
class FetchService {
  authStatusCodes: Array<number> = [401, 403];
  authErrorURLs: Array<string> = [
    "/signin",
    "/signup",
    "/verify",
    "/companySignup",
    "/auth/verify",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/checkUser/",
    "auth/forgot-password/verify",
    "/settings/password-settings",
    "user_types",
  ];

  private _fetchType: string;
  constructor(fetchTypeValue = "json") {
    this._fetchType = fetchTypeValue;
  }

  configureAuthorization(config: any) {
    let accessToken = "";
    accessToken += Cookies.get("token");
    config.headers["Authorization"] = accessToken;
  }
  setHeader(config: any) {
    config.headers = {};
  }
  setDefaultHeaders(config: any) {
    config.headers = {
      "Content-Type": "application/json",
    };
  }

  checkToLogOutOrNot(path: string) {
    return this.authErrorURLs.some((arrayUrl: string) =>
      path.includes(arrayUrl)
    );
  }
  isAuthRequest(path: string) {
    return this.authErrorURLs.includes(path);
  }

  async hit(...args: any): Promise<IAPIResponse> {
    const [path, config] = args;
    this.setDefaultHeaders(config);

    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config);
    }

    const url = import.meta.env.VITE_PUBLIC_API_URL + path;

    const response: any = await fetch(url, config);

    if (!response.ok) {
      if (
        this.authStatusCodes.includes(response.status) &&
        !this.checkToLogOutOrNot(path)
      ) {
        Cookies.remove("token");
        window.location.replace("/signin");
        throw {
          success: false,
          status: response.status,
          data: await response.json(),
        };
      }
      const err: any = new Error(response.statusText);
      err.data = await response.json();
      err.status = response.status;
      throw err;
    }

    if (this._fetchType == "response") {
      return response;
    } else {
      return {
        success: true,
        status: response.status,
        data: await response.json(),
      };
    }
  }
  async post(url: string, payload?: any) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : undefined,
    });
  }
  async postFormData(url: string, file?: File) {
    return await this.hit(url, {
      method: "POST",
      body: file,
    });
  }

  async get(url: string, queryParams = {}) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams);
    }
    return await this.hit(url, {
      method: "GET",
    });
  }
  async delete(url: string, payload?: any) {
    return this.hit(url, {
      method: "DELETE",
      body: payload ? JSON.stringify(payload) : null,
    });
  }
  async deleteWithOutPayload(url: string) {
    return this.hit(url, {
      method: "DELETE",
    });
  }
  async put(url: string, payload?: any) {
    return this.hit(url, {
      method: "PUT",
      body: payload ? JSON.stringify(payload) : null,
    });
  }
  async patch(url: string, payload?: any) {
    return this.hit(url, {
      method: "PATCH",
      body: payload ? JSON.stringify(payload) : null,
    });
  }
}
export const $fetch = new FetchService();
export const $fetchResponse = new FetchService("response");
