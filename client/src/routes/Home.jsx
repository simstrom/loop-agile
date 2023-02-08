import { Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { MdGroup, MdInsights, MdLanguage } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';
import heroImg from '../assets/teamwork.svg';
import Feature from '../components/Feature';
import UserContext from '../contexts/UserContext';

export default function Home() {
	const { user } = useContext(UserContext);

	return (
		<>
			{/* Hero Section */}
			<Container mt={12}>
				<Stack textAlign="center" align="center" py={8}>
					<Heading fontSize="5xl">Welcome to LA Now</Heading>
					<Text fontSize="lg">We are more powerful when we empower eachother!</Text>
					{!user ? (
						<Button as={ReachLink} to="/login" colorScheme="teal" w="35%" mt={6}>
							Login as Demo User
						</Button>
					) : (
						<Button as={ReachLink} to="/posts" colorScheme="teal" w="25%" mt={6}>
							Read the Forum
						</Button>
					)}

					<Image src={heroImg} />
				</Stack>
			</Container>

			{/* Feature Cards */}
			<Stack
				spacing={8}
				direction={{ base: 'column', md: 'row' }}
				maxW={'container.lg'}
				mx="auto"
				px={4}
				mb={20}
			>
				<Feature title={'Growth Potential'} icon={<MdInsights />}>
					With Loop Agile Now you have nedless possibilites to skyrocket your career. Get ideas for
					your issues to elevate your projects to the next level and deliver impeccable results.
				</Feature>
				<Feature title={'Community First'} icon={<MdGroup />}>
					You are never alone with Loop Agile Now. Discuss difficult matters with your peers through
					our forum and get a sense of belonging. Here, everyone matters and no issue is too small!
				</Feature>
				<Feature title={'Growth Potential'} icon={<MdLanguage />}>
					Build your professional network by interacting with peers from all over the world. We are
					a global company and the possibilites are endless for those who really want them.
				</Feature>
			</Stack>
		</>
	);
}
