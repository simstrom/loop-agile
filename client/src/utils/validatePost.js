/**
 * Utility class for post validation.
 * Used when creating new posts as logged in user.
 */
const validatePost = (post, file) => {
	let errors = {};

	// As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
	// Regex copied from W9 Lectorial Code. Thank you :)
	if (post.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
		errors.text = 'Post can not be empty!';
	} else if (post.replace(/<(.|\n)*?>/g, '').trim().length > 600) {
		errors.text = 'Post can not exceed 600 characters!';
	}

	// Checks that provided file is actually an image
	if (file && !file.type.includes('image')) {
		errors.image = 'Must be an image!';
	}
	return errors;
};

export default validatePost;
