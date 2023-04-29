import { signUpRateLimit } from "@middlewares/applyRateLimit"
import { getServerSession } from 'next-auth'
import { getSession } from "next-auth/react"
import { getAuthOptions } from './auth/[...nextauth]'
// import type { NextApiRequest, NextApiResponse } from "next"



export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // await signUpRateLimit(req, res)
      } catch (err) {
        console.log(err)
        return res.status(429).send('Too many requests')
      }

      res.status(200).json('ok')

      break;
    case 'POST':
      try {
        // await signUpRateLimit(req, res)
        const session = await getServerSession(req, res, getAuthOptions(req))

        console.log("session", session)
      } catch (err) {
        console.log(err)
        return res.status(429).send('Too many requests')
      }

      res.status(200).json('ok')

      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
