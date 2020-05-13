import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { TIMELINE_QUERY } from "../graphql";
import SoundtrackAlbum from "./SoundtrackAlbum";
import SoundtrackHeader from "./SoundtrackHeader";
import SoundtrackTrack from "./SoundtrackTrack";
import SoundtrackNav from "./SoundtrackNav";

const SoundtrackBackground = styled.div`
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.albumColor || "#191414"},
    #191414
  );
  height: 100vh;
  width: 100%;
`;

const SoundtrackContainer = styled.div`
  margin: 0 auto;
  width: 900px;
  text-align: center;
  color: #fff;
`;

function Soundtrack({ date }) {
  const [timeline, setTimeline] = useState([]);
  const [track, setTrack] = useState(null);
  const [albumColor, setAlbumColor] = useState("#191414");
  const { loading, error, data } = useQuery(TIMELINE_QUERY, {
    variables: { date: date.getTime() },
  });

  useEffect(() => {
    if (!loading) {
      setTimeline(data.timeline);
      if (data.timeline.length > 0) {
        setTrack(data.timeline[0].track);
      }
    }
  }, [data, loading]);

  return (
    <SoundtrackBackground albumColor={albumColor}>
      <SoundtrackContainer>
        <SoundtrackHeader date={date}></SoundtrackHeader>
        {!loading && track && (
          <>
            <SoundtrackAlbum
              album={track.album}
              setAlbumColor={setAlbumColor}
            ></SoundtrackAlbum>
            <SoundtrackTrack track={track} />
            <SoundtrackNav date={date} previewUrl={track.urls.preview} />
          </>
        )}
      </SoundtrackContainer>
    </SoundtrackBackground>
  );
}

export default Soundtrack;
