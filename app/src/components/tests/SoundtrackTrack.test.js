import React from "react";
import { render } from "@testing-library/react";
import SoundtrackTrack from "../SoundtrackTrack";

it("renders silence when track is null", async () => {
  let timelineObj = { track: null };
  const { getByText } = render(
    <SoundtrackTrack timelineObj={timelineObj} isLoadingAlbum={false} />
  );
  expect(getByText("Silence")).toBeInTheDocument();
});

it("renders hidden when loading album", async () => {
  let timelineObj = { track: null };
  render(
    <SoundtrackTrack timelineObj={timelineObj} isLoadingAlbum={true} />
  );
});

it("renders when track is not null", async () => {
  const timelineObj = {
    timestamp: 1590244919652,
    track: {
      artists: [
        {
          name: "The Brevet",
        },
      ],
      name: "Rocks Beneath the Water",
      urls: {
        web: "https://open.spotify.com/track/6tJX7dQ0IEyKLVMDnedMNQ",
      },
    },
  };

  const { getByText } = render(
    <SoundtrackTrack timelineObj={timelineObj} isLoadingAlbum={true} />
  );
  expect(getByText("Rocks Beneath the Water")).toBeInTheDocument();
});
