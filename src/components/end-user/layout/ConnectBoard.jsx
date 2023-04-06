import React, { useEffect } from 'react'
import { Box, Flex, Container, Heading, ButtonGroup, Button, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ShortContainer } from '@components/end-user/wrappers'

import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { Timer } from '../shared/Timer'
import { LayoutWrapper } from './UserLayout'
import { Heading2XL } from '@components/shared/Typography'
import { MinimalNavigation } from './Navigation'

export default function ConnectBoard() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const { signMessage, signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin()
    }
  }, [isConnected])

  const handleLogin = async () => {
    try {
      const callbackUrl = '/'
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })

      const signature = await signMessageAsync({ message: message.prepareMessage() })

      signIn('Ethereum', {
        message: JSON.stringify(message),
        signature,
        redirect: false,
        callbackUrl,
      }).then(() => {
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <LayoutWrapper>
      <MinimalNavigation />
      <Flex position="absolute" top="0" w="100%" h="100vh" opacity={'30%'} justify="center">
        <Image src="/img/user/Line circle animation.gif" h="100%" w="auto" />
      </Flex>

      <Flex h="100%" alignItems={'center'} justify={'center'}>
        <Flex
          w={'container.lg'}
          maxW="container.lg"
          flexDirection={'column'}
          alignItems={'center'}
          gap={'48px'}
        >
          <Heading2XL>A journey powered by AI</Heading2XL>
          <Text fontSize="2xl" color={'#fff'} textAlign="center">
            Connect your wallet to begin.
          </Text>
          <Button
            w={{ base: '192px', md: '192px' }}
            onClick={() => {
              if (!isConnected) {
                connect({ connector: connectors[0] })
              } else {
                handleLogin()
              }
            }}
            variant="orange"
          >
            CONNECT WALLET
          </Button>
        </Flex>
      </Flex>
      <Timer />
    </LayoutWrapper>
  )
}
