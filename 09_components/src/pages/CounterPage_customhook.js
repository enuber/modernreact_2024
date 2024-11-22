/* 
284 Custom hook creation

Below we have the following basic set up

count - state
useEffect
handleClick
JSX

the first three in the list are chucks of code that...
creates number state based on an initial value
logs that value any time it changes
provides a way to change that value

Seems pretty useful so maybe we should create a hook.   

This will get you pretty far...
Find code in a component related to a single piece of state
Copy paste it all into a helper function
fix all the broken references
you now have a hook

Brute Force hook creation
1) make a function called 'useSomething'
2) find all the nonJSX expressions that refer to 1-2 related pieces of state
3) cut them all out and paste them into useSomething
4) find 'not defined' errors in your component
5) in your hook, return an object that contains the variables the conponent needs.
6) In the component, call your hook. Destrucuture the properies the component needs
7) find 'not defined' errors in the hook. pass the missing variables in as arguments to the hook
8) rename the hook to somehting more meaningful
9) Rename returnted properties to something more descriptive

*/

import { useState, useEffect } from 'react';
import Button from '../components/Button';

//this is custom hook. Should be extracted but keeping this altogether to see as an example.
function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log(count);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return {
    count: count,
    increment: increment,
  };
}

function CounterPage({ initialCount }) {
  const { count, increment } = useCounter(initialCount);

  return (
    <div>
      <h1>count is {count}</h1>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
}

export default CounterPage;
