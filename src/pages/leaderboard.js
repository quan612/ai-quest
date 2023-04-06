import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from 'pages/api/auth/[...nextauth]'


const LeaderboardComponent = dynamic(() =>
  import('@components/end-user/leaderboard/Leaderboard'),
)

function LeaderboardPage() {
  return (
    <LeaderboardComponent />
  )
}
LeaderboardPage.requiredLogin = true
export default LeaderboardPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req))
  return {
    props: {
      session,
    },
  }
}
