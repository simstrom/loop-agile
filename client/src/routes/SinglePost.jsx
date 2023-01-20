import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Stack,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComment, findPost, getComment } from '../api/post';
import Card from '../components/Card';
import Comment from '../components/Comment';
import UserContext from '../contexts/UserContext';
import usePostHandling from '../hooks/usePostHandling';

export const SinglePost = () => {
	const { user } = useContext(UserContext);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState('');
	const { postId } = useParams();
	const toast = useToast();
	const { handleSingleEdit, handleSingleDelete } = usePostHandling({ setPost });

	// Fetches post on load from db based on URL param.
	useEffect(() => {
		const fetchPost = async () => {
			const foundPost = await findPost(postId);
			setPost(foundPost);
			setComments(foundPost.comments);
		};
		fetchPost();
	}, [postId]);

	// Creates a new comment and loads accompanied data with eager loading.
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newComment = await addComment(postId, user.user_id, content);
		newComment = await getComment(postId, newComment.comment_id);
		setComments([...comments, newComment]);
		setContent('');
		toast({
			title: `Comment created!`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	if (post === null) return null;
	return (
		<Container my={12}>
			<Card
				post={post}
				handlePostEdit={handleSingleEdit}
				handlePostDelete={handleSingleDelete}
				commentsQty={comments.length}
			/>
			<Heading fontSize="lg" my={6}>
				Comments ({comments.length})
			</Heading>
			<Stack spacing={3}>
				{comments.map((comment, idx) => {
					return <Comment key={idx} comment={comment} />;
				})}
			</Stack>

			<Box bg="white" rounded="lg" boxShadow="sm" p={4} mt={12} w="container.sm">
				<form action="POST" onSubmit={handleSubmit}>
					<Heading fontSize="md" mb={3}>
						Share your thoughts
					</Heading>
					<FormControl mb={3}>
						<Textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Type your comment..."
						/>
					</FormControl>
					<Button type="submit" size="sm" px={6} colorScheme="teal">
						Send
					</Button>
				</form>
			</Box>
		</Container>
	);
};
