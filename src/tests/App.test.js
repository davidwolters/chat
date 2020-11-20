import React, { useContext } from 'react'
import renderer from 'react-test-renderer'
import App from '../App'
import { act } from '@testing-library/react'
import { render, unmountComponentAtNode } from 'react-dom'
import EnterUsername from '../components/routes/EnterUsername'
import Message from '../components/chat/Message'
import ThemeContext from '../global/Theme'
import { ThemeProvider } from 'styled-components'
import FriendListItem, {
	WAITING_FOR_ACCEPT,
	WAITING_FOR_APPROVAL,
} from '../components/friends/FriendListItem'
import FriendResult from '../components/friends/FriendResult'
import { MESSAGES_GET, USER_EXISTS } from '../actions/types'
import { Reducer } from '../global/Reducer'


const theme = {
	color: {
		background: '#f7f7f7',
		windowBg: 'white',
		text: '#555',
		subText: '#777',
		primary: "#5CA4A9",
		primaryDark: "#44797d",
		secondary: "#0E7C7B",
		secondaryDark: '#0a5858',
		error: '#ED6A5A',
		accent: '#7E2E84',
		accentDark: '#542058',
		inputBorder: '#eeeeee',
		disabled: '#aaaaaa'
	},
	font: {
		title: {
			family: 'Roboto Slab',
			weight: 'bold'
		},
		body: {
			family: 'Open Sans',
			weight: 'normal',
		},
		size: {
			body: '1em',
			title: '1.5em',
			subTitle: '1em',
			pageHeader: '2em',
			button: '1.5em',
			input: '1.5em',
			small: '0.7em',
		}
	},
};

let state = {
	auth: {
		ID: null,
		username: null,
		password: null,
		exists: false
	},
	nav: {
		currentPage: '/enter-username',
		currentChat: null
	},
	friends: {
		incoming: [],
		outgoing: [],
		friends: []
	},
	messages: null
}

let container = null
beforeEach(() => {
	container = document.createElement('div')
	document.body.appendChild(container)
})

afterEach(() => {
	unmountComponentAtNode(container)
	container.remove()
	container = null
})

it('Renders correctly', () => {


	const message = renderer.create(<ThemeProvider theme={theme}><Message /></ThemeProvider>);
	expect(message.toJSON()).toMatchSnapshot();
});


it( "Displays correct friend list item status", () => {
	const friend = renderer.create(<ThemeProvider theme={theme}><FriendListItem status={WAITING_FOR_ACCEPT} /></ThemeProvider>);

	expect(friend.toJSON().children[1].children[0]).toBe('Accept');
} );


it( "Displays correct friend list item status", () => {
	const friend = renderer.create(<ThemeProvider theme={theme}><FriendListItem status={WAITING_FOR_APPROVAL} /></ThemeProvider>);

	expect(friend.toJSON().children[1].children[0]).toBe('Waiting...');
} );

it("Displays correct friend search result status", () => {
	const friend = renderer.create(<ThemeProvider theme={theme}><FriendResult status="loading" /></ThemeProvider>);

	expect(friend.toJSON().children[0].children[0].children[1].children[0].props.className).toBe("svg-inline--fa fa-spinner fa-w-16 fa-pulse ");
})


it("Displays correct friend search result status", () => {
	const friend = renderer.create(<ThemeProvider theme={theme}><FriendResult status="add" /></ThemeProvider>);

	expect(friend.toJSON().children[0].children[0].children[1].children[0]).toBe("Add Friend");
})

const stateAfterUserExists = () => {

	return Reducer(state, {
		type: USER_EXISTS,
		payload: {
			user_exists: true,
			username: 'test'
		}
	});
}

it("updates the username correctly after user exists returned", () => {
	state = stateAfterUserExists();

	expect(state.auth.username).toBe('test');
})



it("updates the current page correctly after user exists returned", () => {
	state = stateAfterUserExists();

	expect(state.nav.currentPage).toBe('/login');
})

it("updates the user_exists value correctly after user exists returned", () => {
	state = stateAfterUserExists();
	expect(state.auth.exists ).toBe(true);
})

