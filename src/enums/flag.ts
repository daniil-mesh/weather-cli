export const Flag = {
  s: 's',
  h: 'h',
} as const;

export type Flag = (typeof Flag)[keyof typeof Flag];
