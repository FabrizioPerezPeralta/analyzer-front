import { postJson } from "@/services/http";

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  token: string;
}

export const registerUser = (payload: AuthPayload) =>
  postJson<AuthResponse>("/api/auth/register", payload);

export const loginUser = (payload: AuthPayload) =>
  postJson<AuthResponse>("/api/auth/login", payload);
