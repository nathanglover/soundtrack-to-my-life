import React from "react";
import * as Vibrant from "node-vibrant";
import styled from "styled-components";

const Album = styled.img`
  max-width: 100%;
  margin-bottom: 2rem;
`;

function SoundtrackAlbum({ timelineObj, setAlbumColor }) {
  const onLoad = async (e) => {
    const vibrant = new Vibrant(e.target.src);
    const swatches = await vibrant.getPalette();
    setAlbumColor(swatches.Muted.getHex());
  };

  if (!timelineObj) {
    return <></>;
  }

  return (
    <Album
      src={timelineObj.track.album.images[0].url}
      crossOrigin="Anonymous"
      onLoad={(e) => onLoad(e)}
    />
  );
}

export default SoundtrackAlbum;
