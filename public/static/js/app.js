/** @jsx React.DOM */

(function() {
    'use strict';

    var Country = React.createClass({
        render: function() {
            return (
                <div className="country">
                    <span className="code" dangerouslySetInnerHTML={{__html: this.props.code}} />
                    <span className="name">{this.props.country}</span>
                </div>
            );
        }
    });

    var CountryList = React.createClass({
        render: function() {
            var CountryNodes = this.props.countries.map(function(country) {
                return (
                    <Country code={country.code} country={country.country} />
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
            return {countries: []}
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
                this.setState({countries: []});
                return;
            }
            this.hideHeading();

            var newCountries = JSON.parse(JSON.stringify(this.countries)); // 値渡し

            this.setState({
                countries: newCountries.filter(function(country) {
                    return (country.code.indexOf(str) !== -1);
                }).map(function(country) {
                    country.code = country.code.replace(str, '<span class="highlight">' + str + '</span>')
                    return country;
                })
            });
        },
        hideHeading: function() {
            $('h1').hide('normal');
        },
        render: function() {
            return (
                <div className="app">
                    <h1>International Telephone Number</h1>
                    <input type="text" pattern="[0-9]*" name="code" onChange={this.onChangeHandler} ref="code" placeholder="input code # here." />
                    <CountryList countries={this.state.countries} />
                </div>
            );
        }
    });

    React.renderComponent(
        <App url="/static/data/codes.json" />,
        document.getElementById('contents')
    );
}());
