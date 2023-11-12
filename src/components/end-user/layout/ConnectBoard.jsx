import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Flex,
  Container,
  Heading,
  ButtonGroup,
  Button,
  Text,
  Image,
  useDisclosure,
  Input,
} from '@chakra-ui/react'

import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { Timer } from '../shared/Timer'
import { LayoutWrapper } from './UserLayout'
import { Heading2XL, Text2XL } from '@components/shared/Typography'
import { MinimalNavigation } from './Navigation'

const INITIAL = 0
const WALLET = 1
const EMAIL = 2

export default function ConnectBoard() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const { signMessage, signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { data: session, status } = useSession()

  const [showBtn, showBtnSet] = useState(true)
  const [currentState, setCurrent] = useState(INITIAL)

  const loginModal = useDisclosure()

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
      <Flex
        position="absolute"
        top="0"
        w="100%"
        h="100vh"
        opacity={'30%'}
        justify="center"
        className="circle-animation"
      >
        <Image src="/img/user/Line circle animation.gif" h="100%" w="auto" />
      </Flex>

      <Flex h="100%" alignItems={'center'} justify={'center'}>
        <Flex
          w={{ base: '100%', lg: 'container.lg' }}
          maxW="container.lg"
          flexDirection={'column'}
          alignItems={'center'}
          gap={{ base: '24px', lg: '48px' }}
        >
          <Heading2XL>A journey powered by AI</Heading2XL>
          <Text2XL color={'#fff'} textAlign="center">
            Connect to begin.
          </Text2XL>
          {showBtn && (
            <>
              <Button
                w={{ base: '192px', md: '192px' }}
                onClick={() => {
                  setCurrent(WALLET)
                  showBtnSet(false)
                }}
                variant="orange"
              >
                CONNECT WALLET
              </Button>
              <Button
                w={{ base: '192px', md: '192px' }}
                onClick={() => {
                  setCurrent(EMAIL)
                  showBtnSet(false)
                }}
                variant="orange"
              >
                EMAIL
              </Button>
            </>
          )}

          {currentState === WALLET && <WalletLogin />}
          {currentState === EMAIL && <EmailLogin />}
        </Flex>
      </Flex>
      <Timer />
    </LayoutWrapper>
  )
}

const WalletLogin = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, isConnected } = useAccount()
  return (
    <>
      {connectors?.map((connector) => (
        <Button
          key={connector.id}
          w={{ base: '192px', md: '192px' }}
          onClick={() => {
            if (!isConnected) {
              connect({ connector: connector })
            }
            // else {
            // }
          }}
          variant="orange"
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </Button>
      ))}{' '}
    </>
  )
}

const EmailLogin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const onSignIn = async () => {
    const email = emailRef?.current?.value
    const password = passwordRef?.current?.value
    console.log('email', email)
    console.log('password', password)

    signIn('email', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <>
      <Input
        w="500px"
        ref={emailRef}
        variant={'main'}
        type="text"
        // disabled={loading}
        placeholder="Email"
        // onChange={handleOnChange}
        maxLength={150}
      />
      <Input
        w="500px"
        ref={passwordRef}
        variant={'main'}
        type="text"
        // disabled={loading}
        placeholder="Password"
        maxLength={150}
      />
      <Button
        variant="orange"
        w={'200px'}
        onClick={onSignIn}
        // isLoading={loading}
        // disabled={loading}
      >
        LOGIN
      </Button>
    </>
  )
}
