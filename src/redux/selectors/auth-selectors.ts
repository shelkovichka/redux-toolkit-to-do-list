import { RootState } from "@/redux/store";


export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthError = (state: RootState) => state.auth.error;
