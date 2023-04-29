import { type ChatGPTMessage } from '@components/shared/Chat/chatline'

import { OpenAIStream, OpenAIStreamPayload } from '@util/OpenAIStream'
import { getToken } from 'next-auth/jwt'

import type { NextApiRequest, NextApiResponse } from 'next'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}
if (!process.env.AI_QUEST_HOST) {
  throw new Error('Missing Environment Variable AI_QUEST_HOST')
}

export const config = {
  runtime: 'experimental-edge',
}

const handler = async (req: Request): Promise<Response> => {

  const body = await req.json()

  const unknownReq = req as unknown
  const nextReq = unknownReq as NextApiRequest
  const token = await getToken({ req: nextReq })
  // console.log('token', token)

  const user = token.sub

  try {
    const botMessage = await fetch(`${process.env.AI_QUEST_HOST}/api/user/ai-quest/query-first`)
    const botMessageRes = await botMessage.json()
    const message = botMessageRes[0]?.value

    const messages: ChatGPTMessage[] = [
      {
        role: 'system',
        content: message, // process.env.FIRST_MESSAGE ~ firstMessage ~
      },
    ]
    const bodyMessages = body?.messages

    const isFinal = await saveMessage(user, bodyMessages)

    if (bodyMessages) {
      messages.push(...bodyMessages)
    }

    const payload: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
      max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      user: body?.user,
      n: 1,
    }

    if (isFinal) {
      return new Response('Done')
    }
    const stream = await OpenAIStream(payload)
    return new Response(stream)
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
export default handler

const saveMessage = async (user, messages) => {
  const assisstantMessages = messages.filter((m) => m.role === 'assistant')

  if (assisstantMessages.length === 0) {
    return false // probably this is BEGIN
  }
  const lastAssistantMsg = assisstantMessages[assisstantMessages.length - 1].content

  const userMessages = messages.filter((m) => m.role === 'user')
  const lastUserMsg = userMessages[userMessages.length - 1].content

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer 1234`, // ${process.env.INTERNAL_API_KEY}
  }

  const payload = {
    user,
    lastAssistantMsg,
    lastUserMsg,
  }

  try {
     await fetch(`${process.env.AI_QUEST_HOST}/api/user/ai-quest/submit`, {
      headers: requestHeaders,
      method: 'POST',
      body: JSON.stringify(payload),
    })

    let isLastTurn = false
    if (lastAssistantMsg.includes('(Turn 12)')) {
      isLastTurn = true
    }
    return isLastTurn
  } catch (error) {
    console.log(error)
  }
  // console.log(res)
}
