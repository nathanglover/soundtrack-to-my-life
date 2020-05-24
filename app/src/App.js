import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./graphql";
import { About, NotFound, DatePage } from "./pages";

function App() {
  const component = (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route
            exact
            path={[
              "/:year(2020)-:month(0?[1-9]|1[012])-:day(0?[1-9]|[12][0-9]|3[01])",
              "/",
            ]}
            component={DatePage}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
  return component;
}

export default App;
