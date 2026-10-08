import { useCallback, useEffect, useState } from "react";
import Roles from "./components/Roles";
import type { Permission, Role, TabType } from "./core/Module";
import Permissions from "./components/Permissions";
import TabsSwitcher from "@/Components/TabsSwitcher";
// import { PlusIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { getRolesPermissions } from "./core/_requests";
import { toast } from "sonner";

export default function Index() {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<TabType>("roles");
  // const [roles, setRoles] = useState<Role[]>([]);
  const { data, status } = useAppSelector((state) => state.RolesPermissions);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  console.log("data", data);
  const fetchRoles = useCallback(async () => {
    try {
      await dispatch(getRolesPermissions());
      toast.success("Roles fetched successfully");
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [dispatch]);
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);
  // function togglePermission(permId: string) {
  //   setRoles((prev) =>
  //     prev.map((r) => {
  //       if (r.id !== selectedRoleId) return r;
  //       const has = r.permissions.includes(permId);
  //       return {
  //         ...r,
  //         permissions: has
  //           ? r.permissions.filter((p) => p !== permId)
  //           : [...r.permissions, permId],
  //       };
  //     }),
  //   );
  // }
  const allPermissions = [
    ...new Map(
      (data || [])
        .flatMap((r: Role) => r.permissions as unknown as Permission[])
        .map((p: Permission) => [p.id, p]),
    ).values(),
  ];
  const tabs = [
    {
      value: "roles",
      label: "Roles",
      count: data?.length,
    },
    {
      value: "permissions",
      label: "Permissions",
      count: allPermissions.length,
    },
  ] satisfies readonly {
    value: TabType;
    label: string;
    count?: number;
  }[];
  if (status === "PENDING") {
    return <div>Loading...</div>;
  }
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
        {/* {tab === "roles" && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 flex items-center">
            <PlusIcon className="w-4 h-4 mr-2" /> New Role
          </button>
        )} */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        <TabsSwitcher tabs={tabs} activeTab={tab} onChange={setTab} />
      </div>

      {/* ── ROLES TAB ── */}
      {tab === "roles" && (
        <Roles
          roles={data || []}
          expandedRole={expandedRole}
          setExpandedRole={setExpandedRole}
          fetchRoles={fetchRoles}
        />
      )}

      {/* ── PERMISSIONS TAB ── */}
      {tab === "permissions" && <Permissions roles={data || []} />}
    </div>
  );
}
