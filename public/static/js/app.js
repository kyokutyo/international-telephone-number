import * as React from 'react'

(function() {
    'use strict';

    var Country = React.createClass({
        render: function() {
            return (
                <div className="country">
                    <span className="code" dangerouslySetInnerHTML={{__html: this.props.code}} />
                    <span className="name">{this.props.name}</span>
                </div>
            );
        }
    });

    var CountryList = React.createClass({
        render: function() {
            var CountryNodes = this.props.countries.map(function(country) {
                return (
                    <Country code={country.code} name={country.name} />
                );
            });
            return (
                <div className="countries">
                    {CountryNodes}
                </div>
            );
        }
    });

    var App = React.createClass({
        getInitialState: function() {
            return {
                countries: [],
                typedOnce: false,
                hasResult: false,
                whatsThisVisible: false
            }
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function(data) {
                    this.countries = data;
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        onChangeHandler: function() {
            var str = this.refs.code.getDOMNode().value;

            if(str.length === 0) {
                this.setState({
                    countries: [],
                    hasResult: false
                });
                return;
            }

            var newCountries = JSON.parse(JSON.stringify(this.countries)); // 値渡し
            newCountries = newCountries.filter(function(country) {
                return (country.code.indexOf(str) !== -1);
            }).map(function(country) {
                country.code = country.code.replace(str, '<span class="highlight">' + str + '</span>')
                return country;
            });
            this.setState({
                countries: newCountries,
                typedOnce: true,
                hasResult: !!(newCountries.length)
            });
        },
        onClickHandler: function() {
            this.setState({
                whatsThisVisible: true
            });
        },
        render: function() {
            var header, whatsThisContent, footer;
            if(!this.state.typedOnce) {
                header = (
                    <header>
                        <h1>International Telephone Number</h1>
                    </header>
                );
            }
            if(this.state.whatsThisVisible) {
                whatsThisContent = (
                    <div className="whats-this-content">
                        <p>
                            その国際電話番号がどこの国のものなのか調べることができます。
                            Wikipedia の<a href="http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7" target="_blank">国際電話番号の一覧</a>からデータを取得しています。
                            (データはリアルタイムで同期されているわけではありません)
                        </p>
                    </div>
                );
            }
            if(!this.state.hasResult) {
                footer = (
                    <footer>
                        {whatsThisContent}
                        <a className="whats-this-link" onClick={this.onClickHandler} href="#">What's this?</a>
                        <p className="copyright">&copy; kyokutyo (<a href="https://twitter.com/kyokutyo" target="_blank">Twitter</a>)</p>
                    </footer>
                );
            }
            return (
                <div className="app">
                    {header}
                    <input type="number" pattern="[0-9]*" name="code" onChange={this.onChangeHandler} ref="code" placeholder="input code # here." />
                    <CountryList countries={this.state.countries} />
                    {footer}
                </div>
            );
        }
    });

    React.renderComponent(
        <App url="/static/data/countries.json" />,
        document.getElementById('contents')
    );
}());
