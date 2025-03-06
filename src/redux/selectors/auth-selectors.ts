import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthLoading = (state: RootState) => state.auth.loading;