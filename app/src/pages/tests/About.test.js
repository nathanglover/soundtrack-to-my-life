import React from "react";
import { render } from "@testing-library/react";
import About from "../About";

it("renders about", async () => {
  const { getByText } = render(<About />);
  expect(getByText("About")).toBeInTheDocument();
});
