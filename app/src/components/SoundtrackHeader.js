import React from "react";
import styled from "styled-components";

const Title = styled.div`
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 1px;
  padding: 25px 0px 3px 0;
`;

const Date = styled.div`
  font-weight: bold;
  margin: 3px 0 3px 0;
`;

function SoundtrackHeader({ date }) {
  return (
    <div>
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
    </div>
  );
}

export default SoundtrackHeader;
