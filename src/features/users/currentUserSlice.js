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
        selectUserID: (state, action) => {
            return state.user.id
        },
        resetUser: () => initialState()
    },
    
})

export const {addUser, resetUser, selectUserID} = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser.user
export default currentUserSlice.reducer