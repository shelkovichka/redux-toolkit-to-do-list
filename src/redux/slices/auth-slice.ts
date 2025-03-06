import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    // Add any other user fields you need
    [key: string]: any;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    logout: () => initialState,
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
