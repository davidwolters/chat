import { Context } from '../../global/Store'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { sendRequest } from '../../api/apiClient'
import {
	ENTER_CHAT,
	FRIENDS_ACCEPT_REQUEST,
	FRIENDS_GET,
	NAVIGATE_TO,
} from '../../actions/types'
import List from '../app/List'
import FriendListItem, {
	CONFIRMED, WAITING_FOR_ACCEPT,
	WAITING_FOR_APPROVAL,
} from '../friends/FriendListItem'
import Background from '../app/Background'
import { Title } from '../app/Title'
import { FormButton, FormError } from '../form/FormElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FlexHeader from '../app/FlexHeader'
import FlexContainer from '../app/FlexContainer'
import FlexContent from '../app/FlexContent'

// Route to view friends, accept request, enter chats & add friends view.
const Friends = () => {

	// Global state
	const [state, dispatch] = useContext(Context)

	// Any errors.
	const [error, setError] = useState(null)

	const [interval, setInterval] = useState(false)

	// Subscribe to friends listener.

	useEffect(() => {

		if (false === interval) {

			// When we recieved repsponse from friends hearbeat, load new
			// friends.
			const friendsCallback = data => {
				if (data.status === 'success') {
					dispatch({
						type: FRIENDS_GET,
						payload: {
							friends: data.data.friends,
							incoming: data.data.incoming,
							outgoing: data.data.outgoing,
						},
					})
				}
				else {
					setError(data.data)
				}
			}
			// Sends a request to get new
			const updateFriendList = () => {
				if (state.auth.username === null || state.auth.password ===
					null) {
					return
				}

				sendRequest(FRIENDS_GET,
					{
						username: state.auth.username,
						password: state.auth.password,
					},
					friendsCallback)
			}
			const interval = setInterval(() => {
				updateFriendList()
			}, 2000)
			setInterval(interval)
		}
		return () => clearInterval(interval)
	}, [interval, dispatch, state.auth.username, state.auth.password])

	// Callback for friend request accepted.
	const friendRequestAccepted = data => {
		if (data.status !== 'success') {
			setError('Something went wrong!')
		}
	}

	// Convert state.friends.friends to FriendListItem
	const friends = useMemo(() => state.friends.friends.map(friend => {
		// Enter chat, changes currentpage to chat.
		const enterChat = ID => {
			dispatch({
				type: ENTER_CHAT,
				payload: ID,
			})
		}
		return <FriendListItem key={friend.ID}
							   friendID={friend.ID} name={friend.username}
							   status={CONFIRMED}
							   enterChat={enterChat}/>
	}), [state.friends.friends, dispatch])

	// Convert state.friends.outgoing to FriendListItem
	const friendRequestsSent = useMemo(
		() => state.friends.outgoing.map(friend => {
			return <FriendListItem key={friend.ID}
								   friendID={friend.ID} name={friend.username}
								   status={WAITING_FOR_APPROVAL}/>
		}), [state.friends.outgoing])

	// Conver state.friends.incoming to FriendListItem
	const friendRequestsIncoming = useMemo(
		() => {
			// Callback from friendlistitem, sends request to accept incoming
			// friend request.
			const acceptFriendRequest = ID => {
				sendRequest(FRIENDS_ACCEPT_REQUEST, {
					username: state.auth.username,
					password: state.auth.password,
					user: ID,
				}, friendRequestAccepted)
			}

			return state.friends.incoming.map(friend => {
				return <FriendListItem key={friend.ID}
									   friendID={friend.ID}
									   name={friend.username}
									   onAccept={acceptFriendRequest}
									   status={WAITING_FOR_ACCEPT}/>
			})
		}, [state.friends.incoming, state.auth.username, state.auth.password])

	// Go to add-friend page.
	const addFriend = () => {
		dispatch({
			type: NAVIGATE_TO,
			payload: 'add-friend',
		})
	}

	return (
		<Background>
			<FlexContainer>
				<FlexHeader center={true} title={'Friends'}
							excludeBackButton={true}/>
				<FlexContent>
					<FormError>{error}</FormError>
					<List>
						{friends}
					</List>

					<Title>Friend Requests</Title>
					<List>
						{friendRequestsSent}
						{friendRequestsIncoming}
						<FormButton onClick={addFriend}><FontAwesomeIcon
							icon={faPlus}/></FormButton>
					</List>
				</FlexContent>
			</FlexContainer>
		</Background>
	)

}
export default Friends