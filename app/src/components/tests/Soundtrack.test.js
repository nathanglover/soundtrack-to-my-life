import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import { render, waitFor } from "@testing-library/react";
import { TIMELINE_QUERY } from "../../graphql";
import Soundtrack from "../Soundtrack";
import { act } from "react-dom/test-utils";

const date = new Date(2020, 3, 15);
const mocks = [
  {
    request: {
      query: TIMELINE_QUERY,
      variables: {
        date: date.getTime() + date.getTimezoneOffset() * 60000,
      },
    },
    result: {
      data: {
        timeline: [
          {
            timestamp: 1590244919652,
            track: {
              name: "Rocks Beneath the Water",
              duration_ms: 304000,
              artists: [
                {
                  name: "The Brevet",
                },
              ],
              urls: {
                web: "https://open.spotify.com/track/6tJX7dQ0IEyKLVMDnedMNQ",
                preview:
                  "https://p.scdn.co/mp3-preview/071789e08dc33be384e693e088446d5087673727?cid=5b08e16236244cab9721168826379905",
              },
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
          },
          {
            timestamp: 1590245219895,
            track: {
              name: "Woke Up from a Dream",
              duration_ms: 285453,
              artists: [
                {
                  name: "The Paper Kites",
                },
              ],
              urls: {
                web: "https://open.spotify.com/track/0In3Ey45jCEcFdilLoHmY4",
                preview:
                  "https://p.scdn.co/mp3-preview/8c9decea22136b2bc8629205490f7d7a7cf7afb1?cid=5b08e16236244cab9721168826379905",
              },
              album: {
                name: "twelvefour",
                images: [
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d0000b2738a4e8b6213c79ad41971c6ba",
                  },
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d00001e028a4e8b6213c79ad41971c6ba",
                  },
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d000048518a4e8b6213c79ad41971c6ba",
                  },
                ],
              },
            },
          },
          {
            timestamp: 1590245219895,
            track: {
              name: "Woke Up from a Dream",
              duration_ms: 285453,
              artists: [
                {
                  name: "The Paper Kites",
                },
              ],
              urls: {
                web: "https://open.spotify.com/track/0In3Ey45jCEcFdilLoHmY4",
                preview:
                  "https://p.scdn.co/mp3-preview/8c9decea22136b2bc8629205490f7d7a7cf7afb1?cid=5b08e16236244cab9721168826379905",
              },
              album: {
                name: "twelvefour",
                images: [
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d0000b2738a4e8b6213c79ad41971c6ba",
                  },
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d00001e028a4e8b6213c79ad41971c6ba",
                  },
                  {
                    url:
                      "https://i.scdn.co/image/ab67616d000048518a4e8b6213c79ad41971c6ba",
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
];

it("renders", async () => {
  await act(async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Soundtrack date={date} />
        </MemoryRouter>
      </MockedProvider>
    );
    await waitFor(() =>
      expect(getByText("Rocks Beneath the Water")).toBeInTheDocument()
    );
  });
});
