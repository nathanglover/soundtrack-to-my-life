import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SoundtrackSlider, { getTime } from "../SoundtrackSlider";

const timeline = [
  {
    timestamp: 1590244919652,
    track: {
      duration_ms: 304000,
    },
  },
  {
    timestamp: 1590245219895,
    track: {
      duration_ms: 285453,
    },
  },
  {
    timestamp: 1590245219895,
    track: {
      duration_ms: 285453,
    },
  },
  {
    timestamp: 1590262354417,
    track: {
      duration_ms: 216516,
    },
  },
  {
    timestamp: 1590265574842,
    track: {
      duration_ms: 190987,
    },
  },
  {
    timestamp: 1590265664106,
    track: {
      duration_ms: 311495,
    },
  },
];

it("renders", async () => {
  const setTimelineObj = jest.fn();
  const setIsPlaying = jest.fn();
  render(
    <SoundtrackSlider
      date={new Date()}
      timeline={timeline}
      timelineObj={timeline[0]}
      isLoadingAlbum={true}
      setTimelineObj={setTimelineObj}
      isPlaying={false}
      setIsPlaying={setIsPlaying}
    />
  );
});

it("returns redirect if time === maxTime", async () => {
  const setTimelineObj = jest.fn();
  const setIsPlaying = jest.fn();
  const date = new Date(2020, 4, 22);
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SoundtrackSlider
        date={date}
        timeline={timeline}
        timelineObj={timeline[timeline.length - 1]}
        isLoadingAlbum={false}
        setTimelineObj={setTimelineObj}
        isPlaying={true}
        setIsPlaying={setIsPlaying}
      />
    </Router>
  );
  expect(history.location.pathname).toBe("/2020-05-23");
});

it("setInterval if isPlaying", async () => {
  const setTimelineObj = jest.fn();
  const setIsPlaying = jest.fn();
  const date = new Date();
  await act(async () => {
    render(
      <SoundtrackSlider
        date={date}
        timeline={timeline}
        timelineObj={timeline[timeline.length - 2]}
        isLoadingAlbum={false}
        setTimelineObj={setTimelineObj}
        isPlaying={true}
        setIsPlaying={setIsPlaying}
      />
    );
    await waitFor(() => expect(setIsPlaying).toHaveBeenCalledWith(false), {
      timeout: 5000,
      interval: 500,
    });
  });
});

it("handles when date changes", async () => {
  const setTimelineObj = jest.fn();
  const setIsPlaying = jest.fn();
  const date = new Date();
  await act(async () => {
    render(
      <SoundtrackSlider
        date={date}
        timeline={timeline}
        timelineObj={{ timestamp: 0 }}
        isLoadingAlbum={false}
        setTimelineObj={setTimelineObj}
        isPlaying={true}
        setIsPlaying={setIsPlaying}
      />
    );
  });
});

it("handles when time changes", async () => {
  const setTimelineObj = jest.fn();
  const setIsPlaying = jest.fn();
  const date = new Date();
  await act(async () => {
    render(
      <SoundtrackSlider
        date={date}
        timeline={timeline}
        timelineObj={{ timestamp: 1590260822248 }}
        isLoadingAlbum={false}
        setTimelineObj={setTimelineObj}
        isPlaying={true}
        setIsPlaying={setIsPlaying}
      />
    );
  });
});
