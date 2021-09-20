import S from "./A.module.scss";
import { T } from "./M";

const A = (p: T) => (
  <div
    className={S.A}
    style={{
      transform: `translate(${(p.x * 100) / p.w}%,${(p.y * 100) / p.h}%)`,
      width: `${p.w}%`,
      height: `${p.h}%`,
      zIndex: p.z,
    }}
  ></div>
);

export default A;
