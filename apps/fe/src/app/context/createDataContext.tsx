import React, { Reducer, useReducer } from 'react';

// This is a higher-order function that creates a context object with a Provider
// and a Consumer. The Provider uses the given reducer and initial state to
// manage state, and the actions object is used to bind action creators to the
// dispatch function so they can be called directly.
function createContext<
  STATE,
  ACTION_TYPES extends string,
  ACTION_PAYLOAD_TYPES
>(
  reducer: React.Reducer<
    STATE,
    { type: ACTION_TYPES; payload?: ACTION_PAYLOAD_TYPES }
  >,

  actions: Record<
    ACTION_TYPES,
    (
      dispatch: React.Dispatch<{
        type: ACTION_TYPES;
        payload?: ACTION_PAYLOAD_TYPES;
      }>
    ) => (payload?: ACTION_PAYLOAD_TYPES) => void
  >,

  initialState: STATE
) {
  // This is the type of the bound action creators that will be added to the
  // context value.
  type ActionsType = Record<
    ACTION_TYPES,
    (payload?: ACTION_PAYLOAD_TYPES) => void
  >;

  // This is the type of the value that the context object will store.
  type ContextValue = {
    state: STATE;
    actions?: ActionsType;
  };

  // Create the context object with the initial state as the default value.
  const Context = React.createContext<ContextValue>({ state: initialState });

  // This is the Provider component that wraps the children and manages state
  // using the given reducer.
  const Provider = ({ children }: { children: React.ReactNode }) => {
    // Use the useReducer hook to initialize state and create a dispatch function
    // for dispatching actions to the reducer.
    const [state, dispatch] = useReducer<
      Reducer<STATE, { type: ACTION_TYPES; payload?: ACTION_PAYLOAD_TYPES }>
    >(reducer, initialState);

    // Create an object for holding the bound action creators.
    const boundActions: Partial<ActionsType> = {};

    // Iterate over the action creators in the actions object and bind each one
    // to the dispatch function.
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    // Return the Provider component with the current state and bound action
    // creators as the value.
    return (
      <Context.Provider
        value={{ state: state, actions: { ...(boundActions as ActionsType) } }}
        children={children}
      />
    );
  };

  // Return the context object and the Provider component.
  return { Context, Provider };
}

// Export the higher-order function as the default export.
export default createContext;
