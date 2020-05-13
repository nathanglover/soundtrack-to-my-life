import React from "react";
import styled from "styled-components";

const TrackName = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #fff;
  text-decoration: none;
`;

const ArtistName = styled.div`
  color: #b3b3b3;
  font-weight: bold;
`;

function SoundtrackTrack({ track }) {
  return (
    <div>
      <TrackName title="Open in Spotify" href={track.urls.web}>
        {track.name}
      </TrackName>
      <ArtistName>{track.artists[0].name}</ArtistName>
    </div>
  );
}

export default SoundtrackTrack;
