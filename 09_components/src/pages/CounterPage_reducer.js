/* 291 useReducer in Action

useState - absolutely fine hook to use whenver a component needs state

useReducer - alternative to useState, produces state, changing this state makes component rerender, useful when you have several different closely related pieces of state, useful when future state values depend on the current state

you typically use one of or the other of these. Not very common to use both.

example of closely related pieces of state would be in component below where we use setCount(count + valueToAdd) they are closely related here because we are using them together to setCount. 

example of future state value depend on the current state - setCount(count + 1) and setCount(count-1). Along with this, we have setCount using just count to increment/decrement so the future state values depnd on the current state also matches here.
*/
/*
 291. still in this video.

useState vs useReducer

// useState
const [count, setCount] = useState(initialCount);
const [valueToAdd, setValueToAdd] = useState(0);

//useReducer
const [state, dispatch] = useReducer(reducer, {count: initialCount, valueToAdd: 0});

looking at the above, the below shows what things there are in common.

state variable - 
useState these are count and valueToAdd
useReducer this is state

function to change state - 
useState these are setCount and setValueToAdd
useReducer this is dispatch

initial value for this state
useState - initialCount and 0
useReducer - {count:initialCount, valueToAdd: 0}

conventions of useState in our case
count: state - number
valueToAdd: state - number
Each piece of state defined as a separate variable

conventions of useReducer in our case
{count: intitalCount, valueToAdd: 0}
state - object (one single object that holds what the state is)
All state for the whole component is defined in a single object
get at these by state.count, state.valueToAdd
*/
/* 
292 rules of reducer functions: 

const reducer = (state, action) => {
  //whatever gets returned will be the new state
}

state - is the currentState
action - dispatch(5) function we get back from calling useReducer, calling dispatch is what sets the state.

everything begins with us calling the dispatch function which is how we trigger a state update. 
when we call dispatch react will look for the fuction called reducer that we created at the top of the file. 
The first argument passed in is state which is the current state that is being maintained by that reducer. the second argument is usually called action. The value of that argument is going to be whatever you sent in when you called dispatch. When you call dispatch you can pass in no arguments or exactly one argument. Then the reducer will run and whatever we return will be the new state. The returning of state will cause the component to rerender and useReducer will get called again and state will now contain that new object we just returned. 

Rules around Reducer Function -
whatever you return will be your new state
if you return nothing, then your state will be undefined
no async/await, no requests, no promises, no outside variables 
Don't directly modify state!

bad - state.count = state.count + 1; return state;

good - return {...state, count: state.count+1}

*/
/* 
293 Understanding Action Objects
Our component has different ways that need to be handled in order to update state. So we need a way to let that happen. For example, when the increment button is clicked state changes, when a user types in the input we need to update the state for that...

Popular way to handle this...
dispatch()
when we call dispatch we need to pass along some info to tell the reducer how the state should be updated
The React community has come up with a convention on how to tell the reducer what it needs to do. 

When we need to modify state, we will call dispatch and always pass in an action object
The action object will alwyas have a type property that is a string. This helps tell the reducer what state update it needs to make
If we need to communicate some data to the reducer it will be placed on the payload property of the action object

Within the reduceer we will then look for the type and do something with the payload based on that type. This can be done with if/else or better...a switch

In order to help prevent typos we can decalre these as constant variables that we then use in place of typing these out. Convention is that these are written as Capital Letters. 

*/
/* 
298 Immer library
immer lets you directly mutate state. 

you can mutate state,
do not have to return a new value
but still need to do a return in a switch statement because of fall through.


*/

//with immer have to wrap reducer with produce and then can mutate state directly
import produce from 'immer';
import { useReducer } from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';

const INCREMENT_COUNT = 'increment';
const DECREMENT_COUNT = 'decrement';
const SET_VALUE_TO_ADD = 'set_value_to_add';
const ADD_VALUE_TO_COUNT = 'add_value_to_count';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      state.count = state.count + 1;
      return;
    case DECREMENT_COUNT:
      state.count = state.count - 1;
      return;
    case SET_VALUE_TO_ADD:
      state.valueToAdd = action.payload;
      return;
    case ADD_VALUE_TO_COUNT:
      state.count = state.count + state.valueToAdd;
      state.valueToAdd = 0;
      return;
    default:
      return state;
  }
};

function CounterPage({ initialCount }) {
  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };

  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    });
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_VALUE_TO_COUNT,
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">count is {state.count}</h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ''}
          onChange={handleChange}
          type="number"
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        ></input>
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;

// traditional way of using useReducer
// import { useState, useReducer } from 'react';
// import Button from '../components/Button';
// import Panel from '../components/Panel';

// const INCREMENT_COUNT = 'increment';
// const DECREMENT_COUNT = 'decrement';
// const SET_VALUE_TO_ADD = 'set_value_to_add';
// const ADD_VALUE_TO_COUNT = 'add_value_to_count';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNT:
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     case DECREMENT_COUNT:
//       return {
//         ...state,
//         count: state.count - 1,
//       };
//     case SET_VALUE_TO_ADD:
//       return {
//         ...state,
//         valueToAdd: action.payload,
//       };
//     case ADD_VALUE_TO_COUNT:
//       return {
//         ...state,
//         count: state.count + state.valueToAdd,
//         valueToAdd: 0,
//       };
//     default:
//       return state;
//   }
// };

// function CounterPage({ initialCount }) {
//   // const [count, setCount] = useState(initialCount);
//   // const [valueToAdd, setValueToAdd] = useState(0);
//  // Note that the first argument here is the function to run when dispatch is called in our case it is the reduceer function from up above.
//   const [state, dispatch] = useReducer(reducer, {
//     count: initialCount,
//     valueToAdd: 0,
//   });

//   const increment = () => {
//     // setCount(count + 1);
//     dispatch({
//       type: INCREMENT_COUNT,
//     });
//   };

//   const decrement = () => {
//     // setCount(count - 1);
//     dispatch({
//       type: DECREMENT_COUNT,
//     });
//   };

//   const handleChange = (e) => {
//     //gives us a number and if nothing exists instead of NaN which is a falsy value you get back 0
//     const value = parseInt(e.target.value) || 0;
//     // setValueToAdd(value);
//     dispatch({
//       type: SET_VALUE_TO_ADD,
//       payload: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // setCount(count + valueToAdd);
//     // setValueToAdd(0);
//     dispatch({
//       type: ADD_VALUE_TO_COUNT,
//     });
//   };

//   return (
//     <Panel className="m-3">
//       <h1 className="text-lg">count is {state.count}</h1>
//       <div className="flex flex-row">
//         <Button onClick={increment}>Increment</Button>
//         <Button onClick={decrement}>Decrement</Button>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <label>Add a lot!</label>
//         <input
//           value={state.valueToAdd || ''}
//           onChange={handleChange}
//           type="number"
//           className="p-1 m-3 bg-gray-50 border border-gray-300"
//         ></input>
//         <Button>Add it!</Button>
//       </form>
//     </Panel>
//   );
// }

// export default CounterPage;
