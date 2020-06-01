import React from 'react';
import Box from '@sweatpants/box';
import Inline from '@sweatpants/inline';

export function Table(props) {
  return <Box as="table" width="100%" style={{ borderCollapse: 'collapse' }} {...props} />;
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
      <Inline space="0.5rem" data-id="inline">
        {value.map((prop, i) => (
          <Box key={`${i}-${prop.name}`}>
            <Box
              display="inline-block"
              px="6px"
              py="3px"
              borderRadius="3px"
              bg="mg"
              fontSize="100"
              title={`Value: ${prop.value || 'true'}`}
            >
              {prop.name}
            </Box>
          </Box>
        ))}
      </Inline>
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
          color="fg"
        >
          {value.fileName}:{value.line}
        </Box>
      ) : (
        `${value.fileName}:${value.line}`
      )}
    </Td>
  );
}

export function Tr(props) {
  return <Box as="tr" verticalAlign="top" {...props} />;
}
