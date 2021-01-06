import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import AuthForm from './index';

describe('AuthForm Component', () => {
	let wrapper;
	let shallow;
	let mocklocation, mockEmailSignInStart, mockGoogleSignInStart, mockSignUpStart;

	beforeEach(() => {
		mocklocation = {
			state: 'sign up'
		};
		mockEmailSignInStart = jest.fn();
		mockGoogleSignInStart = jest.fn();
		mockSignUpStart = jest.fn();

		const mockProps = {
			location: mocklocation,
			emailSignInStart: mockEmailSignInStart,
			googleSignInStart: mockGoogleSignInStart,
			signUpStart: mockSignUpStart,
			isLoggingIn: false
		};
		shallow = createShallow();
		wrapper = shallow(<AuthForm {...mockProps} />);
	});

	it('should render AuthForm component', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should call googleSignInStart when Sign up button is clicked', () => {
		wrapper.find('GoogleButton').simulate('click');
		expect(mockGoogleSignInStart).toHaveBeenCalled();
	});
});
