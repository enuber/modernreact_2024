/* 
TailwindCSS - css library with tons of classNames, each provides one styling rule.

tailwind.css/docs/guides/create-react-app

follow the instructions on this page as this info changes frequently.

ClassNames library -
optional library
JS Library for building up a className string based on different values. Library is called classnames but prop is className

npmjs.com/package/classnames

const primary = true;
const warning = false;

className({'bg-blue-500': primary, 'bg-yellow-500': warning});

for each key-value pair, it looks to see if the value is truthy. If it is it adds it to the string. 

classnames will join what is in classNames('bg-blue-500', 'px-3', 'py-1.5') and output them as a class should appear. 

It will also take a variable and insert it in based on what it is. if the variable is undefined it will just remove it.

let bgColor = undefined;
if (primary) { bgColor = "bg-blue-500"}

npm install classnames

###### icons
react-icons.github.io/react-icons

npm install react-icons

react icons library gives you access to all sorts of other libraries icons without having to go individually to different pages and install each individual library

in the doc it will show you how to import the correct library for your chosen icon and, you just change the iconName with the name of the icon you want to import.

then you treat the import as any other react component.
*/

/* section 11
177. Project organization

Component - reuseable react component that shows a handful of elements.

page - still a react component but not intended to be reused. A page often nests plain components inside of it. 

in our case App would likely be the "page"...all of the other smaller things on the page will be our components

for organization two approaches...

grouping by feature. 
src/
  auth/
    loginpage.js
    loginpage.css
    signupform.js
    signupform.css
  cart/
    cartpage.js
    cartpage.css
    cartiem.js
    cartiem.css  

this may be confusing when first getting started as if you try to add in a page that is used in both folders how do you know where to exactly place it. 

grouping by type

src/
  components
    Button.js
    SearchBar.js
    Dropdown.js
  pages
    loginPage.js
    cartPage.js
    ProductPage.js
    
finally you could mix both as the above could get overwhelming as you add more

src/
  components
    forms
      input.js
      searchbar.js
    products
      productshow.js
      productlist.js
  pages
    loginPage.js
    cartPage.js
    ProductPage.js


*/

import Sidebar from './components/SideBar';
import Route from './components/Route';
import DropdownPage from './pages/DropdownPage';
import AccordionPage from './pages/AccordionPage';
import ButtonPage from './pages/ButtonPage';
import ModalPage from './pages/ModalPage';
import TablePage from './pages/TablePage';

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-span-5">
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/">
          <DropdownPage />
        </Route>
        <Route path="/buttons">
          <ButtonPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
      </div>
    </div>
  );
}

export default App;
