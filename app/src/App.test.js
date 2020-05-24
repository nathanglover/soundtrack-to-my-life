import React from "react";
import { act } from "react-dom/test-utils";
import { Router, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "./App";

it("renders", () => {
  render(<App />);
});
