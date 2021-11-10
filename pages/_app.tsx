import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import DebugMenu, { useDebugMenu } from "components/DebugMenu";
import Layout from "components/Layout";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const apolloCache = new InMemoryCache();
const init = async () => {
  if (typeof window !== "undefined")
    await persistCache({
      cache: apolloCache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
};

const pokemonClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: apolloCache,
});

function MyApp({ Component, pageProps }: AppProps) {
  const debugMenuState = useDebugMenu();
  useEffect(() => {
    console.log(
      `\
Website coded with ❤️ by Dylan Merigaud
Contact: dylanmerigaud@gmail.com`
    );
  }, []);

  return (
    <ApolloProvider client={pokemonClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <DebugMenu debugMenuState={debugMenuState} />
    </ApolloProvider>
  );
}

export default MyApp;
