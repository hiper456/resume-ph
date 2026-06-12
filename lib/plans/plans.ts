export const PLAN_CONFIG = {
  basic: {
    code: "basic",
    name: "Basic",
    price: 99,
  },
  professional: {
    code: "professional",
    name: "Professional",
    price: 199,
  },
  executive: {
    code: "executive",
    name: "Executive",
    price: 399,
  },
} as const;

export type PlanCode = keyof typeof PLAN_CONFIG;

export function isPlanCode(value: unknown): value is PlanCode {
  return value === "basic" || value === "professional" || value === "executive";
}

export function getPlanConfig(planCode: PlanCode) {
  return PLAN_CONFIG[planCode];
}