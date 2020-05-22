import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";

const SoundtrackInfoContainer = styled.div`
  height: 2em;
  a {
    color: white;
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
  }
  span {
    font-size: 0.65em;
    margin-left: 5px;
  }
`;

function SoundtrackInfo() {
  return (
    <SoundtrackInfoContainer>
      <a href="https://github.com/nathanglover/soundtrack-to-my-life">
        <GitHubIcon />
        <span>Nathan Glover</span>
      </a>
    </SoundtrackInfoContainer>
  );
}

export default SoundtrackInfo;
