import STYLE from "./ABSOLUTE_UNIT.module.scss";
import { useState } from "react";

export type TYPE_ABSOLUTE_UNIT = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  sW?: number;
  sH?: number;
  c?: string[];
  e?: boolean;
  m?: TYPE_ABSOLUTE_UNIT[];
};

const ABSOLUTE_UNIT = (p: TYPE_ABSOLUTE_UNIT) => {
  const [e, sE] = useState(!!p.e);
  const { i, x, y, w, h, z, sW, sH, c, m } = p;
  return (
    <div
      className={STYLE.ABSOLUTE_UNIT}
      style={{
        transform: `translate(${x * 2}%, ${y * 2}%)`,
        width: `${w}%`,
        height: `${h}%`,
        zIndex: z || 0,
      }}
    >
      {p.m?.map((m, idx) => (
        <ABSOLUTE_UNIT key={m.i + idx} {...m} />
      ))}
    </div>
  );
};

export default ABSOLUTE_UNIT;
