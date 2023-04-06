import React from 'react'
import { Box, Flex, Container, Heading, ButtonGroup, Button, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useWindowSize } from 'react-use'
import { ShortContainer } from '@components/end-user/wrappers'
import useDeviceDetect from '@hooks/useDeviceDetect'
import ConnectBoard from './ConnectBoard'
import Navigation from './Navigation'

function use100vh() {
  const ref = React.useRef()
  const { height } = useWindowSize()

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    ref.current.style.height = height + 'px'
  }, [height])

  return ref
}

export default function UserLayout({ session, children }) {
  let router = useRouter()

  if (session) {
    return (
      <LayoutWrapper>
        <Navigation />
        {children}
      </LayoutWrapper>
    )
  } else {
    return <ConnectBoard />
  }
}

export const LayoutWrapper = ({ children }) => {
  const { isMobile } = useDeviceDetect()

  const ref = use100vh()
  return (
    <Flex
      w="100%"
      minH="100%"
      ref={ref}
      position={'relative'}
      flexDirection="column"
      className="layout-wrapper"
      align={'center'}
      bg="black"
    >
      {children}
    </Flex>
  )
}
