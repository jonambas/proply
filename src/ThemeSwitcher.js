import React from 'react';
import Pants from '@sweatpants/theme';
import Box from '@sweatpants/box';

const base = {
  space: {
    800: '4rem',
    750: '3.5rem',
    700: '3rem',
    650: '2.5rem',
    600: '2rem',
    550: '1.75rem',
    500: '1.5rem',
    450: '1.25rem',
    400: '1rem',
    300: '0.75rem',
    200: '0.5rem',
    100: '0.25rem',
    0: '0rem'
  },
  fontSizes: {
    800: '3.5rem',
    700: '2.75rem',
    600: '2rem',
    500: '1.5rem',
    400: '1.25rem',
    300: '1.125rem',
    200: '1rem',
    100: '0.875rem'
  },
  colors: {
    bg: 'white',
    fg: 'black',
    buttonBg: '#d9e0e6',
    link: '#1273e6',
    border: '#d9e0e6',
    tableBg: '#f5f8fa',
    tableFg: '#39444d'
  }
};

function ThemeSwitcher(props) {
  return (
    <Pants theme={base}>
      <Box mx="300">{props.children}</Box>
    </Pants>
  );
}

export default ThemeSwitcher;
