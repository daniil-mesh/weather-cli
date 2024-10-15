export const Key = {
  h: 'h',
  s: 's',
  t: 't',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export type StorageKey = typeof Key.s | typeof Key.t;
