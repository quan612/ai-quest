import { prisma } from '@context/PrismaContext'
import whitelistUserMiddleware from 'middlewares/whitelistUserMiddleware'
import Enums from 'enums'

import withExceptionFilter from '@middlewares/withExceptionFilter'
import getTurnNumber from '@util/getTurnNumber'

const handler = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(200).json({ isError: true, message: 'post only' })
  }
  const { user, lastAssistantMsg, lastUserMsg } = req.body

  console.log("lastAssistantMsg", lastAssistantMsg)

  const turnOfLastAssistantMsg = getTurnNumber(lastAssistantMsg)


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
      console.log("no user")
      return res.status(200).json({ isError: true, message: 'user not found' })
    }

    const submissions = whiteList?.questSubmission?.submissions || [];

    console.log("turnOfLastAssistantMsg", turnOfLastAssistantMsg)
    console.log("submissions.length", submissions.length)

    let isFirstTurn = false;
    if (parseInt(turnOfLastAssistantMsg) === 1) { // && submissions.length !== 0
      console.log("first turn, reset submission if submissions is not null")
      // await prisma.userSubmission.upsert({
      //   where: {
      //     userId: whiteList.userId,
      //   },
      //   create: {
      //     userId: whiteList.userId,
      //     submissions: []
      //   },
      //   update: {
      //     submissions: []
      //   }
      // })

      await prisma.userSubmission.upsert({
        where: {
          userId: whiteList.userId,
        },
        create: {
          userId: whiteList.userId,
          submissions: [{ assisstant: lastAssistantMsg, user: lastUserMsg }]
        },
        update: {
          submissions: [{ assisstant: lastAssistantMsg, user: lastUserMsg }]
        }
      })
    }

    //check whether a new submission needs to be saved
    if (submissions && submissions.length > 0) {
      console.log("has some submissions")
      // get last assistant message
      // check last assistant message Turn number from db, against last assistant message from request, if it is different then save new
      const lastAssistantMessageFromDb = submissions[submissions.length - 1].assisstant;
      const lastTurnFromDb = getTurnNumber(lastAssistantMessageFromDb);

      const lastTurnFromRequest = getTurnNumber(lastAssistantMsg);

      console.log("lastTurnFromDb", lastTurnFromDb)
      console.log("lastTurnFromRequest", lastTurnFromRequest)

      if (lastTurnFromRequest === 1 && !lastTurnFromDb) {
        submissions.push({ assisstant: lastAssistantMsg, user: lastUserMsg });
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
      }

      if (lastTurnFromRequest && lastTurnFromDb && lastTurnFromRequest > lastTurnFromDb) {
        submissions.push({ assisstant: lastAssistantMsg, user: lastUserMsg });
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
      }
    }


    res.status(200).json({ message: 'ok' })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default withExceptionFilter(handler)
