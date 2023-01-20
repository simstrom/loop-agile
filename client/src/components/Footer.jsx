import { Heading, Stack, Text } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Stack
			as="footer"
			bg="gray.100"
			p={5}
			align="center"
			borderTop="1px"
			borderColor="gray.200"
			mt="auto"
		>
			<Heading fontSize={'sm'}>Loop Agile Now</Heading>
			<Text color="gray.500" fontSize="sm">
				© 2022 LAN. All rights reserved.
			</Text>
		</Stack>
	);
}
