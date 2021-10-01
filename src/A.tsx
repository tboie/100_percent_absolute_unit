import S from "./A.module.scss";
import M, { T } from "./M";

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
    const R = document.getElementById("root")?.getBoundingClientRect();
    return {
      x: R ? ((ev.pageX - R.left) / R.width) * 100 : 0,
      y: R ? ((ev.pageY - R.top) / R.height) * 100 : 0,
    };
  };

  const SET_CONNECTIONS = () => {
    c = { t: [], r: [], b: [], l: [] };
    M.forEach((u, ii) => {
      if (
        c &&
        typeof i !== "undefined" &&
        ii !== i &&
        z === u.z &&
        // collides?
        !(y + h < u.y || y > u.y + u.h || x + w < u.x || x > u.x + u.w)
      ) {
        y <= u.y + u.h && y > u.y && !c.t.includes(ii) && c.t.push(ii); // t
        y + h >= u.y && y < u.y && !c.b.includes(ii) && c.b.push(ii); // b
        x + w >= u.x && x < u.x && !c.r.includes(ii) && c.r.push(ii); // r
        x <= u.x + u.w && x > u.x && !c.l.includes(ii) && c.l.push(ii); // l
      }
    });
  };

  const SET_UNIT = (
    dim: "w" | "h",
    mX: number,
    mY: number,
    d: number,
    s1: "t" | "b" | "r" | "l",
    s2: "t" | "b" | "r" | "l",
    a: number,
    ele: HTMLDivElement
  ) => {
    if (c) {
      // right/bottom
      if (
        (dim === "w" ? mX : mY) >= BOUND_MAX &&
        !c[dim === "w" ? s1 : s2].length
      ) {
        dim === "w"
          ? (w += d) && (tX = (x / w) * 100)
          : (h += d) && (tY = (y / h) * 100);
      }
      // left/top
      else if (
        (dim === "w" ? mX : mY) <= BOUND_MIN &&
        !c[dim === "w" ? s2 : s1].length
      ) {
        dim === "w"
          ? (w -= d) && (x = a - w) && (tX = ((a - w) / w) * 100)
          : (h -= d) && (y = a - h) && (tY = ((a - h) / h) * 100);
      }
      // move
      else if (
        (dim === "w"
          ? mY > BOUND_MIN && mY < BOUND_MAX
          : mX > BOUND_MIN && mX < BOUND_MAX) &&
        ((d > 0 && !c[dim === "w" ? s1 : s2].length) ||
          (d < 0 && !c[dim === "w" ? s2 : s1].length))
      ) {
        dim === "w" ? (tX = ((x += d) * 100) / w) : (tY = ((y += d) * 100) / h);
      }

      dim === "w" ? (ele.style.width = w + "%") : (ele.style.height = h + "%");
      ele.style.transform = `translate(${tX}%,${tY}%)`;
    }
  };

  // center area moves, perimeter area resizes (see boundary values)
  const MODIFY = (ev: React.PointerEvent<HTMLDivElement>) => {
    const ELE = ev.target as HTMLDivElement;
    const ROOT = document.getElementById("root");

    if (ev.currentTarget.id !== "root" && ROOT) {
      const POINTER_POS = GET_POINTER_COORDS(ev);

      if (POINTER_POS && PREV_POINTER_POS) {
        SET_CONNECTIONS();

        const DIST = GET_DISTANCE(
          POINTER_POS.x,
          POINTER_POS.y,
          PREV_POINTER_POS.x,
          PREV_POINTER_POS.y
        );

        // mouse coords in unit
        const rX = ((POINTER_POS.x - x) / w) * 100;
        const rY = ((POINTER_POS.y - y) / h) * 100;

        DIST.x !== 0 && SET_UNIT("w", rX, rY, DIST.x, "r", "l", aR, ELE);
        DIST.y !== 0 && SET_UNIT("h", rX, rY, DIST.y, "t", "b", aB, ELE);

        // SAVE VALS TO DATA
        if (typeof i !== "undefined") {
          Object.assign(M[i], {
            t: t,
            x: x,
            y: y,
            w: w,
            h: h,
            z: z,
            sW: sW,
            sH: sH,
            c: c,
            bp: bp,
          });
        }
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
          ev.currentTarget.style.transform.split(",")[1]?.replace("%)", "")
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
