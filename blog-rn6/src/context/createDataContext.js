import React, { useReducer } from 'react';

//ADDED THE COMMENTS FOR MY TUTORIAL PURPOSES LATER AS JOURNEY INTO MOBILE APPS WORLD
/**
 * Creates a data context with a provider component.
 * 
 * @param {Function} reducer - The reducer function to manage state.
 * @param {Object} actions - An object containing action creator functions.
 * @param {*} initialState - The initial state for the context.
 * @returns {Object} An object containing the Context and Provider components.
 */
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  /**
   * Provider component that wraps the application and provides the context.
   * 
   * @param {Object} props - The component props.
   * @param {React.ReactNode} props.children - The child components to be wrapped.
   */
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Bind dispatch to each action creator
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
