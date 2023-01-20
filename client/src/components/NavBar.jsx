import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdLogout, MdPerson, MdPostAdd } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const NAV_LINKS = [
	{ nav: 'Home', slug: '' },
	{ nav: 'Forum', slug: 'posts' },
];

export default function NavBar({ logoutUser }) {
	const { user } = useContext(UserContext);

	return (
		<Box bg="gray.100" px={8} borderBottom={1} borderStyle={'solid'} borderColor="gray.200">
			<Flex h="16" align="center" justify="space-between" maxW="container.lg" mx="auto">
				<HStack spacing={12} alignItems={'center'}>
					<Heading size="sm" as={ReachLink} to="/">
						Loop Agile Now
					</Heading>
					<HStack as="nav" spacing={8} display={{ base: 'none', sm: 'flex' }}>
						{NAV_LINKS.map((link, idx) => (
							<Link
								key={idx}
								as={ReachLink}
								to={`/${link.slug}`}
								fontSize="sm"
								fontWeight={500}
								_hover={{
									textDecoration: 'none',
									color: 'gray.500',
								}}
							>
								{link.nav}
							</Link>
						))}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					{/* Renders login/signup button if user is not signed in */}
					{!user ? (
						<HStack spacing={4}>
							<Button as={ReachLink} to="/login" bg="gray.200" size="sm">
								Login
							</Button>
							<Button as={ReachLink} to="/register" colorScheme="teal" size="sm">
								Register
							</Button>
						</HStack>
					) : (
						// Otherwise renders the UserDropdown and ability to make posts.
						<>
							<Button
								colorScheme="teal"
								size="sm"
								mr={6}
								leftIcon={<MdPostAdd size={20} />}
								as={ReachLink}
								to="/posts/new"
							>
								Create Post
							</Button>
							<Menu>
								<MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
									<Avatar src={user.avatar} />
								</MenuButton>
								<MenuList>
									<MenuGroup title={`Hello, ${user.first_name}!`}>
										<MenuDivider />
										<MenuItem
											as={ReachLink}
											to={`/users/${user.user_id}`}
											icon={<MdPerson size={20} />}
										>
											View Profile
										</MenuItem>
										<MenuItem
											icon={<MdLogout size={20} />}
											onClick={() => {
												window.confirm('Are you sure you want to log out?') && logoutUser();
											}}
										>
											Log Out
										</MenuItem>
									</MenuGroup>
								</MenuList>
							</Menu>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
}
