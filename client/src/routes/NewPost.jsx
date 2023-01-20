import {
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import { createPost } from '../api/post';
import UserContext from '../contexts/UserContext';
import validatePost from '../utils/validatePost';

export default function NewPost() {
	const { user } = useContext(UserContext);
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState('');
	const [errors, setErrors] = useState('');
	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// isLoading used for spinner on submit button as image upload can take some time.
		setIsLoading(true);
		const errors = validatePost(content, selectedFile);

		// Save post to dbs if no errors
		if (!Object.keys(errors).length) {
			const post = {
				text: content,
				user_id: user.user_id,
				image: selectedFile,
			};
			await createPost(post);
			toast({
				title: `Post created!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/posts');
		} else {
			setErrors(errors);
		}
	};

	// Clear form
	const handleReset = () => {
		setContent('');
		setSelectedFile('');
		setErrors('');
	};

	return (
		<Container maxW="container.sm" mt={12}>
			<Heading mb={6}>Create a new post</Heading>
			<form action="POST" onSubmit={handleSubmit} noValidate>
				<FormControl isRequired isInvalid={errors.text ? true : false} mb={6}>
					<ReactQuill theme="snow" value={content} onChange={setContent} />
					<FormErrorMessage>{errors.text}</FormErrorMessage>
				</FormControl>
				<FormControl mb={6} isInvalid={errors.image ? true : false}>
					<FormLabel>Upload an image (optional)</FormLabel>
					<Input
						type="file"
						multiple={false}
						onChange={(e) => setSelectedFile(e.target.files[0])}
						isInvalid={errors.image ? true : false}
					/>
					<FormErrorMessage>{errors.image}</FormErrorMessage>
				</FormControl>

				<Stack direction="row" spacing={3}>
					<Button type="reset" variant="outline" colorScheme="red" onClick={handleReset}>
						Reset
					</Button>
					<Button type="submit" colorScheme="teal" isLoading={isLoading}>
						Post
					</Button>
				</Stack>
			</form>
		</Container>
	);
}
