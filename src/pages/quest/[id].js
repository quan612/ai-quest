import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from 'pages/api/auth/[...nextauth]'


const QuestDetailsComponent = dynamic(() =>
  import('@components/end-user/quest/QuestDetails'),
)

function QuestDetailsPage({ session }) {
  return (
    <QuestDetailsComponent session={session} />
  )
}

QuestDetailsPage.requiredLogin = true
export default QuestDetailsPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req))
  return {
    props: {
      session,
    },
  }
}
