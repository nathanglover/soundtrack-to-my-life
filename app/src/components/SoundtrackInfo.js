import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";

const SoundtrackInfoContainer = styled.div`
  height: 1em;
  margin-top: 1.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.65em;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-left: 5px;
  }
`;

function SoundtrackInfo() {
  const component = (
    <SoundtrackInfoContainer>
      <Link to="/about">About</Link>
      <a href="https://github.com/nathanglover/soundtrack-to-my-life">
        <GitHubIcon />
      </a>
    </SoundtrackInfoContainer>
  );
  return component;
}

export default SoundtrackInfo;
