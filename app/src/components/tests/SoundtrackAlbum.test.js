import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SoundtrackAlbum from "../SoundtrackAlbum";

it("renders null track", async () => {
  let timelineObj = { track: null };
  render(<SoundtrackAlbum timelineObj={timelineObj} isLoadingAlbum={false} />);
});

it("renders when track album is not null", async () => {
  const timelineObj = {
    timestamp: 1590244919652,
    track: {
      album: {
        name: "Battle of the Heart",
        images: [
          {
            url:
              "https://i.scdn.co/image/ab67616d0000b273269249e5c3faa09f5bc866f3",
          },
          {
            url:
              "https://i.scdn.co/image/ab67616d00001e02269249e5c3faa09f5bc866f3",
          },
          {
            url:
              "https://i.scdn.co/image/ab67616d00004851269249e5c3faa09f5bc866f3",
          },
        ],
      },
    },
  };

  const setAlbumCover = jest.fn();
  const setIsLoadingAlbum = jest.fn();

  const { container } = render(
    <SoundtrackAlbum
      timelineObj={timelineObj}
      isLoadingAlbum={true}
      setAlbumColor={setAlbumCover}
      setIsLoadingAlbum={setIsLoadingAlbum}
    />
  );
  const img = container.querySelector("img");
  fireEvent.load(img);
  await waitFor(() => expect(setAlbumCover).toHaveBeenCalledTimes(1));
});
