import classNames from 'classnames';
import useNavigation from '../hooks/use-navigation';

function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation();

  // activeClassName allows us to have additional classes if on that particular path. In our case we are using it to bold the text and add a small line before the word.
  const classes = classNames(
    'text-blue-500',
    className,
    currentPath === to && activeClassName
  );

  const handleClick = (evt) => {
    // this allows you to open a link in a new tab when you hold a key down. by just returning we aren't doing anything and letting the browser handle what it naturally does.
    if (evt.metaKey || evt.ctrlKey) {
      return;
    }
    evt.preventDefault();
    navigate(to);
  };
  return (
    <a className={classes} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}

export default Link;
