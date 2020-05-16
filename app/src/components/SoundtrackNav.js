import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";

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

function SoundtrackNav({ date, isLoadingAlbum }) {
  const previousDate = getDateURLString(date, -1);
  const nextDate = getDateURLString(date, 1);
  const style = {
    visibility: "hidden",
  };
  const showNext = !isToday(date);
  return (
    <SoundtrackNavContainer isLoadingAlbum={isLoadingAlbum}>
      <Link to={`/${previousDate}`}>
        <SkipPreviousIcon />
      </Link>
      <PlayCircleFilledWhiteRoundedIcon className="middleIcon" />
      {showNext && (
        <Link to={`/${nextDate}`}>
          <SkipNextIcon />
        </Link>
      )}
      {!showNext && <SkipNextIcon style={style} />}
    </SoundtrackNavContainer>
  );
}

export default SoundtrackNav;
