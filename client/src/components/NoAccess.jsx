import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';

export default function NoAccess() {
	return (
		<Stack justify="center" align="center" flexGrow={1}>
			<Box bg="teal.100" color="teal.500" rounded="full" p={5}>
				<FaLock size={48} />
			</Box>
			<Heading fontSize="5xl">Oh no!</Heading>
			<Text>You need to login to use that feature.</Text>
		</Stack>
	);
}
