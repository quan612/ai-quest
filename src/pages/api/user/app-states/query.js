import { prisma } from 'context/PrismaContext'

const appStateQueryAPI = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {

        const appStates = await prisma.appState.findMany({
          orderBy: {
            id: "asc"
          }
        })
        return res.status(200).json(appStates)
      } catch (err) {
        console.log(err)
        res.status(500).json({ isError: true, message: err.message })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
export default appStateQueryAPI
