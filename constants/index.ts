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
