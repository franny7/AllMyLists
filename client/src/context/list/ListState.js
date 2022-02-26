import React, { useReducer } from 'react';
import axios from 'axios';
import ListContext from './listContext';
import listReducer from './listReducer';
import {
  GET_LISTS,
  ADD_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LIST,
  FILTER_LISTS,
  CLEAR_LISTS,
  CLEAR_FILTER,
  LIST_ERROR,
} from '../types';

const ListState = (props) => {
  const initialState = {
    // says email but convert to quantity
    lists: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  // Get List
  const getLists = async () => {
    try {
      const res = await axios.get('/api/lists');

      dispatch({
        type: GET_LISTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add List
  const addList = async (list) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/lists', list, config);

      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete List
  const deleteList = async (id) => {
    try {
      await axios.delete(`/api/lists/${id}`);

      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update List
  const updateList = async (list) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/lists/${list._id}`, list, config);

      dispatch({
        type: UPDATE_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: err.response.msg,
      });
    }
    dispatch({ type: UPDATE_LIST, payload: list });
  };

  // Clear List
  const clearLists = () => {
    dispatch({ type: CLEAR_LISTS });
  };

  // Set Current List
  const setCurrent = (list) => {
    dispatch({ type: SET_CURRENT, payload: list });
  };

  // Clear Current List
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Lists
  const filterLists = (text) => {
    dispatch({ type: FILTER_LISTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addList,
        deleteList,
        setCurrent,
        clearCurrent,
        updateList,
        filterLists,
        clearFilter,
        getLists,
        clearLists,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
