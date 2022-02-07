import React, { useState, useContext } from 'react';
import ListContext from '../../context/list/listContext';

const ListForm = () => {
  const listContext = useContext(ListContext);

  const [list, setList] = useState({
    name: '',
    email: '',
  });

  const { name, email } = list;

  const onChange = (e) => setList({ ...list, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    listContext.addList(list);
    setList({
      name: '',
      email: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Item</h2>
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
          value='Add To List'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ListForm;
