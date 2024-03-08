import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { sortData } from './sortUtils';
import ContextMenuComponent from './ContextMenuComponent';

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const openContextMenu = (event, data) => {
    event.preventDefault(); // Prevent the browser's context menu from opening
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            data,
          }
        : null,
    );
  };
  const closeContextMenu = () => setContextMenu(null);
  return { contextMenu, openContextMenu, closeContextMenu };
};

const usePagination = (dataLength, initialPage = 0, itemsPerPage = 10) => {
  const [page, setPage] = useState(initialPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * itemsPerPage - dataLength) : 0;

  return { page, handleChangePage, itemsPerPage, emptyRows };
};

const handleSortLogic = (currentSortState, column) => {
    const isAsc = currentSortState && currentSortState.column === column && currentSortState.direction === 'asc';
    return { column, direction: isAsc ? 'desc' : 'asc' };
};

const TableComponent = ({ columns, data, config }) => {
  const [sortState, setSortState] = useState(config.initialSort || null);
  const [selectedRow, setSelectedRow] = useState(null); // State for tracking selected row
  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu(); // Hook for context menu logic
  const { page, handleChangePage, itemsPerPage, emptyRows } = usePagination(data.length, 0, config.pagination?.itemsPerPage || 10);

  const handleSort = (column) => {
    setSortState(handleSortLogic(sortState, column));
  };

  const handleRowSelect = rowIndex => {
    setSelectedRow(rowIndex);
  };

  const sortedData = useMemo(() => sortData(data, sortState), [data, sortState]);

  return (
    <Paper>
      {selectedRow !== null && <div style={{ padding: '10px', backgroundColor: '#eee' }}>Actions for selected row</div>}
      {config.title && <Typography variant="h4" style={{ padding: '16px' }}>{config.title}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleSort(column)}
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {column}
                  {sortState && sortState.column === column ? (sortState.direction === 'asc' ? ' 🔼' : ' 🔽') : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody onContextMenu={(event) => openContextMenu(event, -1)} style={{ cursor: 'context-menu' }}>
            {sortedData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((row, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowSelect(index)}
                onContextMenu={(event) => openContextMenu(event, { row, rowIndex: index })}
                style={{ backgroundColor: selectedRow === index ? '#f5f5f5' : 'transparent' }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[itemsPerPage]}
        component="div"
        count={data.length}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      <ContextMenuComponent contextMenu={contextMenu} onClose={closeContextMenu} />
    </Paper>
  );
};

export default TableComponent;