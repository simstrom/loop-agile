import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { deletePost, findPost, updatePost } from '../api/post';

/**
 * Custom Hook to make it easier to update and delete posts from anywhere.
 * Currently used on Forums, Profile and Single Post pages.
 */
export default function usePostHandling({ posts, setPosts, setPost }) {
	const toast = useToast();
	const navigate = useNavigate();

	/**
	 * Edit post where only sinlge post state from parent.
	 */
	const handleSingleEdit = async (post, content) => {
		let newPost = await updatePost(post.post_id, content);
		newPost = await findPost(newPost.post_id);
		setPost(newPost);
		sendToast('success', 'Post Updated!');
	};

	/**
	 * Edit post where multiple posts state (array) from parent.
	 */
	const handleMultipleEdit = async (post, content) => {
		let newPost = await updatePost(post.post_id, content);
		newPost = await findPost(newPost.post_id);
		setPosts(posts.map((post) => (post.post_id === newPost.post_id ? newPost : post)));
		sendToast('success', 'Post Updated!');
	};

	/**
	 * Delete post where multiple posts state (array) from parent.
	 */
	const handleMultipleDelete = async (delPost) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			await deletePost(delPost);
			sendToast('success', 'Post Deleted!');
			setPosts(posts.filter((post) => post.post_id !== delPost.post_id));
		}
	};

	/**
	 * Delete post where only sinlge post state from parent.
	 */
	const handleSingleDelete = async (delPost) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			await deletePost(delPost);
			sendToast('success', 'Post Deleted!');
			navigate('/posts');
		}
	};

	/**
	 * Util func for displaying popup message after update/delete.
	 */
	const sendToast = (type, message) => {
		toast({
			title: message,
			status: type,
			duration: 3000,
			isClosable: true,
		});
	};
	return { handleSingleEdit, handleMultipleEdit, handleMultipleDelete, handleSingleDelete };
}
