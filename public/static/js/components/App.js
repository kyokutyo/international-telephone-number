import React, { useState } from "react";
import { Header } from "./Header";
import { CountryList } from "./CountryList";
import { Footer } from "./Footer";
import PropTypes from "prop-types";

export const App = props => {
  const countriesAll = props.countries
  const [countries, setCountries] = useState([]);
  const [typedOnce, setTypedOnce] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const highlight = s => `<span class="highlight">${s}</span>`;
  const onChangeHandler = e => {
    const str = e.target.value;
    if (str.length === 0) {
      setCountries([]);
      setHasResult(false);
      return;
    }
    const newCountries = countriesAll
      .filter(country => country.code.includes(str))
      .map(country => ({
        ...country,
        code: country.code.replace(str, highlight(str))
      }));
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
  countries: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string,
    name: PropTypes.string
  })).isRequired
}
