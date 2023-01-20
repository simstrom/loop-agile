import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getLocalUser, removeLocalUser } from './api/user';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import UserContext from './contexts/UserContext';
import { Forum, Home, Login, NewPost, Profile, Register } from './routes';
import { SinglePost } from './routes/SinglePost';

function App() {
	const [user, setUser] = useState(getLocalUser());
	const navigate = useNavigate();

	// 2 utility functions which handles global user state and updates userContext automatically.
	const loginUser = (user) => {
		setUser(user);
		navigate(`/users/${user.user_id}`);
	};

	const logoutUser = () => {
		setUser(null);
		removeLocalUser();
		navigate('/');
	};

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Box className="App" minH="100vh" display="flex" flexDirection="column">
				<NavBar logoutUser={logoutUser} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login loginUser={loginUser} />} />
					<Route path="/register" element={<Register loginUser={loginUser} />} />
					<Route path="/users/:userId" element={<Profile logoutUser={logoutUser} />} />
					<Route path="/posts" element={<Forum />} />
					<Route path="/posts/new" element={<NewPost />} />
					<Route path="/posts/:postId" element={<SinglePost />} />
				</Routes>
				<Footer />
			</Box>
		</UserContext.Provider>
	);
}

export default App;
