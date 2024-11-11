/* PART OF SECTION 12

208/209. The Panel component

Reuseable Presentation components
1) create a new component that shows a handful of JSX elements
2) Make sure the component accepts + uses the children prop
3) allow extra classNames to be passed in + merge them
4) take extra props, pass them through to root element
*/

//Created simply as practice and because we have reused classnames so helps reduce lists in other .js file.
import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div className={finalClassNames} {...rest}>
      {children}
    </div>
  );
}

export default Panel;
