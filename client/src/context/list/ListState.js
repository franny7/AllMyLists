import React, { useReducer } from 'react';
import uuid from 'uuid';
import ListContext from './listContext';
import listReducer from './listReducer';
import {
  ADD_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LIST,
  FILTER_LISTS,
  CLEAR_FILTER,
} from '../types';

const ListState = (props) => {
  const initialState = {
    // says email but convert to quantity
    lists: [
      {
        id: 1,
        name: 'Bananas',
        email: '5',
      },
      {
        id: 2,
        name: 'Oranges',
        email: '10',
      },
      {
        id: 3,
        name: 'Almond Milk',
        email: '3',
      },
    ],
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  // Add List

  // Delete List

  // Set Current List

  // Clear Current List

  // Update List

  // Filter Lists

  // Clear Filter

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
