import React, { useRef, useContext, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button, Input, ButtonGroup, Image } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'
import { Heading2XL, TextXL } from '@components/shared/Typography'
import { ContentLg } from '../wrappers'
import StarAnimation from '../shared/StarAnimation'

const QuestBoard = () => {
  const router = useRouter()

  const onBeginQuest = useCallback(() => {
    router.push('/quest/1234-abcd')
  }, [])

  return (
    <Flex
      display="flex"
      w="100%"
      h="100vh"
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      // __css={{
      //   background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 91.67%), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/img/user/ai-quest.png)`,
      // }}
      // backgroundPosition={'center'}
      // backgroundSize={'cover'}
      // backgroundRepeat="no-repeat"
      className="quest-board"
    >
      <StarAnimation />
      <ContentLg>
        <QuestWrapper>
          <Heading2XL>Begin Your Quest</Heading2XL>
          <TextXL>
            Quests are available once every 24 hours. You will be rewarded 10 Tokens per quest. All
            actions will have an impact on your final Art, and cannot be undone. Tread carefully.
          </TextXL>
          <Button w={{ base: '192px', md: '240px' }} onClick={onBeginQuest} variant="orange">
            BEGIN QUEST
          </Button>
        </QuestWrapper>
      </ContentLg>

      <Timer />
    </Flex>
  )
}

export default QuestBoard
