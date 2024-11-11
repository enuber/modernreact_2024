import SortableTable from '../components/SortableTable';
// can use Table instead of SortedTable if you want a plain table
import Table from '../components/Table';

function TablePage() {
  const data = [
    { name: 'Orange', color: 'bg-orange-500', score: 5 },
    { name: 'Apple', color: 'bg-red-500', score: 3 },
    { name: 'Banana', color: 'bg-yellow-500', score: 1 },
    { name: 'Lime', color: 'bg-green-500', score: 4 },
  ];

  // the render value is taking in the information and pulling off what is needed to make a specific row so in first case, we pass in data which is now named fruit and pull off what we need which is just the fruit.name. Then for color, we pull off the color and put it into the div to make the small colored square etc. This allows for the Table component to be reuseable because it will be able to just display each row based on info being passed into it. If a table is bigger or smaller, the Table component doesn't care, it just reads the info from the config array where each object represents a column of data.
  const config = [
    {
      label: 'Name',
      render: (fruit) => fruit.name,
      sortValue: (fruit) => fruit.name,
    },
    {
      label: 'Color',
      render: (fruit) => <div className={`p-2 m-3 ${fruit.color}`} />,
    },
    {
      label: 'Score',
      render: (fruit) => fruit.score,
      sortValue: (fruit) => fruit.score,
    },
  ];

  // this will be used as the key for each row in the table
  const keyFn = (fruit) => {
    return fruit.name;
  };

  return (
    <div>
      <SortableTable data={data} config={config} keyFn={keyFn} />
    </div>
  );
}

export default TablePage;
