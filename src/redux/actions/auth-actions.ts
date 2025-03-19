import {createAsyncThunk} from '@reduxjs/toolkit';
import {enqueueSnackbar} from 'notistack';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';

import {auth} from '@/firebase';
import {logout} from '@/redux/slices/auth-slice';

const errorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'The password is too weak.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/invalid-credential': 'Invalid credentials.',
};

const handleFirebaseError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return errorMessages[error.code] || 'An error occurred.';
  }
  return 'An unknown error occurred.';
};

export const signUpUser = createAsyncThunk(
    'auth/signUp',
    async (
        {email, password}: { email: string; password: string },
        {rejectWithValue},
    ) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        enqueueSnackbar('Registration successful!', {variant: 'success'});
        return userCredential.user;
      } catch (error) {
        const errorMessage = handleFirebaseError(error);
        enqueueSnackbar(errorMessage, {variant: 'error'});
        return rejectWithValue(errorMessage);
      }
    },
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        {email, password}: { email: string; password: string },
        {rejectWithValue},
    ) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        enqueueSnackbar('Login successful!', {variant: 'success'});
        return userCredential.user;
      } catch (error) {
        const errorMessage = handleFirebaseError(error);
        enqueueSnackbar(errorMessage, {variant: 'error'});
        return rejectWithValue(errorMessage);
      }
    },
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {dispatch, rejectWithValue}) => {
      try {
        await signOut(auth);
        dispatch(logout());
        enqueueSnackbar('You have successfully logged out.', {
          variant: 'success',
        });
        return null;
      } catch (error) {
        const errorMessage = handleFirebaseError(error);
        enqueueSnackbar(errorMessage, {variant: 'error'});
        return rejectWithValue(errorMessage);
      }
    },
);
