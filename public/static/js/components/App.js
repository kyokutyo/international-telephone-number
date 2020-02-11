import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { CountryList } from "./CountryList";
import { Footer } from "./Footer";
import ky from "ky";
import PropTypes from "prop-types";

export const App = props => {
  let countriesAll = [];
  const [countries, setCountries] = useState([]);
  const [typedOnce, setTypedOnce] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  useEffect(() => {
    ky.get(props.url)
      .json()
      .then(data => {
        countriesAll = data;
      })
      .catch(err => {
        console.error(err.message);
      });
  });
  const highlight = s => `<span class="highlight">${s}</span>`;
  const onChangeHandler = e => {
    const str = e.target.value;
    if (str.length === 0) {
      setCountries([]);
      setHasResult(false);
      return;
    }
    const newCountries = countriesAll
      .filter(country => country.code.indexOf(str) !== -1)
      .map(country => {
        country.code = country.code.replace(str, highlight(str));
        return country;
      });
    setCountries(newCountries);
    setTypedOnce(true);
    setHasResult(!!newCountries.length);
  };
  return (
    <div className="app">
      {typedOnce ? null : <Header />}
      <input
        type="number"
        pattern="[0-9]*"
        name="code"
        onChange={onChangeHandler}
        placeholder="input code # here."
      />
      <CountryList countries={countries} />
      {hasResult ? null : <Footer />}
    </div>
  );
};

App.propTypes = {
  url: PropTypes.string.isRequired
};
