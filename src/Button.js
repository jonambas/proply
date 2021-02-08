import React from 'react';
import Box from '@sweatpants/box';
import styled from 'styled-components';

const Focus = styled(Box)`
  position: relative;
  transition: box-shadow 0.1s;
  &:focus {
    z-index: 1;
    outline: none;
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.colors.link};
  }
`;

function Button(props) {
  return (
    <Focus
      display="block"
      as="button"
      px="300"
      py="200"
      borderRadius="5px"
      border="none"
      bg="buttonBg"
      color="fg"
      fontSize="100"
      lineHeight="1.5em"
      fontWeight="medium"
      style={{
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }}
      {...props}
    />
  );
}

export default Button;
