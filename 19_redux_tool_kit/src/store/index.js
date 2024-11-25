/* 
305. Understanding the store:
The store is an object that will hold all of our state
We usually do not have to interact with it directly. The 'React-Redux' library will handle the store for us.
To dispatch an action store.dispatch({type: 'songs/addSong'});
To see what state exists in the store use store.getState();

these final two items above are fairly rare to do. We usually just use the React-Redux library to interact with the store. These two items are generally used for debugging purposes.

Redux Store 
  State
    {
      currentUser: [{id: 1}],
      videos: {viewIds: [7, 14, 51]},
      messages: {unreadCount: 90},
      notifications: {urgent: 'read this'},
    }

in this above set, the keys for this big object are set when the store is created
the values are produced by the individual reducer

Remember that it's usually nice to store all state in a single big object.

So in our case...

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
  },
});

the songs: songsSlice.reducer determines what keys our state object has which in this case is songs. the [] that holds the songs or data is being produced by the songs reducer. 

so to create the store we called configureStore. We gave it that reducer property. and that was an object that had songs and songsSlice.reducer. So that object determines what keys or what kind of general shape of our state will be. So because we set the key in this object to songs that is what will be the key in our state. and because we set the value to songsSlice.reducer, that tells the value of the state that it is the songs reducer that will determine what this value is. 

*/
/*
306. The store's initial state and slices
Slices automatically create reducers and action types. 

Slices -
define some initial state
combines mini-reducers into a big reducer
creates a set of action creator functions

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
  },
});

from songsSlice we will get the initialState property and that will become the starting value inside our state. This initial State can be a string, array, object...etc.
*/
/* 
307. Understanding Slices

remember when talking about useReducer we had an action which could be type: ADD_SONG, this would get sent to the reducer as the action along with the current state. It then goes through a switch statement and if the type matches the case you run the code in the case statement. 

So slices save us from writing out all of this boilerplate. So don't have to write out the action types, the switch statements, the case statements...

so what a slice does do...we write out mini reducer functions on that reducers property. 

  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {},
  },

  so here addSong and removeSong are mini functions on the reducers property that will have code to be run based on the type. So you can view each of these mini functions as being linked to an individual case statement inside of the switch. So whenever we create a slice that object is taken, that's the reducers object, we feed it into createSlice and we get back songsSlice. songSlice, the variable is an object and it has a property called reducer. That reducer property is like a big mega reducer that combines together all of the indivdiual reducers we had written out. This combined reducer is what actually gets loaded into the redux store. 

  Inside the addSong function we are making use automatically of that immer library. Remember that this allows us to mutate state directly. We also don't have to return any state. So we have to do inside of each of these functions is apply our state update and that's pretty much it. 

  for the type that we need to call, this comes from the name we set in the songSlice, it adds in a '/' an the name of the function inside of the reducer. So we get 'song/addSong' or 'song/removeSong'. 

  finally the state in addSong(state, action), is only the piece of state that is managed by the slice. So this state variable is not the overarching state object in the whole store. It is the piece of state managed by this reducer. 
*/
/* 
308. Understanding Action Creators
The slice function is going to take a look at the name of all the different reducers. In response to those, it is going to create a new object. On this object are one function for each of these different reducers and, they are going to have the exact same name. These functions are called action creators. they are functions that are created for us automatically. When called, they return an action that we can dispatch and this saves us from having to manually write out action objects. 

//this will give us the list of action creators even though it's called actions. by adding in addSong() you will see in the console that it gives you back the type and payload. 
console.log(songsSlice.actions.addSong());

The entire purpose of this is to get back the action we can use to dispatch. That is all that they do. The first and only argument to the function is what we want to use as a payload, if we want to have a payload at all. 

This means we can simply do

store.dispatch(songsSlice.actions.addSong('some song'));
*/
/* 
309. Connecting React to Redux

Using the React-Redux library. This allows react and redux to play together nicely. Key part of this library is the Provider which is a component. It creates the same kind of provider we have seen before around the context system. We will pass the redux store to it. Then through the context system, the store and specifically the dispatch function and state within it are going to be made available to all the different components inside of our application. 

One time per project
1) export the 'store' from whatever file it is created in
2) import the store into the root index.js file
3) import Provider from the react-redux library
4) Wrap the app component with the Provider pass the store to the Provider
*/
/* 
310. updating state from a component

1) add a reducer to one of your slices that changes state in some particular way
2) export the action creator that the slice automatically creates
3) find the component that you want to dispatch from
4) import the action creator function and 'useDispatch' from react-redux
5) call the useDispatch hook to get access to the dispatch function
6) when the user does something, call the action creator to get an action, then dispatch it. 
*/
/* 
311. Accessing State in a component

1) find the component that needs access to some state
2) import the 'useSelector' hook from 'react-redux'
3) call the hook passing in a selector function
4) use the state. Anytime state changes, the component will automatically rerender
*/
/* 
316. Reset of two different slices...
Though you could do two dispatches for the different slices ideally you want to make as few dispatches as possible. So better to find a way to combine the resets in order to do a single dispatch.

Remember that whenver we create a slice we create the reducers object that has these mini reducer functions like addSong, removeSong. So these are loaded into our slice and, we get song slice, and this is used to create a combined reducer which is a function. This function gets inserted into the redux store and, whenever an action is dispatched it flows into this function. This functions job is to look at all the incoming actions and if one has a type that matches up with something that exists it's going to run that micro reducer. 

In our code, the configureStore has this combined reducer showing as songsSlice.reducer for example. That is the combined reducer. 

When an action is dispatched it is sent to every reducer in the store. This is every combined reducer. - up to this point we haven't really cared about this because the combined reducers are configured to only care about particular action types. 

*/
/* 
319. Watching for other actions.

we can use extraReducers to watch for other items that we are interested in. this takes an argument of builder.

We then use builder.addCase(typeToWatchFor, functiontorun)

typeToWatchFor - this is the action.type that we want to do something if it is seen. 
functiontorun - this is like the mini reducers where it takes in state and action and then runs some code.


  extraReducers(builder) {
    builder.addCase('movie/reset', (state, action) => {
      return [];
    });
  },

we can refactor this so that 'movie/reset' is replaced to decrease the chances of a typo or error.

we can use
moviesSlice.actions.reset.toString() or moviesSlice.actions.reset by itself as this is a common practice so it is less code but does same thing. 

DOWNSIDE: this is reliant on movies/reset existing so not the best solution.

*/
/*
//NOTE THIS CODE USES - the extraReducers to watch for another reducer
import { configureStore, createSlice } from '@reduxjs/toolkit';

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
    reset(state, action) {
      //in this case we can't simply put state = []. Immer allows us to mutate state but by putting state=[] this is just reassigning state which isn't the same thing as mutating the state so we return the empty array as RTK is going to understand that since we didn't make any changes to the existing state, didn't mutate or modify it, so whatever is being returned is what we want the state to be.
      return [];
    },
  },
});

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
    builder.addCase(moviesSlice.actions.reset, (state, action) => {
      return [];
    });
  },
});

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    movies: moviesSlice.reducer,
  },
});

//this is exporting as a named exports.
export { store };
export const { addSong, removeSong } = songsSlice.actions;
export const { addMovie, removeMovie, reset } = moviesSlice.actions;

*/

/* 
321 Manual action creation

Create a new standalone reset action and get both slices to watch for it

action - {type: 'app/reset'}
get both combined reducers to watch for this action type. This separates out the type to be watched for from either combined reducer.

In order to do this, you have to bring in createAction from RTK. You then use this to create the action where what you define inside the () is the type

const reset = createAction('app/reset');

so in this case 'app/reset' will be the type and if you call 

console.log(reset)

you will get
{
  type: 'app/reset'.
  payload: undefined
}
*/
/* 
file and folder structure
with RTK it is better to go a functional approach to organization. 

by function: (what the function of the actual file is)
src/
  components/ <--all components here
  store/
    actions/
    slices/<--all slices go here
    index.js <--create and export the redux store here
  App.js
  index.js  

a feature based approach of file structure doesn't work well with RTK due to circular imports which will be explained later

with this in mind, allowing components to import from slice files gets really messy, instead we will have our slices export to the store/index.js. This index.js file will be used to export our redux store. This file will also import the action creators and combined reducer and then immediatly re-export them. So this file will be the central access point for everything related to redux. This will help solve some circular import issues tthat we will see later on.

*/

import { configureStore } from '@reduxjs/toolkit';
import { songsReducer, addSong, removeSong } from './slices/songsSlice';
import { moviesReducer, addMovie, removeMovie } from './slices/moviesSlice';
import { reset } from './actions';

//this is where the store is being created. this songs and movies is what is being used as the names for each key in if we were to console log out the store. You can call them whatever you want.
const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer,
  },
});

//this is exporting as a named exports.
export { addSong, addMovie, removeSong, removeMovie, reset, store };

// console.log(store);

//makes it a little easier to read by turning it into JSON
// const startingState = store.getState();
// console.log(JSON.stringify(startingState));

// store.dispatch({
//   type: 'song/addSong',
//   payload: 'new song',
// });
// store.dispatch(songsSlice.actions.addSong('some song'));

// const finalState = store.getState();
// console.log(JSON.stringify(finalState));
