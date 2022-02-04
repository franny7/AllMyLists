import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ list }) => {
  const { id, name, email } = list;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>{name}</h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-times'></i> {email}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListItem;
