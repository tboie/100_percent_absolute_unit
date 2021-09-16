export type T = {
  i: number;
  t: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  sW?: number;
  sH?: number;
  c?: string[];
  e?: boolean;
  m?: T[];
};

export default {
  t: "space",
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  z: 0,
  m: [
    {
      t: "space",
      x: 0,
      y: 0,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "space",
      x: 50,
      y: 0,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "space",
      x: 0,
      y: 50,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "space",
      x: 50,
      y: 50,
      w: 50,
      h: 50,
      z: 1,
    },
  ],
} as T;
