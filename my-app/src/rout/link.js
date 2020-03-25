import React from "react";
import { Switch, Route } from "react-router-dom";

import Bisection from "../page/RootOfEquation/Bisection"
import Falseposition from "../page/RootOfEquation/Falseposition"
import Onepoint from "../page/RootOfEquation/Onepoint"
import Secant from "../page/RootOfEquation/Secant"
import Newton from "../page/RootOfEquation/Newton"
export default () => (
  <Switch>
    <Route exact path="/bisection" component={Bisection} />
    <Route exact path="/Falseposition" component={Falseposition} />
    <Route exact path="/onepoint" component={Onepoint} />
    <Route exact path="/Newton" component={Newton} />
    <Route exact path="/secant" component={Secant} />
  </Switch>
);