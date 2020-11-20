import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

// Simple listcontainer.
const ListContainer = styled.div`
	padding: 10px;
`


const List = ({children}) => {

	const list = useRef(null);

	// Scroll the list into view when props.children.length changes.
	useEffect(() => {
		if ( list !== null ) {

			list.current.scrollIntoView({behaviour: "smooth"});
		}
	}, [children.length]);

	return (
		<ListContainer ref={list}>
			{children}
		</ListContainer>
	)
}

export default List;