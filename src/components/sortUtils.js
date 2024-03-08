/**
 * Sorts an array of objects based on a specified column and direction.
 * @param {Array} data - The array of objects to sort.
 * @param {Object} sortState - An object containing the column to sort by and the direction ('asc' or 'desc').
 * @returns {Array} - The sorted array.
 */
export const sortData = (data, sortState) => {
  if (!sortState) return data;

  return [...data].sort((a, b) => {
    if (a[sortState.column] < b[sortState.column]) return sortState.direction === 'asc' ? -1 : 1;
    if (a[sortState.column] > b[sortState.column]) return sortState.direction === 'asc' ? 1 : -1;
    return 0;
  });
};