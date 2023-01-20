/**
 * Makes formating date much easier from around application.
 * @param {string} str
 * @returns
 */
const formatDate = (str) => {
	const date = new Date(str);
	return date.toLocaleDateString();
};

export default formatDate;
