import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import App from './App';
import Head from 'next/head';
import { useEffect } from 'react';

function Home() {
  

  useEffect(() => {
    const { worker } = require('./mocks/browser')
  
    worker.start()
    }, []);
  

  return (
    <>
      <Head>
          <title>Better You</title>
      </Head>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Notifications position="top-right" zIndex={2077} />
        <App />
      </MantineProvider>
    </>
  );

};

export default Home;
