import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitForElement } from "@testing-library/react";
import SoundtrackHeader from "../SoundtrackHeader";

it("renders today", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <SoundtrackHeader date={new Date()} />
    </MemoryRouter>
  );
  expect(getByText("Today")).toBeInTheDocument();
});

it("renders date string", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <SoundtrackHeader date={new Date(2020, 4, 22)} />
    </MemoryRouter>
  );
  expect(getByText("Friday, May 22, 2020")).toBeInTheDocument();
});
