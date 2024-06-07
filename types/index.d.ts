export type Theme = "light" | "dark" | "system";

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
