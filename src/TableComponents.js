import React from 'react';
import styled from 'styled-components';
import Box from '@sweatpants/box';

export function Table(props) {
  return <Box as="table" width="100%" style={{ borderCollapse: 'collapse' }} {...props} />;
}

export function Th(props) {
  return <Box as="th" textAlign="left" py="300" px="400" fontSize="100" {...props} />;
}

export function Td(props) {
  return <Box as="td" textAlign="left" py="400" px="400" {...props} />;
}

export function PropTd({ value, ...rest }) {
  return (
    <Td {...rest}>
      {value.map((prop, i) => (
        <Box
          display="inline-block"
          m="100"
          py="0"
          borderRadius="200"
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
        <Box
          as="a"
          href={`${locationUrl}/${value.fileName}#L${value.line}`}
          title={`Visit ${value.fileName}`}
          isExternalLink
          color="link"
        >
          {value.fileName}:{value.line}
        </Box>
      ) : (
        `${value.fileName}:${value.line}`
      )}
    </Td>
  );
}

const StyledTr = styled(Box)`
  &:focus {
    outline: none;
    background: #f5f8fa;
  }
`;

export function Tr(props) {
  return (
    <StyledTr
      as="tr"
      verticalAlign="top"
      borderBottom="1px solid #fff"
      borderColor="border"
      verticalAlign="center"
      tabIndex="0"
      {...props}
    />
  );
}
