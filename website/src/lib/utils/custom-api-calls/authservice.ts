import axiosInstance from "../axiosinstance";



export class AuthService {
  static async jwtLogin(username: string, password: string): Promise<{ accessToken: string, tokenType: string }> {
    const response = await axiosInstance.post('/auth/jwt/login', new URLSearchParams({
      username,
      password
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return {
      accessToken: response.data.access_token,
      tokenType: response.data.token_type
    };
  }

  static async jwtLogout(token: string | undefined): Promise<void> {
    await axiosInstance.post('/auth/jwt/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  static async register(email: string, password: string): Promise<void> {
    await axiosInstance.post('/auth/register', { email, password });
  }

  static async forgotPassword(email: string): Promise<void> {
    await axiosInstance.post('/auth/forgot-password', { email });
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    await axiosInstance.post('/auth/reset-password', { token, password });
  }

  static async requestVerifyToken(email: string): Promise<void> {
    await axiosInstance.post('/auth/request-verify-token', { email });
  }

  static async verify(token: string): Promise<void> {
    await axiosInstance.post('/auth/verify', { token });
  }
}

