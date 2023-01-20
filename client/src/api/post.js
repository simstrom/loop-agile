import axios from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../utils/firebase.config';
import { findUser } from './user';

const API_URL = 'http://localhost:4000/api/posts';

// --- POSTS ------------------------------------
/**
 * Find	all posts
 */
export const findPosts = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

/**
 * Find posts from users that the current user is following.
 */
export const findFollowingPosts = async (userId) => {
	const activeProfile = await findUser(userId);
	const response = await axios.get(API_URL);
	const followingPosts = response.data.filter((post) =>
		activeProfile.following.some((user) => post.user_id === user.user_id)
	);
	return followingPosts;
};

/**
 * Creates new post and uploads image to firebase.
 */
export const createPost = async (post) => {
	const response = await axios.post(API_URL, post);
	// If image was provided, also upload to firebase.
	if (post.image) {
		const storageRef = ref(storage, `files/${response.data.post_id}`);
		await uploadBytes(storageRef, post.image);
	}
	return response.data;
};

/**
 * Fetches a single post.
 */
export const findPost = async (id) => {
	const response = await axios.get(API_URL + `/${id}`);
	return response.data;
};

/**
 * Fetches the accompanied image of a post, since it is stored separetly.
 */
export const getPostImage = async (id) => {
	const storageRef = ref(storage, `files/${id}`);
	const img = await getDownloadURL(storageRef);
	return img;
};

export const updatePost = async (post_id, text) => {
	const response = await axios.put(API_URL + `/${post_id}`, { post_id, text });
	return response.data;
};

/**
 * Deltes a specified post, also removes corresponding image from firebase.
 */
export const deletePost = async (post) => {
	const response = await axios.delete(API_URL + `/${post.post_id}`);

	if (post.image) {
		// Also removing image from firebase storage
		const storageRef = ref(storage, `files/${post.post_id}`);
		await deleteObject(storageRef);
	}

	return response.data;
};

// --- POST REACTIONS ------------------------------------

export const addPostReaction = async (userId, postId, type) => {
	const reaction = { userId, type };
	const response = await axios.post(API_URL + `/${postId}/reactions`, reaction);
	return response.data;
};

/**
 * Updates already existing reaction to new value.
 */
export const changePostReaction = async (reaction, type) => {
	const response = await axios.put(
		API_URL + `/${reaction.post_id}/reactions/${reaction.reaction_id}`,
		{ type }
	);
	return response.data;
};
export const removePostReaction = async (reaction) => {
	const response = await axios.delete(
		API_URL + `/${reaction.post_id}/reactions/${reaction.reaction_id}`
	);
	return response.data;
};

// --- COMMENTS ------------------------------------
export const addComment = async (postId, userId, text) => {
	const response = await axios.post(API_URL + `/${postId}/comments`, { userId, text });
	return response.data;
};

export const getComment = async (postId, commentId) => {
	const response = await axios.get(API_URL + `/${postId}/comments/${commentId}`);
	return response.data;
};

export const addCommentReaction = async (userId, commentId, type) => {
	const reaction = { userId, commentId, type };
	const response = await axios.post(API_URL + `/comments/${commentId}/reactions`, reaction);
	return response.data;
};

/**
 * Updates already existing reaction to new value.
 */
export const changeCommentReaction = async (reaction, type) => {
	const response = await axios.put(
		API_URL + `/comments/${reaction.comment_id}/reactions/${reaction.reaction_id}`,
		{ type }
	);
	return response.data;
};

export const removeCommentReaction = async (reaction) => {
	const response = await axios.delete(
		API_URL + `/comments/${reaction.comment_id}/reactions/${reaction.reaction_id}`
	);
	return response.data;
};
