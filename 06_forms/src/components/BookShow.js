/* 
110: Toggling form display
because we are changing the view of the bookshow we will need state. If someone clicks on the pencil we will go from displaying the title, to displaying an editable box with a save button.

showEdit can be either true or false to show wether we want to be able to edit or not. and what to thus show on screen.
*/
/* 
113: Closing the form on submit

two things need to happen when the form is submitted
1) Need to tell the App that there is a new title for a particular book
2) Need to tell the bookshow to close the form

ways to solve this...

1) Not a good way even though it makes sense - From BookShow we create a handleSubmit that will change showEdit from true to false which is what makes this area visible or not. So you pass handleSubmit down to BookEdit and on submit you then signal BookShow that the save button was clicked so change showEdit to false. Seems rational. 

Here is why it isn't a good solution - With the above solution, we have two separate functions that deal with when a user submits a form. This means that you are passing in two props that do the same thing, they both get called when a user submits the form. This is not a good practice. 

// A Better Solution
2) A better way to do this - in BookShow we are receiving a prop called onEdit which gets passed down to BookEdit. showEdit also needs to get callled so the idea would be to combine these in a function called handleSubmit. handleEdit will get called with onEdit(id, newTitle) and call setShowEdit(false) we then take this grouped handler to BookEdit as onSubmit. Basically we are wrapping these up into one function. 
*/

import { useState } from 'react';
import BookEdit from './BookEdit';

function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
  };

  let content = <h3>{book.title}</h3>;

  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="book-show">
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
