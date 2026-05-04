import { getJson } from "@/services/http";

export interface User {
  id: string;
  username: string;
  isActive: boolean;
  createdAt: string;
}

export const getUsers = () => getJson<User[]>("/api/users");
