import React, { useState, useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';

const ListForm = () => {
  const listContext = useContext(ListContext);

  const { addList, updateList, clearCurrent, current } = listContext;

  useEffect(() => {
    if (current !== null) {
      setList(current);
    } else {
      setList({
        name: '',
        email: '',
        type: 'grocery',
      });
    }
  }, [listContext, current]);

  const [list, setList] = useState({
    name: '',
    email: '',
    type: 'grocery',
  });

  const { name, email } = list;

  const onChange = (e) => setList({ ...list, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addList(list);
    } else {
      updateList(list);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Item' : 'Add Item'}</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Quantity'
        name='email'
        value={email}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Item' : 'Add Item'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ListForm;
