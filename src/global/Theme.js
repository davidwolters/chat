import { createContext } from 'react';

// All the colors and fonts and sizes.
export const theme = {
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
}
const ThemeContext = createContext( theme );
export default ThemeContext;