import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";

import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const ONE_DAY = 24 * 60 * 60 * 1000;

const isToday = (date) => {
  const today = new Date();
  return (
    today.getFullYear === date.getFullYear &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

const getDateString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

const SoundtrackNavContainer = styled.div`
  margin: 1rem auto;
  width: 640px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  a {
    color: white;
  }

  svg {
    font-size: 3rem;
    cursor: pointer;
  }
  svg.middleIcon {
    font-size: 5rem;
    margin: 0 1.5rem;
  }
`;

function SoundtrackNav({ date }) {
  const previousDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1
  )
    .toISOString()
    .split("T")[0];
  const nextDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  )
    .toISOString()
    .split("T")[0];

  return (
    <SoundtrackNavContainer>
      <Link to={`/${previousDate}`}>
        <SkipPreviousIcon />
      </Link>
      <PlayCircleFilledWhiteRoundedIcon className="middleIcon" />
      <Link to={`/${nextDate}`}>
        <SkipNextIcon />
      </Link>
    </SoundtrackNavContainer>
  );
}

export default SoundtrackNav;
