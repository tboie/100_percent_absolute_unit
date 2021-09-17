import S from "./A.module.scss";
import { T } from "./M";

let PREV_POINTER_POS: undefined | { x: number; y: number } = undefined;
let SELECTED = "";

const A = (p: T) => {
  let { i, t, x, y, w, h, z, sW, sH, c } = p;

  const GET_DISTANCE = (x1: number, y1: number, x2: number, y2: number) => ({
    x: x1 - x2,
    y: y1 - y2,
  });

  const GET_POINTER_COORDS = (ev: React.PointerEvent<HTMLDivElement>) => {
    const RECT = document.getElementById("root")?.getBoundingClientRect();
    return {
      x: RECT ? ((ev.pageX - RECT.left) / RECT.width) * 100 : 0,
      y: RECT ? ((ev.pageY - RECT.top) / RECT.height) * 100 : 0,
    };
  };

  const MOVE = (ev: React.PointerEvent<HTMLDivElement>) => {
    const ELE = ev.target as HTMLDivElement;
    const ROOT = document.getElementById("root");

    if (ev.currentTarget.id !== "root" && ROOT) {
      const POINTER_POS = GET_POINTER_COORDS(ev);

      if (POINTER_POS && PREV_POINTER_POS) {
        const DIST = GET_DISTANCE(
          POINTER_POS.x,
          POINTER_POS.y,
          PREV_POINTER_POS.x,
          PREV_POINTER_POS.y
        );

        ELE.style.transform = `translate(${(x += DIST.x * 2)}%,${(y +=
          DIST.y * 2)}%)`;
      }

      STOP_PRESS(ev);
      PREV_POINTER_POS = GET_POINTER_COORDS(ev);
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
        transform: `translate(${(x *= 2)}%,${(y *= 2)}%)`,
        width: `${w}%`,
        height: `${h}%`,
        zIndex: z,
      }}
      onPointerDown={(ev) => {
        STOP_PRESS(ev);
        ev.currentTarget.style.zIndex = "100";
        PREV_POINTER_POS = undefined;
        SELECTED = `${z}${i}`;
      }}
      onPointerUp={(ev) => {
        STOP_PRESS(ev);
        SELECTED = "";
        PREV_POINTER_POS = undefined;
        ev.currentTarget.style.zIndex = z.toString();
      }}
      onPointerMove={(ev) => {
        if (SELECTED === ev.currentTarget.id) {
          MOVE(ev);
        }
      }}
    />
  );
};

export default A;
