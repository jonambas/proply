import React from 'react';
import { Box, Text } from '@sparkpost/matchbox';
import raw from '../.propspottercache/data.json';
import { Table, Th, Td, PropTd, LocationTd, Tr } from './TableComponents';
import { useTable, useGlobalFilter } from 'react-table';
import matchSorter from 'match-sorter';

function Input(props) {
  return (
    <Box
      border="400"
      borderRadius="200"
      fontSize="100"
      width="100%"
      mb="100"
      p="200"
      as="input"
      type="text"
      {...props}
    />
  );
}

function GlobalFilter(props) {
  const { preGlobalFilteredRows, setGlobalFilter, globalFilter } = props;
  const count = preGlobalFilteredRows.length;

  return (
    <>
      <Input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} components...`}
      />
      <Box mb="600">
        <Text as="span" fontSize="13px" color="gray.700">
          Showing
          <Text as="span" color="gray.700">
            {' '}
            {props.displayCount} of {count} components
          </Text>
        </Text>
      </Box>
    </>
  );
}

function TableWrapper({ config }) {
  const columns = React.useMemo(() => {
    return [
      { Header: 'Component', accessor: 'name' },
      { Header: 'Location', accessor: 'location' },
      { Header: 'Prop Configuration', accessor: 'props' }
    ];
  }, []);

  const data = React.useMemo(() => raw, []);

  const globalFilter = (arr, id, value) => {
    return matchSorter(arr, value, {
      keys: [
        'values.name',
        'values.location.fileName',
        item => item.values.props.length && item.values.props.map(i => i.name)
      ]
    });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state
  } = useTable({ data, columns, globalFilter }, useGlobalFilter);

  const firstPageRows = rows.slice(0, 100);

  return (
    <>
      <GlobalFilter
        resultCount={rows.length}
        displayCount={firstPageRows.length}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if (cell.column.id === 'props') {
                    return (
                      <PropTd value={cell.value} {...cell.getCellProps()} />
                    );
                  }

                  if (cell.column.id === 'location') {
                    return (
                      <LocationTd
                        locationUrl={config.locationUrl}
                        value={cell.value}
                        {...cell.getCellProps()}
                      />
                    );
                  }

                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableWrapper;
