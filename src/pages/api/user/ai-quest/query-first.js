import { prisma } from '@context/PrismaContext'

const userQuestQueryHandler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const messages = await prisma.botMessage.findMany()
        return res.status(200).json(messages)
      } catch (err) {
        console.log(err)
        res.status(200).json({ isError: true, message: err.message })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
export default (userQuestQueryHandler)
