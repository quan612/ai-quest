import React, { StrictMode, useEffect } from 'react'
import '../styles/globals.css'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'
import * as gtag from '../lib/ga/gtag'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'

import { Analytics } from '@vercel/analytics/react'
import theme from 'theme/theme'

import { AnimatePresence } from 'framer-motion'
import UserLayout from '@components/end-user/layout/UserLayout'
import Fonts from '@theme/additions/fonts/Font'


import { chain, configureChains, createClient, WagmiConfig, defaultChains, mainnet, goerli } from "wagmi";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from 'wagmi/providers/public'
import AppProvider from '@context/AppContext'

const { chains, provider } = configureChains(
  process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? [mainnet] : [goerli],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }), publicProvider()],
)


const connectors = [
  // new InjectedConnector({
  //   chains,
  //   options: {
  //     name: 'Injected',
  //     shimDisconnect: true,
  //   },
  // }),
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'wagmi',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
      projectId: "a2a3402e9b82f16fe8d8e83a018c6947"
    },
  }),

]

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export function reportWebVitals(metric) {
  // console.log(metric);
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider
      session={pageProps.session}
      basePath={`/api/auth`}
      refetchInterval={3600} // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <WagmiConfig client={wagmiClient}>

        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload">
              {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                page_path: window.location.pathname, 'debug_mode':true
                                });
                            `}
            </Script>
            <ChakraProvider theme={theme}>
              <Fonts />
              <AppProvider>
                {Component.requiredLogin && (
                  <UserLayout {...pageProps}>
                    {/* <AnimatePresence mode="wait" initial={false} transitionDuration="0.2s"> */}
                    <Component {...pageProps} key={router.asPath} />
                    {/* </AnimatePresence> */}
                  </UserLayout>
                )}
                {!Component.requiredLogin && (
                  <Component {...pageProps} key={router.asPath} />
                )}
                <Analytics />
              </AppProvider>
            </ChakraProvider>
          </StrictMode>
        </QueryClientProvider>

      </WagmiConfig>
    </SessionProvider>
  )
}

export default MyApp
