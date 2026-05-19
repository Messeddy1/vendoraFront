import React from "react";
import type { Role } from "../core/Module";
import { Avatar, Badge } from "../Helpers/utils";
import { RefreshCcw } from "lucide-react";

interface Props {
  roles: Role[];
  expandedRole: number | null;
  setExpandedRole: React.Dispatch<React.SetStateAction<number | null>>;
  fetchRoles: () => Promise<void>;
}

export default function Roles({
  roles,
  expandedRole,
  setExpandedRole,
  fetchRoles,
}: Props) {
  console.log(roles);
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Roles</h2>
          <p className="text-xs text-gray-500">
            Manage roles and assigned users
          </p>
        </div>

        <button
          onClick={fetchRoles}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {["Role", "Permissions", "Users", "Created", "Actions"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => {
            const isOpen = expandedRole === role.id;

            return (
              <React.Fragment key={role.id}>
                {/* Role row */}
                <tr
                  onClick={() => setExpandedRole(isOpen ? null : role.id)}
                  className="cursor-pointer hover:bg-purple-50 transition-colors"
                >
                  <td className="px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar initials={role.name[0]} />

                      <span className="font-semibold text-sm text-gray-900">
                        {role.name}
                      </span>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-gray-600 transition-transform"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <path
                          d="M3 5l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </td>

                  <td className="px-5 py-3 border-b border-gray-100">
                    <Badge>{role.permissions.length}</Badge>
                  </td>

                  <td className="px-5 py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-700">
                      {role.users.length}
                    </span>
                  </td>

                  <td className="px-5 py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500">
                      {role.createdAt}
                    </span>
                  </td>

                  <td
                    className="px-5 py-3 border-b border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-gray-200 text-gray-600 rounded hover:bg-gray-100">
                        Edit
                      </button>

                      <button className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded */}
                {isOpen && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-0 bg-gray-50 border-b border-gray-200"
                    >
                      <div className="p-6">
                        <p className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Assigned Users
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                          {role.users.map((user) => {
                            // ✅ role.users, not roles?.users
                            const assigned = role.users.some(
                              (u) => u.id === user.id,
                            ); // always true here, but correct pattern

                            return (
                              <div
                                key={user.id}
                                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                                  assigned
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                <Avatar initials={user.name[0]} size={28} />
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {user.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
