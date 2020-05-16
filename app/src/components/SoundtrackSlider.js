import React, { useEffect, useState } from "react";
import MaterialUiSlider from "@material-ui/core/Slider";
import styled from "styled-components";

const SoundtrackSliderContainer = styled.div`
  margin: 1rem auto 0 auto;
  width: 640px;
`;

const Slider = styled(MaterialUiSlider)`
  span {
    color: white;
  }
`;

const TimeContainer = styled.div`
  margin-top: -0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #b3b3b3;
`;

const ONE_MINUTE = 60000;
const DAY_START_TIME = 0;
const DAY_END_TIME = 86400 * 1000 - 1000;

const getTime = (timestamp, date) => timestamp - date.getTime();

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
    const newTime = getTime(timelineObj.timestamp, date);
    if (time !== newTime) {
      console.log(time, newTime);
      setTime(newTime);
      console.log("here");
    }
  }, [timelineObj, date]);

  useEffect(() => {
    const timestamps = timeline.map((obj) => obj.timestamp);
    setMinTime(getTime(Math.min(...timestamps), date));
    setMaxTime(getTime(Math.max(...timestamps), date));
  }, [date, timeline]);

  const onChange = (value) => {
    // TODO: show something if timestamp of closest obj is not within one minute of value
    const timestamp = new Date().setTime(date.getTime() + value);
    const obj = getTimelineObj(timeline, timestamp);
    setTimelineObj(obj);
    setTime(getTime(obj.timestamp, date));
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
