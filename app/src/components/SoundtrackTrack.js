import React from "react";
import styled from "styled-components";
import spotifyIconWhite from "../media/spotify-icon-white.png";

const SoundtrackTrackContainer = styled.div`
  display: ${(props) => (props.isLoadingAlbum ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    color: #fff;
  }
  img {
    width: 30px;
  }
`;

const TrackName = styled.div`
  text-align: left;
  font-weight: bold;
  color: #fff;
`;

const ArtistName = styled.div`
  text-align: left;
  color: #b3b3b3;
  font-size: 0.75em;
  font-weight: 500;
`;

function SoundtrackTrack({ timelineObj, isLoadingAlbum }) {
  return (
    <SoundtrackTrackContainer isLoadingAlbum={isLoadingAlbum}>
      <div>
        <TrackName>
          {timelineObj.track ? timelineObj.track.name : "Silence"}
        </TrackName>
        <ArtistName>
          {timelineObj.track
            ? timelineObj.track.artists.map((artist) => artist.name).join(", ")
            : "..."}
        </ArtistName>
      </div>
      {timelineObj.track && (
        <a href={timelineObj.track.urls.web}>
          <img alt="View on Spotify" src={spotifyIconWhite} />
        </a>
      )}
    </SoundtrackTrackContainer>
  );
}

export default SoundtrackTrack;
