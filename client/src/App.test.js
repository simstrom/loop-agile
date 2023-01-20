import { fireEvent, render, screen } from '@testing-library/react';
import ProfileEdit from './components/ProfileEdit';
import UserContext from './contexts/UserContext';
import { Login, NewPost, Profile, Register } from './routes';

const user = {
	first_name: 'Test',
	last_name: 'Person',
	email: 'test@gmail.com',
	avatar: 'https://avatars.dicebear.com/api/micah/random-seedphrase.svg?b=%23e2e8f0',
	createdAt: Date.now(),
};

// Login validation
test('login with invalid credentials and check error message', async () => {
	render(<Login />);

	const email = screen.getByLabelText('Email');
	const password = screen.getByLabelText('Password');

	fireEvent.change(email, { target: { value: 'test@gmail.com' } });
	fireEvent.change(password, { target: { value: '' } });

	const button = screen.getByDisplayValue('Login');
	fireEvent.click(button);

	const errorMsg = screen.getByText('Email and/or Password is incorrect!');
	expect(errorMsg).toBeInTheDocument();
});

// Register with invalid password format
test('register with invalid password format', () => {
	render(<Register />);

	const email = screen.getByLabelText('Email');
	const password = screen.getByLabelText('Password');
	const firstName = screen.getByLabelText('First Name');
	const lastName = screen.getByLabelText('Last Name');

	fireEvent.change(email, { target: { value: 'test@gmail.com' } });
	fireEvent.change(password, { target: { value: '1234' } });
	fireEvent.change(firstName, { target: { value: 'Bobby' } });
	fireEvent.change(lastName, { target: { value: 'Nash' } });

	const button = screen.getByDisplayValue('Register');
	fireEvent.click(button);

	const errorMsg = screen.getByText(
		'The password must be minimum 8 characters, have 1 uppercase letter, 1 digit and 1 special character.'
	);
	expect(errorMsg).toBeInTheDocument();
});

// Register with email that already exists
test('register with already registered email', () => {
	render(<Register />);

	const email = screen.getByLabelText('Email');
	const password = screen.getByLabelText('Password');
	const firstName = screen.getByLabelText('First Name');
	const lastName = screen.getByLabelText('Last Name');

	fireEvent.change(email, { target: { value: 'dan@gmail.com' } });
	fireEvent.change(password, { target: { value: 'ThisIsaStrongPass12!' } });
	fireEvent.change(firstName, { target: { value: 'Dan' } });
	fireEvent.change(lastName, { target: { value: 'Danson' } });

	const button = screen.getByDisplayValue('Register');
	fireEvent.click(button);

	const errorMsg = screen.getByText('Account with same email already exists!');
	expect(errorMsg).toBeInTheDocument();
});

// New profile should not have any posts.
test('profile has no posts when initially created', () => {
	render(
		<UserContext.Provider value={user}>
			<Profile />
		</UserContext.Provider>
	);

	const noPost = screen.getByText('It looks empty here...');
	expect(noPost).toBeInTheDocument();
});

// Edit form renders
test('edit profile details form renders correctly', () => {
	render(
		<UserContext.Provider value={user}>
			<ProfileEdit />
		</UserContext.Provider>
	);

	const editBtn = screen.getByRole('button');
	fireEvent.click(editBtn);

	const editForm = screen.getByRole('form');
	expect(editForm).toBeInTheDocument();
});

// New Post form is functional
test('form for creating new posts exists and handles input', () => {
	render(
		<UserContext.Provider value={user}>
			<NewPost />
		</UserContext.Provider>
	);
	const input = screen.getByRole('textbox');
	expect(input).toBeInTheDocument();

	fireEvent.change(input, { target: { value: 'This is my new post!' } });
	expect(input.value).toBe('This is my new post!');
});
