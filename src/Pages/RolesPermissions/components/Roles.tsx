import React from 'react'
import type { Role, User } from '../core/Module';
import { Avatar, Badge, Checkbox } from '../Helpers/utils';
interface Props {
roles: Role[];
expandedRole: number | null;
setExpandedRole: React.Dispatch<React.SetStateAction<number | null>>;
ALL_USERS: User[];
toggleUser: (roleId: number, userId: number) => void;
}
export default function Roles({roles, expandedRole, setExpandedRole,ALL_USERS, toggleUser}: Props) {
  return (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {["Role", "Permissions", "Users", "Created", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-500 border-b border-gray-200"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                const isOpen = expandedRole === role.id;
                return (
                  <>
                    {/* Role row */}
                    <tr
                      key={role.id}
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
                              transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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
                          {role.userIds.length}
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

                    {/* Expanded: user list */}
                    {isOpen && (
                      <tr key={`${role.id}-expanded`}>
                        <td
                          colSpan={5}
                          className="p-0 bg-gray-50 border-b border-gray-200"
                        >
                          <div className="p-6">
                            <p className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Assigned Users
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                              {ALL_USERS.map((user) => {
                                const assigned = role.userIds.includes(user.id);
                                return (
                                  <div
                                    key={user.id}
                                    onClick={() => toggleUser(role.id, user.id)}
                                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                                      assigned
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 bg-white"
                                    }`}
                                  >
                                    <Checkbox
                                      checked={assigned}
                                      onChange={() => {}}
                                    />
                                    <Avatar initials={user.avatar} size={28} />
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
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
  )
}
