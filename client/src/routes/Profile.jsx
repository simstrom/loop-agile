import {
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	IconButton,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FiMinusCircle, FiPlusCircle, FiTrash } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { deleteUser, findUser, toggleFollow } from '../api/user';
import Card from '../components/Card';
import ProfileEdit from '../components/ProfileEdit';
import UserList from '../components/UserList';
import UserContext from '../contexts/UserContext';
import usePostHandling from '../hooks/usePostHandling';
import formatDate from '../utils/formatDate';

export default function Profile({ logoutUser }) {
	const { user } = useContext(UserContext);
	const [activeProfile, setActiveProfile] = useState(null);
	const [posts, setPosts] = useState(null);
	const [followers, setFollowers] = useState(null);
	const [isFollowing, setIsFollowing] = useState('');
	const [showFollowers, setShowFollowers] = useState(false);
	const [showFollowing, setShowFollowing] = useState(false);
	const toast = useToast();
	const { userId } = useParams();
	const isSelf = user.user_id === parseInt(userId);
	const { handleMultipleEdit, handleMultipleDelete } = usePostHandling({ posts, setPosts });

	// Loads info about the profile currently visiting and populates state.
	// This enables us to visit everyones profile and see their posts, followers etc...
	// But also visit our own profile which renders with conditional controls for management features.
	useEffect(() => {
		const fetchProfile = async () => {
			const activeProfile = await findUser(userId);
			setActiveProfile(activeProfile);
			setPosts(activeProfile.posts.reverse());
			setFollowers(activeProfile.followers.length);

			// Checks if the person visiting the profile is following.
			const found = activeProfile.followers.find((follower) => follower.user_id === user.user_id);
			if (found) setIsFollowing(true);
		};
		fetchProfile();
	}, [userId, user.user_id]);

	/**
	 * Removing user from our app and clears global state.
	 */
	const handleRemoveUser = async () => {
		if (
			window.confirm('Are you sure you want to delete your account? This action is irreversible!')
		) {
			await deleteUser(user);
			toast({
				title: `Account Deleted!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			logoutUser();
		}
	};

	// Toggle functions for follow/unfollow.
	const handleFollow = async () => {
		await toggleFollow(userId, user);
		setFollowers((prev) => prev + 1);
		setIsFollowing(true);
	};
	const handleUnfollow = async () => {
		await toggleFollow(userId, user);
		setFollowers((prev) => prev - 1);
		setIsFollowing(false);
	};

	if (activeProfile === null) return null;

	return (
		<Container maxW="container.lg" mt={12}>
			<Box bg="gray.700" rounded="lg" p={8}>
				<HStack justify="space-between" align="center">
					<HStack spacing={8}>
						<Avatar src={activeProfile.avatar} size="xl" />
						<Box>
							<Heading color="gray.50">{`${activeProfile.first_name} ${activeProfile.last_name}`}</Heading>
							<Text color="gray.300">
								<b>Joined: </b>
								{formatDate(activeProfile.createdAt)}
							</Text>
						</Box>
					</HStack>
					<Stack>
						<HStack>
							<Box
								align="center"
								justify="center"
								border="solid"
								borderColor="gray.600"
								rounded="md"
								minW="20"
							>
								<Text
									color="gray.300"
									textTransform="uppercase"
									fontSize="xs"
									borderBottom="solid"
									borderColor="gray.600"
									p={1}
								>
									Posts
								</Text>
								<Heading color="gray.50" fontSize="xl" p={2}>
									{posts.length}
								</Heading>
							</Box>

							{/* OnClick, show a Modal of current users following this profile */}
							<Box
								align="center"
								justify="center"
								border="solid"
								borderColor="gray.600"
								rounded="md"
								as="button"
								onClick={() => setShowFollowers(true)}
							>
								<Text
									color="gray.300"
									textTransform="uppercase"
									fontSize="xs"
									borderBottom="solid"
									borderColor="gray.600"
									p={1}
									minW="20"
								>
									Followers
								</Text>
								<Heading color="gray.50" fontSize="xl" p={2}>
									{followers}
								</Heading>
							</Box>

							{/* OnClick, show a Modal of current users this profile is following */}
							<Box
								align="center"
								justify="center"
								border="solid"
								borderColor="gray.600"
								rounded="md"
								as="button"
								onClick={() => setShowFollowing(true)}
							>
								<Text
									color="gray.300"
									textTransform="uppercase"
									fontSize="xs"
									borderBottom="solid"
									borderColor="gray.600"
									p={1}
									minW="20"
								>
									Following
								</Text>
								<Heading color="gray.50" fontSize="xl" p={2}>
									{activeProfile.following.length}
								</Heading>
							</Box>
						</HStack>
						{/* When visitng another profile, show follow/unfollow button */}
						{!isSelf &&
							(!isFollowing ? (
								<Button
									leftIcon={<FiPlusCircle size={20} />}
									color="teal.400"
									bg="gray.600"
									size="sm"
									onClick={handleFollow}
								>
									Follow
								</Button>
							) : (
								<Button
									leftIcon={<FiMinusCircle size={20} />}
									size="sm"
									color="red.400"
									bg="gray.600"
									onClick={handleUnfollow}
								>
									Unfollow
								</Button>
							))}
					</Stack>

					{/* When visiting own profile, show edit and delete buttons. */}
					{isSelf && (
						<HStack>
							<ProfileEdit setActiveProfile={setActiveProfile} />
							<IconButton
								onClick={handleRemoveUser}
								icon={<FiTrash size={24} />}
								variant="link"
								colorScheme="red"
							/>
						</HStack>
					)}
				</HStack>
			</Box>

			<Container maxW="container.sm" mb={12}>
				<Flex justify="space-between">
					<Heading fontSize="3xl" mt={6}>
						Posts
					</Heading>
				</Flex>
				<Flex justify="center" wrap="wrap" gap={5} mt={6}>
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
					{posts.length === 0 && <Text fontSize="lg">It looks empty here...</Text>}
				</Flex>
			</Container>

			{/* Actual render of follower/following userlists based on state */}
			{showFollowers && (
				<UserList type="Followers" users={activeProfile.followers} setShow={setShowFollowers} />
			)}
			{showFollowing && (
				<UserList type="Following" users={activeProfile.following} setShow={setShowFollowing} />
			)}
		</Container>
	);
}
