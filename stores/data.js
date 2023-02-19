import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: {},
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const {setUser} = dataSlice.actions;
export default dataSlice.reducer;
