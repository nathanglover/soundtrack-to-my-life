import React, { useState } from "react";
import * as Vibrant from "node-vibrant";
import styled from "styled-components";

const Album = styled.div`
  display: ${(props) => (props.isLoading ? "none" : "block")};
  margin-bottom: 2rem;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  img {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
  }
`;

function SoundtrackAlbum({
  timelineObj,
  isLoadingAlbum,
  setIsLoadingAlbum,
  setAlbumColor,
}) {
  const [size, setSize] = useState(null);

  const onLoad = async (e) => {
    if (!size) {
      console.log(window.innerWidth);
      setSize(
        window.innerWidth * 0.9 > e.target.width
          ? `${e.target.width}px`
          : "90vw"
      );
    }
    const vibrant = new Vibrant(e.target.src);
    const swatches = await vibrant.getPalette();
    setAlbumColor(swatches.Muted.getHex());
    setIsLoadingAlbum(false);
  };

  return (
    <Album isLoading={isLoadingAlbum} size={size}>
      {timelineObj && (
        <img
          alt={timelineObj.track.album.name}
          src={timelineObj.track.album.images[0].url}
          crossOrigin="Anonymous"
          onLoad={(e) => onLoad(e)}
        />
      )}
    </Album>
  );
}

export default SoundtrackAlbum;
