import { Box, Heading, Stack, Text } from '@chakra-ui/react';

/**
 * Custom reusable conmponent for landing page.
 * Children prop takes the text between the <Feature> tags in parent component.
 */
export default function Feature({ children, title, icon }) {
	return (
		<Stack
			bg="white"
			rounded="lg"
			align="center"
			justify="center"
			textAlign="center"
			p={8}
			boxShadow="lg"
		>
			<Box fontSize="3xl" p={3} color="teal.600" bg="teal.50" rounded="full">
				{icon}
			</Box>
			<Heading fontSize="lg">{title}</Heading>
			<Text>{children}</Text>
		</Stack>
	);
}
