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
  const showNext = !isToday(date);
  const component = (
    <SoundtrackNavContainer isLoadingAlbum={isLoadingAlbum}>
      <Link
        to={`/${previousDate}`}
        aria-label={`Soundtrack for ${previousDate}`}
      >
        <SkipPreviousIcon />
      </Link>
      {isPlaying && (
        <PauseCircleFilledRoundedIcon
          data-testid="pause-icon"
          className="middleIcon"
          onClick={() => setIsPlaying(false)}
        />
      )}
      {!isPlaying && (
        <PlayCircleFilledWhiteRoundedIcon
          data-testid="play-icon"
          className="middleIcon"
          onClick={() => setIsPlaying(true)}
        />
      )}
      {showNext && (
        <Link to={`/${nextDate}`} aria-label={`Soundtrack for ${nextDate}`}>
          <SkipNextIcon />
        </Link>
      )}
      {!showNext && (
        <SkipNextIcon
          style={{
            visibility: "hidden",
          }}
        />
      )}
    </SoundtrackNavContainer>
  );
  return component;
}

export default SoundtrackNav;
