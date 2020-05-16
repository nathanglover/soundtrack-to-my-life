import React from "react";
import styled from "styled-components";

const SoundtrackHeaderContainer = styled.div`
  margin: 1.5em 0 5em 0;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 0.65em;
`;

const Date = styled.div`
  margin-top: -0.5em;
  font-size: 0.7em;
  font-weight: bold;
`;

function SoundtrackHeader({ date }) {
  return (
    <SoundtrackHeaderContainer>
      <Title>Soundtrack To My Life</Title>
      <Date>
        {date.toLocaleDateString("en-US", {
          timezone: "America/New_York",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Date>
    </SoundtrackHeaderContainer>
  );
}

export default SoundtrackHeader;
