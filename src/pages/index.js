import { IconX } from '@tabler/icons-react';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import App from './App';

function Home() {
  
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications position="top-right" zIndex={2077} />
      <App />
    </MantineProvider>
  );

};

export default Home;
