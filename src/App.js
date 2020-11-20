import React, { useContext } from 'react'
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom'
import AuthWrapper from './components/auth/AuthWrapper'
import EnterUsername from './components/routes/EnterUsername'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import Store from './global/Store'
import Friends from './components/routes/Friends'
import ThemeContext  from './global/Theme'
import { ThemeProvider } from 'styled-components'
import Chat from './components/routes/Chat'
import AddFriend from './components/routes/AddFriend'

// Main app.
const App = () => {

	// Get the theme for the themeprovider.
	const theme = useContext(ThemeContext);

	return (
		<Store>
			<Router>
				<AuthWrapper>
					<ThemeContext.Provider value={theme}>
						<ThemeProvider theme={theme}>
							<Route path="/enter-username">
								<EnterUsername/>
							</Route>
							<Route path="/login">
								<Login/>
							</Route>
							<Route path="/register">
								<Register/>
							</Route>
							<Route path="/friends">
								<Friends/>
							</Route>
							<Route path="/chat">
								<Chat />
							</Route>
							<Route path="/add-friend">
								<AddFriend />
							</Route>
						</ThemeProvider>
					</ThemeContext.Provider>
				</AuthWrapper>

			</Router>
		</Store>
	)
}
export default App
