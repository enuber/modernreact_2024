/*
 157. Some Button Theory
project should maintain similar look throughout and buttons play a part of this where you want consistentcy of styling.

Problem: All of the engineers are creating separate buttons
Solution: 
use the 'Button' Component
Don't make <button/> elements
all buttons will be styled based on the purpose/intent of the button
No custom CSS, only presets

for purpose of buttons needed...
Plain/Neutral - Simple button that isn't as good as prmiary/secondary but still useful (like wishlist)
Primary - draws users attention to a good action (like buy now)
Secondary - draws users attenton to a kind of good action (like add to cart)
Success - tells the user something good happened
Warning - warns the user about something
Danger - Tell teh user they are about to do something dangerous

bad - make a component for each type of button

good - make one button component that takes in props like outline, rounded, color
*/
/*
158. Underlying Elements

Terminology

wrapper - whenever we have a component that's really just trying to create the exact same plain HTML equivalent element, we might refer to the component as the wrappr.

underlying element - the actual jsx element or the actual HTML element that is being created by the button component.
*/
/* 
159. Children Prop
<Button>"click!"</Button> ----->Props (children) ----> 
function Button({children}) {
  return <button>{children}</button>
}

JSX has a special rule to it. If you ever create a custom component as we are doing with <Button></Button> and then place anything inside of that pair of tags. So anything between the two Button elements or tags, it is going to be automatically provided as a prop with a very special name down to your child custom component and that is "children". So children is going to be added into our props object automatically and it's going to have a value of whatever we place between those tags.

Whatever is placed between those tags could be anything including other components but will still get passed through as "children". Most common use of this is just to display whatever is being passed in 
*/
/* 
160. props design - 
for our buttons we need to come up with some props that will tell us what we need to know

rounded - boolean if true then round the corners, if false than sharp corners
outline - boolean if true then just have an outline, if false then fill it in with color
purpose/variation - this prop takes in the purpose of the button to set the color based on chart above of primary, secondary, plain, success, warning, danger
else...
pass each of these as their own prop and set as true/false

good part to using booleans is that when passing props if something is "true" you can just pass in the name of the prop. So rounded={true} we could just right rounded

remember...
<Button primary={true}>Text Here</Button> is equivalent to this
<Button primary>Text Here</Button>

<Button primary={false}>Text Here</Button> is equivalent to this
<Button>Text Here</Button> where primary is now undefined which we can treat as false

*/
/* 
161. Validating Props with PropTypes
npm install prop-types

prop-types
Optional library ----
JS library to validate the props that get passed into your component
If someone passes down the incorrect kind of value like a number instead of a boolean, a warning will appear in the console
used to be very popular now typescript does almost the same thing and more...

npmjs.com/package/prop-types

ex: 
import PropTypes from 'prop-types';
function Card({title, content, showImage}) {...}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  showImage: PropTypes.bool
}

for above example...
title must be passed in and it makes sure it is a string
content - is optional and if it is passed in it must be a string
showImage - is optional and if passed in must be true or false.

ex:
customProp: function(props, propName, componentName) {
  if (!/matchme/.test(props[propName])) {
    return new Error('text for error');
  }
}

the first arguments is the the entire props. This is a custom props feature that will let us make checks and we can write something out that will validate our props to make sure only one color is passed in. if two or more colors are marked true we can throw an error so that it gives a warning in the console.
*/

/* 
173. issues with the event handler & 174. Passing Props Through

this button component is wrapping the actual button so the clickhandler isn't actually getting fired. an Onclick event is getting passed through via props but not actually getting called because it doesn't make it to the button itself. 

solution - take the onClick prop and pass it through to the plain button. 

However this isn't a good solution to the problem as that though this will work click is not the only handler, so we need a solution that will allow us to passthrough all types of event handlers to the button like mouseover, mouseout...without having to pass them on one by one or as they arise. 

better solution...
when we receive our props, we will list out one by one all the different props our component cares about. We will then use the ...rest to gather all of the other props that would probably be used for the button itself and pass them through that way. ...rest will do exactly that as it gathers everything not named when we deconstruct and puts them into that ...rest property. This gets passed through to the button with just {...rest} this spreads out anything passed through for the button. 
*/
/*
175. handling the special case of passing in a prop of className 

in our button component we are using className for the classname library so if we try to pass a class through in props to the button in the ...rest we will have a problem as the components className will override anything coming through in props.

To fix this issue, we can grab the rest object and access className as we would any other object and pass it that way. 

*/

import className from 'classnames';

//removed because not actually using the PropTypes
// import PropTypes from 'prop-types';

function Button({
  children,
  rounded,
  outline,
  primary,
  secondary,
  success,
  warning,
  danger,
  ...rest
}) {
  const classes = className(
    rest.className,
    'flex items-center px-3 py-1.5 border',
    {
      'border-blue-500 bg-blue-500': primary,
      'border-gray-900 bg-gray-900': secondary,
      'border-green-500 bg-green-500': success,
      'border-yellow-400 bg-yellow-400': warning,
      'border-red-500 bg-red-500': danger,
      'rounded-full': rounded,
      'text-white':
        !outline && (primary || secondary || success || warning || danger),
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

//name of this custom prop check can be anything you want but should try to describe it's purpose.

//Number(true) = 1, Number(false) = 0, !!undefined = false, Number(!!undefined) = 0, !!true = true, !!false=false
Button.propTypes = {
  CheckVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);
    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true.'
      );
    }
  },
};

export default Button;
