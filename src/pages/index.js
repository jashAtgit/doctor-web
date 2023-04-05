import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import App from './App';
import Head from 'next/head';
import { useEffect } from 'react';
import Axios from "axios";

function Home() {

  Axios.defaults.baseURL = "https://7c61-103-156-19-229.in.ngrok.io/";
  
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
