import React from 'react';
import { useContext } from 'react'
import { Context } from '../../global/Store'
import { Redirect } from 'react-router-dom'

// Always redirects to the current page, used for navigation & security.
const AuthWrapper = ({ children }) => {

	// Get the current page from the global state context.
	const [state, ] = useContext(Context)

	return (
		<>
			{children}
			<Redirect to={state.nav.currentPage} />
		</>
	)

};

export default AuthWrapper;