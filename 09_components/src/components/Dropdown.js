/* 
###############SECTION 12 

197. designing props

for the dropdown, to make it more reuseable we should be passing down a list of the options that should appear in the dropdown menu. For this, the thing that makes the most sense is an array. The array will be a list of objects that has a label and value property.

[
  {label: 'I want mild', value: 'mild'},
  {label: 'I'd like spicy', value: 'spicy'}
]
In this case we are using the value to check to see what the user has selected

if (select.value === 'spicy') { makeFoodSpicy()}

*/
/* 
199. More state design...based on previous chart

1) how would a user describe using the app step by step?
Click the dropdown > List of options appears > clicks an option > List of options disappears && item clicked appears in main select box.

2) State or Event Handler
click dropdown - event handler
list of options appears - state
clicks an option - event handler
list of options disappears - state
clicked item appears in main box - state

3) Group common steps, remove dupes and rewrite desc -
the two that are most similar would be options appearing and disappearing. Everything else is separate.
click the dropdown
click an option
menu opens and closes
item can be selected

4) look at mockup, remove or simplify parts that aren't changing
first step - would just be a select menu name and the select box, nothing else on page matters like the header or arrow 
second step - the open dropdown box would show but doesn't matter what's inside that box 
third step - the select menu name changes to item clicked on and only select box would be left

5) replace remaining elements with text desc. - 
first step - menu closed, no options selected
second step - menu open, no option selected
third step - menu closed, 'an option selected'

6) skipping - repeat steps 4 & 5 with different variation

7) imagine having to write out the function that returns text of step 5 and 6, in addtion to props what other arguments would you need? 

first piece of state - menu opens and closes
const myFunction = (options, ???) => {
  
}

myFunction(options, ???) //menu cloed
myFunction(options, ???) //menu open

second piece of state - an item can be selected
const myFunction = (options, ???)=> {

}
myFunction(options, ???) //no otion selected
myFunction(options, ???) //option selected
_____________________________
first piece of state - menu opens and closes
const myFunction = (options, isOpen => {
  if (isOpen) {
    return 'Menu Open'
  }
  return 'Menu Closed'
}

myFunction(options, false) //menu cloed
myFunction(options, true //menu open

This means that very easily we can see we can have a piece of state called isOpen that is a boolean and we now know what our first piece of state should be.


second piece of state - an item can be selected
const myFunction = (options, selected)=> {
  if (!selected) {
    return 'no option selected
  }
  return selected.label
}
myFunction(options, null //no option selected
myFunction(options, options[1]) //option selected

this means that we can see our piece of state could be called selected or selectedOption and should either be an options object or null. 

for the event handlers
click an option - handleSelect
click the dropdown - handleClick or handleToggleOpen

8) where should state exist
parent ----> dropdown

other component needs to know state? define in parent else define in child
put event handlers with the state they control

selected and handleSelect - in this case it is possible some other component may need to know about what has been selected. Imagine a shopping cart with a dropdown of quantities. Another component that deals with showing the totals would need to know what item in the dropdown was selected to determine the total. So state is in a parent component

isOpen and handlToggleOpen - in this case no other component would care if the dropdown is open or not. This should be defined within the component.

*/
/* 
204. existence check helper

'?' - the question mark after a variable name looks to see if it is defined, if it is null or undefined, it just passes back undefined instead of throwing an error

let colors = null

colors?.length will be undefined because we are saying is colors defined...no well then it's undefined and no length is sent back

colors = ['red', 'blue']

colors?.length will send back 2 because colors is defined and is an array with a length of 2

combine this with 'or' statment...

colors?.length || 100 - prints out first truthy value so if colors?.length is undefined we get back 100, if colors?.length is a number since it's a length and defined we get it back. 

*/
/*
205. Community Convention with prop names

props - currently we are using onSelect and selection. 

the drop down menu is a form control component. Form control is any kind of component where a user is entering in a kind of value. Like a text area, input dropdown, radio buttons, checkbox..etc.

The pattern that is convention is to call the prop being passed down that tells the component what its current value is is under a name of value. So instead of using selection, we would use value. When we pass down the callback, we call it onChange. 

Our choice of selection and onSelect were just fine but, when you start making lots of stuff in a program it gets hard to rememeber what things were called. So for consistency value and onChange are more typical to use.

*/
/* 
210. Challenging Extra Feature

When you have multiple dropdowns on screen you will see that opening one drop down then another does not close the first. So need to handle how that closes. 

First:
How could we do this with vanilla JS - document wide click handlers, event capturing/bubbling, checking element inclusion

then
how do we implement this with React
React's useEffect hook and useRef hook


211. Document wide click handlers -

const handleClick = (evt) => {
  console.log(evt.target);
}
document.addEventListener('click', handleClick);

this watches for a click on any element. 

212. Event capture/bubbling

Capture phase -> target phase -> bubble phase

when an event occurs, browser wants to find event handlers to call, order in which this occurs happens in the three phases above. 

ex:
<body>
  <div>
    <button>Click Me</button>
  </div>
</body>

user clicks button. Browser needs to find click event handlers.
Capture Phase - go to most parent of clicked element see if it has a handler, got to second most parent element and see if it has a handler...and so on. If they have an event handler it would be called. Once it sees the element that was clicked it stops and phase one ends. So this would start wtih body then go to div then to button.

Target phase - go to the clicked element, check to see if it has an event handler. If it does than it calls it. 

Bubble phase - go to parent of clicked elment, see if it has a handler, go to parent's parent check for event handler and so on...calls handler if it exists. 

Typically we do not do anything on capture phase. It is so common that 

this line of code is for bubble phase only
document.addEventListener('click', handleClick); 

the third argument says what happens during capture phase. 
document.addEventListener('click', handleClick, false);
document.addEventListener('click', handleClick, true);

213. putting it all together

get reference to dropdown element
const dropdown = document.querySelector('.dropdown');

const handleClick = evt => {
  //check to see if clicked element is inside dropdown
  if (dropdown.contains(evt.target)){
    console.log('Inside dropdown');
  } else {
    //user clicked outside dropdown so can close the dropdown
    console.log('outside dropdown');
  }
}
//setting up during capture phase.
document.addEventlistner('click', handlClick, true);

214 why a capture phase handler?

if you don't do this doing the capture phase and you click on an item inside the dropdown itself you will see that it will trigger the else Outside Dropdown console.log. With React remember that though it's fast there is a slight delay to things so though the correct item is selected the event during the bubble phase gets very slightly delayed enough so that the click registers as being outside of the dropdown as the item is selected, the dropdown closes and then the bubble phase begins so the click looks like it's outside. 

By doing this during the capture phase instead, the click handler happens first before the target so it sees it as being inside the dropdown. 

can use window.timeOne = performance.now() to get exact time of something. This could be used to debug. So you can use performance.now() to log specific times to see when things are happening. 
*/
/* 
216. useEffect clean up

when the component first gets rendered useEffect gets called once when we use an empty array [] as second argument. In that we can return a function which in this case is a clean up function that will be run when the component is removed from the screen. This happens specifically for this case of the empty array where useEffect only gets run one time where the clean up gets called when the component is removed.

You can still return a function to do something if there was value inside the array meaning each time that value changes uesEffect will get called. So if we have a clean up function inside this type of useEffect function, we will be calling cleanup several times as well. Cleanup is returned initally and then gets resolved before useEffect runs a second render and then cleanup gets returned again. So cleanup always runs when a component rerenders and the variable in the array changes. order .... previois cleanup is called, useEffect, cleanup returned.

*/
/* 
217. issues with element references. 

Our JS that targeted the dropdown used querySelector which grabs the first element and assumes it's the dropdown. With React and reuseable components, the dropdown could be used many times so this method won't work. So each dropdown needs to have a reference to the HTML that created it. So that we know if the click happened in that specific dropdown. 
*/
/* 
218. useRef in action

useRef -
allows a component to get a reference to a DOM element that it creates

95% of the time used with DOM elements, but can hold a reference to any value

useRef implemenation
1) create a ref at the top of your component by calling useRef
2) assign the ref to a JSX element as a prop called ref
3) access that DOM element with ref.current

The one confusing thing about the ref of that variable is not just a plain direct reference to the div element on screen, instead we get an object with a current property and that current property will have the a value that is going to be the reference to our div. 
*/
import { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(); //short for Div Element and we will take this and associate it with the root element of our component.

  useEffect(() => {
    const handler = (evt) => {
      // this is just a check to make sure that the element exists and if it doesn't it returns.
      if (!divEl.current) {
        return;
      }
      // console.log(divEl.current);
      // we are watching for clicks outside the dropdown. So when that happens we close the dropdown.
      if (!divEl.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);

    // cleanup
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    // setIsOpen(!isOpen); //this is totally fine to use as this is sufficient in the vast majority of cases.
    //Because we are updating our state and its new value is dependent on it's old value we would want to look at doing this as a functional update. So we'd pass in a function that would receive the current value of open and then we would return the opposite of that. This isn't really necessary as someone would have to click incredibly quickly multiple times in a row.
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    //because we want to know what option was clicked rather than just call the eventHandler, we will invoke a function and pass in the option itself. Similar to and explained in accordion.js
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  //we are replacing this with inline content below as explained in video 204 (notes above)
  // let content = 'Select...';
  // if (selection) {
  //   content = selection.label;
  // }

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || 'Select...'}
        <GoChevronDown className="text-lg" />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
