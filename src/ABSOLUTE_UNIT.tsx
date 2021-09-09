import STYLE from "./ABSOLUTE_UNIT.module.scss";

export type TYPE_ABSOLUTE_UNIT = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sW?: number;
  sH?: number;
  e?: string[];
  m?: TYPE_ABSOLUTE_UNIT[];
};

const ABSOLUTE_UNIT = (p: TYPE_ABSOLUTE_UNIT) => {
  return (
    <div
      className={STYLE.ABSOLUTE_UNIT}
      style={{
        transform: `translate(${p.x * 2}%,${p.y * 2}%)`,
        width: `${p.w}%`,
        height: `${p.h}%`,
      }}
    >
      {p.m?.map((m) => (
        <ABSOLUTE_UNIT {...m} />
      ))}
    </div>
  );
};

export default ABSOLUTE_UNIT;
