import React from 'react';
import { Box } from '@sparkpost/matchbox';

function Button(props) {
  return (
    <Box
      display="block"
      as="button"
      px="300"
      py="200"
      borderRadius="200"
      border="1px solid"
      borderColor="gray.300"
      bg="gray.300"
      color="gray.900"
      fontSize="100"
      lineHeight="100"
      // letterSpacing='0.04em'
      fontWeight="medium"
      style={{
        cursor: 'pointer'
      }}
      {...props}
    />
  );
}

export default Button;
