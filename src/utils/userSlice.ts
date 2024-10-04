import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState { 
  firstName: string;
}

const initialState: UserState = {
  firstName: 'Richu', // Hardcoded first name
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFirstName(state, action: PayloadAction<string>) {
        state.firstName = action.payload;  // Update first name in state
    },
},
});
export const { setUserFirstName } = userSlice.actions;
// Selector to get the user's first name
export const selectUserFirstName = (state: { user: UserState }) => state.user.firstName;

export default userSlice.reducer;