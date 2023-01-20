import {
	Avatar,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

/**
 * Responsible for rendering Modal with users that is following/followers
 */
export default function UserList({ type, users, setShow }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();

	// Open the Modal on load.
	useEffect(() => {
		onOpen();
	}, [onOpen]);

	// Close modal and update parent state to remove from UI.
	const handleClose = () => {
		onClose();
		setShow(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{type}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					{users.map((user, idx) => (
						<Flex key={idx} borderBottom="1px" borderColor="gray.200" align="center" gap={3} py={2}>
							<Avatar src={user.avatar} />
							<Text>{`${user.first_name} ${user.last_name}`}</Text>
							<Button
								leftIcon={<FiEye />}
								size="sm"
								px={5}
								ml="auto"
								onClick={() => {
									handleClose();
									navigate(`/users/${user.user_id}`);
								}}
							>
								View
							</Button>
						</Flex>
					))}
					{users.length === 0 && <Text size="lg">Nothing here yet...</Text>}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
