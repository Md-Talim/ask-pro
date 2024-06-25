import { BADGE_CRITERIA } from "@/constants";

export type Theme = "light" | "dark" | "system";

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps extends SearchParamsProps {
  params: { id: string };
}

interface Criteria {
  type: keyof typeof BADGE_CRITERIA;
  count: number;
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
