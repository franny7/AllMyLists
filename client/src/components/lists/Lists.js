import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from './ListItem';
import Spinner from '../layout/Spinner';
import ListContext from '../../context/list/listContext';

const Lists = () => {
  const listContext = useContext(ListContext);

  const { lists, filtered, getLists, loading } = listContext;

  useEffect(() => {
    getLists();
    // eslint-disable-next-line
  }, []);

  if (lists !== null && lists.length === 0 && !loading) {
    return <h4>Add a list item</h4>;
  }

  return (
    <Fragment>
      {lists !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((list) => (
                <CSSTransition key={list._id} timeout={500} classNames='item'>
                  <ListItem list={list} />
                </CSSTransition>
              ))
            : lists.map((list) => (
                <CSSTransition key={list._id} timeout={500} classNames='item'>
                  <ListItem list={list} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Lists;
