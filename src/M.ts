export type T = {
  i?: number;
  t: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  sW?: number;
  sH?: number;
  c?: { t: number[]; r: number[]; b: number[]; l: number[] };
  e?: boolean;
  bp: ("sm" | "lg")[];
};

export default [
  {
    t: "s",
    x: 50,
    y: 0,
    w: 50,
    h: 50,
    z: 0,
    bp: ["sm"],
  },
  {
    t: "s",
    x: 50,
    y: 75,
    w: 25,
    h: 25,
    z: 0,
    bp: ["sm", "lg"],
  },
  /*
  {
    t: "s",
    x: 50,
    y: 0,
    w: 50,
    h: 50,
    z: 0,
  },
  {
    t: "s",
    x: 0,
    y: 50,
    w: 50,
    h: 50,
    z: 0,
  },
  {
    t: "s",
    x: 50,
    y: 50,
    w: 50,
    h: 50,
    z: 0,
  },*/
] as T[];
