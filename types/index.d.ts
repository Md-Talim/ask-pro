export type Theme = "light" | "dark" | "system";

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps extends SearchParamsProps {
  params: { id: string };
}
