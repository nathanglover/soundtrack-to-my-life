import React from "react";
import styled from "styled-components";
import spotifyIconWhite from "../media/spotify-icon-white.png";

const SoundtrackTrackContainer = styled.div`
  margin: 0 auto;
  width: 640px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    color: #fff;
  }
  img {
    width: 30px;
  }
  svg {
    font-size: 2rem;
  }
`;

const TrackName = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
`;

const ArtistName = styled.div`
  text-align: left;
  color: #b3b3b3;
  font-size: 1.25rem;
`;

function SoundtrackTrack({ track }) {
  return (
    <SoundtrackTrackContainer>
      <div>
        <TrackName>{track.name}</TrackName>
        <ArtistName>
          {track.artists.map((artist) => artist.name).join(", ")}
        </ArtistName>
      </div>
      <a href={track.urls.web}>
        <img alt="View on Spotify" src={spotifyIconWhite} />
      </a>
    </SoundtrackTrackContainer>
  );
}

export default SoundtrackTrack;
