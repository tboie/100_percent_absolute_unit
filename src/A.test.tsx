import { render } from "@testing-library/react";
import A from "./A";
import M from "./M";

test("renders", () => {
  render(<A {...M} />);
});
