/* 
343. Addressing selector unknown returned a different result warning

The memoizedCars selector is a memoized derived state function created using Redux Toolkit's createSelector. It efficiently computes the filtered list of cars based on the current Redux state and minimizes unnecessary recomputations.

Purpose of memoizedCars
Filter Cars by Search Term: It filters the cars in the Redux state (state.cars.data) based on a search term (state.cars.searchTerm).
Return a Derived State: It creates a new state (filtered cars) without modifying the original state.
Optimize Performance: By using memoization, the computation runs only when the data or searchTerm values change, preventing redundant calculations and improving performance.

How createSelector Works
createSelector takes:

Input Selectors: Functions that extract specific parts of the Redux state.
Output Selector: A function that computes derived state using the results of the input selectors.

Memoization:
What It Does: createSelector memoizes the result of the filter function.
How It Works: If data or searchTerm hasn't changed since the last call, the selector returns the previously computed result instead of recalculating it. This avoids unnecessary computations.


Why Use Memoization?
Without memoization:

Every time the component re-renders, the filter function would run, even if the data and search term haven't changed.
This could lead to performance issues, especially with large datasets.
With createSelector:

The filter function is called only when necessary (i.e., when the relevant parts of the Redux state change).
This reduces computational overhead and ensures the component renders efficiently.


*/

import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { removeCar } from '../store';

const memoizedCars = createSelector(
  [(state) => state.cars.data, (state) => state.cars.searchTerm],
  (data, searchTerm, name) => ({
    cars: data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })
);

function CarList() {
  const dispatch = useDispatch();
  const { cars } = useSelector(memoizedCars);
  const name = useSelector((state) => state.form.name);
  /*
  this area now throws errors but leaving it in
  state.cars.cars comes from the fact that in our store, we called our keys form and cars. Inside of that the carsReducer grabs the slice so carsSlice which has initial state that contains searchTerm and cars 
  */
  // const { cars, name } = useSelector(({ form, cars: { data, searchTerm } }) => {
  //   const filteredCars = data.filter((car) =>
  //     car.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   return {
  //     cars: filteredCars,
  //     name: form.name,
  //   };
  // });

  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());
    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button
          className="button is-danger"
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
