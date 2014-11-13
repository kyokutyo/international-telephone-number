(function() {
    'use strict';

    var App = React.createClass({
        getInitialState: function() {
            return {data: {}}
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        onChangeHandler: function() {
            console.log('hoge');
        },
        render: function() {
            return (
                <div className="app">
                    <input type="text" pattern="[0-9]*" name="code" onChange={this.onChangeHandler} />
                </div>
            );
        }
    });

    React.renderComponent(
        <App url="/static/data/codes.json" />,
        document.getElementById('contents')
    );
}());
