import styled from 'styled-components'
import React, { useContext } from 'react'
import ThemeContext from '../../global/Theme'

export const WAITING_FOR_APPROVAL = 0
export const WAITING_FOR_ACCEPT = 1
export const CONFIRMED = 2

// Container element.
const FriendContainer = styled.div`
	background-color: ${props => props.theme.color.windowBg};
	padding: 10px 30px;
	border-radius: 20px;
	margin-bottom: 10px;
	position: relative;
	margin-top: 0;	
	color: ${props => props.theme.color.text};
	&:hover {
		color: ${props => props.theme.color.accent};
		cursor: pointer;
	}
`

// Title.
export const FriendTitle = styled.h2`
	font-size: ${props => props.theme.font.size.title};
	font-family: ${props => props.theme.font.body.family};
	display: inline-block;
	margin: 0;
	padding: 0;
`

// The actual status button.
const FriendStatusButton = styled.div`
	float: right;
	border-radius: 50px;
	font-size: ${props => props.theme.font.size.text};
	font-weight: ${props => props.theme.font.title.weight};
	font-family: ${props => props.theme.font.body.family};
	padding: 7px;
	background-color: ${props => props.bg};
	color: ${props => props.color};
	border: none;
	position: absolute;
	right: 0%;
	top: 50%;
	transform: translate(-50%, -50%);
	&:hover {
		background-color: ${props => props.activeColor};
	}
`

const FriendListItem = props => {

	// Use the theme for styling depending on status.
	const theme = useContext(ThemeContext)

	let statusButton = ''

	// If we have sent the request, and are waiting on the other to accept,
	// display gray waiting button
	if (props.status === WAITING_FOR_APPROVAL) {
		statusButton = <FriendStatusButton bg={theme.color.disabled}
										   color={theme.color.text}
										   activeColor={theme.color.disabled}>Waiting...</FriendStatusButton>
	}
	else if (props.status === WAITING_FOR_ACCEPT) {
		// Otherwise, if we have recieved the request, display primary accept
		// button with onclick event
		statusButton = <FriendStatusButton bg={theme.color.primary}
										   color={'white'} onClick={() => {
			props.onAccept(props.friendID)
		}}
										   activeColor={theme.color.primaryDark}>Accept</FriendStatusButton>
	}
	else if (props.status === CONFIRMED) {
		// If we are already friends, display chat button with chat onclick
		// event
		statusButton = <FriendStatusButton bg={theme.color.accent} color='white'
										   onClick={() => props.enterChat(
											   props.friendID)}
										   activeColor={theme.color.accentDark}>Chat</FriendStatusButton>
	}
	return (
		<FriendContainer>
			<FriendTitle>{props.name}</FriendTitle>
			{statusButton}
		</FriendContainer>
	)
}

export default FriendListItem