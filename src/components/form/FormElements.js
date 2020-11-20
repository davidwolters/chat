import styled from 'styled-components'

// A whole bunch of form elements used throughout the app.

// A small window that sits in the center, for authentication and loading purposes.
export const FormWindow = styled.div`
	background-color: ${props => props.theme.color.windowBg};
	border-radius: 10px;
	padding: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0px 0px 10px #ddd;
	font-family: ${props => props.theme.font.body.family}
`

// Title.
export const FormTitle = styled.h1`
	font-size: ${props => props.theme.font.size.title};
	font-family: ${props => props.theme.font.title.family};
	font-weight: normal;
	text-align: center;
`

// Subtitle.
export const FormSubtitle = styled.h2`
	font-size: ${props => props.theme.font.size.subTitle};
	font-family: {$props => props.theme.font.title.family};
	font-weight: normal;
	text-align: center;
	color: #999;
`

// Error.
export const FormError = styled.h2`
	font-size: ${props => props.theme.font.size.body};
	font-weight: normal;
	text-align: center;
	color: ${props => props.theme.color.error};
`

// Form Input.
export const FormInput = styled.input`
	font-size: ${props => props.theme.font.size.input};
	padding: 5px;
	border-radius: 5px;
	border: 1px solid ${props => props.theme.color.inputBorder};
	outline: none;
	color: ${props => props.theme.color.text};
	transition: all 0.4s;
	margin-bottom: 5px;
`

// Button, with customizable color.
export const FormButton = styled.button`
	font-size: ${props => props.theme.font.size.button};
	display: block;
	width: 100%;
	margin-top: 10px;
	background-color: ${props => (props.color === undefined)
	? props.theme.color.primary
	: props.color};
	color: #fff;
	border: none;
	outline: none;
	border-radius: 5px;
	padding: 5px;
	transition: all 0.4s;
	&:active {
		background-color: ${props => (props.activeColor === undefined) ? props.theme.color.primaryDark : props.activeColor};
	}
`

// Inverted button, with customizable color.
export const FormButtonInverted = styled.button`
	font-size: ${props => props.theme.font.size.button};
	display: block;
	width: 100%;
	margin-top: 10px;
	background-color: transparent;
	border: 2px solid ${props => (props.color === undefined)
	? props.theme.color.primary
	: props.color};
	color: ${props => (props.color === undefined)
	? props.theme.color.primary
	: props.color};
	outline: none;
	border-radius: 5px;
	padding: 5px;
	transition: all 0.4s;
	&:active {
		border-color: ${props => (props.activeColor === undefined) ? props.theme.color.primaryDark : props.activeColor};
	}
`