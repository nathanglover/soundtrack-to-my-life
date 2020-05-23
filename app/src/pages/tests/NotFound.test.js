import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../NotFound";

it("renders about", async () => {
  const { getByText } = render(<NotFound />);
  expect(getByText("Not Found")).toBeInTheDocument();
});
