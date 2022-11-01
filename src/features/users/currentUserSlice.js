import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return [];
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialState(),
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        resetUser: () => initialState()
    },
    
})

export const {addUser, resetUser} = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser.user
export default currentUserSlice.reducer