import { type ChatGPTMessage } from '@components/shared/Chat/chatline'

import { firstMessage } from '@util/firstMessage'
import { OpenAIStream, OpenAIStreamPayload } from '@util/OpenAIStream'


// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'experimental-edge',
  // runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const botMessage = await fetch('https://ai-quest.vercel.app/api/user/bot-messages/query')
  const botMessageRes = await botMessage.json()
  const message = botMessageRes[0]?.value;
  // console.log(message)

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: message,// process.env.FIRST_MESSAGE firstMessage

    },
  ]
  const bodyMessages = body?.messages
  if(bodyMessages){
    messages.push(...bodyMessages)
  }
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler
