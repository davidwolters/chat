import styled from 'styled-components'
import React, { useContext } from 'react'
import { FriendTitle } from './FriendListItem'
import { FormButton } from '../form/FormElements'
import ThemeContext from '../../global/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'

const FriendBubble = styled.div`
	background-color: white;
	padding: 10px 20px;
	border-radius: 10px;
	text-align: center;
	min-width: 30%;
	display: inline-block;
	
	
`

const FriendContainer = styled.div`
	width: 100%;
	height: 100%;
	display: block;
	position: relative;
	text-align: center;
	margin-top: 10px;
`

// FriendResult, showed in AddFriend.js
const FriendResult = props => {

	const theme = useContext(ThemeContext)

	// The button that lets us add the friend.
	let button = <FormButton color={theme.color.accent}
							 activeColor={theme.color.accentDark}
							 onClick={props.addFriend}>
		Add Friend</FormButton>

	// If we have clicked it, show that it is loading.
	if (props.status === 'loading') {
		button = (
			<FormButton color={theme.color.accent}
						activeColor={theme.color.accent}>
				<FontAwesomeIcon icon={faSpinner} pulse/>
			</FormButton>
		)
	}
	else if (props.status === 'added') {
		// If we have now added the friend, show confirmation.
		button = (
			<FormButton color={theme.color.secondary}
						activeColor={theme.color.secondary}>
				<FontAwesomeIcon icon={faCheck}/>
			</FormButton>
		)
	}
	else if (props.status === 'error') {
		// If something went wrong, show that.
		button = (
			<FormButton color={theme.color.error}
						activeColor={theme.color.error}>
				Error
			</FormButton>
		)
	}
	return (
		<div>
			<FriendContainer>
				<FriendBubble>
					<FriendTitle>{props.name}</FriendTitle>
					{button}
				</FriendBubble>
			</FriendContainer>
		</div>
	)
}

export default FriendResult