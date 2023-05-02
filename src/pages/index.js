import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import App from './App';
import Head from 'next/head';
import Axios from "axios";

function Home() {

  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_ADDR;
  
  return (
    <>
      <Head>
          <title>Better U</title>
      </Head>
      <MantineProvider 
      withNormalizeCSS 
      withGlobalStyles
      theme={{
        colorScheme: 'light',
        colors: {
          // Add your color
          deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          // or replace default theme color
          color: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        },
        
        

        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },

        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: '2rem' },
          },
        },
      }}
      >
        <Notifications position="top-right" zIndex={2077} />
        <App />
      </MantineProvider>
    </>
  );

};


export default Home;
