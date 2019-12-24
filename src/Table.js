import React from 'react';
import { Box, Text } from '@sparkpost/matchbox';
import raw from '../.propspottercache/data.json';
import { Table, Th, Td, PropTd, LocationTd, Tr } from './TableComponents';
import Button from './Button';
import { useTable, useGlobalFilter } from 'react-table';
import matchSorter from 'match-sorter';

function Input(props) {
  return (
    <Box
      border="400"
      borderRadius="200"
      fontSize="100"
      width="100%"
      p="200"
      as="input"
      type="text"
      {...props}
    />
  );
}

function Select(props) {
  return (
    <Box position="relative">
      <Box
        border="400"
        borderRadius="200"
        fontSize="100"
        lineHeight="100"
        width="100%"
        p="200"
        as="select"
        bg="white"
        display="block"
        color="gray.1000"
        fontWeight="medium"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer'
        }}
        {...props}
      />
      <Box
        position="absolute"
        top="48%"
        right="1rem"
        width="7px"
        height="7px"
        borderBottom="2px solid"
        borderRight="2px solid"
        borderColor="gray.1000"
        style={{
          transform: 'translateY(-50%) rotate(45deg)'
        }}
      ></Box>
    </Box>
  );
}

function Filters(props) {
  const { setGlobalFilter, globalFilter = {} } = props;
  const [filters, setFilters] = React.useState([]);

  React.useEffect(() => {
    setGlobalFilter({
      ...globalFilter,
      filters
    });
  }, [filters]); // eslint-disable-line

  function addNewFilter() {
    setFilters([
      ...filters,
      {
        type: 'prop',
        name: '',
        matcher: 'equals',
        value: ''
      }
    ]);
  }

  function remove(i) {
    // Yuck
    setFilters([...filters.slice(0, i), ...filters.slice(i + 1)]);
  }

  function setValue(i, key, value) {
    // Yuck
    setFilters([
      ...filters.slice(0, i),
      { ...filters[i], [key]: value },
      ...filters.slice(i + 1)
    ]);
  }

  return (
    <Box mt="100" mb="400">
      {filters.map((filter, i) => (
        <Box key={i}>
          <Box
            display="grid"
            gridTemplateColumns={
              filter.type === 'prop'
                ? '0.5fr 1fr 0.5fr 1fr 0.25fr'
                : '0.5fr 0.5fr 1fr 1fr 0.25fr'
            }
            gridGap="100"
            mb="100"
          >
            <Select
              onChange={e => setValue(i, 'type', e.target.value)}
              value={filter.type}
            >
              <option value="prop">Prop</option>
              <option value="component">Component Name</option>
            </Select>

            {filter.type === 'component' && (
              <Select
                onChange={e => setValue(i, 'matcher', e.target.value)}
                value={filter.matcher}
              >
                <option value="equals">equals</option>
                <option value="includes">includes</option>
              </Select>
            )}

            <Input
              placeholder={`Enter ${filter.type} name`}
              value={filter.name}
              onChange={e => setValue(i, 'name', e.target.value)}
            />
            {filter.type === 'prop' && (
              <>
                <Select
                  onChange={e => setValue(i, 'matcher', e.target.value)}
                  value={filter.matcher}
                >
                  <option value="equals">equals</option>
                  <option value="includes">includes</option>
                  {filter.type === 'prop' && (
                    <>
                      <option value="set">is set</option>
                      <option value="notSet">is not set</option>
                    </>
                  )}
                </Select>
                {(filter.matcher === 'equals' ||
                  filter.matcher === 'includes') && (
                  <Input
                    placeholder={`Enter ${filter.type} value`}
                    value={filter.value}
                    onChange={e => setValue(i, 'value', e.target.value)}
                  />
                )}
              </>
            )}
            <Button gridColumn="5" onClick={() => remove(i)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}
      <Button mt="100" onClick={addNewFilter}>
        Add Filter
      </Button>
    </Box>
  );
}

function GlobalFilter(props) {
  const { preGlobalFilteredRows, setGlobalFilter, globalFilter = {} } = props;
  const count = preGlobalFilteredRows.length;

  return (
    <Input
      value={globalFilter.global || ''}
      onChange={e => {
        setGlobalFilter({
          ...globalFilter,
          global: e.target.value || undefined
        });
      }}
      placeholder={`Search ${count} components...`}
    />
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

  const globalFilter = (arr, id, value = {}) => {
    let filteredResults = arr;
    if (value.filters.length) {
      value.filters.forEach(filter => {
        const { type, name: filterName, value: filterValue, matcher } = filter;

        if (type === 'prop' && !!filterName) {
          switch (matcher) {
            case 'equals':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.name === filterName && value === filterValue;
              });
              break;

            case 'includes':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.props.filter(
                  ({ name, value }) =>
                    name === filterName && value.includes(filterValue)
                ).length;
              });
              break;

            case 'set':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.props
                  .map(({ name }) => name)
                  .includes(filterName);
              });
              break;

            case 'notSet':
              filteredResults = filteredResults.filter(({ values }) => {
                return !values.props
                  .map(({ name }) => name)
                  .includes(filterName);
              });
              break;

            default:
              break;
          }
        }

        if (type === 'prop' && !!filterName) {
          switch (matcher) {
            case 'equals':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.props.filter(
                  ({ name, value }) =>
                    name === filterName && value === filterValue
                ).length;
              });
              break;

            case 'includes':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.props.filter(
                  ({ name, value }) =>
                    name === filterName && value.includes(filterValue)
                ).length;
              });
              break;

            case 'set':
              filteredResults = filteredResults.filter(({ values }) => {
                return values.props
                  .map(({ name }) => name)
                  .includes(filterName);
              });
              break;

            case 'notSet':
              filteredResults = filteredResults.filter(({ values }) => {
                return !values.props
                  .map(({ name }) => name)
                  .includes(filterName);
              });
              break;

            default:
              break;
          }
        }
      });
    }

    console.log(filteredResults);
    return matchSorter(filteredResults, value.global, {
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
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Filters
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Box mb="600">
        <Text as="span" fontSize="13px" color="gray.700">
          Showing
          <Text as="span" color="gray.700">
            {' '}
            {firstPageRows.length} of {preGlobalFilteredRows.length} components
          </Text>
        </Text>
      </Box>
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
