export type T = {
  t: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  m?: T[];
};

export default {
  t: "s",
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  z: 0,
  m: [
    {
      t: "s",
      x: 0,
      y: 0,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "s",
      x: 50,
      y: 0,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "s",
      x: 0,
      y: 50,
      w: 50,
      h: 50,
      z: 1,
    },
    {
      t: "s",
      x: 50,
      y: 50,
      w: 50,
      h: 50,
      z: 1,
    },
  ],
} as T;
