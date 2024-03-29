import React, { useEffect, useState } from 'react'

import { Flex, Text, Button, Input, Progress } from '@chakra-ui/react'

import QuestWrapper from '../shared/QuestWrapper'

import { type ChatGPTMessage } from '@components/shared/Chat/chatline'
import { useCookies } from 'react-cookie'
import getTurnNumber from '@util/getTurnNumber'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

const QuestBegin = ({ onSubmitQuest }) => {
  return (
    <QuestWrapper>
      <QuestInProgress
        onCompleted={() => {
          console.log('on completed')
          onSubmitQuest()
        }}
      />
    </QuestWrapper>
  )
}

export default QuestBegin

const startMessages: ChatGPTMessage[] = [
  {
    role: 'system',
    content: '',
  },
]

const QuestInProgress = ({ onCompleted }) => {
  const [progress, progressSet] = useState(0)
  const [messages, setMessages] = useState<ChatGPTMessage[]>(startMessages)

  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])
  const [answer, answerSet] = useState('')

  useEffect(() => {
    // send begin message on first render
    sendMessage('BEGIN')
  }, [])

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    // setLoading(true)

    const newMessages = [...messages, { role: 'user', content: message } as ChatGPTMessage]
    // setMessages(newMessages) // to not show existing answer
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    try {
      const response: Response = await fetch('/api/chat', {
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
        console.log('no data')
        return
      }

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      let lastMessage = ''

      let turnEnd = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        if (chunkValue === 'Done') {
          turnEnd = true
          break
        }

        lastMessage = lastMessage + chunkValue

        setMessages([...newMessages, { role: 'assistant', content: lastMessage } as ChatGPTMessage]) // to not show existing answer

        answerSet('')
      }

      const turnNumber = getTurnNumber(lastMessage)

      if (isNaN(turnNumber)) {
        // do nothing for now
      } else {
        console.log('turnNumber', turnNumber)
        if (!turnNumber) {
          return
        }
        const newProgress = getProgress(turnNumber)
        console.log('newProgress', newProgress)
        progressSet(newProgress)
      }

      if (turnEnd) {
        setLoading(false)
        onCompleted()
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      console.log('Edge function returned.')
      setLoading(false)

      if (err) {
        throw new Error(err.statusText)
        console.log(err)
      }
    }
  }

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
          disabled={loading}
          value={answer || ''}
          placeholder="Type your answer"
          onChange={handleOnChange}
          maxLength={150}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              sendMessage(answer)
            }
          }}
        />
        <Flex ml="auto" color="whiteAlpha.300" fontSize={{ base: '12px', md: '16px' }}>
          {answer?.length || 0}/150
        </Flex>
      </Flex>

      <Button
        w={'200px'}
        onClick={() => {
          // if(progress === 100){

          //   onCompleted()
          // }else{
          sendMessage(answer)
          // }
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
        bottom={'0.5rem'}
        className="quest-progress"
      />
    </>
  )
}

const ScrollableText = ({ message, ...props }) => {
  return (
    <Flex
      position="relative"
      w="100%"
      minH={{ base: '40%', lg: '33%' }}
      maxH={{ base: '40%', lg: 'none' }}
      h="auto"
      // maxH="33%"
      flexDirection={'column'}
      className="scrollable-quest-text"
      {...props}
    >
      <Flex
        flexDirection={'column'}
        w="100%"
        h="100%"
        // justify={'center'}
        overflow={'auto'}
        __css={{
          '::-webkit-scrollbar': {
            // display: 'none',
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#123028',
            border:
              '3px solid transparent' /* Use your background color to overlap the behind layer, making track thinner than thumb */,
            backgroundClip: 'content-box',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ED8936',
            maxHeight: '20px',
            borderTop: '60px solid #ED8936',
          },
        }}
      >
        <Text
          fontSize={{ base: '14px', md: '18px' }}
          color="orange.400"
          textAlign={'left'}
          whiteSpace={'break-spaces'}
        >
          {message}
        </Text>
      </Flex>
    </Flex>
  )
}

function getProgress(turnNumber) {
  return (turnNumber / 13) * 100
}
