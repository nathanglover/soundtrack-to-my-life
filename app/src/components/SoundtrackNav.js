import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import { isToday, getDateURLString } from "../utils";

const SoundtrackNavContainer = styled.div`
  display: ${(props) => (props.isLoadingAlbum ? "none" : "flex")};
  flex-direction: row;
  justify-content: center;
  align-items: center;

  a {
    color: white;
  }

  svg {
    font-size: 33px;
    cursor: pointer;
  }
  svg.middleIcon {
    font-size: 66px;
    margin: 0 0.25em;
  }
`;

function SoundtrackNav({ date, isLoadingAlbum, isPlaying, setIsPlaying }) {
  const previousDate = getDateURLString(date, -1);
  const nextDate = getDateURLString(date, 1);
  const style = {
    visibility: "hidden",
  };
  const showNext = !isToday(date);
  return (
    <SoundtrackNavContainer isLoadingAlbum={isLoadingAlbum}>
      <Link
        to={`/${previousDate}`}
        aria-label={`Soundtrack for ${previousDate}`}
      >
        <SkipPreviousIcon />
      </Link>
      {isPlaying && (
        <PauseCircleFilledRoundedIcon
          className="middleIcon"
          onClick={() => setIsPlaying(false)}
        />
      )}
      {!isPlaying && (
        <PlayCircleFilledWhiteRoundedIcon
          className="middleIcon"
          onClick={() => setIsPlaying(true)}
        />
      )}
      {showNext && (
        <Link to={`/${nextDate}`} aria-label={`Soundtrack for ${nextDate}`}>
          <SkipNextIcon />
        </Link>
      )}
      {!showNext && <SkipNextIcon style={style} />}
    </SoundtrackNavContainer>
  );
}

export default SoundtrackNav;
