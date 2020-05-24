import React from "react";
import { act } from "react-dom/test-utils";
import { Router, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import DatePage from "../DatePage";

it("renders a specific date", async () => {
  const history = createMemoryHistory();
  const route = "/2020-04-15";
  history.push(route);
  const mocks = [];
  await act(async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <Route
            exact
            path="/:year(2020)-:month(0?[1-9]|1[012])-:day(0?[1-9]|[12][0-9]|3[01])"
            component={DatePage}
          />
        </Router>
      </MockedProvider>
    );
    await waitFor(() =>
      expect(getByText("Wednesday, April 15, 2020")).toBeInTheDocument()
    );
  });
});

it("renders today", async () => {
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  const mocks = [];
  await act(async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <Route exact path="/" component={DatePage} />
        </Router>
      </MockedProvider>
    );
    await waitFor(() => expect(getByText("Today")).toBeInTheDocument());
  });
});
