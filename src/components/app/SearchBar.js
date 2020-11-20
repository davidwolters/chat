import styled from 'styled-components';
import React, { useRef } from 'react'

// The container for the searchbar.
const Container = styled.div`
	position: relative;
	text-align: center;
`


// The input element.
const Input = styled.input`
	
	background-color: white;
	border-radius: 50px;
	border: none;
	font-size: ${props => props.theme.font.size.input};
	outline: none;
	padding: 5px 20px;
	margin-top: 10px;
	border: 2px solid ${props => props.theme.color.primary};
	color: ${props => props.theme.color.primaryDark};
	font-family: ${props => props.theme.font.body.family};
	font-weight: ${props => props.theme.font.title.weight};
	
`

// The search bar.
const SearchBar = props => {
	const input = useRef(null);

	// When we type a letter, we should search for a user matching that name, so call props.search on change.
	const onChange = () => {
		props.search( input.current.value );
	}

	return (
		<Container>
			<Input onChange={onChange} ref={input} />
		</Container>
	)
}
export default SearchBar;