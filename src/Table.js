import React from 'react';
import { Box, Text } from "@sparkpost/matchbox";
import data from "../.propspottercache/data.json";

function Th(props) {
  return (
    <Box as="th" textAlign="left" py="300" fontSize='100'>
      {props.children}
    </Box>
  );
}

function Td({ children, ...rest }) {
  return (
    <Box as="td" textAlign="left" py="300" {...rest}>
      {children}
    </Box>
  );
}

function Tr(props) {
  return (
    <Box as="tr">
      {props.children}
    </Box>
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

function Component(props) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const results = React.useMemo(() => {
    if (!searchTerm.length) {
      return data;
    }

    return data.filter((row) => {
      const parts = [row.name.toLowerCase(), row.fileName.toLowerCase(), ...row.props.map(({ name }) => name)];
      for (const part of parts) {
        if (part.includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    })
  }, [searchTerm, data]);

  return (
    <>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Type to Search"
      />

      <Box as="table" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <Tr>
            <Th>Component</Th>
            <Th>Location</Th>
            <Th>Prop Configuration</Th>
          </Tr>
        </thead>
        <tbody>
          {results.map((entry, i) => {
            return (
              <Tr key={i}>
                <Td>{entry.name}</Td>
                <Td fontSize="100">
                  {entry.fileName}:{entry.ln}
                </Td>
                <Td>
                  {entry.props.map(prop => (
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
              </Tr>
            );
          })}
        </tbody>
      </Box>
    </>
  );
}

export default Component;