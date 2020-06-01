import React from 'react';
import Box from '@sweatpants/box';
import raw from '../.propspotcache/data.json';
import { Table, Th, Td, PropTd, LocationTd, Tr } from './TableComponents';
import Button from './Button';
import { useTable, useGlobalFilter } from 'react-table';
import getFilteredResults from './filtering/getFilteredResults';
import styled from 'styled-components';

const Focus = styled(Box)`
  position: relative;
  box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.bg};
  transition: box-shadow 0.1s;
  &:focus {
    z-index: 1;
    outline: none;
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.colors.bg},
      0px 0px 0px 4px ${(props) => props.theme.colors.fg};
  }
`;

function Input(props) {
  return (
    <Focus
      border="1px solid #fff"
      borderColor="fg"
      borderRadius="1px"
      fontSize="100"
      lineHeight="1.5em"
      width="100%"
      p="200"
      as="input"
      type="text"
      bg="bg"
      {...props}
    />
  );
}

function Select(props) {
  return (
    <Box position="relative">
      <Focus
        borderColor="fg"
        borderRadius="1px"
        fontSize="100"
        lineHeight="1.5em"
        width="100%"
        p="200"
        as="select"
        bg="bg"
        display="block"
        color="fg"
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
        borderColor="fg"
        style={{
          transform: 'translateY(-50%) rotate(45deg)',
          pointerEvents: 'none'
        }}
        zIndex="1"
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
    setFilters([...filters.slice(0, i), { ...filters[i], [key]: value }, ...filters.slice(i + 1)]);
  }

  return (
    <Box mt="100" mb="400">
      {filters.map((filter, i) => (
        <Box key={i}>
          <Box
            display="grid"
            gridTemplateColumns={
              filter.type === 'prop' ? '0.5fr 1fr 0.5fr 1fr 0.25fr' : '0.5fr 0.5fr 1fr 1fr 0.25fr'
            }
            gridGap="200"
            mb="100"
          >
            <Select onChange={(e) => setValue(i, 'type', e.target.value)} value={filter.type}>
              <option value="prop">Prop</option>
              <option value="component">Component Name</option>
            </Select>

            {filter.type === 'component' && (
              <Select
                onChange={(e) => setValue(i, 'matcher', e.target.value)}
                value={filter.matcher}
              >
                <option value="equals">equals</option>
                <option value="includes">includes</option>
              </Select>
            )}

            <Input
              placeholder={`Enter ${filter.type} name`}
              value={filter.name}
              onChange={(e) => setValue(i, 'name', e.target.value)}
            />
            {filter.type === 'prop' && (
              <>
                <Select
                  onChange={(e) => setValue(i, 'matcher', e.target.value)}
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
                {(filter.matcher === 'equals' || filter.matcher === 'includes') && (
                  <Input
                    placeholder={`Enter ${filter.type} value`}
                    value={filter.value}
                    onChange={(e) => setValue(i, 'value', e.target.value)}
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
      onChange={(e) => {
        setGlobalFilter({
          ...globalFilter,
          global: e.target.value || undefined
        });
      }}
      placeholder={`Search ${count} components...`}
      mb="100"
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state
  } = useTable({ data, columns, globalFilter: getFilteredResults }, useGlobalFilter);

  const firstPageRows = rows.slice(0, 1000);

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Filters globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
      <Box mb="600">
        <Box as="span" fontSize="13px" color="fg">
          Showing
          <Box as="span" color="fg">
            {' '}
            {firstPageRows.length} of {preGlobalFilteredRows.length} components
          </Box>
        </Box>
      </Box>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === 'props') {
                    return <PropTd value={cell.value} {...cell.getCellProps()} />;
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

                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
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
