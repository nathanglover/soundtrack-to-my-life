import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { TIMELINE_QUERY } from "../graphql";
import { isToday } from "../utils";

import SoundtrackAlbum from "./SoundtrackAlbum";
import SoundtrackHeader from "./SoundtrackHeader";
import SoundtrackTrack from "./SoundtrackTrack";
import SoundtrackSlider from "./SoundtrackSlider";
import SoundtrackNav from "./SoundtrackNav";

const SoundtrackBackground = styled.div`
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.albumColor || "#191414"},
    #191414
  );
`;

const SoundtrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  color: #fff;
`;

const PlayerContainer = styled.div``;

function Soundtrack({ date }) {
  const [timeline, setTimeline] = useState([]);
  const [timelineObj, setTimelineObj] = useState(null);
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumColor, setAlbumColor] = useState("#191414");
  const { loading, error, data } = useQuery(TIMELINE_QUERY, {
    variables: { date: date.getTime() + date.getTimezoneOffset() * 60000 },
  });

  useEffect(() => {
    if (!loading && !error) {
      const timeline = data.timeline;
      setTimeline(timeline);
      if (timeline.length > 0) {
        let obj = timeline[Math.floor(Math.random() * timeline.length)];
        if (isToday(date)) {
          obj = timeline[timeline.length - 1];
        }
        setIsLoadingAlbum(true);
        setTimelineObj(obj);
      }
    }
  }, [date, data, error, loading]);

  return (
    <SoundtrackBackground albumColor={albumColor}>
      <SoundtrackContainer>
        <SoundtrackHeader date={date}></SoundtrackHeader>
        {!loading && !error && (
          <PlayerContainer>
            <SoundtrackAlbum
              timelineObj={timelineObj}
              isLoadingAlbum={isLoadingAlbum}
              setIsLoadingAlbum={setIsLoadingAlbum}
              setAlbumColor={setAlbumColor}
            />
            <SoundtrackTrack
              timelineObj={timelineObj}
              isLoadingAlbum={isLoadingAlbum}
            />
            <SoundtrackSlider
              date={date}
              timeline={timeline}
              timelineObj={timelineObj}
              isLoadingAlbum={isLoadingAlbum}
              setTimelineObj={setTimelineObj}
            />
            <SoundtrackNav date={date} isLoadingAlbum={isLoadingAlbum} />
          </PlayerContainer>
        )}
        <div></div>
      </SoundtrackContainer>
    </SoundtrackBackground>
  );
}

export default Soundtrack;
