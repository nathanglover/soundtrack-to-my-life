import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { TIMELINE_QUERY } from "../graphql";
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
  min-height: 100vh;
  max-width: 90vw;
  margin: 0 auto;
  color: #fff;
`;

const PlayerContainer = styled.div``;

function Soundtrack({ date }) {
  const [timeline, setTimeline] = useState([]);
  const [timelineObj, setTimelineObj] = useState(null);
  const [albumColor, setAlbumColor] = useState("#191414");
  const { loading, error, data } = useQuery(TIMELINE_QUERY, {
    variables: { date: date.getTime() + date.getTimezoneOffset() * 60000 },
  });

  useEffect(() => {
    if (!loading && !error) {
      setTimeline(data.timeline);
      if (data.timeline.length > 0) {
        const obj =
          data.timeline[Math.floor(Math.random() * data.timeline.length)];
        setTimelineObj(obj);
      }
    }
  }, [data, error, loading]);

  return (
    <SoundtrackBackground albumColor={albumColor}>
      <SoundtrackContainer>
        <SoundtrackHeader date={date}></SoundtrackHeader>
        {!loading && !error && (
          <PlayerContainer>
            <SoundtrackAlbum
              timelineObj={timelineObj}
              setAlbumColor={setAlbumColor}
            />
            <SoundtrackTrack timelineObj={timelineObj} />
            <SoundtrackSlider
              date={date}
              timeline={timeline}
              timelineObj={timelineObj}
              setTimelineObj={setTimelineObj}
            />
            <SoundtrackNav date={date} />
          </PlayerContainer>
        )}
        <div></div>
      </SoundtrackContainer>
    </SoundtrackBackground>
  );
}

export default Soundtrack;
