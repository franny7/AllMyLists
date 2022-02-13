import React, { Fragment, useContext } from 'react';
import ListItem from './ListItem';
import ListContext from '../../context/list/listContext';

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered } = listContext;

  if (lists.length === 0) {
    return <h4>Please add a list item</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((list) => <ListItem key={list.id} list={list} />)
        : lists.map((list) => <ListItem key={list.id} list={list} />)}
    </Fragment>
  );
};

export default Lists;
