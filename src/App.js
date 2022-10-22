import React from "react";
import { BrowserRouter as Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/pizza"><Form /></Route>
      </Switch>
    </>
  );
};
export default App;
