import {
	Box,
	Container,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdExplore, MdHome } from 'react-icons/md';
import Feed from '../components/Feed';
import NoAccess from '../components/NoAccess';
import UserContext from '../contexts/UserContext';

export default function Forum() {
	const { user } = useContext(UserContext);

	// Not the best approach to Private Routes. Should use JWT.
	if (!user) return <NoAccess />;

	return (
		<>
			<Container maxW="container.md" my={12}>
				<Heading>Forum</Heading>
				<Text fontSize="lg">Spend some time reading posts from the community.</Text>

				{/* Renders 2 separate feeds. One from people you follow and another from all users.
					Tabs isLazy means that both are not fetched on page load, only when the tab is active.
				*/}
				<Tabs isLazy colorScheme="teal" mt={3}>
					<TabList>
						<Tab>
							<Box mr={2}>
								<MdHome size={20} />
							</Box>
							Home
						</Tab>
						<Tab>
							<Box mr={2}>
								<MdExplore size={20} />
							</Box>
							Explore
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Feed type="home" />
						</TabPanel>
						<TabPanel>
							<Feed type="explore" />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</>
	);
}
