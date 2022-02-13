import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from './ListItem';
import ListContext from '../../context/list/listContext';

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered } = listContext;

  if (lists.length === 0) {
    return <h4>Add a list item</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((list) => (
              <CSSTransition key={list.id} timeout={500} classNames='item'>
                <ListItem list={list} />
              </CSSTransition>
            ))
          : lists.map((list) => (
              <CSSTransition key={list.id} timeout={500} classNames='item'>
                <ListItem list={list} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Lists;
