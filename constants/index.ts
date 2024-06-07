import { Theme } from "@/types";

interface ThemeOption {
  label: string;
  value: Theme;
  icon: string;
}
export const themeOptions: ThemeOption[] = [
  { label: "Dark", value: "dark", icon: "/assets/icons/moon.svg" },
  { label: "Light", value: "light", icon: "/assets/icons/sun.svg" },
  { label: "System", value: "system", icon: "/assets/icons/computer.svg" },
];

interface SidebarLink {
  imageUrl: string;
  route: string;
  label: string;
}
export const sidebarLinks: SidebarLink[] = [
  {
    imageUrl: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imageUrl: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imageUrl: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imageUrl: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imageUrl: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imageUrl: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imageUrl: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];
