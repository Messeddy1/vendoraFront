export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface Permission {
  id: string;
  label: string;
  module: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  permissions: string[];
  userIds: number[];
}

export type TabType = "roles" | "permissions";
