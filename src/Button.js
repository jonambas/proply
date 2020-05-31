import React from 'react';
import Box from '@sweatpants/box';
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

function Button(props) {
  return (
    <Focus
      display="block"
      as="button"
      px="300"
      py="200"
      borderRadius="1px"
      border="none"
      bg="mg"
      color="fg"
      fontSize="100"
      lineHeight="1.5em"
      fontWeight="medium"
      style={{
        cursor: 'pointer'
      }}
      {...props}
    />
  );
}

export default Button;
