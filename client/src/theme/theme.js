import { extendTheme, theme as base } from '@chakra-ui/react';

// File for customizing colors and fonts for Chakra UI.
const theme = extendTheme({
	fonts: {
		heading: `Poppins, ${base.fonts?.heading}`,
		body: `Inter, ${base.fonts?.body}`,
	},
	fontWeights: {
		normal: 300,
	},
	styles: {
		global: {
			// styles for the `body`
			body: {
				bg: 'gray.50',
				color: 'gray.700',
			},
		},
	},
});

export default theme;
