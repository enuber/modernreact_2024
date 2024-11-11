/* SECTION 13
229. Programmatic navigation

This is what happens when you are automatically navigating the user from code. For example a banking screen that says you will be signed out after 20 seconds.

So we want to be able to navigate the user around using a function at some points from our code specifically. This function will do two things in particular...first it will call push state to update the path inside the address bar. It's then going to update the current path piece of state. 

Why it needs to update the currentPath piece of state...because when we call pushState it does not cause currentPath to be updated and it does not trigger the popstate event. Right now the popState event is the only way in which currentPath ever gets updated. So when we do programmatic navigation, we need to make sure that we update the address bar but we also update currentPath which will cause our component to rerender along with the rest of the application. 

*/

import { createContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  //remember [] on useEffect means this happens once. We are simply listening to the popstate event so that we know where someone is located and updating that info. See notes for section 13 under video 226, this is using the forward and back buttons in the browser
  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handler);
    // cleanup
    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  //we are sharing currrentPath and navigate with the rest of our program by passing them into value
  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationProvider };
export default NavigationContext;
