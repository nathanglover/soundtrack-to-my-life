import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import MaterialUiSlider from "@material-ui/core/Slider";
import styled from "styled-components";
import { isToday, getDateURLString } from "../utils";

const SoundtrackSliderContainer = styled.div`
  display: ${(props) => (props.isLoadingAlbum ? "none" : "block")};
  margin-top: 0.5em;
`;

const Slider = styled(MaterialUiSlider)`
  span {
    color: white;
  }
  margin-bottom: -22.5px;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.55em;
  color: #b3b3b3;
`;

const ONE_MINUTE = 60000;
const ONE_DAY = 6000 * 60 * 24;
const DAY_START_TIME = 0;
const DAY_END_TIME = 86400 * 1000 - 1000;

const getTime = (timestamp, date) => timestamp - date.getTime();
const getTimestamp = (time, date) => time + date.getTime();

const toTimeString = (time) => {
  const options = {
    timeStyle: "short",
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(time).toLocaleTimeString("en-US", options);
};

const getTimelineObj = (data, toFind) =>
  data.reduce(
    ({ timestamp: a, ...timelineObjA }, { timestamp: b, ...timelineObjB }) =>
      Math.abs(toFind - b) < Math.abs(toFind - a)
        ? { timestamp: b, ...timelineObjB }
        : { timestamp: a, ...timelineObjA }
  );

function SoundtrackSlider({
  date,
  timeline,
  timelineObj,
  isLoadingAlbum,
  setTimelineObj,
  isPlaying,
  setIsPlaying,
}) {
  const [minTime, setMinTime] = useState(DAY_START_TIME);
  const [maxTime, setMaxTime] = useState(DAY_END_TIME);
  const [time, setTime] = useState(getTime(timelineObj.timestamp, date));

  useEffect(() => {
    const timestamps = timeline.map((obj) => obj.timestamp);
    setMinTime(getTime(Math.min(...timestamps), date));
    setMaxTime(getTime(Math.max(...timestamps), date));
  }, [date, timeline]);

  useEffect(() => {
    const timestamp = new Date().setTime(date.getTime() + time);
    const obj = getTimelineObj(timeline, timestamp);
    const timeDiff = Math.abs(obj.timestamp - getTimestamp(time, date));
    if (timeDiff < ONE_DAY && timeDiff < obj.track.duration_ms) {
      setTimelineObj(obj);
      if (time === maxTime && isToday(date)) {
        setIsPlaying(false);
      }
    } else if (timeDiff < ONE_DAY) {
      setTimelineObj({ timestamp: time });
    } else {
      setTime(getTime(timelineObj.timestamp, date));
    }
  }, [date, time, maxTime, timeline, timelineObj.timestamp, setIsPlaying, setTimelineObj]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTime((time) => {
          const nextTime = time + ONE_MINUTE;
          if (nextTime > maxTime) {
            return maxTime;
          }
          return time + ONE_MINUTE;
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, maxTime, setIsPlaying]);

  if (isPlaying && !isToday(date) && time === maxTime) {
    const nextDate = getDateURLString(date, 1);
    return <Redirect to={`/${nextDate}`} />;
  }

  return (
    <SoundtrackSliderContainer isLoadingAlbum={isLoadingAlbum}>
      <Slider
        min={minTime}
        max={maxTime}
        value={time}
        step={ONE_MINUTE}
        onChange={(_, value) => setTime(value)}
      />
      <TimeContainer>
        <div>{toTimeString(time)}</div>
        <div>{toTimeString(maxTime)}</div>
      </TimeContainer>
    </SoundtrackSliderContainer>
  );
}

export default SoundtrackSlider;
