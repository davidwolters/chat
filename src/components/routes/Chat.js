import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { Context } from '../../global/Store'
import { sendRequest } from '../../api/apiClient'
import { MESSAGES_GET, MESSAGES_SEND } from '../../actions/types'
import FlexContainer from '../app/FlexContainer'
import MessagesContainer from '../chat/MessagesContainer'
import ChatInput from '../chat/ChatInput'
import { FormWindow } from '../form/FormElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Background from '../app/Background'
import Message from '../chat/Message'
import FlexHeader from '../app/FlexHeader'
import FlexContent from '../app/FlexContent'

// The chat route.
const Chat = props => {

	// The global state.
	const [state, dispatch] = useContext(Context)

	// Any error messages.
	const [error, setError] = useState(null)

	// Callback from get messages heartbeat.
	const recievedMessages = data => {
		if (data.status === 'success') {
			setError(null)
			// Tell our state to update the messages.
			dispatch({
				type: MESSAGES_GET,
				payload: {
					ID: state.nav.currentChat,
					messages: data.data.messages,
				},
			})
		}
		else {
			// Update error if error.
			setError(error)
		}
	}

	// Check for messages every 2 seconds.
	useEffect(() => {
		const interval = setInterval(
			() => {

				sendRequest(MESSAGES_GET, {
					username: state.auth.username,
					password: state.auth.password,
					recipient: state.nav.currentChat,
					last_seen: 0,
				}, recievedMessages)
			}, 2000,
		)

		return () => clearInterval(interval)
	}, [])

	// Callback for when message has been sent.
	// the messages update themselves, so no need to dispatch.
	const messageSent = data => {
		if (data.status !== 'success') {
			setError(data.data)
		}
	}

	// Send a request to send a new message.
	const sendMessage = message => {
		sendRequest(MESSAGES_SEND, {
			username: state.auth.username,
			password: state.auth.password,
			recipient: state.nav.currentChat,
			message: message,
		}, messageSent)
	}

	// Get the name of the friend.
	let friendName = state.friends.friends.find(friend => {
		return friend.ID === state.nav.currentChat
	})

	// If we haven't found it yet, set it to loading.
	if (friendName === undefined) {
		friendName = 'Loading...'
	}

	// The contents on the screen.
	let contents = null

	// If we have loaded messages for the chat.
	if (state.messages !== null && state.nav.currentChat !== null &&
		state.messages[state.nav.currentChat] !== undefined) {

		// Get a list of all messages a components.
		const messages = state.messages[state.nav.currentChat].map(message => {
			const fromMe = message.from === parseInt(state.auth.ID)
			return <Message key={message.ID} message={message.message}
							outgoing={fromMe}/>
		})

		contents = (
			<>
				<FlexHeader title={friendName.username}/>
				<MessagesContainer>
					{messages}
				</MessagesContainer>
				<ChatInput sendMessage={sendMessage}/>
			</>
		)
	}
	else {
		// Otherwise, display the loading icon.
		contents = (
			<>
				<FlexHeader title={friendName.username}/>
				<FlexContent>
					<FormWindow>
						<FontAwesomeIcon icon={faSpinner} pulse/>
					</FormWindow>
				</FlexContent>
			</>
		)
	}

	return (
		<Background>
			<FlexContainer>
				{contents}
			</FlexContainer>
		</Background>
	)
}

export default Chat