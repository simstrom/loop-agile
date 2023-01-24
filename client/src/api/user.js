import axios from 'axios';

const API_URL = 'https://loop-agile-api.vercel.app/api/users';

// --- USERS ------------------------------------
export const findUsers = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

export const registerUser = async (user) => {
	const response = await axios.post(API_URL, user);
	response && setLocalUser(response.data);
	return response.data;
};

/**
 * Used on login. Checks if password and email matches.
 */
export const verifyUser = async (user) => {
	const response = await axios.post(API_URL + '/login', user);
	response && setLocalUser(response.data);
	return response.data;
};

export const findUser = async (id) => {
	const response = await axios.get(API_URL + `/${id}`);
	return response.data;
};

export const updateUser = async (userId, user) => {
	user.user_id = userId;
	const response = await axios.put(API_URL + `/${userId}`, user);
	response && setLocalUser(response.data);
	return response.data;
};

export const deleteUser = async (user) => {
	const response = await axios.delete(API_URL + `/${user.user_id}`, user);
	response && setLocalUser(response.data);
	return response.data;
};

export const toggleFollow = async (toFollow, user) => {
	const response = await axios.post(API_URL + `/follow/${toFollow}`, user);
	return response.data;
};

// --- LOCAL STORAGE ------------------------------------
// Interactions with localStorage to minimze unnecessary API calls.
export const getLocalUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

export const setLocalUser = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const removeLocalUser = () => {
	localStorage.removeItem('user');
};
