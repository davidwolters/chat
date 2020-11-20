import styled from 'styled-components';

// Simple title.
export const Title = styled.h1`
	font-size: ${props => props.theme.font.size.title};
	font-family: ${props => props.theme.font.title.family};
	font-weight: ${props => props.theme.font.title.weight};
	color: ${props => props.theme.color.text};	
	text-align: center;
`;
