import React, { Fragment, useContext } from 'react';
import ListItem from './ListItem';
import ListContext from '../../context/list/listContext';

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists } = listContext;

  return (
    <Fragment>
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
    </Fragment>
  );
};

export default Lists;
