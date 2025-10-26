import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

interface AuthState {
  isLoggedIn: boolean;
  user: null | { uid: string; phoneNumber: string };
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ uid: string; phoneNumber: string }>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setAuthState(state, action: PayloadAction<AuthState>) {
      // This is only called if you manually dispatch setAuthState
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      if (action.payload) {
        console.log('authSlice: REHYDRATE', action.payload);
        state.isLoggedIn = action.payload.isLoggedIn ?? false;
        state.user = action.payload.user ?? null;
      }
    });
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
