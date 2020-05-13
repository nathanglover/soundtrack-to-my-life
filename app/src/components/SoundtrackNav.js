import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPauseCircle,
  faPlay,
  faPlayCircle,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

const Icon = styled(FontAwesomeIcon)`
  margin: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

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

function SoundtrackNav({ date }) {
  const [clickedBack, setClickedBack] = useState(false);
  const [clickedForward, setClickedForward] = useState(false);
  const previousDate = new Date(date.getTime() - ONE_DAY);
  const nextDate = new Date(date.getTime() + ONE_DAY);

  useEffect(() => {
    setClickedBack(false);
    setClickedForward(false);
  }, [date]);

  if (clickedBack) {
    return <Redirect to={`/${getDateString(previousDate)}`} />;
  }
  if (clickedForward) {
    return <Redirect to={`/${getDateString(nextDate)}`} />;
  }

  return (
    <div>
      <Icon icon={faStepBackward} onClick={() => setClickedBack(true)} />
      <Icon icon={faPlay} />
      <Icon icon={faStepForward} onClick={() => setClickedForward(true)} />
    </div>
  );
}

export default SoundtrackNav;
