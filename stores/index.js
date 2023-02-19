import {configureStore} from '@reduxjs/toolkit';

// Reducers
import dataReducer from './data';

const store = configureStore({
    reducer: {
        data: dataReducer,
    }
});

export default store;
