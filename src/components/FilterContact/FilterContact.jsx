import React from 'react';
import PropTypes from 'prop-types';

export const FilterContact = ({ value, onChange }) => (
  <label>
    type name of person u lookin' for
    <input 
    type="text"
    value={value}
    onChange={onChange} 
    />
  </label>
);

FilterContact.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
