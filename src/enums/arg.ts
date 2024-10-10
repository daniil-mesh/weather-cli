export const Arg = {
  s: 's',
  h: 'h',
  t: 't',
} as const;

export type Arg = (typeof Arg)[keyof typeof Arg];
