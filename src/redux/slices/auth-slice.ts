import {createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';

import {
  signUpUser,
  loginUser,
  logoutUser,
} from '@/redux/actions/auth-actions';

interface AuthState {
  user: {
    uid: string;
    email: string | null;
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
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);

    builder.addMatcher(
        isAnyOf(signUpUser.pending, loginUser.pending, logoutUser.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        },
    );

    builder.addMatcher(
        isAnyOf(signUpUser.fulfilled, loginUser.fulfilled),
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
    );

    builder.addMatcher(
        isAnyOf(signUpUser.rejected, loginUser.rejected, logoutUser.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
    );
  },
});

export const {setAuthState, logout} = authSlice.actions;
export default authSlice.reducer;
