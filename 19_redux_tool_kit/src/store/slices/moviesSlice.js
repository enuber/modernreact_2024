import { createSlice } from '@reduxjs/toolkit';
import { reset } from '../actions';

const moviesSlice = createSlice({
  name: 'movie',
  initialState: [],
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      // Note: we can't just use state = [] as this will reassign the state variable it is not mutating the state as you may think. we are returning instead because this is understood what we want our state to now be.
      return [];
    });
  },
});

//remember in the first case we are destructuring the named exports off of the actions and then exporting them. In the second case we are getting a direct reference to that combined reducer function, we are assigning it to a new variable and, we are exporting that variable.
export const { addMovie, removeMovie } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
