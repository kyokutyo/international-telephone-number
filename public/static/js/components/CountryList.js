import * as React from "react";
import { Country } from './Country'
import PropTypes from 'prop-types'

export const CountryList = props => {
  const CountryNodes = props.countries.map((country, idx) => {
    return <Country key={idx} code={country.code} name={country.name} />;
  });
  return <div className="countries">{CountryNodes}</div>;
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
};
