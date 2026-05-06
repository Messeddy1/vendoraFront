import { User, Settings, Key, Package, Home } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "User Info",
        href: "/profile/info",
        icon: Settings,
      },
      {
        label: "Change Password",
        href: "/profile/password",
        icon: Key,
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
];