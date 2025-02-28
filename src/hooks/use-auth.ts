import { useDispatch, useSelector } from "react-redux";
import { setAuthState, logout } from "@/redux/slices/auth-slice";
import { enqueueSnackbar } from "notistack";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { RootState } from "@/redux/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof FirebaseError
        ? errorMessages[error.code] || "An error occurred."
        : "An unknown error occurred.";

    dispatch(setAuthState({ loading: false, error: errorMessage }));
    enqueueSnackbar(errorMessage, { variant: "error" });
  };

  const signUp = async (email: string, password: string) => {
    dispatch(setAuthState({ loading: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setAuthState({ loading: false, user: userCredential.user }));
      enqueueSnackbar("Registration successful!", { variant: "success" });
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (email: string, password: string) => {
    dispatch(setAuthState({ loading: true, error: null }));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setAuthState({ loading: false, user: userCredential.user }));
      enqueueSnackbar("Login successful!", { variant: "success" });
    } catch (error) {
      handleError(error);
    }
  };

  const logoutUser = async () => {
    dispatch(setAuthState({ loading: true }));
    try {
      await signOut(auth);
      dispatch(logout());
      enqueueSnackbar("You have successfully logged out.", {
        variant: "success",
      });
    } catch (error) {
      handleError(error);
    }
  };

  return { loading, signUp, login, logout: logoutUser };
};

const errorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "The password is too weak.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/invalid-credential": "Invalid credentials.",
};
