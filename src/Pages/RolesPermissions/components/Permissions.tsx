import React from 'react'
import type { Permission, Role } from '../core/Module';
import { Checkbox } from '../Helpers/utils';
interface Props {
    roles: Role[]
    PERMISSIONS: Permission[]
    MODULES: string[]
    selectedRoleId: number
    selectedRole: Role | undefined
    togglePermission: (permId: string) => void
    toggleAllInModule: (mod: string) => void
    setSelectedRoleId: React.Dispatch<React.SetStateAction<number>>
}
export default function Permissions({roles,selectedRoleId,selectedRole,togglePermission,toggleAllInModule,setSelectedRoleId,PERMISSIONS,MODULES}: Props) {
  return (
        <div>
          {/* Role selector */}
          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Role:
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white cursor-pointer focus:outline-blue-500 focus:outline-2 focus:outline-offset-1 min-w-45"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              {selectedRole?.permissions.length} / {PERMISSIONS.length}{" "}
              permissions enabled
            </span>
          </div>

          {/* Permissions checklist grouped by module */}
          <div className="space-y-3">
            {MODULES.map((mod) => {
              const modPerms = PERMISSIONS.filter((p) => p.module === mod);
              const allChecked = modPerms.every((p) =>
                selectedRole?.permissions.includes(p.id),
              );
              return (
                <div
                  key={mod}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Module header */}
                  <div
                    onClick={() => toggleAllInModule(mod)}
                    className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Checkbox checked={allChecked} onChange={() => {}} />
                    <span className="font-semibold text-sm text-gray-700">
                      {mod}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {
                        modPerms.filter((p) =>
                          selectedRole?.permissions.includes(p.id),
                        ).length
                      }
                      /{modPerms.length}
                    </span>
                  </div>
                  {/* Permission rows */}
                  {modPerms.map((perm, i) => {
                    const checked = selectedRole?.permissions.includes(perm.id);
                    return (
                      <div
                        key={perm.id}
                        onClick={() => togglePermission(perm.id)}
                        className={`flex items-center gap-3 px-5 py-3 pl-16 cursor-pointer transition-colors ${
                          i < modPerms.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        } hover:bg-gray-50`}
                      >
                        <Checkbox
                          checked={checked || false}
                          onChange={() => {}}
                        />
                        <span className="text-sm font-medium text-gray-700 flex-1">
                          {perm.label}
                        </span>
                        <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded font-mono">
                          {perm.id}
                        </code>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Save button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
              Save Changes
            </button>
          </div>
        </div>
  )
}
