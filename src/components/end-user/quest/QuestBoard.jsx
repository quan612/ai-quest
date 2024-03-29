import React, { useCallback } from 'react'

import { Flex, Button } from '@chakra-ui/react'
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
