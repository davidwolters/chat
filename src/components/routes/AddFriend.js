import Background from '../app/Background'
import FlexContainer from '../app/FlexContainer'
import FlexHeader from '../app/FlexHeader'
import FlexContent from '../app/FlexContent'
import SearchBar from '../app/SearchBar'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FRIENDS_SEND_REQUEST, USER_EXISTS } from '../../actions/types'
import { sendRequest } from '../../api/apiClient'
import { FormError, FormWindow } from '../form/FormElements'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FriendResult from '../friends/FriendResult'
import { Context } from '../../global/Store'

// Route that lets us add new friends by searching by their usernames.
const AddFriend = props => {

	// The global state.
	const [state, dispatch] = useContext(Context)

	// If we are loading new search results.
	const [loading, setLoading] = useState(false)

	// If we find a user, store it here.
	const [foundUser, setFoundUser] = useState(null)

	// Potential errors.
	const [error, setError] = useState('')

	// The search text.
	const [searchUsername, setSearchUsername] = useState(null)

	// The status of the current friend,  add | loading | added | error
	const [friendStatus, setFriendStatus] = useState('add')

	// When searchUsername changes, send a request to check if that use exists.
	useEffect(() => {
		if (searchUsername === undefined) {
			return
		}
		setLoading(true)
		sendRequest(USER_EXISTS, {
			username: searchUsername,
		}, searchResultReturned)
	}, [searchUsername])

	// Function to check if we have a relation (are friends with, sent or
	// recieved request from) with the found user
	const relationExists = useCallback(ID => {
		const matchWithID = friend => {
			return parseInt(friend.ID) === parseInt(ID)
		}

		return state.friends.friends.some(matchWithID) ||
			state.friends.outgoing.some(matchWithID) ||
			state.friends.incoming.some(matchWithID)
	}, [foundUser])

	// Resopnse handler for search for friend.
	const searchResultReturned = data => {

		if (data.status !== 'success') {
			setError(data.data)
		}
		else {
			setLoading(false)

			// If the user doesn't exist, we didn't find anything.
			if (!data.data.user_exists) {
				setFoundUser(null)
				return
			}

			// If the username doesn't match the current searchUsername, alas
			// we have typed something more into the search box, we haven't
			// found anything either.
			if (data.data.user.username !== searchUsername) {
				setFoundUser(null)
				return
			}

			// If we already "know" this person, we haven't found anything.
			if (relationExists(data.data.user.ID)) {
				setFoundUser(null)
				return
			}

			// set the found user.
			setFoundUser({
				ID: data.data.user.ID,
				username: data.data.user.username,
			})

		}
	}

	// Callback from SearchBar's onChange, set a new searchText to trigger a
	// request.
	const searchForFriend = searchText => {
		if (searchText !== searchUsername) {
			setSearchUsername(searchText)
		}
	}

	// Callback for when the friend has been added (or failed to do so).
	const friendAdded = data => {
		if (data.status === 'success') {
			setFriendStatus('added')
		}
		else {
			setFriendStatus('error')
		}
	}

	// Function to send a request to send a new friend request.
	const addFriend = () => {
		// Make sure we haven't already sent a request.
		if (foundUser !== null && friendStatus === 'add') {
			setFriendStatus('loading')
			sendRequest(FRIENDS_SEND_REQUEST, {
				username: state.auth.username,
				password: state.auth.password,
				recipient: foundUser.ID,
			}, friendAdded)
		}
	}

	// If we are searching, show the spinner icon.
	let content = ''
	if (loading) {
		content = (
			<FormWindow>
				<FontAwesomeIcon icon={faSpinner} pulse/>
			</FormWindow>
		)
	}
	else if (foundUser !== null) {
		// Otherwise, show the friend result, if we have found something.
		content = (

			<FriendResult addFriend={addFriend} name={foundUser.username}
						  ID={foundUser.ID}
						  status={friendStatus}/>
		)
	}
	return (
		<Background>
			<FlexContainer>
				<FlexHeader center={true} title={'Add Friend'}/>
				<FlexContent>

					<SearchBar search={searchForFriend}/>
					{content}
					<FormError>{error}</FormError>
				</FlexContent>
			</FlexContainer>
		</Background>
	)
}

export default AddFriend