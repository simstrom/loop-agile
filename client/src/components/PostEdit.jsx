import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import ReactQuill from 'react-quill';

import validatePost from '../utils/validatePost';

/**
 * Responsible for rendering edit post modal and handle its input.
 */
export default function PostEdit({ post, handlePostEdit }) {
	const [content, setContent] = useState(post.text);
	const [error, setError] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = validatePost(content, null);

		if (!Object.keys(error).length) {
			handlePostEdit(post, content);
			onClose();
		} else {
			setError(error);
		}
	};

	const handleReset = () => {
		setError('');
		setContent(post.text);
		onClose();
	};

	return (
		<>
			<IconButton onClick={onOpen} icon={<FiEdit size={20} />} size="xs" variant="link" ml={14} />

			<Modal isOpen={isOpen} onClose={handleReset}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form noValidate method="POST" onSubmit={handleSubmit}>
							<Box mb={3}>
								<FormControl isRequired isInvalid={error.text ? true : false}>
									<ReactQuill theme="snow" value={content} onChange={setContent} />
									<FormErrorMessage>{error.text}</FormErrorMessage>
								</FormControl>
							</Box>

							<Button variant="outline" colorScheme="red" onClick={handleReset}>
								Cancel
							</Button>
							<Button colorScheme="teal" ml={3} type="submit">
								Save and Update
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
