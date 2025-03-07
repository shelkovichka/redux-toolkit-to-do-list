import { useDispatch, useSelector } from "react-redux";
import { setAuthState, logout } from "@/redux/slices/auth-slice";
import { enqueueSnackbar } from "notistack";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { selectAuthLoading } from "@/redux/selectors/auth-selectors";

const errorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "The password is too weak.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/invalid-credential": "Invalid credentials.",
};

interface UseAuthReturn {
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const handleError = (error: unknown): void => {
    const errorMessage =
      error instanceof FirebaseError
        ? errorMessages[error.code] || "An error occurred."
        : "An unknown error occurred.";

    dispatch(setAuthState({ loading: false, error: errorMessage }));
    enqueueSnackbar(errorMessage, { variant: "error" });
  };

  const handleSuccess = (
    userCredential: UserCredential | null,
    message: string
  ): void => {
    if (userCredential) {
      dispatch(setAuthState({ loading: false, user: userCredential.user }));
    } else {
      dispatch(setAuthState({ loading: false }));
    }
    enqueueSnackbar(message, { variant: "success" });
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    dispatch(setAuthState({ loading: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleSuccess(userCredential, "Registration successful!");
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    dispatch(setAuthState({ loading: true, error: null }));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleSuccess(userCredential, "Login successful!");
    } catch (error) {
      handleError(error);
    }
  };

  const logoutUser = async (): Promise<void> => {
    dispatch(setAuthState({ loading: true }));
    try {
      await signOut(auth);
      dispatch(logout());
      handleSuccess(null, "You have successfully logged out.");
    } catch (error) {
      handleError(error);
    }
  };

  return { loading, signUp, login, logout: logoutUser };
};
