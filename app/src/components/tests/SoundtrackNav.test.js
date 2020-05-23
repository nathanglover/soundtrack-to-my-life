import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import SoundtrackNav from "../SoundtrackNav";

it("has play icon", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <SoundtrackNav
        date={new Date()}
        isLoadingAlbum={true}
        isPlaying={false}
      />
    </MemoryRouter>
  );
  expect(getByTestId("play-icon")).toBeInTheDocument();
});

it("has pause icon", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <SoundtrackNav
        date={new Date(2020, 1, 1)}
        isLoadingAlbum={false}
        isPlaying={true}
      />
    </MemoryRouter>
  );
  expect(getByTestId("pause-icon")).toBeInTheDocument();
});

it("calls setIsPlaying(true) when play-icon is clicked ", async () => {
  const setIsPlaying = jest.fn();
  const { getByTestId } = render(
    <MemoryRouter>
      <SoundtrackNav
        date={new Date(2020, 1, 1)}
        isLoadingAlbum={false}
        isPlaying={false}
        setIsPlaying={setIsPlaying}
      />
    </MemoryRouter>
  );
  const playIcon = getByTestId("play-icon");
  fireEvent.click(playIcon);
  expect(setIsPlaying).toHaveBeenCalledWith(true);
});

it("calls setIsPlaying(false) when pause-icon is clicked ", async () => {
  const setIsPlaying = jest.fn();
  const { getByTestId } = render(
    <MemoryRouter>
      <SoundtrackNav
        date={new Date(2020, 1, 1)}
        isLoadingAlbum={false}
        isPlaying={true}
        setIsPlaying={setIsPlaying}
      />
    </MemoryRouter>
  );
  const playIcon = getByTestId("pause-icon");
  fireEvent.click(playIcon);
  expect(setIsPlaying).toHaveBeenCalledWith(false);
});