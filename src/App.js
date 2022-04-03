import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function App() {
  const [data, setData] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const fetchData = async (page) => {
    const result = await fetch(
      `http://localhost:8080/api/v1/settings?size=${perPage}&page=${page - 1}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJtZXIiLCJyb2xlIjoiZmFybWVyIiwiZXhwIjoxNjUwMTY1MTM5LCJpYXQiOjE2NDg5NTU1MzksInVzZXJuYW1lIjoiZmFybWVyIn0.4MoT7Oo3WZ78jub9FKf_4Y_Tr435NaYo3Np5p8eSTz8',
        },
      }
    ).then((res) => res.json());
    setData(result);
    setTotalRows(result.totalElements);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    const result = await fetch(
      `http://localhost:8080/api/v1/settings?size=${newPerPage}&page=${
        page - 1
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJtZXIiLCJyb2xlIjoiZmFybWVyIiwiZXhwIjoxNjUwMTY1MTM5LCJpYXQiOjE2NDg5NTU1MzksInVzZXJuYW1lIjoiZmFybWVyIn0.4MoT7Oo3WZ78jub9FKf_4Y_Tr435NaYo3Np5p8eSTz8',
        },
      }
    ).then((res) => res.json());

    setData(result);
    setPerPage(newPerPage);
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handleSort = async (column, direction) => {
    const result = await fetch(
      `http://localhost:8080/api/v1/settings?sort=${column.sortField},${direction}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJtZXIiLCJyb2xlIjoiZmFybWVyIiwiZXhwIjoxNjUwMTY1MTM5LCJpYXQiOjE2NDg5NTU1MzksInVzZXJuYW1lIjoiZmFybWVyIn0.4MoT7Oo3WZ78jub9FKf_4Y_Tr435NaYo3Np5p8eSTz8',
        },
      }
    ).then((res) => res.json());
    setData(result);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => {
          setFilterText(e.target.value);
          filterData(e.target.value);
        }}
        onClear={() => {
          handleClear();
          filterData('');
        }}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filterData = async (query) => {
    const result = await fetch(
      `http://localhost:8080/api/v1/settings?query=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJtZXIiLCJyb2xlIjoiZmFybWVyIiwiZXhwIjoxNjUwMTY1MTM5LCJpYXQiOjE2NDg5NTU1MzksInVzZXJuYW1lIjoiZmFybWVyIn0.4MoT7Oo3WZ78jub9FKf_4Y_Tr435NaYo3Np5p8eSTz8',
        },
      }
    ).then((res) => res.json());
    setData(result);
    setTotalRows(result.totalElements);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <p>Loading</p>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={data.content}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        sortServer
        onSort={handleSort}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
      />
    </div>
  );
}

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <>
      <form>
        <input
          id='search'
          placeholder='filter by any column'
          value={filterText}
          onChange={onFilter}></input>
        <button type='button' onClick={onClear}>
          X
        </button>
      </form>
    </>
  );
};

const columns = [
  {
    name: 'id',
    selector: (row) => row.id,
    width: '100px',
  },
  {
    name: 'key',
    selector: (row) => row.key,
    sortable: true,
    sortField: 'key',
  },
  {
    name: 'value',
    selector: (row) => row.value,
    sortable: true,
    sortField: 'value',
    width: '200px',
  },
  {
    name: 'description',
    selector: (row) => row.description,
    sortable: true,
    sortField: 'description',
    wrap: true,
  },
];

export default App;
