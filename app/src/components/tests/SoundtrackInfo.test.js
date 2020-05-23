import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitForElement } from "@testing-library/react";
import SoundtrackInfo from "../SoundtrackInfo";

it("renders about", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <SoundtrackInfo />
    </MemoryRouter>
  );
  expect(getByText("About")).toBeInTheDocument();
});
