import type { User } from "@/Pages/Auth/cors/_Modules";


export interface Permission {
  id: string;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  permissions: string[];
  users: User[];
}

export type TabType = "roles" | "permissions";
