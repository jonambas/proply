import React from 'react';
import Box from '@sweatpants/box';
import raw from '../.proply/data.json';
import { Table, Th, Td, PropTd, LocationTd, Tr } from './TableComponents';
import Button from './Button';
import { useTable, useGlobalFilter } from 'react-table';
import getFilteredResults from './filtering/getFilteredResults';
import styled from 'styled-components';

const Focus = styled(Box)`
  position: relative;
  box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.bg};
  transition: box-shadow 0.3s;
  &:focus {
    z-index: 1;
    outline: none;
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.fg};
  }
`;

function Input(props) {
  return (
    <Focus
      border="1px solid #fff"
      borderColor="border"
      borderRadius="5px"
      fontSize="100"
      lineHeight="1.5em"
      width="100%"
      p="200"
      as="input"
      type="text"
      bg="bg"
      color="fg"
      {...props}
    />
  );
}

function Select(props) {
  return (
    <Box position="relative">
      <Focus
        borderColor="border"
        borderRadius="5px"
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
              filter.type === 'prop'
                ? '0.75fr 0.75fr 0.5fr 1fr 0.25fr'
                : '0.75fr 0.5fr 0.75fr 1fr 0.25fr'
            }
            gridGap="200"
            mb="200"
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
      <Button mt="200" onClick={addNewFilter}>
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

function TableRowWrapper(props) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const hasProps = props.propConfig.length;
  function handleShow() {
    if (hasProps) {
      setShow(true);
    }
  }

  return (
    <>
      <Tr
        onFocus={handleShow}
        onBlur={() => setShow(false)}
        onMouseOver={handleShow}
        onMouseOut={() => setShow(false)}
      >
        {props.cells.map((cell, i) => {
          if (cell.column.id === 'props') {
            return <PropTd key={i} value={cell.value} {...cell.getCellProps()} />;
          }

          if (cell.column.id === 'location') {
            return (
              <LocationTd
                key={i}
                locationUrl={props.config.locationUrl}
                value={cell.value}
                {...cell.getCellProps()}
              />
            );
          }

          if (cell.column.id === 'open') {
            return (
              <Td key={i} {...cell.getCellProps()}>
                <Box
                  as="span"
                  justifyContent="flex-end"
                  display={hasProps ? 'flex' : 'none'}
                  opacity={hasProps && show ? '1' : '0'}
                >
                  <Button onClick={() => setOpen(!open)} py="100">
                    {open ? 'Hide Props' : 'Show Props'}
                  </Button>
                </Box>
              </Td>
            );
          }

          return (
            <Td {...cell.getCellProps()} key={i}>
              {cell.render('Cell')}
            </Td>
          );
        })}
      </Tr>
      {hasProps && open ? (
        <tr>
          <td colSpan="4">
            <Table bg="tableBg" mb="100">
              <tbody>
                {props.propConfig.map((prop, i) => {
                  return (
                    <Tr key={i} color="tableFg">
                      <Td py="100" width="18.5%" fontSize="100">
                        {prop.name}
                      </Td>
                      <Td py="100" fontSize="100">
                        {prop.value.toString()}
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          </td>
        </tr>
      ) : null}
    </>
  );
}

const SLICE_INCREMENT = 50;
const SLICE_DEFAULT = 100;
const data = raw;

function TableWrapper({ config }) {
  const columns = React.useMemo(() => {
    return [
      { Header: 'Component', accessor: 'name' },
      { Header: 'Location', accessor: 'location' },
      { Header: 'Prop Configuration', accessor: 'props' },
      { Header: '', accessor: 'open' }
    ];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state = {}
  } = useTable({ data, columns, globalFilter: getFilteredResults }, useGlobalFilter);
  const { globalFilter = { filters: [] } } = state;
  const [slice, setSlice] = React.useState(SLICE_DEFAULT);

  // Resets slice when filters change
  React.useEffect(() => {
    setSlice(SLICE_DEFAULT);
  }, [globalFilter.global, globalFilter.filters.length]);

  const showedRows = React.useMemo(() => rows.slice(0, slice), [rows, slice]);
  const resultLength = rows.length;

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
          Showing {showedRows.length} of {resultLength} components
        </Box>
      </Box>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <Th {...column.getHeaderProps()} key={j}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {showedRows.map((row) => {
            prepareRow(row);
            return (
              <TableRowWrapper
                config={config}
                {...row.getRowProps()}
                cells={row.cells}
                propConfig={row.values.props}
                key={row.id}
              />
            );
          })}
        </tbody>
      </Table>
      {showedRows.length < resultLength && (
        <Box mt="500">
          <Button onClick={() => setSlice(slice + SLICE_INCREMENT)}>Show More Results</Button>
        </Box>
      )}
    </>
  );
}

export default TableWrapper;
