import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import App from "../layouts/App";

const Router = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
        <Route path="/:slug" exact component={App} />
      </Switch>
    </React.Fragment>
  );
};
export default Router;
