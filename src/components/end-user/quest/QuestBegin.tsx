import React, { useRef, useEffect, useState, useCallback } from 'react'

import { Box, Flex, Text, Heading, Button, Input, ButtonGroup, Progress } from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import { Heading2XL, HeadingLg, TextXL } from '@components/shared/Typography'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'

import { debounce } from 'util/index'
import { Chat } from '@components/shared/Chat/chat'
import { initinalMessage } from './messages'

import { type ChatGPTMessage, ChatLine, LoadingChatLine } from '@components/shared/Chat/chatline'
import { useCookies } from 'react-cookie'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

const QUEST_START = 0
const QUEST_INPROGRESS = 33
const PROGRESS_1 = 100

const QuestBegin = ({ onSubmitQuest }) => {
  const [progress, progressSet] = useState(QUEST_START)

  return (
    <QuestWrapper>
      {/* <Chat /> */}

      {progress === QUEST_START && (
        <Initial
          onStart={() => {
            progressSet(QUEST_INPROGRESS)
          }}
        />
      )}
      {progress === QUEST_INPROGRESS && (
        <QuestInProgress
          onCompleted={() => {
            onSubmitQuest()
          }}
        />
      )}

     
    </QuestWrapper>
  )
}

export default QuestBegin

const ScrollableText = ({ message, ...props }) => {
  return (
    <Flex
      position="relative"
      w="100%"
      h="35%"
      flexDirection={'column'}
      className="scrollable-quest-text"
      {...props}
    >
      <Flex
        flexDirection={'column'}
        w="100%"
        h="100%"
        justify={'center'}
        overflow={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Text size="lg" color="orange.400" textAlign={'center'} whiteSpace={'break-spaces'}>
          {message}
        </Text>
      </Flex>
    </Flex>
  )
}

const Initial = ({ onStart }) => {
  return (
    <>
      <ScrollableText message={initinalMessage} />
      <Button w={'200px'} onClick={onStart} variant="orange">
        START
      </Button>
    </>
  )
}

const startMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content:
      'You wake up in a cave. It is dark and you have no idea how you arrived here. You look ahead of you and see dimly lit tunnels ahead of you. Left, Right or Straight ahead. What do you choose?',
  },
]


const QuestInProgress = ({ onCompleted }) => {
 const [progress, progressSet] = useState(10)
  const [messages, setMessages] = useState<ChatGPTMessage[]>(startMessages)

  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true)
    const newMessages = [...messages, { role: 'user', content: message } as ChatGPTMessage]
    // setMessages(newMessages) // to not show existing answer
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: last10messages,
          user: cookie[COOKIE_NAME],
        }),
      })

      // This data is a ReadableStream
      const data = response.body
      if (!data) {
        return
      }

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      let lastMessage = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        lastMessage = lastMessage + chunkValue

        // setMessages([...newMessages, { role: 'assistant', content: lastMessage } as ChatGPTMessage])  // to not show existing answer
        setMessages([...messages, { role: 'assistant', content: lastMessage } as ChatGPTMessage])

        const newProgress = progress + 10;
        progressSet(newProgress)
        setLoading(false)
      }
    } catch (err) {
      console.log('Edge function returned.')
      if (err) {
        throw new Error(err.statusText)
        console.log(err)
      }
    }
  }

  const [answer, answerSet] = useState('')

  const handleOnChange = (e) => {
    answerSet(e.target.value)
  }
  return (
    <>
      <ScrollableText message={messages[messages.length - 1].content} />

      <Flex w="100%" direction={'column'} gap="0.25rem">
        <Input
          variant={'main'}
          type="text"
          placeholder="Type your answer"
          onChange={debounce(handleOnChange, 300)}
          maxLength={150}
        />
        <Flex ml="auto" color="whiteAlpha.300">
          {answer?.length || 0}/150
        </Flex>
      </Flex>

      <Button
        w={'200px'}
        onClick={() => {
          if(progress === 30){
            onCompleted()
          }else{
            sendMessage(answer)
          answerSet('')
          }
          
        }}
        isLoading={loading}
        disabled={loading}
        variant="orange"
      >
        SUBMIT
      </Button>
      <Progress
        value={progress}
        w="85%"
        transition={'0.5s'}
        position={'absolute'}
        bottom={'1rem'}
        className="quest-progress"
      />
    </>
  )
}