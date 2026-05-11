import { useState } from "react";
import Roles from "./components/Roles";
import type { Permission, Role, TabType, User } from "./core/Module";
import Permissions from "./components/Permissions";
import TabsSwitcher from "@/Components/TabsSwitcher";
import {  PlusIcon } from "lucide-react";

const ALL_USERS: User[] = [
  { id: 1, name: "Alice Martin", email: "alice@company.com", avatar: "AM" },
  { id: 2, name: "Bob Chen", email: "bob@company.com", avatar: "BC" },
  { id: 3, name: "Sara Johnson", email: "sara@company.com", avatar: "SJ" },
  { id: 4, name: "Omar Khalid", email: "omar@company.com", avatar: "OK" },
  { id: 5, name: "Lena Müller", email: "lena@company.com", avatar: "LM" },
  { id: 6, name: "James Wright", email: "james@company.com", avatar: "JW" },
  { id: 7, name: "Yuki Tanaka", email: "yuki@company.com", avatar: "YT" },
  { id: 8, name: "Fatima El-Amin", email: "fatima@company.com", avatar: "FE" },
  { id: 9, name: "Carlos Reyes", email: "carlos@company.com", avatar: "CR" },
  { id: 10, name: "Nina Petrov", email: "nina@company.com", avatar: "NP" },
];

const PERMISSIONS: Permission[] = [
  { id: "users.read", label: "Read Users", module: "Users" },
  { id: "users.write", label: "Write Users", module: "Users" },
  { id: "users.delete", label: "Delete Users", module: "Users" },
  { id: "roles.manage", label: "Manage Roles", module: "Roles" },
  { id: "settings.manage", label: "Manage Settings", module: "Settings" },
  { id: "billing.manage", label: "Manage Billing", module: "Billing" },
  { id: "reports.read", label: "Read Reports", module: "Reports" },
  { id: "audit.read", label: "Read Audit Logs", module: "Audit" },
  { id: "content.read", label: "Read Content", module: "Content" },
  { id: "content.write", label: "Write Content", module: "Content" },
  { id: "media.upload", label: "Upload Media", module: "Media" },
];

const MODULES: string[] = [...new Set(PERMISSIONS.map((p) => p.module))];

const INITIAL_ROLES: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    createdAt: "Jan 12, 2024",
    permissions: PERMISSIONS.map((p) => p.id),
    userIds: [1, 2],
  },
  {
    id: 2,
    name: "vendor",
    createdAt: "Jan 15, 2024",
    permissions: [
      "users.read",
      "users.write",
      "roles.manage",
      "settings.manage",
      "reports.read",
    ],
    userIds: [3, 4, 5],
  },
  {
    id: 4,
    name: "costomer",
    createdAt: "Feb 10, 2024",
    permissions: ["content.read", "content.write", "media.upload"],
    userIds: [8],
  },
];

export default function Index() {
  const [tab, setTab] = useState<TabType>("roles");
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(
    INITIAL_ROLES[0].id,
  );

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  function togglePermission(permId: string) {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id !== selectedRoleId) return r;
        const has = r.permissions.includes(permId);
        return {
          ...r,
          permissions: has
            ? r.permissions.filter((p) => p !== permId)
            : [...r.permissions, permId],
        };
      }),
    );
  }

  function toggleAllInModule(mod: string) {
    const modPerms = PERMISSIONS.filter((p) => p.module === mod).map(
      (p) => p.id,
    );
    const allChecked = modPerms.every((p) =>
      selectedRole?.permissions.includes(p),
    );
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id !== selectedRoleId) return r;
        if (allChecked)
          return {
            ...r,
            permissions: r.permissions.filter((p) => !modPerms.includes(p)),
          };
        return {
          ...r,
          permissions: [...new Set([...r.permissions, ...modPerms])],
        };
      }),
    );
  }

  function toggleUser(roleId: number, userId: number) {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id !== roleId) return r;
        const has = r.userIds.includes(userId);
        return {
          ...r,
          userIds: has
            ? r.userIds.filter((u) => u !== userId)
            : [...r.userIds, userId],
        };
      }),
    );
  }
  const tabs = [
    {
      value: "roles",
      label: "Roles",
      count: roles.length,
    },
    {
      value: "permissions",
      label: "Permissions",
      count: PERMISSIONS.length,
    },
  ] satisfies readonly {
    value: TabType;
    label: string;
    count?: number;
  }[];
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-system">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Roles & Permissions
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage access control for your application
          </p>
        </div>
        {tab === "roles" &&
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 flex items-center">
           <PlusIcon className="w-4 h-4 mr-2" /> New Role
        </button>
      }
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        <TabsSwitcher tabs={tabs} activeTab={tab} onChange={setTab} />
      </div>

      {/* ── ROLES TAB ── */}
      {tab === "roles" && (
        <Roles
          roles={roles}
          expandedRole={expandedRole}
          setExpandedRole={setExpandedRole}
          ALL_USERS={ALL_USERS}
          toggleUser={toggleUser}
        />
      )}

      {/* ── PERMISSIONS TAB ── */}
      {tab === "permissions" && (
        <Permissions
          roles={roles}
          PERMISSIONS={PERMISSIONS}
          MODULES={MODULES}
          selectedRoleId={selectedRoleId}
          selectedRole={selectedRole}
          togglePermission={togglePermission}
          toggleAllInModule={toggleAllInModule}
          setSelectedRoleId={setSelectedRoleId}
        />
      )}
    </div>
  );
}
