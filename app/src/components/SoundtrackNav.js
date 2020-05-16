import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import { isToday, getDateURLString } from "../utils";

const SoundtrackNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  a {
    color: white;
  }

  svg {
    font-size: 2em;
    cursor: pointer;
  }
  svg.middleIcon {
    font-size: 4em;
    margin: 0 0.25em;
  }
`;

function SoundtrackNav({ date }) {
  const previousDate = getDateURLString(date, -1);
  const nextDate = getDateURLString(date, 1);
  const style = {
    visibility: "hidden",
  };
  const showNext = !isToday(date);
  return (
    <SoundtrackNavContainer>
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
