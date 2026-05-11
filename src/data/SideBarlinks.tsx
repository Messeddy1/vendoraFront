import { User, Settings, Key, Package, Shield, Users, BarChart } from "lucide-react";

export const getSidebarLinks = (role:string|null) => {
  const baseLinks = [
    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
    },
    {
      label: "Settings",
      icon: Settings,
      children: [
        {
          label: "User Info",
          href: "/admin/profile/info",
          icon: Settings,
        },
        {
          label: "Change Password",
          href: "/admin/profile/password",
          icon: Key,
        },
      ],
    },
  ];

  const vendorLinks = [
    {
      label: "My Products",
      href: "/admin/vendor/products",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/admin/vendor/orders",
      icon: BarChart,
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: Shield,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "All Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "All Orders",
      href: "/admin/orders",
      icon: BarChart,
    },
    {
      label: "All Vendors",
      href: "/admin/vendors",
      icon: Users,
    },
    {
      label: "All Categories",
      href: "/admin/categories",
      icon: Package,
    },
    {
      label: "Roles & Permissions",
      href: "/admin/roles-permissions",
      icon: Shield,
    },
  ];

  // ✅ role logic
  if (role === "superadmin") {
    return [...baseLinks, ...adminLinks];
  }

  if (role === "vendor") {
    return [...baseLinks, ...vendorLinks];
  }

  return baseLinks; // customer
};