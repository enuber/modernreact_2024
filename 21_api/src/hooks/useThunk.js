import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //useCallback allows us to create a function and only redefine the function if it changes in some way
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      /*dispatch returns a promise. That promise is typically chained with a .then() and a .catch(). In the case
  of disptach .then is always run as either fulfilled or rejected get returned through it. So we use .unwrap()
  first to get what we would typically expect*/
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
