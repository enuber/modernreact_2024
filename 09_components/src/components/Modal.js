/* 
241 Works because we are lucky -

the absolute positioning with the inset-0 which fills the screen is only working because we are lucky. We have no parent element with a position other than static. if we did, this would not work as expected. It would fill up to the first parent element with a position. 
*/
/* 

242 feature of react called a Portal

Portal changes the way react works
we use it to tell react to take the code and place it not within the HTML structure but some other location after the main HTML.

Why this works...
this div will never have a positioned parent
Modal will be positioned relative to the HTML doc
It will always fill the entire screen.

by using ReactDOM.createPortal - tells react to place HTML produced by this component somewhere else.
first element of createPortal is the JSX we want to show. the second argument is a reference to an element in our index.html file 

*/

import ReactDOM from 'react-dom';
import { useEffect } from 'react';

function Modal({ onClose, children, actionBar }) {
  //this is done so that when there is a lot of content on the screen, when the modal pops up it makes it so that you can't scroll and the return is the clean up that removes the class so that scrolling works again.
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;
