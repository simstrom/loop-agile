import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/user';
import { trimFields, validateForm } from '../utils/validateForm';

export default function Register({ loginUser }) {
	const [fields, setFields] = useState({
		email: '',
		password: '',
		first_name: '',
		last_name: '',
	});
	const [errors, setErrors] = useState({});
	const toast = useToast();

	const handleInputChange = (event) => {
		setFields({ ...fields, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form and avoid API call if invalid.
		const trimmedFields = trimFields(fields);
		const currentErrors = validateForm(trimmedFields, true);
		if (Object.keys(currentErrors).length !== 0) {
			setErrors(currentErrors);
			return;
		}

		try {
			const user = await registerUser(fields);
			toast({
				title: `Welcome ${user.first_name}!`,
				description: 'You have successfully registered.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			loginUser(user);
		} catch (err) {
			// Set unique error if account already exists.
			const error = err.response.data;
			if (error.includes('Validation')) {
				setErrors({ email: 'Account with same email already exists!' });
			}
		}
	};
	return (
		<Flex grow={1} align="center" justify="center">
			<Stack spacing={8} w="md" mx={5}>
				<Stack align="center">
					<Heading>Register your account</Heading>
					<Text color="gray.500" align="center">
						Already have an account?{' '}
						<Button as={Link} to="/login" variant="link" colorScheme="teal">
							Login
						</Button>
					</Text>
				</Stack>

				<Flex direction="column" bg="white" p={10} rounded="lg" boxShadow="lg">
					<form noValidate method="POST" onSubmit={handleSubmit}>
						<Box mb={3}>
							<HStack spacing={2}>
								<FormControl isRequired isInvalid={errors.name ? true : false}>
									<FormLabel>First Name</FormLabel>
									<Input
										value={fields.first_name}
										onChange={handleInputChange}
										type="text"
										name="first_name"
										bg="gray.50"
									/>
								</FormControl>
								<FormControl isRequired isInvalid={errors.name ? true : false}>
									<FormLabel>Last Name</FormLabel>
									<Input
										value={fields.last_name}
										onChange={handleInputChange}
										type="text"
										name="last_name"
										bg="gray.50"
									/>
								</FormControl>
							</HStack>
							<Text color="red.500" fontSize="sm" mt={2}>
								{errors.name}
							</Text>
						</Box>

						<FormControl isRequired isInvalid={errors.email ? true : false} mb={3}>
							<FormLabel>Email</FormLabel>
							<Input
								value={fields.email}
								onChange={handleInputChange}
								type="email"
								name="email"
								bg="gray.50"
							/>
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired isInvalid={errors.password ? true : false} mb={6}>
							<FormLabel>Password</FormLabel>
							<Input
								value={fields.password}
								onChange={handleInputChange}
								type="password"
								name="password"
								bg="gray.50"
							/>
							<FormErrorMessage>{errors.password}</FormErrorMessage>
						</FormControl>
						<Button type="submit" colorScheme="teal" w="full">
							Register
						</Button>
					</form>
				</Flex>
			</Stack>
		</Flex>
	);
}
