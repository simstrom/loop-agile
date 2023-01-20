import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { verifyUser } from '../api/user';

export default function Login({ loginUser }) {
	const [fields, setFields] = useState({ email: '', password: '' });
	const [error, setError] = useState(false);
	const toast = useToast();

	const handleInputChange = (event) => {
		setFields({ ...fields, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await verifyUser(fields);
			toast({
				title: `Welcome ${user.first_name}!`,
				description: 'You have successfully logged in.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			loginUser(user);
		} catch (error) {
			setFields({ ...fields, password: '' });
			setError(true);
		}
	};

	return (
		<Flex grow={1} align="center" justify="center">
			<Stack spacing={8} w="md" mx={5}>
				<Stack align="center">
					<Heading>Login to your account</Heading>
					<Text color="gray.500" align="center">
						Don't have an account?{' '}
						<Button as={Link} to="/register" variant="link" colorScheme="teal">
							Register
						</Button>
					</Text>
				</Stack>

				<Flex direction="column" bg="white" p={10} rounded="lg" boxShadow="lg">
					<form noValidate method="POST" onSubmit={handleSubmit}>
						<FormControl isInvalid={error} mb={3}>
							<FormLabel>Email</FormLabel>
							<Input
								value={fields.email}
								onChange={handleInputChange}
								type="email"
								name="email"
								bg="gray.50"
							/>
						</FormControl>

						<FormControl isInvalid={error} mb={6}>
							<FormLabel>Password</FormLabel>
							<Input
								value={fields.password}
								onChange={handleInputChange}
								type="password"
								name="password"
								bg="gray.50"
							/>
							<FormErrorMessage>Email and/or Password is incorrect!</FormErrorMessage>
						</FormControl>
						<Button type="submit" colorScheme="teal" w="full">
							Login
						</Button>
					</form>
				</Flex>
			</Stack>
		</Flex>
	);
}
