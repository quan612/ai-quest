import React, { useRef, useEffect, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button, Input, ButtonGroup, Progress } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import { Heading2XL, HeadingLg, TextXL } from '@components/shared/Typography'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'

import { debounce } from 'util/index'

const BEGIN = 0
const QUEST_STARTED = 1
const QUEST_SUBMITTED = 2
const CLAIMED_TOKEN = 3

const QuestDetals = ({ session }) => {
  const [view, viewSet] = useState(QUEST_STARTED)
  const router = useRouter()

  // const {
  //   codeQuestModal,
  //   nftOwnQuestModal,
  //   questSelected,
  // } = useContext(UserQuestContext)

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
        {view === QUEST_STARTED && <QuestStartedFrame onSubmitQuest={onSubmitQuest} />}
        {view === QUEST_SUBMITTED && <QuestCompleted onClaimToken={onClaimToken} />}
        {view === CLAIMED_TOKEN && <ClaimedTokenFrame />}
      </Flex>

      <Timer />
    </Box>
  )
}

export default QuestDetals

const PROGRESS_0 = 33
const PROGRESS_1 = 100
const QuestStartedFrame = ({ onSubmitQuest }) => {
  const [progress, progressSet] = useState(PROGRESS_0)
  const [answer, answerSet] = useState('')

  const handleOnChange = (e) => {
    answerSet(e.target.value)
  }

  return (
    <QuestWrapper>
      <Text size="lg" color="orange.400" textAlign={'center'}>
        You wake up in a cave. It is dark and you have no idea how you arrived here. You look ahead
        of you and see dimly lit tunnels ahead of you. Left, Right or Straight ahead. What do you
        choose?
      </Text>
      <Flex w="100%" direction={'column'} gap="0.25rem">
        <Input
          variant={'main'}
          type="text"
          placeholder="Type your answer"
          onChange={debounce(handleOnChange, 300)}
          maxLength="150"
        />
        <Flex ml="auto" color="whiteAlpha.300">
          {answer?.length || 0}/150
        </Flex>
      </Flex>

      {progress === PROGRESS_0 && (
        <Button
          w={{ base: '192px', md: '200px' }}
          onClick={() => {
            console.log('answer', answer)
            progressSet(PROGRESS_1)
          }}
          variant="orange"
        >
          SUBMIT
        </Button>
      )}
      {progress === PROGRESS_1 && (
        <Button w={{ base: '192px', md: '296px' }} onClick={onSubmitQuest} variant="orange">
          COMPLETE QUEST
        </Button>
      )}

      <Progress value={progress} w="100%" transition={'0.5s'} />
    </QuestWrapper>
  )
}

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
          onClick={() => console.log('view may token')}
          variant="orange"
        >
          VIEW MY TOKENS
        </Button>
      </ButtonGroup>
    </QuestWrapper>
  )
}
