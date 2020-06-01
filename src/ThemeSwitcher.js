import React from 'react';
import Pants from '@sweatpants/theme';
import Box from '@sweatpants/box';
import styled from 'styled-components';
import Hidden from '@sweatpants/screenreaderonly';

const Switch = styled.button`
  background: ${(props) => props.theme.colors.bg};
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  position: relative;
  box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.bg};
  transition: box-shadow 0.1s;
  &:focus {
    z-index: 1;
    outline: none;
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.colors.bg},
      0px 0px 0px 4px ${(props) => props.theme.colors.fg};
  }

  svg path {
    fill: ${(props) => props.theme.colors.fg};
  }
`;

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
  }
};

const themes = [
  {
    colors: {
      bg: 'white',
      fg: 'black',
      mg: '#d9e0e6'
    }
  },
  {
    colors: {
      bg: '#18181f',
      fg: 'white',
      mg: '#2e2e3f'
    }
  }
];

function ThemeSwitcher(props) {
  const [theme, setTheme] = React.useState(0);

  function handleClick() {
    setTheme(theme === themes.length - 1 ? 0 : theme + 1);
  }

  return (
    <Pants
      theme={{
        ...base,
        ...themes[theme]
      }}
    >
      <Box position="absolute" top="400" right="400">
        <Switch onClick={handleClick} type="button">
          <svg focusable="false" viewBox="0 0 24 24" width="20" height="20">
            <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path>
          </svg>
          <Hidden>Switch color theme</Hidden>
        </Switch>
      </Box>
      {props.children}
    </Pants>
  );
}

export default ThemeSwitcher;
