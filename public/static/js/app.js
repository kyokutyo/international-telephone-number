import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App"

("use strict");

ReactDOM.render(
  <App url="/static/data/countries.json" />,
  document.getElementById("contents")
);
