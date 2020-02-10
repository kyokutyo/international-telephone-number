import * as React from "react";
import PropTypes from "prop-types";

export const Country = props => (
  <div className="country">
    <span className="code" dangerouslySetInnerHTML={{ __html: props.code }} />
    <span className="name">{props.name}</span>
  </div>
);

Country.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
