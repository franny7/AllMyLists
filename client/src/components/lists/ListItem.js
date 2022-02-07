import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListContext from '../../context/list/listContext';

const ListItem = ({ list }) => {
  const listContext = useContext(ListContext);
  const { deleteList, setCurrent, clearCurrent } = listContext;

  const { id, name, email } = list;

  const onDelete = () => {
    deleteList(id);
    clearCurrent();
  };

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
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(list)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListItem;
