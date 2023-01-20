import { Avatar, Box, Flex, IconButton, Image, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FaCommentAlt, FaSadCry, FaSmileBeam } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { Link as ReachLink } from 'react-router-dom';
import sanitize from 'sanitize-html';
import { addPostReaction, changePostReaction, getPostImage, removePostReaction } from '../api/post';
import PostEdit from '../components/PostEdit';
import UserContext from '../contexts/UserContext';
import formatDate from '../utils/formatDate';

/**
 * Card contains infor on a single post.
 */
export default function Card({ post, handlePostEdit, handlePostDelete, commentsQty }) {
	const { user } = useContext(UserContext);
	const [postReactions, setPostReactions] = useState(post.postReactions);
	const [hasReacted, setHasReacted] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [isLoading, setIsLoading] = useState();
	const [isSelf, setIsSelf] = useState('');

	// Multiple useEffects to avoid image refetch from api when reaction is made on post.
	useEffect(() => {
		// When card is loaded, fetch the corresponding image from Firebase.
		const fetchImage = async () => {
			const imageUrl = await getPostImage(post.post_id);
			setImageUrl(imageUrl);
			setIsLoading(false);
		};
		if (post.image) {
			fetchImage();
			setIsLoading(true);
		}
	}, [post]);

	useEffect(() => {
		// Makes it possible to only edit / delete your own posts.
		user.user_id === post.user.user_id ? setIsSelf(true) : setIsSelf(false);

		// If user has reacted to post, set correct reaction.
		if (postReactions === null) return;
		const foundReaction = postReactions.find((reaction) => reaction.user_id === user.user_id);
		if (foundReaction) setHasReacted(foundReaction);
	}, [user.user_id, post, postReactions]);

	const handleReaction = async (type) => {
		// Create new reaction and update state if there is none.
		if (!hasReacted) {
			const newReaction = await addPostReaction(user.user_id, post.post_id, type);
			setPostReactions([...postReactions, newReaction]);
			setHasReacted(newReaction);
			// Swap reaction type if the opposite is clicked.
		} else if (hasReacted.type !== type) {
			const updatedReaction = await changePostReaction(hasReacted, type);
			setHasReacted(updatedReaction);
			// Remove current reaction when clicked from db and state.
		} else {
			await removePostReaction(hasReacted);
			setPostReactions(
				postReactions.filter((reaction) => reaction.reaction_id !== hasReacted.reaction_id)
			);
			setHasReacted('');
		}
	};

	if (post === null || user === null) return null;

	return (
		<Stack bg="white" rounded="lg" boxShadow="sm" w="container.sm" py={4} spacing={5}>
			<Stack px={4} spacing={3}>
				<SkeletonText isLoaded={!isLoading} noOfLines={6} spacing={4}>
					<Flex align="center" gap={2}>
						<Avatar
							src={post.user.avatar}
							size="sm"
							as={ReachLink}
							to={`/users/${post.user.user_id}`}
						/>
						<Text
							fontSize="xs"
							as={ReachLink}
							to={`/users/${post.user.user_id}`}
						>{`${post.user.first_name} ${post.user.last_name}`}</Text>
						<Flex ml="auto" gap={3}>
							<Text fontSize="xs" color="gray.400">
								Posted on: {formatDate(post.createdAt)}
							</Text>
							{/* If post author is current user, show edit & delete buttons.*/}
							{isSelf && (
								<>
									<PostEdit post={post} handlePostEdit={handlePostEdit} />
									<IconButton
										icon={<FiTrash size={20} />}
										size="xs"
										variant="link"
										onClick={() => {
											handlePostDelete(post);
										}}
									/>
								</>
							)}
						</Flex>
					</Flex>
					<Stack direction="row" spacing={2} justify="space-between" mt={4}>
						<Text
							w={!imageUrl ? 'full' : '50%'}
							dangerouslySetInnerHTML={{ __html: sanitize(post.text) }}
						/>
						<Box>
							{imageUrl && (
								<Image src={imageUrl} borderRadius="lg" objectFit="cover" boxSize="250px" />
							)}
						</Box>
					</Stack>
				</SkeletonText>
			</Stack>
			<Box mt="auto" px={4} borderTop="1px" borderColor="gray.100">
				<Flex align="baseline" gap={4} pt={3}>
					<Flex align="center">
						<IconButton
							onClick={() => handleReaction('up')}
							icon={<FaSmileBeam size={20} />}
							variant="link"
							color={hasReacted.type === 'up' && 'teal.400'}
						/>
						<IconButton
							onClick={() => handleReaction('down')}
							icon={<FaSadCry size={20} />}
							variant="link"
							color={hasReacted.type === 'down' && 'red.400'}
						/>
						<Text fontSize="xs" ml={3} color="gray.400">
							{postReactions.length} people reacted to this post.
						</Text>
					</Flex>
					<Flex ml="auto">
						<IconButton
							icon={<FaCommentAlt size={18} />}
							variant="link"
							as={ReachLink}
							to={`/posts/${post.post_id}`}
						/>
						{/* If card is rendered on SinglePost page, pass commentsQty 
						as prop to update state when new comments are made. */}
						<Text fontSize="sm">{commentsQty || post.comments.length}</Text>
					</Flex>
				</Flex>
			</Box>
		</Stack>
	);
}
