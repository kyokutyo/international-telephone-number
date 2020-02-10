import React, { useState, useEffect } from "react";
import { CountryList } from './CountryList'
import ky from 'ky'
import PropTypes from "prop-types";

export const App = props => {
  let countriesAll = [];
  const [countries, setCountries] = useState([])
  const [typedOnce, setTypedOnce] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [whatsThisVisible, setWhatsThisVisible] = useState(false)
  useEffect(() => {
    ky.get(props.url)
      .json()
      .then(data => {
        countriesAll = data;
      })
      .catch(err => {
        console.error(err.message);
      });
  })
  const highlight = s => `<span class="highlight">${s}</span>`
  const onChangeHandler = e => {
    const str = e.target.value;
    if (str.length === 0) {
      setCountries([])
      setHasResult(false)
      return;
    }
    const newCountries = countriesAll.filter(country => country.code.indexOf(str) !== -1).map(country => {
      country.code = country.code.replace(str, highlight(str));
      return country;
    })
    setCountries(newCountries)
    setTypedOnce(true)
    setHasResult(!!newCountries.length)
  };

  let header, whatsThisContent, footer;
  if (!typedOnce) {
    header = (
      <header>
        <h1>International Telephone Number</h1>
      </header>
    );
  }
  if (whatsThisVisible) {
    whatsThisContent = (
      <div className="whats-this-content">
        <p>
          その国際電話番号がどこの国のものなのか調べることができます。
          Wikipedia の
          <a
            href="http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7"
            target="_blank"
            rel="noopener noreferrer"
          >
            国際電話番号の一覧
          </a>
          からデータを取得しています。
          (データはリアルタイムで同期されているわけではありません)
        </p>
      </div>
    );
  }
  if (!hasResult) {
    const onClickHandler = () => {
      setWhatsThisVisible(true)
    };
    footer = (
      <footer>
        {whatsThisContent}
        <a className="whats-this-link" onClick={onClickHandler} href="#">
          What&apos;s this?
        </a>
        <p className="copyright">
          &copy; kyokutyo (
          <a href="https://twitter.com/kyokutyo" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          )
        </p>
      </footer>
    );
  }
  return (
    <div className="app">
      {header}
      <input
        type="number"
        pattern="[0-9]*"
        name="code"
        onChange={onChangeHandler}
        placeholder="input code # here."
      />
      <CountryList countries={countries} />
      {footer}
    </div>
  );
};

App.propTypes = {
  url: PropTypes.string.isRequired
}
