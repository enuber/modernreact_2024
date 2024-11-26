import { createSlice } from '@reduxjs/toolkit';
import { addCar } from './carsSlice';

/*
in createSlice we have the name of what it is, then an initial state where we assign what the data should look like. In our case, we have two bits of state being tracked a name that is a string a cost that is a number. 

the reducers section are our mini-reducers that update our state in someway. so changeName takes our state and the action object and, uses it to just update the name in initialState with the action.payload which is what is passed in.
*/
const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    cost: 0,
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeCost(state, action) {
      state.cost = action.payload;
    },
  },
  /*
    instead of doing multiple dispatches to reset the form after submit we do this. we use builder and add in the action.type we care about. Rather than write out 'cars/addCar' which could lead to a typo we import the action creator function. then we always get state and action for the callback function. In there we reset state. 
  */
  extraReducers(builder) {
    builder.addCase(addCar, (state, action) => {
      state.name = '';
      state.cost = 0;
    });
  },
});

export const { changeName, changeCost } = formSlice.actions;
export const formReducer = formSlice.reducer;
