import { useState, useEffect, useReducer, createContext } from "react";
import { user } from "./reducers/user";

// const initialState = {
//   user: {},
//   loggedIn: false
// };

const Context = createContext({});

const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// const Provider = ({ children }) => {
//   const [state, dispatch] = useReducer(combineReducers(user), initialState);
//   const value = { state, dispatch };
//
//   return <Context.Provider value={value}>{children}</Context.Provider>;
// };

export { Context, combineReducers };