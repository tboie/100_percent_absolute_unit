import STYLE from "./ABSOLUTE_UNIT.module.scss";
import { useState } from "react";
import MATTER from "./MATTER";

export type TYPE_ABSOLUTE_UNIT = {
  i?: number;
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
  m?: TYPE_ABSOLUTE_UNIT[];
};

let DRAGGING = false;
let MOUSE_POS: undefined | { x: number; y: number } = undefined;

const ABSOLUTE_UNIT = (p: TYPE_ABSOLUTE_UNIT) => {
  const [e, sE] = useState(!!p.e);
  let { i, t, x, y, w, h, z, sW, sH, c, m } = p;

  const GET_DISTANCE = (x1: number, y1: number, x2: number, y2: number) => ({
    x: x1 - x2,
    y: y1 - y2,
  });

  const GET_MOUSE_COORDS = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ele: HTMLElement
  ) => {
    const rect = ele.getBoundingClientRect();
    return {
      x: ((ev.pageX - rect.left) / rect.width) * 100,
      y: ((ev.pageY - rect.top) / rect.height) * 100,
    };
  };

  const MOVE = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ele = ev.target as HTMLDivElement;
    const parent = ele.parentElement;

    if (MOUSE_POS && parent && parent.id !== "root") {
      const pos = GET_MOUSE_COORDS(ev, parent);
      const d = GET_DISTANCE(pos.x, pos.y, MOUSE_POS.x, MOUSE_POS.y);
      ele.style.transform = `translate(${(x += d.x * 2)}%, ${(y += d.y * 2)}%)`;

      // set data next
    }
    if (parent && m?.length) {
      STOP_CLICK(ev);
      MOUSE_POS = GET_MOUSE_COORDS(ev, parent);
    }
  };

  const STOP_CLICK = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  return (
    <div
      className={STYLE.ABSOLUTE_UNIT}
      style={{
        transform: `translate(${x * 2}%, ${y * 2}%)`,
        width: `${w}%`,
        height: `${h}%`,
        zIndex: z || 0,
      }}
      onMouseDown={(ev) => {
        STOP_CLICK(ev);
        MOUSE_POS = undefined;
        DRAGGING = true;
      }}
      onMouseUp={(ev) => {
        STOP_CLICK(ev);
        DRAGGING = false;
        MOUSE_POS = undefined;
      }}
      onMouseMove={(ev) => {
        if (DRAGGING) {
          MOVE(ev);
        }
      }}
    >
      {m?.map((mm, idx) => (
        <ABSOLUTE_UNIT key={mm.t + idx} i={idx} {...mm} />
      ))}
    </div>
  );
};

export default ABSOLUTE_UNIT;
