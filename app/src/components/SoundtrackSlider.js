import React, { useEffect, useState } from "react";
import MaterialUiSlider from "@material-ui/core/Slider";
import styled from "styled-components";

const SoundtrackSliderContainer = styled.div`
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

function SoundtrackSlider({ date, timeline, timelineObj, setTimelineObj }) {
  const [minTime, setMinTime] = useState(DAY_START_TIME);
  const [maxTime, setMaxTime] = useState(DAY_END_TIME);
  const [time, setTime] = useState(DAY_START_TIME);

  useEffect(() => {
    if (timelineObj) {
      const newTime = getTime(timelineObj.timestamp, date);
      if (time !== newTime) {
        setTime(newTime);
      }
    }
  }, [timelineObj, date, time]);

  useEffect(() => {
    if (timeline.length > 0) {
      const timestamps = timeline.map((obj) => obj.timestamp);
      setMinTime(getTime(Math.min(...timestamps), date));
      setMaxTime(getTime(Math.max(...timestamps), date));
    }
  }, [date, timeline]);

  const onChange = (value) => {
    const timestamp = new Date().setTime(date.getTime() + value);
    const obj = getTimelineObj(timeline, timestamp);
    if (
      Math.abs(obj.timestamp - getTimestamp(value, date)) <
      obj.track.duration_ms
    ) {
      setTimelineObj(obj);
      setTime(getTime(obj.timestamp, date));
    } else {
      setTimelineObj(null);
      setTime(value);
    }
  };

  return (
    <SoundtrackSliderContainer>
      <Slider
        min={minTime}
        max={maxTime}
        value={time}
        step={ONE_MINUTE}
        onChange={(_, value) => onChange(value)}
      />
      <TimeContainer>
        <div>{toTimeString(time)}</div>
        <div>{toTimeString(maxTime)}</div>
      </TimeContainer>
    </SoundtrackSliderContainer>
  );
}

export default SoundtrackSlider;
