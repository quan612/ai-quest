import { prisma } from '@context/PrismaContext'
import whitelistUserMiddleware from 'middlewares/whitelistUserMiddleware'
import Enums from 'enums'

import withExceptionFilter from '@middlewares/withExceptionFilter'

const handler = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(200).json({ isError: true, message: 'post only' })
  }
  const { user, lastAssistantMsg, lastUserMsg } = req.body

  const authorization = req.headers.authorization || ''
  const internalKey = authorization.match(/Bearer (.*)/)?.[1]

  console.log("internalKey", internalKey)
  try {
    const whiteList = await prisma.whiteList.findUnique({
      where: {
        wallet: user
      },
      select: {
        userId: true,
        questSubmission: true
      }
    })

    if (!whiteList) {
      return res.status(200).json({ isError: true, message: 'user not found' })
    }

    console.log(whiteList)
    const submissions = whiteList?.questSubmission?.submissions || [];

    submissions.push({ assisstant: lastAssistantMsg, user: lastUserMsg });

    console.log(submissions)

    await prisma.userSubmission.upsert({
      where: {
        userId: whiteList.userId,
      },
      create: {
        userId: whiteList.userId,
        submissions: submissions
      },
      update: {
        submissions: submissions
      }
    })

    res.status(200).json({ message: 'ok' })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default withExceptionFilter(handler)
