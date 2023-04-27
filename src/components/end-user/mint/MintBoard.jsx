import React, { useRef, useContext, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'

import { useRouter } from 'next/router'
import Mint from './Mint'
import { Heading2XL, Text2XL } from '@components/shared/Typography'
import VerticalAnimation from '../shared/VerticalAnimation'
import useDeviceDetect from '@hooks/useDeviceDetect'
import { ContentLg } from '../wrappers'

const MINTABLE = 0
const MINTED = 1
const MintBoard = () => {
  const [view, viewSet] = useState(MINTABLE)
  const router = useRouter()
  const { isMobile } = useDeviceDetect()

  return (
    <Flex
      className="mint-board"
      position={'relative'}
      w="100%"
      h={'100vh'}
      flexDirection={'column'}
      justify={'center'}
      align="center"
    >
      <ContentLg>
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
      </ContentLg>
      <Timer />
    </Flex>
  )
}

export default MintBoard
