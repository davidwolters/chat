import React, { useRef } from 'react'
import styled from 'styled-components'


// Input element.
const Input = styled.input`
	border-radius: 50px;
	padding: 10px;
	font-size: ${props => props.theme.font.size.input};
	color: ${props => props.theme.color.text};
	border: none;
	outline: none;
	width: 90%;
	display: inline-block;
	background-color: 1px solid ${props => props.theme.color.inputBorder};
	
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translate(-50%, -50%);
`

// Input container.
const InputContainer = styled.div`
	text-align: center;
	order: 2;
	flex: 1;
	position: relative;
	background-color: ${props => props.theme.color.primary};
	
`

const ChatInput = props => {

	const input = useRef(null)

	// If we press enter, tell props we should send a message and reset input value.
	const onKeyDown = e => {
		if (e.keyCode === 13) {
			props.sendMessage(input.current.value)
			input.current.value = "";
		}
	}

	return (
		<InputContainer>
			<Input type={'text'} placeholder="Say something nice" ref={input}
				   onKeyDown={onKeyDown}/>
		</InputContainer>
	)
}

export default ChatInput