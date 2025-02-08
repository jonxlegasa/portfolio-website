import { Dictionary } from "@builder.io/sdk-svelte/lib/browser/types/typescript";
import axiosInstance from "../axiosinstance";

export class OAuthService {
  static async googleAuthorize(scopes: string[]): Promise<{ authorizationUrl: string, statusCode: number }> {
    const params = new URLSearchParams();
    params.append('scopes', scopes.join(' '));

    const response = await axiosInstance.get('/auth/google/authorize', { params });

    return {
      authorizationUrl: response.data.authorization_url,
      statusCode: response.status
    };
  }

  static async associateGoogleAuthorize(token: string, scopes: string[]): Promise<{ authorizationUrl: string, statusCode: number }> {
    const params = new URLSearchParams();
    params.append('scopes', scopes.join(' '));

    const response = await axiosInstance.get('/auth/associate/google/authorize', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params
    });

    return {
      authorizationUrl: response.data.authorization_url,
      statusCode: response.status
    };
  }

  static async googleCallback(code: string | null, state: string | null): Promise<{ accessToken: string, tokenType: string, statusCode: number }> {
    if (!code || !state) {
      throw new Error('Missing code or state from Google callback');
    }

    let responsePayload: Dictionary<string> = {
      code: code,
      state: state
    }

    const response = await axiosInstance.get('/auth/google/callback', {
      params: responsePayload
    });

    return {
      accessToken: response.data.access_token,
      tokenType: response.data.token_type,
      statusCode: response.status
    };
  }
}
