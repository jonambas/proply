import React from 'react';
import { Box, Text } from '@sparkpost/matchbox';

export function Table(props) {
  return (
    <Box
      as="table"
      width="100%"
      style={{ borderCollapse: 'collapse' }}
      {...props}
    />
  );
}

export function Th(props) {
  return <Box as="th" textAlign="left" py="300" fontSize="100" {...props} />;
}

export function Td(props) {
  return <Box as="td" textAlign="left" py="300" {...props} />;
}

export function PropTd({ value, ...rest }) {
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

export function LocationTd({ value, locationUrl, ...rest }) {
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

export function Tr(props) {
  return <Box as="tr" verticalAlign="top" {...props} />;
}
