import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { findUser, updateUser } from '../api/user';
import UserContext from '../contexts/UserContext';
import { trimFields, validateForm } from '../utils/validateForm';

/**
 * Responsible for rendering edit profile modal and handle its input.
 */
export default function ProfileEdit({ setActiveProfile }) {
	const { user } = useContext(UserContext);
	const [errors, setErrors] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [fields, setFields] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
	});

	const handleInputChange = (event) => {
		setFields({ ...fields, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form and avoid API call if invalid.
		const trimmedFields = trimFields(fields);
		const currentErrors = validateForm(trimmedFields, false);
		if (Object.keys(currentErrors).length !== 0) {
			setErrors(currentErrors);
			return;
		}

		try {
			await updateUser(user.user_id, trimmedFields);
			toast({
				title: `Account details updated!`,
				status: 'success',
				duration: 6000,
				isClosable: true,
			});
			const activeProfile = await findUser(user.user_id);
			setActiveProfile(activeProfile);
			onClose();
		} catch (err) {
			// Set unique error if same email already exists.
			const error = err.response.data;
			if (error.includes('Validation')) {
				setErrors({ email: 'Account with same email already exists!' });
			}
		}
	};

	const handleReset = () => {
		setErrors({});
		setFields({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		});
		onClose();
	};

	return (
		<>
			<IconButton onClick={onOpen} icon={<FiEdit size={24} />} colorScheme="teal" variant="link" />

			<Modal isOpen={isOpen} onClose={handleReset}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
							<FormControl isRequired isInvalid={errors.email ? true : false} mb={6}>
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

							<Button variant="outline" colorScheme="red" onClick={handleReset} mb={3}>
								Cancel
							</Button>
							<Button colorScheme="teal" ml={3} type="submit" mb={3}>
								Save and Update
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
