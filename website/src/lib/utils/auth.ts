import axios from "axios";

const AUTH_URL = "http://127.0.0.1:8000/api"


const authClient = axios.create({
  baseURL: AUTH_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})


export async function OAuthAuthorize() {
  try {
    const response = authClient.get('/auth/google/authorize', {
      timeout: 5000
    })

    console.log(response);

    return response;

  } catch (error) {
    console.error(error);
    throw error;
  }
}








