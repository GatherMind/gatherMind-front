import React from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-message">
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="retry-button">
        다시 시도
      </button>
    )}
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
