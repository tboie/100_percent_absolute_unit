import { render } from "@testing-library/react";
import ABSOLUTE_UNIT from "./ABSOLUTE_UNIT";
import MATTER from "./MATTER";

test("renders", () => {
  render(<ABSOLUTE_UNIT {...MATTER} />);
});
