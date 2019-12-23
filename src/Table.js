import React from 'react';
import { Box, Text } from "@sparkpost/matchbox";
import raw from "../.propspottercache/data.json";
import { locationUrl } from "__PROPSPOTTER_CONFIG__";

import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table'

function Table(props) {
  return <Box as="table" width="100%" style={{ borderCollapse: "collapse" }} {...props} />
}

function Th(props) {
  return (
    <Box as="th" textAlign="left" py="300" fontSize='100' {...props} />
  );
}

function Td(props) {
  return (
    <Box as="td" textAlign="left" py="300" {...props} />
  );
}

function PropTd({ value, ...rest }) {
  return (
    <Td {...rest}>
      {value.map((prop, i) => (
        <Box
          display="inline-block"
          m="100"
          px="100"
          py="2px"
          borderRadius="200"
          bg="gray.200"
          fontSize="100"
          key={`${i}-${prop.name}`}
        >
          {prop.name}
        </Box>
      ))}
    </Td>
  );
}

function LocationTd({ value, ...rest }) {
  return (
    <Td fontSize="100" {...rest}>
      {locationUrl ? (
        <Text
          as="a"
          href={`${locationUrl}/${value.fileName}#L${value.line}`}
          title={`Visit ${value.fileName}`}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.700"
        >
          {value.fileName}:{value.line}
        </Text>
      ) : (
        `${value.fileName}:${value.line}`
      )}
    </Td>
  );
}

function Tr(props) {
  return (
    <Box as="tr" verticalAlign='top' {...props} />
  );
}

function Input(props) {
  return (
    <Box
      border='400'
      borderRadius='200'
      fontSize='100'
      width='100%'
      mb='800'
      p='200'
      as='input'
      type='text'
      {...props}
    />
  )
}

function NewTable() {

  const columns = React.useMemo(() => {
    return [
      { Header: "Component", accessor: "name" },
      { Header: "Location", accessor: "location" },
      { Header: 'Prop Configuration', accessor: 'props' }
    ];
  }, []);

  const data = React.useMemo(() => raw, [raw]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ data, columns });

  return (
    <>
      <Box mb="600">
        <Text as="span" fontSize="100" color="gray.800">
          Components Found:
          <Text as="span" color="gray.800">
            {" "}
            {rows.length}
          </Text>
        </Text>
      </Box>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if (cell.column.id === "props") {
                    return (
                      <PropTd value={cell.value} {...cell.getCellProps()} />
                    );
                  }

                  if (cell.column.id === "location") {
                    return (
                      <LocationTd value={cell.value} {...cell.getCellProps()} />
                    );
                  }

                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default NewTable;