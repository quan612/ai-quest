import React, { useRef, useContext, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'

import { useRouter } from 'next/router'
import Mint from './Mint'
import { Heading2XL, Text2XL } from '@components/shared/Typography'
import VerticalAnimation from '../shared/VerticalAnimation'

const MINTABLE = 0
const MINTED = 1
const MintBoard = () => {
  const [view, viewSet] = useState(MINTABLE)
  const router = useRouter()

  return (
    <Box
      flex="1"
      position={'relative'}
      display="flex"
      w="100%"
      h="100vh"
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      __css={
        {
          // background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 91.67%), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/img/user/ai-mint.png)`,
        }
      }
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat="no-repeat"
    >
      <Flex
        w={{ base: '80%', xl: 'container.lg' }}
        maxW="container.lg"
        direction="column"
        gap="48px"
        justifyContent={'center'}
        alignItems="center"
        h="100%"
      >
        {view === MINTABLE && <Mint onMintSucceed={() => viewSet(MINTED)} />}
        {view === MINTED && (
          <>
            <Heading2XL>You have minted 10 tokens</Heading2XL>
            <Text2XL>
              It is time to undertake the first quest and begin to earn more Tokens.
            </Text2XL>
            <Button
              w={{ base: '192px', md: '296px' }}
              onClick={() => router.push('/quest')}
              variant="orange"
            >
              PLAY QUEST
            </Button>
            <VerticalAnimation />
          </>
        )}
      </Flex>
      <Timer />
    </Box>
  )
}

export default MintBoard
