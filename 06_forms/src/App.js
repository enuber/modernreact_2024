/*
IN FUTURE TO RUN THIS PROJECT
npm run start -> starts the React dev server
npm run server -> starts JSON-Server

NOTE: JSON - SERVER install should do 
npm i json-server@0 
V1 is broken.
*/

/*
87: State Location:
State Updated? - rerender the component it is defined in + all the components children

Find all the components that need to use this state

Define the state in the lowest common parent
*/
/* 
92: Updating State: (based on doing books.push(info) which is BAD and then how to fix)
  const [books, setBooks] = useState([]);
JS sees you want to create an array so it finds an empty spot in memory and puts an array there

React remembers this array for future use and the space in memory with that array as a reference to the current state. 

then when you do books.push({}) it modifies this array and puts the info into this space. 

Then when you call setBooks and pass in the books array react sees that the reference to the array and then behind the scenes makes a check. setBooks means to rerender a component but, react looks for the reference to the current state and sees that what you are trying to set is already there so nothing happens. No component rerenders. 

to fix this, we will create a new array copy all the elements from the old array
then add the new element to the end

ex
const updatebooks = [...books, {id:123 title:title}]
setBooks(updatedBooks)

so now in this fix, there is a new array which is held separately in memory. So when you call setBooks() react goes and looks at the reference to the state and sees that something has changed and therefore will rerender the components as expected. 

*/
/*
93: Don't mutate that state

Modifying not mutating
const [colors, setColors] = useState([]);

Add element to start or end:
start:
const updatedColors = [newColor, ...colors]
end:
const updatedColors = [...colors, newColor]

97: Inserting elements: - based on passing in an index number to the function.
remember slice returns back a collection of elements from an array. 
colors.slice(0, 1) - means we will start at index 0 and go up to but not include the second number which here is index 1. In this case we would just get the element at index 0.
colors.slice(1) - means we start at this index and give everything including the element at this index through the end of the array.

Note could use this same method to insert before or after an array as well but above steps are easier and more understandable.

const updatedColors = [
  ...colors.slice(0, index),
  newColor,
  ...colors.slice(index)
]

99: Removing Elements: using filter which always returns a new array
filter - if filter function returns true the value is added to the new array, if it is false it is not added. 

const updatedColors = colors.filter(color=>{
  return color != colorToRemove
})

const updatedColors = colors.filter((color, index) =>{
  return indexToRemove !== index;
})

const removeBookById = (id) => {
  const updatedBooks = book.filter(book=> {
    return book.id !== id
  })
}

101: Modifying Elements

const updatedBookById = (id, newTitle) => {
  const updatedBooks = books.map(book=> {
    if (book.id === id) {
      return {...book, title: newTitle}
    }
    return book;
  })
  setBooks(updatedBooks)
}

104: adding, changing or removing object properties

adding/changing - create a new object, copy/paste all properties from existing (use ...), add to your updated property and or change a property.

const updatedFruit = {
  ...fruit, 
  color: color
}

removing properties - list the property to remove, get the other properties from the object.
this is using destructring where fruit is an object and we take off the property color as one part and the ...rest is everything else in the object. Note that 'rest' can be anything but should suggest it is the rest of the properties.
const removeColor = () => {
  const {color ...rest} = fruit;
}
setFruit(rest);

*/
/* 
116: Adding Images:
gives random photos which can be used in development. 
https://picsum.photos
*/
/*************** SECTION 7 DATA PERSISTENCE WITH API REQUESTS ********************/
/* 
117: Adding data persistence

React App - request for books - goes to JSON SERVER an open source project for dev and learning - access a database with a plain file - JSON SEVER then sends back a response with a list of books. 

Behind the scenes -
our app component will still have a books piece of state. Along with all the components that edit, delete and create. Now the true list of books will sit on the API server. that list of books will look exactly like the state with an array of objects having an ID and title. 

in the components like when you delete a book, it will send the info to the server to delete the book and get back a response that says the book was deleted. then once it gets that response back, it will then contact the app component and update the piece of state there as well. 
*/
/* 
119: Server setup
JSON server setup
Install JSON-Server with NPM 
create a 'db.json' file where our data will be stored
create a command to run JSON-server
run the command

open two terminal windows
first terminal will run our react project

//HERE WE ARE DOING THE ABOVE STEPS WITH MORE DETAIL
second terminal - (make sure you are in the project in second terminal before installing)
npm install json-server

//newer version came out that is broken so need to install original version.
npm install json-server@0

create a db.json file in root directory (in our case we also put basic  setup)
{
  "books": []
}

create a command to run JSON-server in package.json add the following to scripts
by doing this, we are setting the port to watch to 3001. React server will be looking at port 3000. If you ran two copies of this json-server with this set up they would both be pointing at same port 3001 so you would get an error. If you get an error with using this, you can change this port number from 3001 to 3005 or whatever you want. When we want to access info or make a request of any kind to this we will now be sending the request to localhost:3001

in this -p changes the port the server is listening too. --watch <filename> tells the server to store data in the db.json file.
"server": "json-server -p 3001 --watch db.json --host 127.0.0.1",

run the server now in the second terminal
npm run server
*/
/* 
121: How the API works

db.json file
{
  "books": []
}

the [] - book objects will eventually show up here and be stored here

"books" - tells json-server that we want to store a list of 'books'

because we added 'books' json-server will change its behaviour as it understands what we want to store.

because of this we have access to specific routes for example if we want to make a POST request we can send it to POST http://localhost:3001/books this will have a book object with a title and be sent through the JSON server. NOTE: the /books should match what is in the db.sjon file, so if it was photos you would change this route to /photos. With the /books, JSON server knows that it needs to add the object to the "books" object that exists in the db.json file. JSON server will assign an ID to the object so now we have both a title and an Id. It will be a unique Id. JSON server will then send back a response of the entire object including the newly created Id. The response was just to tell us that the data was received and it was given an Id.

POST http://localhost:3001/books - create a book

GET http://localhost:3001/books - will retrieve the entire array of books and send them back as the response 

PUT http://localhost:3001/books/idhere - will allow us to edit a specific book by sending in an object with any data we want to update/edit. 

DELETE http://localhost:3001/books/idhere - to delete a book and the response back will be what was deleted as JSON server is letting you know that it was found and has been deleted. 

other things we can do would be get an individual book, or update just very particular properties. But the above are most common. CRUD - create, read, update, delete
*/
/* 
122: Introducing the REST client

Standalone API Client
Program used to make request to an API server, specifically for development/testing

There are many free API clients - VS Code has one built in.

search extensions for Rest client

create a file calle api.http
api.http file - 
send request
GET http://localhost:3001/books HTTP/1.1 
Content-Type: application/json

response 
[{ 'id': 1, 'title': 'Harry Potter'}]

reason we do this, inside of our code editor is simply because we can create a file that lists out all these different requests we might want to make. and that means inside our project we can have this one file that documents for ourselves and other engineers how they can work with our API.

### - used as seperator in this file 

# - can comment after.

Remember this isn't a necessary step. Just a way to work with things and let other engineers know how to work with our files.
*/
/* 
127 Introducing useEffect

useEffect is a function we import from React
used to run code when a component is initially rendered and (sometimes) when it is rerendered

The first argument of useEffect is a function that contains code we want to run

The second argument is an array or nothing - this controls whether the function is executed on rerenders.

useEffect(()=> {
  console.log('hi')
},[])

128 useEffect in Action

the useEffect function gets called at very specific points of time. It will always be called the first time that we render...the initial render. 

On rerender, the useEffect will only run again based on second argument. 

[] - called after first render and never called again 
[something here] - called after first render and, called after rerenders if the element(s) in the array changed 
nothing - called after first render and called after every rerender


*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  //[{id: 123, title: 'harry potter'}]
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    //...response.data just spreads out the response from the above data where we receive back all the info about the book and adds them into the object individually. Will still update all the info properly versus {...book, title:newTitle} which specifically is updating just the title which is fine but, by using ...response.data we are future proofing as well in case additional data would be added in. response.data will have the ID and Title in our case
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    //remember title: title can be reduced to just title and is a just a shortcut
    const response = await axios.post('http://localhost:3001/books', { title });
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
