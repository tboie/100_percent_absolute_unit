import S from "./A.module.scss";
import { T } from "./M";

let PREV_POINTER_POS: undefined | { x: number; y: number } = undefined;
// selected unit
let SELECTED = "";
// unit resize/move boundaries
const BOUND_MIN = 25,
  BOUND_MAX = 75;

const A = (p: T) => {
  let { i, t, x, y, w, h, z, sW, sH, c, bp } = p;
  // bottom/right resize anchors & translate vals
  let aB = 0,
    aR = 0,
    tX = 0,
    tY = 0;

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

  // center area moves, perimeter area resizes (see boundary values)
  const MODIFY = (ev: React.PointerEvent<HTMLDivElement>) => {
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

        // mouse coords in unit
        const rX = ((POINTER_POS.x - x) / w) * 100;
        const rY = ((POINTER_POS.y - y) / h) * 100;

        if (DIST.x !== 0) {
          // right
          if (rX >= BOUND_MAX) {
            w += DIST.x;
            tX = (x / w) * 100;
          }
          // left
          else if (rX <= BOUND_MIN) {
            w -= DIST.x;
            x = aR - w;
            tX = ((aR - w) / w) * 100;
          }
          // move
          else if (rY > BOUND_MIN && rY < BOUND_MAX) {
            tX = ((x += DIST.x) * 100) / w;
          }
          ELE.style.width = w + "%";
        }

        if (DIST.y !== 0) {
          // top
          if (rY <= BOUND_MIN) {
            h -= DIST.y;
            y = aB - h;
            tY = ((aB - h) / h) * 100;
          }
          // bottom
          else if (rY >= BOUND_MAX) {
            h += DIST.y;
            tY = (y / h) * 100;
          }
          // move
          else if (rX > BOUND_MIN && rX < BOUND_MAX) {
            tY = ((y += DIST.y) * 100) / h;
          }
          ELE.style.height = h + "%";
        }

        ELE.style.transform = `translate(${tX}%,${tY}%)`;
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
      className={`${S.A} ${bp.map((bp) => S[bp]).join(" ")}`}
      style={{
        transform: `translate(${(tX = (x * 100) / w)}%,${(tY =
          (y * 100) / h)}%)`,
        width: `${w}%`,
        height: `${h}%`,
        zIndex: z,
      }}
      onPointerDown={(ev) => {
        STOP_PRESS(ev);

        /* bottom y anchor for resize */
        const tY = parseFloat(
          ev.currentTarget.style.transform.split(",")[1].replace("%)", "")
        );
        aB = (h * tY) / 100 + h;

        /* right x anchor for resize */
        const tX = parseFloat(
          ev.currentTarget.style.transform
            .split("(")[1]
            .split(",")[0]
            .replace("%", "")
        );
        aR = (w * tX) / 100 + w;

        ev.currentTarget.style.zIndex = "100";
        PREV_POINTER_POS = undefined;
        SELECTED = `${z}${i}`;
      }}
      onPointerUp={(ev) => {
        STOP_PRESS(ev);
        SELECTED = "";
        PREV_POINTER_POS = undefined;
        ev.currentTarget.style.zIndex = `${z}`;
      }}
      onPointerLeave={() => SELECTED && (SELECTED = "")}
      onPointerMove={(ev) => SELECTED === ev.currentTarget.id && MODIFY(ev)}
    />
  );
};

export default A;
