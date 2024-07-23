import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// eslint-disable-next-line react/prop-types
const Table = ({ data, columns }) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { globaFilter },
    setGlobalFilter,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <>
      <div
        style={{
          padding: "0.3rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ padding: "1rem" }}>
          Search:{" "}
          <input
            style={{ padding: "0.5rem", border: "2px solid black" }}
            value={globaFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </span>
      </div>

      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((col) => (
                  <th
                    {...col.getHeaderProps(col.getSortByToggleProps())}
                    key={col.id}
                  >
                    {col.render("Header")}
                    {col.isSorted && (
                      <span>{col.isSortedDesc ? "V" : "A"}</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={`${rowIndex}-${cellIndex}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="btn-container">
        <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
          First
        </button>
        <button disabled={!canPreviousPage} onClick={previousPage}>
          Prev
        </button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} onClick={nextPage}>
          Next
        </button>
        <button
          disabled={pageIndex >= pageCount - 1}
          onClick={() => gotoPage(pageCount - 1)}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default Table;
