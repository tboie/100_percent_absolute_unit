import S from "./A.module.scss";
import { useState } from "react";
import M, { T } from "./M";

let DRAGGING = false;
let POINTER_POS: undefined | { x: number; y: number } = undefined;
let SELECTED = "";

const A = (p: T) => {
  const [e, sE] = useState(!!p.e);
  let { i, t, x, y, w, h, z, sW, sH, c, m } = p;

  const GET_DISTANCE = (x1: number, y1: number, x2: number, y2: number) => ({
    x: x1 - x2,
    y: y1 - y2,
  });

  const GET_POINTER_COORDS = (
    ev: React.PointerEvent<HTMLDivElement>,
    ele: HTMLElement
  ) => {
    const rect = ele.getBoundingClientRect();
    return {
      x: ((ev.pageX - rect.left) / rect.width) * 100,
      y: ((ev.pageY - rect.top) / rect.height) * 100,
    };
  };

  const MOVE = (ev: React.PointerEvent<HTMLDivElement>) => {
    const ele = ev.target as HTMLDivElement;
    const parent = ele.parentElement;

    if (POINTER_POS && parent && parent.id !== "root") {
      const pos = GET_POINTER_COORDS(ev, parent);
      const d = GET_DISTANCE(pos.x, pos.y, POINTER_POS.x, POINTER_POS.y);
      ele.style.transform = `translate(${(x += d.x * 2)}%, ${(y += d.y * 2)}%)`;
    }
    if (parent) {
      STOP_PRESS(ev);
      POINTER_POS = GET_POINTER_COORDS(ev, parent);
    }
  };

  const STOP_PRESS = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  return (
    <div
      id={`${z}${i}`}
      className={S.A}
      style={{
        transform: `translate(${x * 2}%,${y * 2}%)`,
        width: `${w}%`,
        height: `${h}%`,
        zIndex: z,
      }}
      onPointerDown={(ev) => {
        STOP_PRESS(ev);
        ev.currentTarget.style.zIndex = "100";
        POINTER_POS = undefined;
        SELECTED = `${z}${i}`;
        DRAGGING = true;
      }}
      onPointerUp={(ev) => {
        STOP_PRESS(ev);
        DRAGGING = false;
        SELECTED = "";
        POINTER_POS = undefined;
        ev.currentTarget.style.zIndex = z.toString();
      }}
      onPointerMove={(ev) => {
        if (DRAGGING && SELECTED === ev.currentTarget.id) {
          MOVE(ev);
        }
      }}
    >
      {m?.map((m, i) => (
        <A key={m.z + i} {...m} i={i} />
      ))}
    </div>
  );
};

export default A;
