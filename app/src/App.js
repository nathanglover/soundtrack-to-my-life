import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./graphql";
import { About, NotFound, DatePage } from "./pages";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route exact path={["/:dateParam", "/"]} component={DatePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
