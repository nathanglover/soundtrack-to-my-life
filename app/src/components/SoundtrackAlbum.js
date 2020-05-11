import React from "react";
import * as Vibrant from "node-vibrant";
import styled from "styled-components";

const AlbumCover = styled.img`
  margin: 4rem 0 4rem 0;
`;

function SoundtrackAlbum({ album, setAlbumColor }) {
  const onLoad = async (e) => {
    const vibrant = new Vibrant(e.target.src);
    const swatches = await vibrant.getPalette();
    setAlbumColor(swatches.Muted.getHex());
  };

  return (
    <AlbumCover
      src={album.images[0].url}
      crossOrigin="Anonymous"
      onLoad={(e) => onLoad(e)}
    ></AlbumCover>
  );
}

export default SoundtrackAlbum;
