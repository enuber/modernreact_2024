import { createSlice } from '@reduxjs/toolkit';
import { reset } from '../actions';

const songsSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      //action.payload === string, the song we want to remove
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
export const { addSong, removeSong } = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
