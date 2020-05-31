import React from 'react';
import Box from '@sweatpants/box';
import Table from './Table';
import ThemeSwitcher from './ThemeSwitcher';
import config from '__PROPSPOTTER_CONFIG__';

function App() {
  return (
    <ThemeSwitcher>
      <Box bg="bg" color="fg" minHeight="100vh">
        <Box
          fontFamily="-apple-system,BlinkMacSystemFont,'San Francisco','Segoe UI',Roboto,Helvetica,sans-serif"
          maxWidth="1080px"
          py="800"
          mx="auto"
          px="300"
        >
          <Box as="h1" fontSize="300" lineHeight="1.5em" mb="800">
            {config.title || 'Propspotter'}
          </Box>

          <Table config={config} />
        </Box>
      </Box>
    </ThemeSwitcher>
  );
}

export default App;
