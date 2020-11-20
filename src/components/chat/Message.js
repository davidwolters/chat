import styled from 'styled-components'
import ThemeContext from '../../global/Theme'
import React, { useContext } from 'react'

const MessageBubble = styled.div`
	border-radius: 50px;
	display: inline-block;
	max-width: 50%;
	
	text-align: right;
	
	background-color: ${props => props.bg};
	color: white;
	padding: 5px 10px;
	font-family: ${props => props.theme.font.body.family};
	font-weight: ${props => props.theme.font.body.weight};
`

const MessageContainer = styled.div`
	display: block;
	text-align: ${props => props.textAlign};
	margin-bottom: 5px;
`

const Message = props => {

	const theme = useContext(ThemeContext)

	// If the message is outgoing, we use the accent color, if not, we use the
	// disabled color, and adjust textAlign accordingly.
	const background = props.outgoing === true
		? theme.color.accent
		: theme.color.disabled
	const textAlign = props.outgoing === true ? 'right' : 'left'

	return (
		<div>
			<MessageContainer textAlign={textAlign}>
				<MessageBubble bg={background}>{props.message}</MessageBubble>
			</MessageContainer>
		</div>
	)
}

export default Message