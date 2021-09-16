import S from "./A.module.scss";
import { T } from "./M";

const A = (p: T) => (
  <div
    className={S.A}
    style={{
      transform: `translate(${p.x * 2}%,${p.y * 2}%)`,
      width: `${p.w}%`,
      height: `${p.h}%`,
      zIndex: p.z,
    }}
  ></div>
);

export default A;
