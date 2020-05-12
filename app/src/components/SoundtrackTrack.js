import React from "react";
import styled from "styled-components";

const TrackName = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: .75rem;
`;

const ArtistName = styled.div`
  color: #b3b3b3;
  font-weight: bold;
`;

function SoundtrackTrack({ track }) {
  return (
    <div>
      <TrackName>{track.name}</TrackName>
      <ArtistName>{track.artists[0].name}</ArtistName>
    </div>
  );
}

export default SoundtrackTrack;
