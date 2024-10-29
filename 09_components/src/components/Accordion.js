/*
183. State design process overview

when should I use state - when we need to change content on the screen

what should it be called -

what type of data will my state be -

which compononent should it be defined in -

Event + State design proces

what state + even handlers are there?
1) list out what a user will do and changes they will see while using your app
2) Categorize each step as state or event handler
3) group common steps. remove dupes. rewrite descriptions

what name and type?
4) look at mockup. remove or simplify parts that aren't changing
5) replace remaining elements with text descriptions
6) repeat 4 and 5 with a different variation
7) imagine you have to write a function that returns the text of steps 5 and 6. In addition to your component props what other arguments would you need?

Where is it defined?
Decide where each event handler + state will be defined


####### above in action

part 1) clicked on a section, previous section that was open collapes, and new section clicked on expands. This repeats based on section clicked. 

part 2) user sees something on the screen change - we probably need to use state. 
user committed some action - we probably need an event handler to implement this.

based on this...our clicks above in part 1 are event handler. when a section collapses and expands these are state related. 

Part 3) we group items that are similar which would be in our case any click is one event and grouped together and the showing/hiding pieces of state would be grouped together as well. Then we remove dupes which leaves us with just two things. finally we rewrite descriptions

clicked on a section header - event handler
one section expanded, all others collapsed - state

for second part, as we determine what type of state, number, boolean, string, array, object...
we ideally want to avoid arrays/objects as they are more difficult to handle

part 4) we look at our markup and remove the headers, and text showing as those don't really matter. We remove what isn't changing... Headers and text don't change so doesn't matter what is there.

part 5) in replacing elements with text descriptions, we may have..

expanded <--- word alone just describes how the header and text of one block is
collapsed <--- word alone to describes the next part of the accordion
collapsed <--- word alone to describes the next part of the accordion 

so we went from a mock up to just a summary of what the diagram represents. To figure this out, try to describe to another person what your screen looks like. 

part 6) we repeat this for another version of the same mockup...end up with

collapsed
collapsed
expanded

part 7) imagine we have to define the function

const result = myFunction(items, ????);

case 1:
console.log(result); //[expanded, collapsed, collapsed]

and another version 

case 2:
console.log(result) //[collapsed, collapsed, expanded]

where the ???? what type would this argument have to be to give us the results in multiple ways. 

in this case if we passed in as the second argument what item would need to be expanded as a number starting with 0 to match an array that could be returned so in the first case we would have 0 and in the case 2 we would have 2.

so basically we figured out that ???? should be an integer. this could be called expandedIndex as it signifies what index will be expanded. 

step 8) where to define...
better question than where should the state be defined in the parent or child would be...
Does any component besides Accordion reasonably need to know which item is expaanded

if yes then define the state in App
if no then define the state in Accordion

in our case state should be in Accordion as no other component needs to know about our piece of state.

in the case of the event handler, it should usually be defined in the same component as the piece of state it modifies. 

it might be used in a different component. like if we had state and handler in the App file instead, the event handler would have to be passed through props in order for it to actually change the state. 
*/
/* 
185. Conditional Rendering

react doesn't print booleans, null or undefined.

JS Boolean expressions

|| gives back first value that is truthy

&& gives back first falsey value or the last truthy value
*/
/* 
Variation on event handlers

1) we can do it inline and is typical when we have just one line of code. 

2) we can remove the inline code make a function within the map as usual and do a handleClick function as we have seen, this will still understand the index as it's within the map so index is defined.

....we don't usually do the above because this becomes messy so we do option 3

3) we put the function outside of the map, however in this case it doesn't know what the index number is as it's not inside the map and is not in the same scope. So you have to get the correct index to that function...

const handleCick = (index) => {
  setExpandedIndex(index)
}

difference is now how you call it within the map itself insead of

onClick={handleClick(index)}

we do

onClick={()=>handleClick(index)}

we are creating a function itself within the map that calls the handleClick outside of the map. We only use this technique when we define an event handler outside of a map function and we want to pass it some specific info that is only available within map. In our case this is the current index for each item. If we called just {handleClick} we would then be receiving the event object inside of the function as the first argument. 

*/
/* 
193. Delayed State Updates
in the console if we get a reference to the div of the header and use it in the console to simulate two clicks immediately we end up with a closed div instead of it closing then opening.

What we want to happen but isn't...
expandedIndex === 0
user clicks first header (index 0)
event handler executed
because expandedIndex === index, we call setExpandedIndex(-1)
Component rerenders, first section is collapsed (expandedIndex === -1)
user clicks first header again (index 0)
event handler executed
because expandedIndex !== index, we call setExpandedIndex(0)
component rerenders, first section is expanded (expandedIndex === 0)

What actually is happening...
expandedIndex === 0
user clicks first header (index 0)
event handler executed
because expandedIndex === index, we call setExpandedIndex(-1)
React: Oh you want to update state, I'll get to it in the future
user clicks first header again (index 0)
event handler executed
expandedIndex hasn't been updated yet!
because expandedIndex === index, we call setExpandedIndex(-1)
component rerenders, first section is expanded (expandedIndex === 0)
TIME PASSES
React - I will finally upate the state (expandedIndex===-1)
final panel is collapsed

To Solve...
react does this slight delay to make sure we aren't trying to update multiple pieces of state, it's referred to as batching. So it is trying to improve performance with this slight delay so it's not rerendering multiple times unnecessarily.

what we want to do is get the most up to date value of expandedIndex in handleClick

To do this we want to create a functional version which we use if new value depends on old. Technically we only an issue if state updates occur really quickly. you can get pretty far only using the simple verison of just calling the setExpandedIndex(numberHere)

example:
const [counter, setCounter] = useState(0);

const handleClick = () => {
  setCounter(currentCounter => {
    if (currentCounter > 10) {
      return 20
    } else {
      return currentCounter + 1
    }
  })
}

setCounter is the setter function
currentCounter is guaranteed to be the most up to date version of counter
return currentCounter+1 counter will be updated to whatever value we return from this function

*/

import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function Accordion({ items }) {
  // we use -1 so that no panel starts open. Can change to 0 so that the first item starts open.
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index) => {
    //most people just use current but we are making sure it's understood what is going on. We are doing this to solve issue of double clicking and react not updating the state fast enough. See notes 193 above
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === index) {
        return -1;
      } else {
        return index;
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;

    const icon = (
      <span className="text-2xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    );

    //this allows us to do conditional rendering as && gives back first falsy value or last truthy value in this case if isExpanded is false it will return that and react will print nothing. If isExpanded is true it will go to the div and print that as it is the last item and is truthy.
    return (
      <div key={item.id}>
        <div
          className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });

  return <div className="border-x border-t rounded">{renderedItems}</div>;
}

export default Accordion;
