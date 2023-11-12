import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import { prisma } from "@context/PrismaContext";
import { AccountStatus } from '@prisma/client'
import { utils } from 'ethers'

const getUserEmail = async (email) => {
  return await prisma.whiteList.findFirst({
    where: {
      email: {
        mode: 'insensitive',
        equals: email,
      },

    },
  })
}

const newUserEmail = async (email, hashPassword) => {
  return await prisma.whiteList.create({
    data: {
      email,
      password: hashPassword,
      status: AccountStatus.ACTIVE
    },
    select: {
      id: true,
      userId: true
    }
  })
}
import bcrypt from 'bcryptjs'

export const buildPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}

export function getAuthOptions(req) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      id: "Ethereum",
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || '{}')
          );

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);
          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || '');

          const wallet = utils.getAddress(siwe.address);

          const user = await prisma.whiteList.findUnique({
            where: {
              wallet
            }
          })

          if (!user) {
            await prisma.whiteList.create({
              data: {
                wallet,
                status: AccountStatus.ACTIVE,
              }
            })
          }
          return {
            id: wallet,
            wallet
          };
        } catch (e) {
          return null;
        }
      },
      credentials: {
        message: {
          label: 'Message',
          placeholder: '0x0',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          placeholder: '0x0',
          type: 'text',
        },
      },
    }),
    CredentialsProvider({
      id: 'email',
      name: 'email',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
        moku: {
          label: 'Moku',
          type: 'text',
        },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials
        if (!email || !password) throw new Error('One of more fields are missing')

        const existingUser = await getUserEmail(email)

        if (!existingUser) {
          const passwordHash = await buildPassword(password)
          const newUser = await newUserEmail(email, passwordHash)
          return {
            id: email,
            userId: newUser.userId,
            email,
          }
        }

        else {
          const isPasswordValid = await bcrypt.compare(password, existingUser.password)
          if (!isPasswordValid) throw new Error('Invalid password')
        }

        return {
          id: email,
          email,
        }
      },
    }),
  ];

  return {
    callbacks: {
      async jwt({ token, user, account, profile, trigger, session }) {
        //*This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated
        if (user) {
          let userQuery
          console.log(user)
          if (account.provider === "Ethereum") {
            userQuery = await prisma.whiteList.findUnique({
              where: {
                wallet: user.wallet
              }
            })
          }
          if (account.provider === "email") {
            userQuery = await prisma.whiteList.findFirst({
              where: {
                email: {
                  mode: 'insensitive',
                  equals: user.email,
                },
              },
            })
          }


          token.provider = account?.provider
          token.user = getUserInfo(userQuery)
        }

        console.log(token)
        return token
      },
      async session({ session, token }) {

        session.address = token.sub;
        session.user = {
          name: token.sub,
        }; // this is needed for getServerSideProps
        return session;
      },
    },
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24,
    }
  };
}


export default async function auth(req, res) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send('Bad request');
    return;
  }

  const isDefaultSigninPage =
    req.method === 'GET' &&
    req.query.nextauth.find(value => value === 'signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}

const getUserInfo = (user) => {
  return {
    id: user?.id,
    userId: user?.userId,
    status: user?.status,
    username: user?.username,
    email: user?.email,
    wallet: user?.wallet,
  }
}