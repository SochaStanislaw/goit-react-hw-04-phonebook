import React from 'react';
import PropTypes from 'prop-types';

export const ListContact = ({ contacts, removeContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        <p>{name}:</p>
        <p>{number}</p>
        <button
          type="button"
          onClick={() => removeContact(id)}
        >
          remove
        </button>
      </li>
    ))}
  </ul>
);

ListContact.propTypes = {
  contacts: PropTypes.arrayOf
    (
        PropTypes.exact({
        name: PropTypes.string,
        number: PropTypes.string,
        id: PropTypes.string,
        })
    ),
    removeContact: PropTypes.func,
};
