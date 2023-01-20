/**
 * Utility class for form validation.
 * Used when registering new user or updating user information
 */
export const validateForm = (fields, validatePassword) => {
	let errors = {};
	// Regex for email pattern. Found in Practical Session.
	let emailPattern = new RegExp(/\S+@\S+\.\S+/);

	// Regex for strong password with min 8 chars, 1 uppercase letter, 1 digit and 1 special character.
	// Found on StackOverflow.
	let passwordPattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

	if (!fields.first_name) {
		errors.name = 'Please enter your name!';
	}
	if (!fields.last_name) {
		errors.name = 'Please enter your name!';
	}
	if (!fields.email) {
		errors.email = 'Please enter your email!';
		// Checks if provided email matched Regex
	} else if (!emailPattern.test(fields.email)) {
		errors.email = 'Email address is invalid!';
	}
	if (!validatePassword) return errors;

	if (!fields.password) {
		errors.password = 'Please enter a password!';
		// Checks if provided password matched Regex
	} else if (!passwordPattern.test(fields.password)) {
		errors.password =
			'The password must be minimum 8 characters, have 1 uppercase letter, 1 digit and 1 special character.';
	}

	return errors;
};

/**
 * Security measures for XSS.
 * Inspired by Lectorial Week 9 code.
 * @param {Object} fields
 * @returns
 */
export const trimFields = (fields) => {
	const trimmedFields = {};
	for (const [key, value] of Object.entries(fields)) {
		let field = value;

		// If value is not null trim the field.
		if (field.length !== null) {
			field = field.trim();
		} else {
			field = '';
		}
		trimmedFields[key] = field;
	}
	return trimmedFields;
};
