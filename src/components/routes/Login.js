import {
	FormInput,
	FormTitle,
	FormWindow,
	FormButton, FormError, FormButtonInverted,
} from '../form/FormElements'
import { useRef, useState, useEffect, useContext } from 'react'
import Background from '../app/Background'
import { sendRequest } from '../../api/apiClient'
import { NAVIGATE_TO, USER_LOGIN } from '../../actions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import ThemeContext from '../../global/Theme'

import { Context } from '../../global/Store'


// Login page
const Login = props => {

	// Global state.
	const [state, dispatch] = useContext(Context)

	// Theme
	const theme = useContext( ThemeContext );

	// If we are requesting the login.
	const [loading, setLoading] = useState(false)

	// The password
	const [password, setPassword] = useState(null);

	// Any errors.
	const [error, setError] = useState("");

	// Input ref, for getting password
	const input = useRef(null);


	// Back button, navigate to /enter-username
	const goBack = event => {
		event.preventDefault();
		dispatch({
			type: NAVIGATE_TO,
			payload: "/enter-username"
		})
	}

	// Callback for when login has returned.
	const userLoginReturned = data => {
		setLoading(false);
		if ( data.status === 'success' ) {
			dispatch({
				type: USER_LOGIN,
				payload: {
					password,
					ID: data.data.ID,
					friends: {
						friends: data.data.friends,
						outgoing: data.data.friend_requests_sent,
						incoming: data.data.friend_requests_pending
					},
					meta: data.data.meta
				}
			});
		} else {
			setError("Incorrect password");
		}
	}

	// When password state changes, send new request.
	useEffect(() => {
		// Callback for when login has returned.
		const userLoginReturned = data => {
			setLoading(false);
			if ( data.status === 'success' ) {
				dispatch({
					type: USER_LOGIN,
					payload: {
						password,
						ID: data.data.ID,
						friends: {
							friends: data.data.friends,
							outgoing: data.data.friend_requests_sent,
							incoming: data.data.friend_requests_pending
						},
						meta: data.data.meta
					}
				});
			} else {
				setError("Incorrect password");
			}
		}

		if ( password !== null ) {
			sendRequest( USER_LOGIN, {
				username: state.auth.username,
				password
			}, userLoginReturned );
		}
	}, [password, state.auth.username]);

	// On form submit, update password state.
	const onSubmit = event => {
		setLoading(true);
		setPassword(input.current.value);
		event.preventDefault()
	}


	let content = (
		<>
			<FormTitle>Enter Password</FormTitle>
			<form onSubmit={onSubmit}>
				<FormInput type="password" ref={input} autocomplete="password" />
				<FormError>{error}</FormError>
				<FormButton>Go</FormButton>
				<FormButtonInverted onClick={goBack} color={theme.color.secondary} activeColor={theme.color.secondaryDark}>
					Back
				</FormButtonInverted>
			</form>

		</>
	)

	if (loading) {
		content = (
			<>
				<FontAwesomeIcon icon={faSpinner} pulse />
			</>
		)
	}

	return (
		<Background>
			<FormWindow>
				{content}
			</FormWindow>
		</Background>
	)
}

export default Login