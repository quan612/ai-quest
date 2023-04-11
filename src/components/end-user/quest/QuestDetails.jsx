import React, { useRef, useEffect, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button, Input, ButtonGroup, Progress } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import { Heading2XL, HeadingLg, TextXL } from '@components/shared/Typography'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'

import QuestBegin from './QuestBegin'

const BEGIN = 0
const QUEST_BEGIN = 1
const QUEST_SUBMITTED = 3
const CLAIMED_TOKEN = 4

const QuestDetails = ({ session }) => {
  const [view, viewSet] = useState(QUEST_BEGIN)
  const router = useRouter()

  // const {
  //   codeQuestModal,
  //   nftOwnQuestModal,
  //   questSelected,
  // } = useContext(UserQuestContext)

  const onBeginQuest = useCallback(() => {
    viewSet(QUEST_SUBMITTED)
  })

  const onSubmitQuest = useCallback(() => {
    viewSet(QUEST_SUBMITTED)
  }, [])

  const onClaimToken = useCallback(() => {
    viewSet(CLAIMED_TOKEN)
  }, [])

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
        direction="column"
        gap="24px"
        justifyContent={'center'}
        alignItems="center"
        h="100%"
      >
        {view === QUEST_BEGIN && <QuestBegin onSubmitQuest={onSubmitQuest} />}
        {view === QUEST_SUBMITTED && <QuestCompleted onClaimToken={onClaimToken} />}
        {view === CLAIMED_TOKEN && <ClaimedTokenFrame />}
      </Flex>

      <Timer />
    </Box>
  )
}

export default QuestDetails

const QuestCompleted = ({ onClaimToken }) => {
  return (
    <QuestWrapper>
      <Heading2XL>Quest Completed</Heading2XL>
      <Text fontSize="xl" textAlign={'center'}>
        Quests are available once every 24 hours and you will be rewarded 10 tokens per quest. All
        actions will impact your final NFT and cannot be undone, tread carefully.
      </Text>

      <Button w={{ base: '192px', md: '296px' }} onClick={onClaimToken} variant="orange">
        CLAIM TOKENS
      </Button>
    </QuestWrapper>
  )
}

const ClaimedTokenFrame = () => {
  const router = useRouter()
  return (
    <QuestWrapper>
      <Heading2XL>Tokens Claimed</Heading2XL>
      <TextXL>
        You have completed the quest for today. Come back in{' '}
        <Text as={'Span'} color="orange.300">
          23:59:50
        </Text>{' '}
        to earn 10 more tokens for the burn phase.
      </TextXL>
      <ButtonGroup gap="3rem">
        <Button
          w={{ base: '192px', md: '240px' }}
          onClick={() => console.log('share on twiter')}
          variant="outline-orange"
        >
          SHARE ON TWITTER
        </Button>
        <Button
          w={{ base: '192px', md: '240px' }}
          onClick={() => router.push('/')}
          variant="orange"
        >
          VIEW MY TOKENS
        </Button>
      </ButtonGroup>
    </QuestWrapper>
  )
}
