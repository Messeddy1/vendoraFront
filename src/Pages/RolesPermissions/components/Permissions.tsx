import type { Permission, Role } from "../core/Module";

interface Props {
  roles: Role[];
}

const roleColors = [
  {
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    dot: "bg-purple-400",
  },
  {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-400",
  },
  {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-400",
  },
  {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-400",
  },
  {
    bg: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
    dot: "bg-pink-400",
  },
];

export default function Permissions({ roles }: Props) {
  return (
    <div className="space-y-4">
      {roles.map((role, i) => {
        const color = roleColors[i % roleColors.length];
        return (
          <div
            key={role.id}
            className={`rounded-xl border ${color.border} ${color.bg} p-5`}
          >
            {/* Role header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                <h3 className="text-sm font-bold text-gray-900 capitalize">
                  {role.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
                {role.permissions.length} permissions
              </span>
            </div>

            {/* Permissions badges */}
            {role.permissions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => {
                  const isString = typeof perm === "string";
                  const key = isString
                    ? perm
                    : (perm as unknown as Permission).id;
                  const label = isString
                    ? perm
                    : (perm as unknown as Permission).name;

                  return (
                    <span
                      key={key}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color.badge}`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No permissions assigned
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
