import { Avatar, Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5';
import { Link as ReachLink } from 'react-router-dom';
import sanitize from 'sanitize-html';
import { addCommentReaction, changeCommentReaction, removeCommentReaction } from '../api/post';
import UserContext from '../contexts/UserContext';
import formatDate from '../utils/formatDate';

export default function Comment({ comment }) {
	const { user } = useContext(UserContext);
	const [commentReactions, setCommentReactions] = useState(comment.commentReactions);
	const [hasReacted, setHasReacted] = useState('');
	// Upvotes gets all comments with type 'up' from current comment.
	const [upvotes, setUpvotes] = useState(
		commentReactions.filter((reaction) => reaction.type === 'up').length
	);

	// If user has reacted to comment, set correct reaction.
	useEffect(() => {
		if (commentReactions === null) return;
		const foundReaction = commentReactions.find((reaction) => reaction.user_id === user.user_id);
		if (foundReaction) setHasReacted(foundReaction);
	}, [commentReactions, user.user_id]);

	const handleReaction = async (type) => {
		// Create new reaction and plus upvotes if there is none.
		if (!hasReacted) {
			const newReaction = await addCommentReaction(user.user_id, comment.comment_id, type);
			setCommentReactions([...commentReactions, newReaction]);
			setHasReacted(newReaction);
			newReaction.type === 'up' ? setUpvotes((prev) => prev + 1) : setUpvotes((prev) => prev - 1);
			// Swap reaction type if the opposite is clicked and reflect upvotes qty.
		} else if (hasReacted.type !== type) {
			const updatedReaction = await changeCommentReaction(hasReacted, type);
			setHasReacted(updatedReaction);
			updatedReaction.type === 'up'
				? setUpvotes((prev) => prev + 1)
				: setUpvotes((prev) => prev - 1);
			// Remove current reaction when clicked from db and state.
		} else {
			await removeCommentReaction(hasReacted);
			setCommentReactions(
				commentReactions.filter((reaction) => reaction.reaction_id !== hasReacted.reaction_id)
			);
			hasReacted.type === 'up' ? setUpvotes((prev) => prev - 1) : setUpvotes((prev) => prev + 1);
			setHasReacted('');
		}
	};

	return (
		<Stack borderBottom="1px" borderColor="gray.200" w="container.sm" py={4} spacing={5}>
			<Flex>
				<Box px={4}>
					<Flex align="center" gap={2} mb={4}>
						<Avatar size="sm" src={comment.user.avatar} />
						<Text
							fontSize="xs"
							as={ReachLink}
							to={`/users/${comment.user.user_id}`}
						>{`${comment.user.first_name} ${comment.user.last_name}`}</Text>
						<Text fontSize="xs" color="gray.400">
							{formatDate(comment.createdAt)}
						</Text>
					</Flex>
					<Text fontSize="sm" dangerouslySetInnerHTML={{ __html: sanitize(comment.text) }} />
				</Box>
				<Stack ml="auto" spacing={0} align="center" justify="center">
					<Text fontSize="xs" color="gray.400">
						<b>{upvotes || 0}</b>
					</Text>
					<IconButton
						onClick={() => handleReaction('up')}
						icon={<IoCaretUpOutline size={24} />}
						variant="link"
						color={hasReacted.type === 'up' ? 'teal.400' : 'gray.500'}
					/>
					<IconButton
						onClick={() => handleReaction('down')}
						icon={<IoCaretDownOutline size={24} />}
						variant="link"
						color={hasReacted.type === 'down' ? 'red.400' : 'gray.500'}
					/>
				</Stack>
			</Flex>
		</Stack>
	);
}
