import React, { useState, useEffect, Suspense } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import './App.css';
const Table = React.lazy(() => import('./components/Table'));

function App() {
  const [users, setUsers] = useState([]);
  const columns = ['Name', 'Email', 'Website'];
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(user => ({
          Name: user.name,
          Email: user.email,
          Website: user.website,
        }));
        setUsers(formattedData);
      });
  }, []);

  const TableStyles = styled.div`
    table {
      border: 1px solid gray;
      color: black;
    }
    thead {
      background-color: gray;
      color: black;
    }
    tr {
      borderBottom: 2px solid silver;
    }
  `;

  const config = {
    sortable: true,
    styles: TableStyles,
    pagination: {
      itemsPerPage: 5
    },
    title:"User Information"
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Table  columns={columns} data={users} config={config} />
      </Suspense>
    </div>
  );
}

export default App;