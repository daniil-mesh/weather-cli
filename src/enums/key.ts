export const Key = {
  s: 's',
  h: 'h',
  t: 't',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export type StorageKey = typeof Key.s | typeof Key.t;
