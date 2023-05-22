import '../styles/globals.scss';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import store from '../store';

import { SessionProvider } from "next-auth/react";
import Layout from '../components/layout/Layout';

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Shofii Store</title>

        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SessionProvider>

    </>
  )
}

export default MyApp
