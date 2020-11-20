import {
	FormInput,
	FormTitle,
	FormWindow,
	FormButton, FormError, FormSubtitle,
} from '../form/FormElements'
import { useRef, useState, useEffect, useContext } from 'react'
import Background from '../app/Background'
import { sendRequest } from '../../api/apiClient'
import { USER_EXISTS } from '../../actions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Context } from '../../global/Store'


// Screen to enter username.
const EnterUsername = ({ onSubmit }) => {

	// The username
	const [username, setUsername] = useState(null)

	// If we are loading.
	const [loading, setLoading] = useState(false)

	// Input ref for getting value.
	const inputRef = useRef(null)

	// We only need the dispatch, since we don't use the state, we only update it.
	const [, dispatch] = useContext(Context)

	// Error.
	const [error, setError] = useState('')

	// When we submit the form, check if we exist & if so if we do, send us to login, if we don't send us to register.
	useEffect(() => {
		const usernameReturned = data => {

			setLoading(false)
			if (data.status === 'success') {
				dispatch({
					type: USER_EXISTS,
					payload: {
						...data.data,
						username,
					},
				})
			}
			else {
				setError('Something went wrong: ' + data.data)
			}
		}
		if (username !== null) {
			setLoading(true)
			sendRequest(USER_EXISTS, { username }, usernameReturned)
		}
	}, [username, dispatch])

	// Handle submit, if we an input value, set Username to it.
	const handleSubmit = e => {
		e.preventDefault()
		if (inputRef.current.value !== null && inputRef.current.value !== '') {
			setUsername(inputRef.current.value);
		}
	}

	// Content of the form.
	let formContent = (
		<>
			<FormTitle>
				Enter username
			</FormTitle>
			<FormSubtitle>Or think of a new one!</FormSubtitle>
			<form onSubmit={handleSubmit}>
				<FormInput autocomplete="username" placeholder="Enter username" ref={inputRef}/>
				<FormButton>
					Go
				</FormButton>
			</form>
		</>
	)

	// If we have already submitted, show loading icon.
	if (loading) {
		formContent = (
			<>
				<FontAwesomeIcon icon={faSpinner} size={'lg'} pulse/>
			</>
		)
	}

	return (
		<Background>
			<FormWindow>
				{formContent}
				<FormError>{error}</FormError>
			</FormWindow>
		</Background>
	)
}
export default EnterUsername

