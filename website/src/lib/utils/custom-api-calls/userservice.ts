import axiosInstance from "../axiosinstance";

export class UserService {
  static async getCurrentUser(token: string): Promise<{ userData: any, statusCode: number }> {
    const response = await axiosInstance.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      userData: response.data,
      statusCode: response.status
    };
  }

  static async updateCurrentUser(token: string, userData: any): Promise<{ data: any, statusCode: number }> {
    const response = await axiosInstance.patch('/users/me', userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      data: response.data,
      statusCode: response.status
    };
  }

  static async getUserById(token: string, id: string): Promise<{ data: any, statusCode: number }> {
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      data: response.data,
      statusCode: response.status
    };
  }

  static async updateUserById(token: string, id: string, userData: any): Promise<{ data: any, statusCode: number }> {
    const response = await axiosInstance.patch(`/users/${id}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      data: response.data,
      statusCode: response.status
    };
  }

  static async deleteUserById(token: string, id: string): Promise<{ statusCode: number }> {
    const response = await axiosInstance.delete(`/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      statusCode: response.status,
    };
  }
}
