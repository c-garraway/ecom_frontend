import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        user: []
    };
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialState(),
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: () => initialState()
    },
    
})

export const {addUser, resetUser} = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser.user
export default currentUserSlice.reducer