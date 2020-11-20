import React, {useReducer, createContext } from 'react';
import {Reducer} from './Reducer';

// Default state.
const initialState = {
	auth: {
		ID: null,
		username: null,
		password: null,
		exists: false
	},
	nav: {
		currentPage: '/enter-username',
		currentChat: null
	},
	friends: {
		incoming: [],
		outgoing: [],
		friends: []
	},
	messages: null
}

// Global state context store.
const Store = ({children}) => {
	// Create the state, and render the children with the context provider.
	const [state, dispatch] = useReducer(Reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>
			{children}
		</Context.Provider>
	)
}

// The context.
export const Context = createContext(initialState);
export default Store;