import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import ky from "ky";

("use strict");

ky.get('/static/data/countries.json')
  .json()
  .then(data => {
    ReactDOM.render(
      <App countries={data} />,
      document.getElementById("contents")
    );
  })
  .catch(err => {
    console.error(err.message);
  });
