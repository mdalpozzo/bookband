import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  tabIndex,
}) => (
  <div className="text-field">
    {info && <small className="form-text">{info}</small>}
    <input
      type={type}
      className={classnames('', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      tabIndex={tabIndex}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  tabIndex: PropTypes.number,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
