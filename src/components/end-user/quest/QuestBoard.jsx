import React, { useRef, useContext, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button, Input, ButtonGroup } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'
import { Heading2XL, TextXL } from '@components/shared/Typography'

const QuestBoard = () => {
  const router = useRouter()

  const onBeginQuest = useCallback(() => {
    router.push('/quest/1234-abcd')
  }, [])
  console.log(3)
  return (
    <Box
      flex="1"
      position={'relative'}
      display="flex"
      w="100%"
      h="100%"
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      __css={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 91.67%), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/img/user/ai-quest.png)`,
      }}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat="no-repeat"
    >
      <Flex
        w={'container.lg'}
        maxW="container.lg"
        h="100%"
        direction="column"
        gap="48px"
        justifyContent={'center'}
        alignItems="center"
      >
        <QuestWrapper>
          <Heading2XL>Begin Your Quest</Heading2XL>
          <TextXL>
            Quests are available once every 24 hours and you will be rewarded 10 tokens per quest.
            All actions will impact your final NFT and cannot be undone, tread carefully.
          </TextXL>
          <Button w={{ base: '192px', md: '240px' }} onClick={onBeginQuest} variant="orange">
            BEGIN QUEST
          </Button>
        </QuestWrapper>
      </Flex>

      <Timer />
    </Box>
  )
}

export default QuestBoard
