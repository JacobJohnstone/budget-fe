export const SPACING_UNIT_PX = 4 as const

export const spacingPx = {
	0: 0,
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	8: 32,
	10: 40,
	12: 48,
	16: 64,
	20: 80,
	24: 96,
} as const

export const spacingRem = {
	0: "0rem",
	1: "0.25rem",
	2: "0.5rem",
	3: "0.75rem",
	4: "1rem",
	5: "1.25rem",
	6: "1.5rem",
	8: "2rem",
	10: "2.5rem",
	12: "3rem",
	16: "4rem",
	20: "5rem",
	24: "6rem",
} as const

export type SpacingStep = keyof typeof spacingPx
