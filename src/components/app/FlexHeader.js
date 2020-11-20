import styled from 'styled-components';
import {Context} from '../../global/Store'
import { useContext } from 'react'
import { NAVIGATE_TO } from '../../actions/types'


// HeaderContainer, takes up 1/7 parts on the screen.
const HeaderContainer = styled.div`
	background-color: ${props => props.theme.color.primary};
	flex: 1;
	text-align: center;	
	position: relative;
`

// The back button.
const BackButton = styled.button`
	outline: none;
	border: none;
	padding: 10px;
	font-size: ${props => props.theme.font.size.title};
	border-radius: 50px;
	background-color: ${props => props.theme.color.secondary};
	
	color: white;	
	position: absolute;
	right: 0;
	top: 50%;
	transform: translate(-50%, -50%);
	
	&:hover {
		background-color: ${props => props.theme.color.secondaryDark};
		cursor: pointer;
	}
`;

// The title
const Title = styled.h2`
	position: absolute;
	font-family: ${props => props.theme.font.title.family};
	 font-weight: ${props => props.theme.font.title.weight};
	left: ${props => props.left};
	top: 50%;
	transform: translate(${props => props.translate}, -50%);
	color: white;
	font-size: ${props => props.theme.font.size.pageHeader};
`;

// The header itself.
const FlexHeader = props => {
	const [, dispatch] = useContext(Context);

	// The go back, returns to friends.
	const goBack = () => {
		dispatch({
			type: NAVIGATE_TO,
			payload: '/friends'
		});
	}

	// Should we center the title?
	const left = props.center ? '50%' : '0';
	const translate = props.center ? '-50%' : '50%';

	// Should we include the back button?
	const backButton = props.excludeBackButton ? '' : <BackButton onClick={goBack}>Back</BackButton>;

	return (
		<HeaderContainer>
			<Title left={left} translate={translate}>{props.title}</Title>
			{backButton}
		</HeaderContainer>
	)
}

export default FlexHeader;