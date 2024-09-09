import { TProvider } from "@/models/oauth.model";
import axios from "axios";
import qs from "qs";
import { httpClient } from "./apiClient";

export const requestKaKao = async (code: string, currentUri: string) => {
  const query = qs.stringify({
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirect_uri: currentUri,
    code: code
  });

  const response = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    query,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }
  );

  return response.data;
};

export const requestGoogle = async (code: string, currentUri: string) => {
  const query = qs.stringify({
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: currentUri,
    code: code
  });

  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    query
  );

  return response.data;
};

export const socialAuth = async (provider: TProvider) => {
  const response = await httpClient.post("/social-auth", { provider });

  return response.data;
};

export const socialSignup = async (
  email: string,
  nickname: string,
  provider: TProvider
) => {
  const response = await httpClient.post("/social-signup", {
    email,
    nickname,
    provider
  });

  return response.data;
};
