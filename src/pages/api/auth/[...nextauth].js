import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import { prisma } from "@context/PrismaContext";
import { AccountStatus } from '@prisma/client'
import { utils } from 'ethers'

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
  ];

  return {
    callbacks: {
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