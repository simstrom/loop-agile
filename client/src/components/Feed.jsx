import { Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { findFollowingPosts, findPosts } from '../api/post';
import UserContext from '../contexts/UserContext';
import usePostHandling from '../hooks/usePostHandling';
import Card from './Card';

/**
 * Responsible for rendering multiple posts in a feed.
 */
export default function Feed({ type }) {
	const { user } = useContext(UserContext);
	const [posts, setPosts] = useState([]);
	const { handleMultipleEdit, handleMultipleDelete } = usePostHandling({ posts, setPosts });

	// Fetch all posts on load, depending on type.
	useEffect(() => {
		const fetchPosts = async () => {
			let currentPosts;
			if (type === 'explore') {
				currentPosts = await findPosts();
				setPosts(currentPosts.reverse());
			} else {
				currentPosts = await findFollowingPosts(user.user_id);
			}
			setPosts(currentPosts);
		};
		fetchPosts();
	}, [type, user.user_id]);

	return (
		<Flex justify="center" wrap="wrap" gap={5} mt={3}>
			{posts.map((post, idx) => {
				return (
					<Card
						key={idx}
						post={post}
						handlePostEdit={handleMultipleEdit}
						handlePostDelete={handleMultipleDelete}
					/>
				);
			})}
			{posts.length === 0 && (
				<Text fontSize="lg" mt="20">
					There is nothing here yet...
				</Text>
			)}
		</Flex>
	);
}
