import {
	FormInput,
	FormTitle,
	FormSubtitle,
	FormError,
	FormWindow,
	FormButton, FormButtonInverted,
} from '../form/FormElements'
import { useRef, useState, useEffect, useContext } from 'react'
import Background from '../app/Background'
import { sendRequest } from '../../api/apiClient'
import { NAVIGATE_TO, USER_REGISTER } from '../../actions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Context } from '../../global/Store'

// Register page.
const Register = () => {

	// Global state.
	const [state, dispatch] = useContext(Context);

	// To show loading icon.
	const [loading, setLoading] = useState(false)

	// The password.
	const password = useRef(null);

	// The repeated password.
	const repeatPassword = useRef(null);

	// The last valid password (pass == repeatPass).
	const [validPassword, setValidPassword] = useState(null);

	// Any errors.
	const [error, setError] = useState("");



	// When validPassword changes, send request to register new user.
	useEffect( () => {
		// Callback for when registered request returns.
		const userRegistered = data => {
			if ( data.status === 'success' ) {
				dispatch({
					type: USER_REGISTER,
					payload: {
						password: validPassword,
						ID: data.data.ID
					}
				})
			}
		}
		if ( validPassword !== null ) {
			setLoading(true);

			sendRequest(USER_REGISTER, {
				username: state.auth.username,
				password: validPassword
			}, userRegistered);
		}
	}, [validPassword, state.auth.username, dispatch]);

	// On submit, if passwords match, update valid password
	const onSubmit = event => {
		event.preventDefault();
		if ( password.current.value === repeatPassword.current.value ) {
			setError("");
			setValidPassword(password.current.value);

		} else {
			setError("The password's don't match");
		}
	}

	// If we press back button.
	const goBack = e => {
		e.preventDefault();
		dispatch({
			type: NAVIGATE_TO,
			payload: '/enter-username'
		})
	}

	// Render form.
	let content = (
		<>
			<FormTitle>Welcome!</FormTitle>
			<FormSubtitle>Think of a strong password</FormSubtitle>
			<form onSubmit={onSubmit}>
				<FormInput ref={password} type="password" placeholder="Enter password"></FormInput> <br />
				<FormInput ref={repeatPassword} type="password" placeholder="Repeat password"></FormInput>
				<FormError>{error}</FormError>
				<FormButton>Register</FormButton>
				<FormButtonInverted onClick={goBack}>Go Back</FormButtonInverted>
			</form>
		</>
	)

	// But if loading, render loading icon.
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

export default Register