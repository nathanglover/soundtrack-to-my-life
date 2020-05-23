import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { isToday } from "../utils";

const SoundtrackHeaderContainer = styled.div`
  margin: 1em 0 1em 0;
  text-align: center;
`;

const Title = styled(Link)`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 0.65em;
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Date = styled.div`
  margin-top: -0.5em;
  font-size: 0.7em;
  font-weight: bold;
`;

function SoundtrackHeader({ date }) {
  const component = (
    <SoundtrackHeaderContainer>
      <Title to="/">Soundtrack To My Life</Title>
      <Date>
        {isToday(date)
          ? "Today"
          : date.toLocaleDateString("en-US", {
              timezone: "America/New_York",
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
      </Date>
    </SoundtrackHeaderContainer>
  );
  return component;
}

export default SoundtrackHeader;
