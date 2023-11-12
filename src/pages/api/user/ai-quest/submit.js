import { prisma } from '@context/PrismaContext'
import withExceptionFilter from '@middlewares/withExceptionFilter'
import getTurnNumber from '@util/getTurnNumber'

const handler = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(200).json({ isError: true, message: 'post only' })
  }
  const { user, lastAssistantMsg, lastUserMsg } = req.body

  const turnOfLastAssistantMsg = getTurnNumber(lastAssistantMsg)

  // const authorization = req.headers.authorization || ''
  // const internalKey = authorization.match(/Bearer (.*)/)?.[1]

  try {
    const currentUser = await prisma.whiteList.findUnique({
      where: {
        userId: user
      },
      select: {
        userId: true,
        questSubmission: true
      }
    })

    if (!currentUser) {
      console.log("no user")
      return res.status(200).json({ isError: true, message: 'user not found' })
    }

    const submissions = currentUser?.questSubmission?.submissions || [];

    console.log("submissions.length", submissions.length)

    let isFirstTurn = false;
    if (parseInt(turnOfLastAssistantMsg) === 1) { // && submissions.length !== 0
      console.log("first turn, reset submission if submissions is not null")

      await prisma.userSubmission.upsert({
        where: {
          userId: currentUser.userId,
        },
        create: {
          userId: currentUser.userId,
          submissions: [{ assisstant: lastAssistantMsg, user: lastUserMsg }]
        },
        update: {
          submissions: [{ assisstant: lastAssistantMsg, user: lastUserMsg }]
        }
      })
    }

    //check whether a new submission needs to be saved
    if (submissions && submissions.length > 0) {
      // check last assistant message Turn number from db, against last assistant message from request, if it is different then save new
      const lastAssistantMessageFromDb = submissions[submissions.length - 1].assisstant;
      const lastTurnFromDb = getTurnNumber(lastAssistantMessageFromDb);
      const lastTurnFromRequest = getTurnNumber(lastAssistantMsg);

      if (lastTurnFromRequest === 1 && !lastTurnFromDb) {
        submissions.push({ assisstant: lastAssistantMsg, user: lastUserMsg });
        await prisma.userSubmission.upsert({
          where: {
            userId: currentUser.userId,
          },
          create: {
            userId: currentUser.userId,
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
            userId: currentUser.userId,
          },
          create: {
            userId: currentUser.userId,
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
