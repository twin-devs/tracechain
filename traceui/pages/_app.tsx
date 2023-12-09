"use client";
import React from "react";
import Head from "next/head";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { globalCss } from "@obolnetwork/obol-ui";
import { hooks as metaMaskHooks, metaMask } from "../connectors/metamask";
import Layout from "../components/templates/layout";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

import TopLeftBg from "../public/backgrounds/top-left-bg.svg";


import { DEFAULT_NETWORK_NAME } from "../constants";
import { useHasMounted } from "@hooks/index";

const globalStyles = globalCss({
  html: {
    overflowX: "hidden",
  },
  body: {
    backgroundColor: "$bg01",
    padding: 0,
    margin: 0,
    fontFamily: "DM Sans",
  },

  a: {
    textDecoration: "none",
  },

  "#__next": {
    position: "relative",
    zIndex: 0,
  },
});

function App({ Component, pageProps }) {
  globalStyles();
  const hasMounted = useHasMounted();
  const networkName = DEFAULT_NETWORK_NAME.toLocaleLowerCase();
  if (!hasMounted) {
    return null;
  }
  return (
    <Web3ReactProvider connectors={connectors}>
      <Layout>
        <Head>
          <title>{`${networkName} - tracking trace`}</title>
          <meta
            name="description"
            content="Tracking chain for manufacturing and supply chain. "
          />
          <meta name="title" content={`${networkName} - tracking trace`} />
          <link rel="icon" href="/favicon.png" />
        </Head>     
          <React.Fragment>
            <Component {...pageProps} />
          </React.Fragment>
        
      </Layout>
    </Web3ReactProvider>
  );
}

export default App;
