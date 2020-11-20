import {
	ENTER_CHAT,
	FRIENDS_GET, MESSAGES_GET,
	NAVIGATE_TO,
	USER_EXISTS,
	USER_LOGIN,
	USER_REGISTER,
} from '../actions/types'


// Reducer to update global state.
export const Reducer = (state, action) => {

	switch (action.type) {
		case USER_EXISTS:
			return userExists(state, action)
		case USER_REGISTER:
			return userRegistered(state, action)
		case USER_LOGIN:
			return userLogin(state, action);
		case NAVIGATE_TO:
			return navigateTo(state, action);
		case FRIENDS_GET:
			return loadFriends(state, action);
		case ENTER_CHAT:
			return enterChat(state, action);
		case MESSAGES_GET:
			return loadMessages(state, action);
		default:
			return state;
	}
}

// User exists action handler.
const userExists = (state, action) => {
	const currentPage = action.payload.user_exists ? '/login' : '/register'

	return {
		...state,
		auth: {
			...state.auth,
			exists: action.payload.user_exists,
			username: action.payload.username,
		},
		nav: {
			...state.nav,
			currentPage,
		},
	}
}

// User registered action handler.
const userRegistered = (state, action) => {
	const currentPage = '/friends'
	return {
		...state,
		auth: {
			...state.auth,
			ID: action.payload.ID,
			password: action.payload.password
		},
		nav: {
			...state.nav,
			currentPage
		}
	}
}

// User logged in successfully action handler.
const userLogin = (state, action ) => {
	const currentPage = '/friends'
	return {
		...state,
		auth: {
			...state.auth,
			ID: action.payload.ID,
			password: action.payload.password,
			meta: action.payload.meta
		},
		friends: {
			...state.friends,
			friends: action.payload.friends.friends,
			incoming: action.payload.friends.incoming,
			outgoing: action.payload.friends.outgoing
		},
		nav: {
			...state.nav,
			currentPage
		}
	}
}

// Navigation action handler.
const navigateTo = (state, action) => {
	return {
		...state,
		nav: {
			...state.nav,
			currentPage: action.payload
		}
	}
}

// Load friends action handler.
const loadFriends = (state, action) => {
	return {
		...state,
		friends: {
			...state.friends,
			friends: action.payload.friends,
			incoming: action.payload.incoming,
			outgoing: action.payload.outgoing
		},
	}
}

// Enter chat action handler.
const enterChat = (state, action) => {
	const currentPage = '/chat';
	return {
		...state,
		nav: {
			currentPage,
			currentChat: action.payload
		}
	};
}

// Load messages action handler.
const loadMessages = (state, action) => {
	return {
		...state,
		messages: {
			...state.messages,
			[action.payload.ID]: action.payload.messages
		}
	}
}