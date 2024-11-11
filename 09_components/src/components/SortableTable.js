import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import Table from './Table';
import useSort from '../hooks/use-sort';

function SortableTable(props) {
  const { config, data } = props;

  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );

  // we are looking at each column to see if it is sortable or not. If it isn't just return it, if it is, we are adding a header to it where we will show the arrows and the label
  const updatedConfig = config.map((column) => {
    if (!column.sortValue) return column;
    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  //by adding config after the ...props it will override the config that is being passed through the ...props
  return <Table {...props} config={updatedConfig} data={sortedData} />;
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  }
  if (sortOrder === null) {
    return (
      <div>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  } else if (sortOrder === 'asc') {
    return (
      <div>
        <GoArrowUp />
      </div>
    );
  } else if (sortOrder === 'desc') {
    return (
      <div>
        <GoArrowDown />
      </div>
    );
  }
}

export default SortableTable;
